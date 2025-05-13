package sheepback.controller;


import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import sheepback.domain.Review;
import sheepback.domain.ReviewAnswer;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class ReviewApiController {






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
