package sheepback.Dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReviewResponse {

    private Long reviewId;
    private LocalDateTime writeDate;
    private String title;
    private String content;
    private String imgUrl1;
    private String imgUrl2;
    private String imgUrl3;
    private int likeCount;

}
