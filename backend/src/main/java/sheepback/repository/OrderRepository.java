package sheepback.repository;


import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.Order;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import sheepback.domain.*;
import sheepback.domain.item.Item;
import sheepback.repository.OrderQuery.OrderDetailDto;
import sheepback.repository.OrderQuery.OrderItemByItemIdDto;
import sheepback.repository.OrderQuery.SimpleItemAndCountDto;
import sheepback.repository.OrderQuery.SimpleOrderListDto;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class OrderRepository {

    private final EntityManager em;

    public Long order(Member member, Delivery delivery, List<OrderItems> orderItems, String paymentMethod, String requireMents) {

        double point = 0L;
        //멤버 추가

        Orders orders = new Orders();
        orders.setMember(member);

        //배송정보 추가
        orders.setDelivery(delivery);
        //오더 아이템 추가
        for (OrderItems orderItem : orderItems) {
            orders.setOrderItems(orderItems);
            orderItem.setOrder(orders);
            System.out.println("orderItem.getOrderPrice()* 0.005 = " + orderItem.getOrderPrice()* 0.005);
           point += orderItem.getOrderPrice() * 0.005;
        }
        member.setPoint( (member.getPoint() +(long) point));
        orders.setPoint((long) point);
        orders.setPaymentMethod(paymentMethod);
        orders.setRequireMents(requireMents);
        orders.setOrderDate(LocalDateTime.now());
        orders.setStatus(Status.ORDER);
        em.persist(orders);

        return orders.getId();



    }
    public List<SimpleOrderListDto> findbyDate(LocalDateTime startDate, LocalDateTime endDate, String memberId) {


        List<SimpleOrderListDto> resultList = em.createQuery("select new " +
                        "sheepback.repository.OrderQuery.SimpleOrderListDto( o.id, " +
                        "i.mainUrl, i.name, d.deliveryStatus, o.orderDate, oi.quantity, oi.orderPrice, oi.id) " +
                        " from Orders o join o.member m" +
                        " join o.delivery d " +
                        " join o.orderItems oi" +
                        " join oi.item i " +
                        " where m.id = :memberId and o.orderDate between :startDate and :endDate", SimpleOrderListDto.class)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .setParameter("memberId", memberId)
                .getResultList();
        return resultList;

    }


    public List<OrderItemByItemIdDto> findBaseData(List<Long> itemIds, List<Long> colorIds, List<Long> sizeIds) {
        return em.createQuery(
                        "SELECT new sheepback.repository.OrderQuery.OrderItemByItemIdDto(" +
                                "i.id, i.name, i.mainUrl, i.price, c.id, s.id, c.color, s.size) " +
                                "FROM Item i " +
                                "JOIN i.colors c " +
                                "LEFT JOIN c.sizes s " +
                                "WHERE i.id IN :itemIds " +
                                "AND c.id IN :colorIds " +
                                "AND (s.id IN :sizeIds OR s.id IS NULL)",
                        OrderItemByItemIdDto.class)
                .setParameter("itemIds", itemIds)
                .setParameter("colorIds", colorIds)
                .setParameter("sizeIds", sizeIds.isEmpty() ? Collections.singletonList(null) : sizeIds)
                .getResultList();
    }

    public OrderDetailDto getOrderDetail(Long orderId, Long orderItemId) {
       OrderDetailDto orderDetail = em.createQuery("select new " +
                "sheepback.repository.OrderQuery.OrderDetailDto(m.name, d.address," +
                " m.phoneNumber, o.requireMents, d.deliveryStatus, o.id" +
                ", i.mainUrl, i.name, oi.quantity, oi.orderPrice, i.deliveryFee, o.paymentMethod" +
                ", o.point, o.status, o.orderDate)" +
                " from Orders o " +
                "join o.orderItems oi " +
                "join o.delivery d " +
                "join oi.item i " +
                "join o.member m " +
                "where o.id = :id and oi.id =:orderItemId", OrderDetailDto.class)
                .setParameter("id", orderId)
               .setParameter("orderItemId", orderItemId)
                .getSingleResult();
        return orderDetail;
    }

    public String refund(Orders order, String reason) {
            order.setReturnReason(reason);
            order.setStatus(Status.REFUND);
            order.getDelivery().setDeliveryStatus(DeliveryStatus.RETURNSTART);
            return "반품 시작";

    }

    public String cancel(Orders order, String reason) {
        DeliveryStatus deliveryStatus = order.getDelivery().getDeliveryStatus();
        if (deliveryStatus == DeliveryStatus.PENDING) {
            order.setReturnReason(reason);
            order.setStatus(Status.CANCLE);
            order.getDelivery().setDeliveryStatus(DeliveryStatus.CANCELLED);
            return "취소 완료";
        }else{
            return "취소 실패";
        }
    }

    public Orders findById(Long id) {
        return em.find(Orders.class, id);
    }




}
