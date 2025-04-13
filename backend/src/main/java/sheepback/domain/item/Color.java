package sheepback.domain.item;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.ColumnDefault;
import sheepback.domain.OrderItems;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Color {

    @Id
    @GeneratedValue
    @Column(name = "color_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "item_id")
    private Item item;

    @NotNull
    private String color;

    @NotNull
    @ColumnDefault("0")
    private Long stockQuantity;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "color")
    private List<Size> sizes  = new ArrayList<>();


    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "selectedColor")
    private List<OrderItems> orderItems = new ArrayList<>();




    @Builder
    public Color(String color, Long stockQuantity) {
        this.color = color;
        this.stockQuantity = stockQuantity;
    }

    public Color() {

    }
    public void addOrderItem(OrderItems orderItem) {
        this.orderItems.add(orderItem); // 컬렉션 초기화 보장
        orderItem.setSelectedColor(this);
    }
}
