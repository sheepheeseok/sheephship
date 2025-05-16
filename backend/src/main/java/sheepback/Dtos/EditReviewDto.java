package sheepback.Dtos;

import lombok.Data;

@Data
public class EditReviewDto {
    private Long reviewId;
    private String title;
    private String content;
    private String imgUrl1;
    private String imgUrl2;
    private String imgUrl3;


}
