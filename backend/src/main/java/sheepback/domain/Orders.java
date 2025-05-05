package sheepback.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Orders {
    @Id
    @GeneratedValue
    @Column(name = "order_id")
    private Long id;//오더 ID

    @NotNull
    private LocalDateTime orderDate;//주문시간

    @NotNull
    @Enumerated(EnumType.STRING)
    private Status status; //주문상태[ORDER(주문),CANCLE(취소)]

    private String returnReason;//환불사유

    //결제수단
    private String paymentMethod;

    //배송요청
    private String requireMents;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private Member member;//다대일 멤버조인

    @OneToMany(mappedBy = "order",  cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItems> orderItems = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "order")

    private Delivery delivery;//일대일 Delivery 조인




}
