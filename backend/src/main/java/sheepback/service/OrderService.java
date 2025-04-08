package sheepback.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sheepback.domain.Delivery;
import sheepback.domain.Member;
import sheepback.domain.OrderItems;
import sheepback.domain.Orders;
import sheepback.domain.item.Item;
import sheepback.repository.ItemRepository;
import sheepback.repository.MemberRepository;
import sheepback.repository.OrderQuery.ItemsDto;
import sheepback.repository.OrderRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private MemberRepository memberRepository;

    public Long order(String memberId, List<ItemsDto> itemsDtos,
                      String paymentMethod, String requireMents){

        //주문가격 OrderItems에 넣기
        //color stockQuentity 빼기
        Member member = memberRepository.findbyId(memberId);

        Delivery delivery  = new Delivery();
        delivery.setAddress(member.getAddress());

        List<OrderItems> orderItems = new ArrayList<>();

        Orders orders = Orders.createOrder(member,delivery,orderItems);

        return orders.getId();
    }

    public void cancleOrder(Long orderId, String returnReason){

        Orders orders = orderRepository.findById(orderId);
        orderRepository.cancel(orders, returnReason);

    }

}
