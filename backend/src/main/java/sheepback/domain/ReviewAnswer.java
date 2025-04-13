package sheepback.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class ReviewAnswer {
    @Id
    @GeneratedValue
    @Column(name = "review_answer_id")
    private Long reviewAnswerId;

    private String title;

    private String content;

    private LocalDateTime writeDateTime;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "review_id")
    private Review review;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id")
    private Admin admin;

}