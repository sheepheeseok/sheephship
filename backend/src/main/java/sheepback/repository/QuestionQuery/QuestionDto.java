package sheepback.repository.QuestionQuery;


import lombok.Data;
import sheepback.domain.QuestionStatus;

import java.time.LocalDateTime;

@Data
public class QuestionDto {

    private Long id;
    private String title;
    private String content;
    private String imgUrl;
    private LocalDateTime writeDateTime;
    private QuestionStatus status;

}
