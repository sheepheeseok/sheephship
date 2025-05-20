package sheepback.Dtos;

import lombok.Data;

@Data
public class AddReviewDto {

    private Long itemId;
    private String title;
    private String content;
    private String memberId;
    private String imgUrl1;
    private String imgUrl2;
    private String imgUrl3;
    private int likeCount;
    private Long orderId;


}
