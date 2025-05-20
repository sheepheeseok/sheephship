package sheepback.Dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ItemQuestionAndAnswerDto {

    private Long questionId;
    private LocalDateTime writeDateTime;
    private String title;
    private String content;
    private String imgUrl;
    private String memberId;
    private String questionType;
    private String answerStatus;

    private Long answerQuestionId;
    private Long questionAnswerId;
    private LocalDateTime answerWriteDateTime;
    private String adminId;
    private String answerTitle;
    private String answerContent;


}
