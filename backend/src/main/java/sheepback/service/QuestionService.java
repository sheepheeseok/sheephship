package sheepback.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sheepback.Dtos.*;
import sheepback.mapper.QuestionMapper;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionMapper questionMapper;

    //상품 문의시 아이템 아이디를 받으면서 상품 문의 작성
    public void createQuestion(QuestionCreateRequest request) {
        FinalQuestionCreateDto question = new FinalQuestionCreateDto();
        question.setItemId(request.getItemId());
        question.setContent(request.getContent());
        question.setImgUrl(request.getImgUrl());
        question.setMemberId(request.getMemberId());
        question.setTitle(request.getTitle());

        // 비즈니스 로직
        if (request.getItemId() != null) {
            question.setQuestionType("ITEM");
        } else {
            question.setQuestionType("CUSTOMER");
        }
        question.setAnswerStatus("WAITING");
        question.setWriteDateTime(LocalDateTime.now());

        questionMapper.insertQuestion(question);
    }
    //상품 문의 삭제 답변이 같이있을경우 답변도 삭제
    public void deleteQuestion(Long questionId) {
        questionMapper.deleteQuestionAnswerByQuestionId(questionId);
        questionMapper.deleteQuestion(questionId);
    }

    //상품 문의 수정
    public boolean updateQuestion(QuestionUpdateRequest request) {
        int result = questionMapper.updateQuestion(request);
        return result == 1; // 1이면 성공, 0이면 실패
    }

    //상품 답변 작성

        public void writeAnswer(QuestionAnswerRequest request) {
            // 이미 답변이 있는지 확인
            if (questionMapper.countByQuestionId(request.getQuestionId()) > 0) {
                throw new IllegalArgumentException("이미 해당 문의에 대한 답변이 존재합니다.");
            }
            questionMapper.changeCompleteAnswerStatus(request.getQuestionId());
            questionMapper.insertQuestionAnswer(request);
        }



    //상품 답변 수정
    public void updateAnswer(QuestionAnswerUpdateRequest request) {
        int updated = questionMapper.updateQuestionAnswer(request);
        if (updated == 0) {
            throw new IllegalArgumentException("해당 답변이 존재하지 않습니다.");
        }
    }

    //상품 답변만 삭제
    public void deleteQuestionAnswer(Long questionAnswerId) {
        Long getquestionId = questionMapper.getquestionIdByAnswerId(questionAnswerId);
        questionMapper.deleteQuestionAnswerById(questionAnswerId);
        questionMapper.changeWaitingAnswerStatus(getquestionId);
    }

    //상품 문의 리스트 답변이 있을시에 답변도 같이 전부다
    public List<ItemQuestionAndAnswerDto> getQuestionAndAnswer(Long itemId){
        List<ItemQuestionAndAnswerDto> questionListByitemId = questionMapper.getQuestionListByitemId(itemId);
        return questionListByitemId;
    }

    //멤버별로 문의리스트
    public List<MemberQuestionListDto> getQuestionListByMemberId(String memberId){
        List<MemberQuestionListDto> dtos =  questionMapper.getQuestionListBymemberId(memberId);
        return dtos;
    }
    //문의 상세
    public MemberQuestionAndAnswerDto getQuestionAndAnswerByquestionId(Long questionId){
        MemberQuestionAndAnswerDto questionAndAnswerByQuestionId = questionMapper.getQuestionAndAnswerByQuestionId(questionId);
        return questionAndAnswerByQuestionId;
    }


}
