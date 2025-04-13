package sheepback.repository.QuestionQuery;

import lombok.Data;
import sheepback.domain.ItemQuestion;
import sheepback.domain.QuestionAnswer;
import sheepback.domain.QuestionStatus;

import java.time.LocalDateTime;

@Data
public class QuestionAndAnswerDto {



    private Long id;
    private String title;
    private String content;
    private String imgUrl;
    private LocalDateTime writeDateTime;
    private QuestionStatus status;

    private Long Answerid;
    private String Answertitle;
    private String Answercontent;
    private LocalDateTime AnswerwriteDateTime;


    public QuestionAndAnswerDto(ItemQuestion itemQuestion) {
        this.id = itemQuestion.getId();
        this.title = itemQuestion.getTitle();
        this.content = itemQuestion.getContent();
        this.imgUrl = itemQuestion.getImgUrl();
        this.writeDateTime = itemQuestion.getWriteDateTime();
        this.status = itemQuestion.getStatus();
        Answerid = itemQuestion.getQuestionAnswers().getId();
        Answertitle = itemQuestion.getQuestionAnswers().getTitle();
        Answercontent = itemQuestion.getQuestionAnswers().getContent();
        AnswerwriteDateTime = itemQuestion.getQuestionAnswers().getWriteDateTime();
    }

}
