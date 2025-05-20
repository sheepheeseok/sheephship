package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.*;

import java.util.List;

@Mapper
public interface QuestionMapper {
        void insertQuestion(FinalQuestionCreateDto question);

    void deleteQuestion(@Param("questionId") Long questionId);
    void deleteQuestionAnswerByQuestionId(@Param("questionId") Long questionId);
    void deleteQuestionAnswerById(@Param("questionAnswerId") Long questionAnswerId);
        int updateQuestion(QuestionUpdateRequest request); // 성공 시 1 반환
    int insertQuestionAnswer(QuestionAnswerRequest request);
    // 이미 답변이 있는지 확인 (question_id는 unique)
    int countByQuestionId(@Param("questionId") Long questionId);
    int updateQuestionAnswer(QuestionAnswerUpdateRequest request);

    void changeCompleteAnswerStatus(@Param("questionId") Long questionId);
    void changeWaitingAnswerStatus(@Param("questionId") Long questionId);

    Long getquestionIdByAnswerId(@Param("questionAnswerId") Long questionAnswerId);

    List<ItemQuestionAndAnswerDto> getQuestionListByitemId(@Param("itemId") Long itemId);

    List<MemberQuestionListDto> getQuestionListBymemberId(@Param("memberId")String memberId);

    MemberQuestionAndAnswerDto getQuestionAndAnswerByQuestionId(@Param("questionId") Long questionId);
}
