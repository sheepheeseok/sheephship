package sheepback.controller;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sheepback.Dtos.AddReviewDto;
import sheepback.Dtos.EditReviewDto;
import sheepback.Dtos.ReviewResponse;
import sheepback.domain.Review;
import sheepback.service.ReviewService;

import java.util.List;

@RestController
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/api/hasPurchased/{memberId}/{itemId}")
    public Long hasPurchased(@PathVariable("memberId") String memberId,@PathVariable("itemId") Long itemId){
        Long b = reviewService.hasPurchased(memberId, itemId);
        return b;
    }

    @GetMapping("/api/myPageHasPurchased/{orderId}")
    public Long myPageHasPurchased(@PathVariable("orderId") Long orderId){
        Long b = reviewService.myPagehasPurchased(orderId);
        return b;
    }

    @PutMapping("/api/addReview")
    public String addReview(@RequestBody AddReviewDto review){
        reviewService.addReview(review);
        return "success add review";
    }
    @DeleteMapping("/api/deleteReview/{reviewId}")
    public String delete(@PathVariable("reviewId") Long reviewId){
        reviewService.deleteReview(reviewId);
        return "success delete";
    }
    @PostMapping("api/editReview")
    public String editReview(@RequestBody EditReviewDto review){
        reviewService.editReview(review);
        return "success update";
    }

    @GetMapping("/api/getReviewList/{itemId}/{page}")
    public ReviewList getReviewList(@PathVariable("itemId") Long itemId, @PathVariable("page") Long page){

        List<ReviewResponse> reviews = reviewService.getReviews(itemId, page);
        Long itemReviewPage = reviewService.getItemReviewPage(itemId);
        ReviewList reviewList = new ReviewList();
        reviewList.setPage(itemReviewPage);
        reviewList.setReviews(reviews);
        return reviewList;
    }

    @Data
    private static class ReviewList {
        private Long page;
        private List<ReviewResponse> reviews;
    }
}
