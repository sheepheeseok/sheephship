package sheepback.Dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuestionCreateRequest {
    private Long itemId;        // 상품 문의일 경우만 입력
    private String content;
    private String imgUrl;
    private String memberId;
    private String title;


    // questionType, answerStatus, writeDateTime은 서버에서 처리
}