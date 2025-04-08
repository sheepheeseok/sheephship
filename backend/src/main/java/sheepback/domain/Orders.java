package sheepback.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter @Setter
public class Orders {
    @Id
    @GeneratedValue
    @Column(name = "order_id")
    private Long id;//오더 ID

    @NotNull
    private LocalDate orderDate;//주문시간

    @NotNull
    @Enumerated(EnumType.STRING)
    private Status status; //주문상태[ORDER(주문),CANCLE(취소)]

    private String returnReason;//환불사유

    private String paymentMethod;

    private String requireMents;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private Member member;//다대일 멤버조인

    @OneToMany(mappedBy = "order",  cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItems> orderItems;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "delivery_id")
    private Delivery delivery;//일대일 Delivery 조인


    public void setMember(Member member) {
        this.member = member;
        member.getOrders().add(this);
    }

    public void addOrderItem(OrderItems orderItem) {
        orderItems.add(orderItem);
        orderItem.setOrder(this);
    }
    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
        delivery.setOrder(this);
    }


    public static Orders createOrder(Member member, Delivery delivery, List<OrderItems> orderItems) {
        Orders orders = new Orders();
        orders.setMember(member);
        orders.setDelivery(delivery);
        for (OrderItems orderItem : orderItems) {
            orders.addOrderItem(orderItem);
        }
        orders.setStatus(Status.ORDER);
        orders.setOrderDate(LocalDate.now());
        return orders;
    }


}
