package sheepback.Dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FinalQuestionCreateDto {

    private Long itemId;        // 상품 문의일 경우만 입력
    private String content;
    private String imgUrl;
    private String memberId;
    private String title;
    private String questionType;
    private String answerStatus;
    private LocalDateTime writeDateTime;
}
