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

    public void ordered(List<OrderDto> orderDto) {
        LocalDateTime now = LocalDateTime.now();
        for (OrderDto orderDtos : orderDto) {
            ItemInfoForOrderDto itemInfoForOrderDto = itemMapper.getItemInfoForOrderDto(orderDtos.getItemId());
            SaveOrderDto saveOrderDto = new SaveOrderDto();
            saveOrderDto.setMemberId(orderDtos.getMemberId());
            saveOrderDto.setOrderDate(now);
            saveOrderDto.setStatus(Status.ORDER);
            saveOrderDto.setPaymentMethod(orderDtos.getPaymentMethod());
            saveOrderDto.setRequireMents(orderDtos.getRequireMents());
            orderMapper.saveOrder(saveOrderDto);
            SaveOrderItemDto saveOrderItemDto = new SaveOrderItemDto();
            saveOrderItemDto.setItemId(orderDtos.getItemId());
            saveOrderItemDto.setOrderId(saveOrderDto.getOrderId());
            saveOrderItemDto.setQuantity(orderDtos.getQuantity());
            saveOrderItemDto.setOrderPrice(totalPrice(itemInfoForOrderDto.getPrice(), orderDtos.getQuantity()));
            orderItemMapper.saveOrderItem(saveOrderItemDto);
            SaveDeliveryDto saveDeliveryDto = new SaveDeliveryDto();
            saveDeliveryDto.setOrderId(saveOrderDto.getOrderId());
            saveDeliveryDto.setFirstAddress(orderDtos.getFirstAddress());
            saveDeliveryDto.setSecondAddress(orderDtos.getSecondAddress());
            saveDeliveryDto.setDeliveryStatus(DeliveryStatus.ORDERCONFIRM);
            deliveryMapper.addDelivery(saveDeliveryDto);
            itemMapper.changeQuantity(orderDtos.getItemId(), orderDtos.getQuantity(), orderDtos.getColor(), orderDtos.getSize());
        }

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

    public void cancelOrder() {

    }

    public List getOrderList(){

    }
    public getOrderDetail(){

    }


}





    //주문 취소시 주문취소로 STATUS 데이터 변경후 재고 +1

    //주문한 상품 리스트 정보 가져오기

    //주문상세정보 가져오기



