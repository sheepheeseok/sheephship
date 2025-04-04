package sheepback.domain;


import jakarta.persistence.*;
import lombok.Getter;
import sheepback.domain.item.Item;

import java.time.LocalDateTime;

@Entity
@Getter
public class ItemQuestion {

    @Id
    @GeneratedValue
    @Column(name = "question_id")
    private Long id;

    private String title;

    private String content;

    private String imgUrl;

    private LocalDateTime writeDateTime;


    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_num")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "item_id")
    private Item item;

}
