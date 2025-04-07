package sheepback.repository.ReviewQuery;

import lombok.Data;
import sheepback.domain.Review;

import java.time.LocalDateTime;

@Data
public class ReviewAndAnswerDto {

    private Long id;
    private String title;
    private String content;
    private LocalDateTime writeDateTime;

    private String imageUrl1;
    private String imageUrl2;
    private String imageUrl3;

    private Long reviewAnswerId;
    private String AnswerTitle;
    private String AnswerContent;
    private LocalDateTime AnswerWriteDateTime;


    public ReviewAndAnswerDto(Review review) {
        this.id = review.getId();
        this.title = review.getTitle();
        this.content = review.getContent();
        this.writeDateTime = review.getWriteDateTime();
        this.imageUrl1 = review.getImgUrl1();
        this.imageUrl2 = review.getImgUrl2();
        this.imageUrl3 = review.getImgUrl3();
        this.reviewAnswerId = review.getReviewAnswer().getReviewAnswerId();
        this.AnswerTitle = review.getReviewAnswer().getTitle();
        this.AnswerContent = review.getReviewAnswer().getContent();
        this.AnswerWriteDateTime = review.getReviewAnswer().getWriteDateTime();
    }
}
