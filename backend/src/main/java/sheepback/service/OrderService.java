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
import sheepback.repository.OrderQuery.AddressDto;
import sheepback.repository.OrderQuery.ItemsDto;
import sheepback.repository.OrderQuery.SimpleOrderListDto;
import sheepback.repository.OrderRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
                      String paymentMethod, String requireMents, AddressDto addressDto){

        Member member = memberRepository.insertToOrder(memberId);
        Delivery delivery  = new Delivery();
        if (addressDto.getAddress() != null) {
            delivery.setAddress(addressDto.getAddress());
        }else{
            delivery.setAddress(member.getAddress());
        }
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

    public List<SimpleOrderListDto> findOrderList(LocalDateTime begin,
                                                  LocalDateTime end){

    }

    public void cancleOrder(Long orderId, String returnReason){

        Orders orders = orderRepository.findById(orderId);
        orderRepository.cancel(orders, returnReason);

    }

}
