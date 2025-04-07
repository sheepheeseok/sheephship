package sheepback.repository.QuestionQuery;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuestionAnswerDto {

    private Long id;

    private String title;
    private String content;
    private LocalDateTime writeDateTime;
}
