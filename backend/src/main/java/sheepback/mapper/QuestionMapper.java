package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.FinalQuestionCreateDto;
import sheepback.Dtos.QuestionAnswerRequest;
import sheepback.Dtos.QuestionAnswerUpdateRequest;
import sheepback.Dtos.QuestionUpdateRequest;

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
}
