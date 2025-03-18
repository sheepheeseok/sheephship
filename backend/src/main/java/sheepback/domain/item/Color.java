package sheepback.domain.item;

import jakarta.persistence.*;
import lombok.Getter;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Getter
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
}
