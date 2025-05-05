package sheepback.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Delivery {

    @Id
    @GeneratedValue
    @Column(name = "delivery_id")
    private Long id; //DELIVERY 고유번호

    @Embedded
    private Address address; //주소 임베디드 타입

    @Enumerated(EnumType.STRING)
    private DeliveryStatus deliveryStatus; // 배송현황

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Orders order; //일대일 조인 ORDERS


}



//Order order = new Order();
//order.setStatus(DeliveryStatus.SHIPPED);
//System.out.println(order.getStatus().getDescription()); // "배송 중"
