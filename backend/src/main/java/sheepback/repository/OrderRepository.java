package sheepback.repository;


import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.Order;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import sheepback.domain.DeliveryStatus;
import sheepback.domain.Orders;
import sheepback.domain.Status;

@Repository
@RequiredArgsConstructor
public class OrderRepository {

    private final EntityManager em;

    public void order(Order order) {
        em.persist(order);
    }

    public String refund(Orders order, String reason) {
            order.setReturnReason(reason);
            order.setStatus(Status.REFUND);
            order.getDelivery().setDeliveryStatus(DeliveryStatus.RETURNEDSTART);
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
