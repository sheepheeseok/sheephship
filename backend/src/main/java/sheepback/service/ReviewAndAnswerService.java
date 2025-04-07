package sheepback.service;


import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sheepback.domain.Member;
import sheepback.domain.Review;
import sheepback.domain.ReviewAnswer;
import sheepback.domain.item.Item;
import sheepback.repository.ItemRepository;
import sheepback.repository.MemberRepository;
import sheepback.repository.ReviewAnswerRepository;
import sheepback.repository.ReviewQuery.ReviewAndAnswerDto;
import sheepback.repository.ReviewRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewAndAnswerService {

    private final ReviewRepository reviewRepository;
    private final ReviewAnswerRepository reviewAnswerRepository;
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void insertReview(Long itemId, String memberId, Review review) {
        Member member = memberRepository.findbyId(memberId);
        Item item = itemRepository.findById(itemId);
        review.setMember(member);
        review.setItem(item);
        reviewRepository.save(review);
    }
    @Transactional
    public void DeleteReview(Long reviewId) {
        // 부모 엔티티 조회
        Review review = reviewRepository.findById(reviewId);


        // 자식 엔티티가 존재하는지 확인하고 삭제
        if (review.getReviewAnswer() != null) {
            ReviewAnswer reviewAnswer = reviewAnswerRepository.findById(review.getReviewAnswer().getReviewAnswerId());
            reviewAnswerRepository.delete(reviewAnswer);
        }

        // 부모 엔티티 삭제
        reviewRepository.delete(review);
    }
    @Transactional
    public void UpdateReview(Long id, String title, String content,
                               LocalDateTime UpdateDateTime, String imageUrl1,
                               String imageUrl2, String imageUrl3) {

        Review review = reviewRepository.findById(id);

        review.setTitle(title);
        review.setContent(content);
        review.setWriteDateTime(UpdateDateTime);
        review.setImgUrl1(imageUrl1);
        review.setImgUrl2(imageUrl2);
        review.setImgUrl3(imageUrl3);

    }

    public Review findReviewById(Long id) {
        Review review = reviewRepository.findById(id);
        return review;
    }
    @Transactional
    public void insertReviewAnswer(Long reviewId, ReviewAnswer reviewAnswer) {
        reviewAnswer.setReview(reviewRepository.findById(reviewId));
        reviewAnswerRepository.save(reviewAnswer);
    }
    @Transactional
    public void DeleteReviewAnswer(Long reviewAnswerId) {
        ReviewAnswer reviewAnswer = reviewAnswerRepository.findById(reviewAnswerId);
        reviewAnswerRepository.delete(reviewAnswer);
    }
    @Transactional
    public void UpdateReviewAnswer(Long id, String title, String content,
                                           LocalDateTime UpdateDateTime) {
        ReviewAnswer reviewAnswer = reviewAnswerRepository.findById(id);
        reviewAnswer.setTitle(title);
        reviewAnswer.setContent(content);
        reviewAnswer.setWriteDateTime(UpdateDateTime);
    }

    public Page<ReviewAndAnswerDto> findAllReviewsByItemId(Long itemId, Pageable pageable) {

        List<ReviewAndAnswerDto> reviewAndAnswerDtos = reviewRepository.findAll(itemId, pageable);
        Long total = reviewRepository.countAll(itemId);

        return new PageImpl<>(reviewAndAnswerDtos, pageable, total);



    }


}
