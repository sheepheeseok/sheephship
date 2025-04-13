package sheepback.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import sheepback.domain.exception.OutOfStockException;
import sheepback.domain.item.Color;
import sheepback.domain.item.Item;
import sheepback.domain.item.Size;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "color_id")
    private Color selectedColor;  // 주문한 특정 색상

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "size_id")
    private Size orderedSize;  // 주문한 특정 사이즈


    public OrderItems(Item item ,
                      Color selectedColor,
                      Long quantity,Long orderPrice) {
        this.quantity = quantity;
        this.orderPrice = orderPrice;

        this.item = item;
        item.getOrderItems().add(this);

        this.selectedColor = selectedColor;
        selectedColor.getOrderItems().add(this);
        if(selectedColor.getStockQuantity() < quantity){
            throw new OutOfStockException("재고 부족");
        }
        selectedColor.setStockQuantity(selectedColor.getStockQuantity() - this.quantity);

    }

    public OrderItems(Item item,
                      Color selectedColor, Size orderedSize,
                      Long quantity,Long orderPrice) {
        this.quantity = quantity;
        this.orderPrice = orderPrice;
        this.item = item;
        item.addOrderItem(this);
        this.selectedColor = selectedColor;
        selectedColor.addOrderItem(this);
        this.orderedSize = orderedSize;
        orderedSize.addOrderItem(this);
        if(orderedSize.getStockQuantity() < quantity){
            throw new OutOfStockException("재고 부족");
        }
        orderedSize.setStockQuantity(orderedSize.getStockQuantity() - this.quantity);


    }

    public OrderItems(){
    }




}
