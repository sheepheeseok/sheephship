package sheepback.Dtos;

import lombok.Data;

@Data
public class QuestionUpdateRequest {
    private Long questionId;      // 수정할 문의의 PK
    private String title;         // 제목
    private String content;       // 내용
    private String imgUrl;        // 이미지 URL
}
