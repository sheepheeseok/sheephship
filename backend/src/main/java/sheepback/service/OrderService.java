package sheepback.service;

import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sheepback.Dtos.*;
import sheepback.domain.*;
import sheepback.domain.item.Item;
import sheepback.mapper.DeliveryMapper;
import sheepback.mapper.ItemMapper;
import sheepback.mapper.OrderItemMapper;
import sheepback.mapper.OrderMapper;
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


    //판매량 추가 배송비는 계산해서 30000원 이하면 2500원 빼고 2500원 이상이면 추가
    public void ordered(OrderDto orderDto) {
        LocalDateTime now = LocalDateTime.now();
            SaveOrderDto saveOrderDto = new SaveOrderDto();
            saveOrderDto.setMemberId(orderDto.getMemberId());
            saveOrderDto.setOrderDate(now);
            saveOrderDto.setStatus(Status.ORDER);
            saveOrderDto.setPaymentMethod(orderDto.getPaymentMethod());
            saveOrderDto.setRequireMents(orderDto.getRequireMents());
            orderMapper.saveOrder(saveOrderDto);
            List<SaveOrderItemDto> saveOrderItemDtos = new ArrayList<>();
            for(OrderItemDetailDto orderItemDetailDto : orderDto.getOrderItemDetailDtos()) {
                ItemInfoForOrderDto itemInfoForOrderDto = itemMapper.getItemInfoForOrderDto(orderItemDetailDto.getItemId(), orderItemDetailDto.getColor(), orderItemDetailDto.getSize());
                SaveOrderItemDto saveOrderItemDto = new SaveOrderItemDto();
                saveOrderItemDto.setItemId(orderItemDetailDto.getItemId());
                saveOrderItemDto.setOrderId(saveOrderDto.getOrderId());
                saveOrderItemDto.setQuantity(orderItemDetailDto.getQuantity());
                saveOrderItemDto.setOrderPrice(totalPrice(itemInfoForOrderDto.getPrice(), orderItemDetailDto.getQuantity()));
                saveOrderItemDto.setItemDetailId(itemInfoForOrderDto.getItemDetailId());
                saveOrderItemDtos.add(saveOrderItemDto);
                itemMapper.changeQuantity(orderItemDetailDto.getItemId(), orderItemDetailDto.getQuantity(), orderItemDetailDto.getColor(), orderItemDetailDto.getSize());
            }
            orderItemMapper.saveOrderItem(saveOrderItemDtos);

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



