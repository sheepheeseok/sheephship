package sheepback.controller;


import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import sheepback.domain.Member;
import sheepback.domain.Review;
import sheepback.domain.ReviewAnswer;
import sheepback.repository.ReviewQuery.ReviewAndAnswerDto;
import sheepback.service.ReviewAndAnswerService;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class ReviewApiController {

    private final ReviewAndAnswerService reviewAndAnswerService;


    @PostMapping("/api/AddReview")
    public void AddReview(@RequestBody AddReviewRequest request) {

        Review addreview = new Review();
        addreview.setTitle(request.getTitle());
        addreview.setContent(request.getContent());
        addreview.setWriteDateTime(request.getWriteDateTime());
        addreview.setImgUrl1(request.getImgUrl1());
        addreview.setImgUrl2(request.getImgUrl2());
        addreview.setImgUrl3(request.getImgUrl3());

        reviewAndAnswerService.insertReview(request.getItemId(), request.getMemberId(), addreview);
    }

    @GetMapping("/api/deleteReview/{reviewId}")
    public void DeleteReview(@PathVariable("reviewId") Long reviewId) {
        reviewAndAnswerService.DeleteReview(reviewId);
    }

    @PostMapping("/api/UpdateReview")
    public void UpdateReview(@RequestBody UpdateReviewRequest request) {
       reviewAndAnswerService.UpdateReview(
                request.getId(), request.getTitle(),
                request.getContent(), request.getWriteDateTime(),
                request.getImgUrl1(), request.getImgUrl2(), request.getImgUrl3());

    }

    @PostMapping("api/AddReviewAnswer")
    public void AddReviewAnswer(@RequestBody AddReviewAnswerRequest request){
        ReviewAnswer reviewAnswer = new ReviewAnswer();
        reviewAnswer.setTitle(request.getTitle());
        reviewAnswer.setContent(request.getContent());
        reviewAnswer.setWriteDateTime(request.getWriteDateTime());
        //Admin추가하느거 해야함
        reviewAndAnswerService.insertReviewAnswer(request.getReviewId(),reviewAnswer);
    }

    @GetMapping("/api/deleteReviewAnswer/{answerId}")
    public void DeleteReviewAnswer(@PathVariable("answerId") Long answerId) {
        reviewAndAnswerService.DeleteReviewAnswer(answerId);
    }

    @PostMapping("/api/UpdateReviewAnswer")
    public void UpdateReviewAnswer(@RequestBody UpdateReviewAnswerRequest request){
             reviewAndAnswerService.UpdateReviewAnswer(
                request.getAnswerId(),request.getTitle(),
                request.getContent(),request.getWriteDateTime());

    }

    @PostMapping("/api/getAllReviews")
    public Page<ReviewAndAnswerDto> getAllReviews(@RequestBody getReviewRequest request) {

        Pageable pageable = PageRequest.of(
                request.getPage(),
                request.getSize()
        );

       return reviewAndAnswerService.findAllReviewsByItemId(request.itemId, pageable);
    }


    @Data
    private static class AddReviewRequest {
        private Long itemId;
        private String memberId;
        private String title;
        private String content;
        private LocalDateTime writeDateTime = LocalDateTime.now();
        private String imgUrl1 = null;
        private String imgUrl2 = null;
        private String imgUrl3 = null;
    }

    @Data
    private static class AddReviewAnswerRequest {
        private String title;
        private String content;
        private LocalDateTime writeDateTime = LocalDateTime.now();
        private Long reviewId;
    }

    @Data
    private static class getReviewRequest {
        private Long itemId;
        private int page = 0;
        private int size = 5;
    }

    @Data
    private static class UpdateReviewRequest {
        private Long id;
        private String title;
        private String content;
        private LocalDateTime writeDateTime = LocalDateTime.now();
        private String imgUrl1 = null;
        private String imgUrl2 = null;
        private String imgUrl3 = null;
    }

    @Data
    private static class UpdateReviewAnswerRequest {
        private Long answerId;
        private String title;
        private String content;
        private LocalDateTime writeDateTime = LocalDateTime.now();
    }
}
