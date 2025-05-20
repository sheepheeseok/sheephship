package sheepback.Dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MemberQuestionListDto {

    private Long questionId;
    private LocalDateTime writeDateTime;
    private String title;
    private String memberId;
    private String answerStatus;
    private Long itemId;



}
