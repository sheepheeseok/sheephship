package sheepback.Dtos;

import lombok.Data;

@Data
public class QuestionAnswerUpdateRequest {

    private Long questionAnswerId; // PK로 수정할 행 지정
    private String content;
    private String title;
    private String adminId;
}
