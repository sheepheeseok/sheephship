package sheepback.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Delivery {

    @Id
    @GeneratedValue
    @Column(name = "delivery_id")
    private Long id; //DELIVERY 고유번호

    @Enumerated(EnumType.STRING)
    private Address address; //주소 임베디드 타입

    private DeliveryStatus deliveryStatus; // 배송현황

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "delivery")
    private Orders order; //일대일 조인 ORDERS


}

//Order order = new Order();
//order.setStatus(DeliveryStatus.SHIPPED);
//System.out.println(order.getStatus().getDescription()); // "배송 중"
