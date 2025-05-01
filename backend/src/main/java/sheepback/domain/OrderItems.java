package sheepback.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import sheepback.domain.exception.OutOfStockException;
import sheepback.domain.item.Item;

@Entity
@Getter @Setter
public class OrderItems {

    @Id
    @GeneratedValue
    @Column(name = "order_item_id")
    private Long id;//주문 상품 고유번호


    private Long quantity;//갯수

    private Long orderPrice;//구매 가격

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "item_id")
    private Item item;//다대일 조인 ITEM

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    private Orders order; //다대일 조인 ORDERS






}
