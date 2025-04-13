package sheepback.domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import sheepback.domain.item.Item;
import sheepback.repository.QuestionAnswerRepository;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter @Setter
public class ItemQuestion {

    @Id
    @GeneratedValue
    @Column(name = "question_id")
    private Long id;

    private String title;

    private String content;

    private String imgUrl;

    private LocalDateTime writeDateTime;

    private QuestionStatus status;


    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "itemQuestion")
    private QuestionAnswer questionAnswers;


    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_num")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "item_id")
    private Item item;

}
