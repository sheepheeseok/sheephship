package sheepback.Dtos;

import lombok.Data;

@Data
public class QuestionAnswerRequest {

        private Long questionId;
        private String adminId;
        private String content;
        private String title;

}
