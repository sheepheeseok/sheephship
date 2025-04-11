package sheepback.repository;


import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.Order;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import sheepback.domain.*;
import sheepback.repository.OrderQuery.SimpleOrderListDto;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class OrderRepository {

    private final EntityManager em;

    public Long order(Member member, Delivery delivery, List<OrderItems> orderItems, String paymentMethod, String requireMents) {

        //멤버 추가
        Orders orders = new Orders();
        orders.setMember(member);
        //배송정보 추가
        orders.setDelivery(delivery);
        //오더 아이템 추가
        for (OrderItems orderItem : orderItems) {
            orders.setOrderItems(orderItems);
            orderItem.setOrder(orders);
        }

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
                        "i.mainUrl, i.name, d.deliveryStatus, o.orderDate, oi.quantity, oi.orderPrice) " +
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
