package sheepback.service;

import jakarta.persistence.criteria.Order;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sheepback.domain.*;
import sheepback.domain.item.Color;
import sheepback.domain.item.Item;
import sheepback.domain.item.Size;
import sheepback.repository.ItemRepository;
import sheepback.repository.MemberRepository;
import sheepback.repository.OrderItemRepository;
import sheepback.repository.OrderQuery.*;
import sheepback.repository.OrderRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Transactional
    public Long order(String memberId, List<ItemsDto> itemsDtos,
                      String paymentMethod, String requireMents, Address address){

        Member member = memberRepository.insertToOrder(memberId);
        Delivery delivery  = new Delivery();
        delivery.setAddress(new Address(address.getFirstAddress(), address.getSecondAddress()));
        delivery.setDeliveryStatus(DeliveryStatus.ORDERCONFIRM);
        List<OrderItems> orderItems = new ArrayList<>();
        for (ItemsDto itemsDto : itemsDtos) {
            Item item = itemRepository.findById(itemsDto.getItemId());
            Color byColorId = itemRepository.findByColorId(itemsDto.getColorId());
            if(itemsDto.getSizeId() != null){
                Size bySizeId = itemRepository.findBySizeId(itemsDto.getSizeId());
                OrderItems orderItem = new OrderItems(item,byColorId,bySizeId,
                        itemsDto.getCount(),itemsDto.getOrderPrice());
                orderItemRepository.save(orderItem);
                orderItems.add(orderItem);
            }else{
                OrderItems orderItem = new OrderItems(item,byColorId,
                        itemsDto.getCount(),itemsDto.getOrderPrice());
                orderItemRepository.save(orderItem);
                orderItems.add(orderItem);
            }

        }

        return orderRepository.order(member, delivery, orderItems, paymentMethod, requireMents);
    }



    public List<OrderItemByItemIdDto> findOrderItemByItemId(List<SimpleItemAndCountDto> dtos){

        System.out.println("dtos = " + dtos);
        List<Long> itemIds = dtos.stream().map(dto -> dto.getId()).collect(Collectors.toList());
        List<Long> counts = dtos.stream().map(dto -> dto.getCount()).collect(Collectors.toList());
        List<Long> colorIds = dtos.stream().map(dto -> dto.getColorId()).collect(Collectors.toList());
        List<Long> sizeIds = dtos.stream()
                .map(dto -> dto.getSizeId())
                .collect(Collectors.toList());

        List<OrderItemByItemIdDto> orderItemByItemId = orderRepository.findBaseData(itemIds, colorIds, sizeIds);
        for (int i = 0; i < counts.size(); i++) {
            if (counts.get(i) != null) {
                orderItemByItemId.get(i).setCoount(counts.get(i));
            }
        }

        return orderItemByItemId;
    }

    //날짜별 주문조회
    public List<SimpleOrderListDto> findOrderList(LocalDateTime begin,
                                                  LocalDateTime end, String memberId){


        List<SimpleOrderListDto> simpleOrderListDtos = orderRepository.findbyDate(begin, end, memberId);
        if (simpleOrderListDtos.size() > 0) {
            return simpleOrderListDtos;
        }else {
            return null;
        }


    }

    public OrderDetailDto getOrderDetail(Long orderId, Long orderItemId){
        OrderDetailDto orderDetail = orderRepository.getOrderDetail(orderId, orderItemId);
        if (orderDetail == null) {
            return null;
        }else{
            return orderDetail;
        }
    }

    public void cancleOrder(Long orderId, String returnReason){

        Orders orders = orderRepository.findById(orderId);
        orderRepository.cancel(orders, returnReason);

    }

}
