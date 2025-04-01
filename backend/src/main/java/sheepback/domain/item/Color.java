package sheepback.domain.item;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.ColumnDefault;

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

    @Builder
    public Color(String color, Long stockQuantity) {
        this.color = color;
        this.stockQuantity = stockQuantity;
    }

    public Color() {

    }
}
