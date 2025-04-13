package sheepback.domain.item;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import sheepback.domain.OrderItems;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Size {

    @Id
    @GeneratedValue
    @Column(name = "size_id")
    private Long id;

    private String size;

    private Long stockQuantity;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "color_id")
    private Color color;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "orderedSize")
    private List<OrderItems> orderItems = new ArrayList<>();

    public void addOrderItem(OrderItems orderItem) {
        this.orderItems.add(orderItem); // 컬렉션 초기화 보장
        orderItem.setOrderedSize(this);
    }

}
