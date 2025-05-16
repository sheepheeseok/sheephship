package sheepback.service;

import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sheepback.Dtos.*;
import sheepback.domain.*;
import sheepback.domain.item.Item;
import sheepback.mapper.*;
import sheepback.repository.MemberRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private DeliveryMapper deliveryMapper;
    @Autowired
    private OrderItemMapper orderItemMapper;
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private ItemMapper itemMapper;
    @Autowired
    private stockReservationMapper reservationMapper;

    //주문 기존 배송지 가져오기
    public DeliveryInfoDto getDeliveryInfoById(String memberId) {
        DeliveryInfoDto deliveryInfoByMemberId = orderMapper.getDeliveryInfoByMemberId(memberId);
        return deliveryInfoByMemberId;
    }

    //장바구니 바로구매 포함 주문페이지 이동시 해당 아이템 가져오기

    public List<BuyItemListDto> enrichItems(List<BuyItemListDto> items) {
        // 1. itemId만 추출
        List<Long> itemIds = items.stream()
                .map(BuyItemListDto::getItemId)
                .collect(Collectors.toList());

        // 2. itemId로 itemName, price 조회 (Map<Long, ItemInfo>)
        Map<Long, ItemInfo> itemInfoMap = itemMapper.getBuyItemListById(itemIds)
                .stream()
                .collect(Collectors.toMap(ItemInfo::getItemId, Function.identity()));

        // 3. 조합
        for (BuyItemListDto dto : items) {
            ItemInfo info = itemInfoMap.get(dto.getItemId());
            if (info != null) {
                dto.setItemName(info.getItemName());
                dto.setPrice(info.getPrice());
                dto.setMainUrl(info.getMainUrl());
                dto.setDeliveryFee(info.getDeliveryFee());
            }
        }
        return items;
    }

    @Transactional
    public void cancelStockReservation(List<CancelReserveRequest> requests) {
        // 1. 예약 정보 조회
        List<Long> getReservationIds = requests.stream().map(CancelReserveRequest::getResevationId).collect(Collectors.toList());
        List<String> status = reservationMapper.findReservation(getReservationIds);
        // 2. 권한/상태 체크 (이미 취소, 확정된 예약은 취소 불가)
        for(String statusId : status) {
            if(statusId.equals("CANCELLED")) {
                throw new RuntimeException("이미 취소된 예약");
            }if(statusId.equals("CONFIRMED")) {
                throw new RuntimeException("이미 구매 완료된 예약");
            }
        }
        // 3. 재고 복구, 예약 상태를 취소로 변경
        for (CancelReserveRequest req : requests) {

            Long reservationItemDetailId = reservationMapper.findReservationItemDetailId(req.getResevationId());
            int updated = itemMapper.repairStock(reservationItemDetailId, req.getQuantity());
            if (updated == 0) throw new RuntimeException("재고 복구 실패: " + req.getResevationId());

            reservationMapper.cancelReservation(
                    req.getResevationId()
            );

        }
    }

    //주문 상태 들어갈시 원자적 쿼리와 함께 예약 테이블에 구매할 재고를 추가 그전에 재고가 없다면 false 출력
    @Transactional
    public List<Long> reserveMultipleStocks(List<StockReserveRequest> requests) {
        // 1. 모든 재고를 락과 함께 조회
        List<Long> ids = requests.stream().map(StockReserveRequest::getItemDetailId).collect(Collectors.toList());
        List<ItemStockDto> stocks = itemMapper.getStocksForUpdate(ids);
        List<Long> getreservationIds = new ArrayList<>();
        // 2. 각각의 재고가 충분한지 확인
        Map<Long, Long> stockMap = stocks.stream()
                .collect(Collectors.toMap(ItemStockDto::getItemDetailId, ItemStockDto::getStockQuantity));

        // 3. 모두 충분하면 차감
        for (StockReserveRequest req : requests) {

            if (stockMap.getOrDefault(req.getItemDetailId(), 0L) < req.getQuantity()) {
                throw new RuntimeException("재고 부족: " + req.getItemDetailId());
            }

            int updated = itemMapper.decreaseStock(req.getItemDetailId(), req.getQuantity());
            if (updated == 0) throw new RuntimeException("재고 차감 실패: " + req.getItemDetailId());
            StockReservation stockReservation = new StockReservation();
            // 4. 예약 테이블에 insert 등 추가 로직
            stockReservation.setItemDetailId(req.getItemDetailId());
            stockReservation.setQuantity(req.getQuantity());
            stockReservation.setMemberId(req.getMemberId());
            stockReservation.setExpireAt(LocalDateTime.now());
            reservationMapper.insertReservation(stockReservation);
            getreservationIds.add(stockReservation.getReservationId());
        }


        return getreservationIds;
    }

    //배송비 계산 API
    public Long calculateTotalDeliveryFee(List<Long> price){
        Long sum = price.stream().mapToLong(Long::longValue).sum();
        if(sum > 30000){
            return 0L;
        }
        return 3000L;
    }

    //판매량 추가 배송비는 계산해서 30000원 이하면 2500원 빼고 2500원 이상이면 추가 주문완료시
    public void ordered(OrderDto orderDto) {
        LocalDateTime now = LocalDateTime.now();
            SaveOrderDto saveOrderDto = new SaveOrderDto();
            saveOrderDto.setMemberId(orderDto.getMemberId());
            saveOrderDto.setOrderDate(now);
            saveOrderDto.setStatus(Status.ORDER);
            saveOrderDto.setPaymentMethod(orderDto.getPaymentMethod());
            saveOrderDto.setRequireMents(orderDto.getRequireMents());

            List<SaveOrderItemDto> saveOrderItemDtos = new ArrayList<>();
            List<Long> totalPrice = new ArrayList<>();
            for(OrderItemDetailDto orderItemDetailDto : orderDto.getOrderItemDetailDtos()) {
                ItemInfoForOrderDto itemInfoForOrderDto = itemMapper.getItemInfoForOrderDto(orderItemDetailDto.getItemId(), orderItemDetailDto.getColor(), orderItemDetailDto.getSize());
                SaveOrderItemDto saveOrderItemDto = new SaveOrderItemDto();
                saveOrderItemDto.setItemId(orderItemDetailDto.getItemId());
                saveOrderItemDto.setOrderId(saveOrderDto.getOrderId());
                saveOrderItemDto.setQuantity(orderItemDetailDto.getQuantity());
                saveOrderItemDto.setOrderPrice((totalPrice(itemInfoForOrderDto.getPrice(),
                        orderItemDetailDto.getQuantity())) -((long) (totalPrice(itemInfoForOrderDto.getPrice(),
                        orderItemDetailDto.getQuantity())* discount(orderDto.getGrade()))));
                totalPrice.add((totalPrice(itemInfoForOrderDto.getPrice(),
                        orderItemDetailDto.getQuantity())) -((long) (totalPrice(itemInfoForOrderDto.getPrice(),
                        orderItemDetailDto.getQuantity())* discount(orderDto.getGrade()))));
                saveOrderItemDto.setItemDetailId(itemInfoForOrderDto.getItemDetailId());
                saveOrderItemDtos.add(saveOrderItemDto);
                reservationMapper.confirmReservation(
                        orderItemDetailDto.getResevationId());

            }
        Long deliveryFee = calculateTotalDeliveryFee(totalPrice);
            saveOrderDto.setDeliveryFee(deliveryFee);
        orderItemMapper.saveOrderItem(saveOrderItemDtos);
            orderMapper.saveOrder(saveOrderDto);
            SaveDeliveryDto saveDeliveryDto = new SaveDeliveryDto();
            saveDeliveryDto.setOrderId(saveOrderDto.getOrderId());
            saveDeliveryDto.setFirstAddress(orderDto.getFirstAddress());
            saveDeliveryDto.setSecondAddress(orderDto.getSecondAddress());
            saveDeliveryDto.setDeliveryStatus(DeliveryStatus.ORDERCONFIRM);
            deliveryMapper.addDelivery(saveDeliveryDto);





    }

    private Long totalPrice(Long price, Long quantity) {
        return price * quantity;
    }

    private double discount(Grade grade) {
        double discount = 0;
        switch (grade) {
            case RED -> {
                discount = 0.015;
            }
            case YELLOW -> {
                discount = 0.02;
            }
            case NAVY -> {
                discount = 0.025;
            }
            case PURPLE -> {
                discount =0.030;
            }
            case BROWN -> {
                discount = 0.035;
            }
            case BLACK -> {
                discount = 0.040;
            }
            default -> {
                discount = 0.01;
            }
        }
    return discount;
    }


    //판매량 추가하는거 넣기
    public void cancelOrder(Long orderId, List<Long> orderItemIds) {

        List<SimpleOrderItemDto> orderItem = orderItemMapper.getOrderItembyOrderId(orderId, orderItemIds);
        deliveryMapper.changeDeliveryStatus(orderId, DeliveryStatus.CANCELLED);
        orderMapper.changeOrderStatus(orderId,Status.CANCLE);
        for(SimpleOrderItemDto orderItemDto : orderItem) {
            itemMapper.cancelQuantity(orderItemDto.getQuantity(),orderItemDto.getItemDetailId());

        }


    }

    /*
    1+N문제 해결전
    public List<OrderInquiryListDto> getOrderList(String memberId) {
        List<OrderInquiryListDto> orderInquiryListDtos = new ArrayList<>();
        List<Long> orderIdByMemberId = orderMapper.getOrderIdByMemberId(memberId);
        for(Long orderId : orderIdByMemberId) {
            OrderInquiryListDto orderInquiryListDto = new OrderInquiryListDto();
            orderInquiryListDto.setOrderId(orderId);
            List<OrderInquiryItemDto> orderInquiryByOrderId = orderItemMapper.getOrderInquiryByOrderId(orderId);
            orderInquiryListDto.setOrderInquiryItemDtoList(orderInquiryByOrderId);
            orderInquiryListDtos.add(orderInquiryListDto);
        }
        return orderInquiryListDtos;
    }
    */
    //해결후
    //페이지네이션 만들기
    public List<OrderInquiryListDto> getOrderList(String memberId) {
        return orderItemMapper.getOrderListWithItems(memberId);
    }

    public OrderDetailDto getOrderDetail(Long orderId) {
        return orderMapper.getOrderDetailByOrderId(orderId);

    }

}





    //주문 취소시 주문취소로 STATUS 데이터 변경후 재고 +1

    //주문한 상품 리스트 정보 가져오기

    //주문상세정보 가져오기



