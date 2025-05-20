package sheepback.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sheepback.Dtos.*;
import sheepback.service.QuestionService;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;

    // 1. 문의 작성
    @PostMapping("/add")
    public ResponseEntity<String> createQuestion(@RequestBody QuestionCreateRequest request) {
        questionService.createQuestion(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("문의가 등록되었습니다.");
    }

    // 2. 문의 삭제 (답변 함께 삭제)
    @DeleteMapping("/deleteQuestion/{questionId}")
    public ResponseEntity<String> deleteQuestion(@PathVariable("questionId") Long questionId) {
        questionService.deleteQuestion(questionId);
        return ResponseEntity.ok("문의가 삭제되었습니다.");
    }

    // 3. 문의 수정
    @PutMapping("/updateQuestion/{questionId}")
    public ResponseEntity<String> updateQuestion(
            @PathVariable("questionId") Long questionId,
            @RequestBody QuestionUpdateRequest request
    ) {
        request.setQuestionId(questionId);
        boolean success = questionService.updateQuestion(request);
        return success
                ? ResponseEntity.ok("수정 성공")
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("문의를 찾을 수 없습니다.");
    }

    // 4. 답변 작성
    @PostMapping("/answers/add")
    public ResponseEntity<String> writeAnswer(@RequestBody QuestionAnswerRequest request) {
        questionService.writeAnswer(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("답변이 등록되었습니다.");
    }

    // 5. 답변 수정
    @PutMapping("/answers/updateAnswer/{questionAnswerId}")
    public ResponseEntity<String> updateAnswer(
            @PathVariable("questionAnswerId") Long questionAnswerId,
            @RequestBody QuestionAnswerUpdateRequest request
    ) {
        request.setQuestionAnswerId(questionAnswerId);
        questionService.updateAnswer(request);
        return ResponseEntity.ok("답변이 수정되었습니다.");
    }

    // 6. 답변 삭제
    @DeleteMapping("/answers/deleteAnswer/{questionAnswerId}")
    public ResponseEntity<String> deleteQuestionAnswer(@PathVariable("questionAnswerId") Long questionAnswerId) {
        questionService.deleteQuestionAnswer(questionAnswerId);
        return ResponseEntity.ok("답변이 삭제되었습니다.");
    }

    // 1. 상품별 문의 리스트 + 답변 (답변이 있으면 포함)
    @GetMapping("/item/{itemId}")
    public List<ItemQuestionAndAnswerDto> getQuestionAndAnswerByItemId(@PathVariable("itemId") Long itemId) {
        return questionService.getQuestionAndAnswer(itemId);
    }

    // 2. 멤버별 문의 리스트
    @GetMapping("/member/{memberId}")
    public List<MemberQuestionListDto> getQuestionListByMemberId(@PathVariable("memberId") String memberId) {
        return questionService.getQuestionListByMemberId(memberId);
    }

    // 3. 문의 상세 (문의+답변)
    @GetMapping("/member/Detailed/{questionId}")
    public MemberQuestionAndAnswerDto getQuestionAndAnswerByQuestionId(@PathVariable("questionId") Long questionId) {
        return questionService.getQuestionAndAnswerByquestionId(questionId);
    }

    // 예외 핸들러
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleException(IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

}