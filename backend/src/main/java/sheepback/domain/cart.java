package sheepback.domain;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import sheepback.domain.item.Item;

import java.time.LocalDate;

@Entity
@Getter
@DynamicInsert
public class cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long id;

    @ColumnDefault("1")
    private Long count;

    private LocalDate addDate;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_num")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "item_id")
    private Item item;


}
