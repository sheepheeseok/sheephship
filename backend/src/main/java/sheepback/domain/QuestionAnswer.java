package sheepback.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class QuestionAnswer {

    @Id
    @GeneratedValue
    @Column(name = "question_answer_id")
    private Long id;

    private String title;
    private String content;
    private LocalDateTime writeDateTime;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "admin_id")
    private Admin admin;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "question_id")
    private ItemQuestion itemQuestion;
}
