package sheepback.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sheepback.Dtos.AddReviewDto;
import sheepback.Dtos.EditReviewDto;
import sheepback.Dtos.ReviewResponse;
import sheepback.domain.Review;
import sheepback.mapper.OrderMapper;
import sheepback.mapper.ReviewMapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewMapper reviewMapper;
    @Autowired
    private OrderMapper orderMapper;

    //리뷰 아이템 구매 여부
    public Long hasPurchased(String memberId, Long itemId){
        Long l = orderMapper.hasPurchased(memberId, itemId);
        return l;
    }

    //마이페이지에서 리뷰 작성하기 버튼 클릭시 구매여부
    public Long myPagehasPurchased(Long orderId){
        Long l = reviewMapper.mypagehasPurchased(orderId);
        return l;
    }



    //리뷰 작성 기능
    public void addReview(AddReviewDto reviewDto) {
        LocalDateTime localDate = LocalDateTime.now();
        reviewMapper.addReview(reviewDto, localDate);
    }

    //리뷰 삭제 기능
    public void deleteReview(Long reviewId) {
        reviewMapper.deleteReview(reviewId);
    }

    //리뷰 수정 기능
    public void editReview(EditReviewDto reviewDto) {
        reviewMapper.editReview(reviewDto);
    }


    //리뷰 리스트 보여주는 기능 페이지 네이션 리뷰 리스트만 일단 보여주기 리뷰 답변과 매칭해서 보여주는 기능
    public List<ReviewResponse> getReviews(Long itemId, Long page){
        page = (page - 1) * 10;
        List<ReviewResponse> reviewList = reviewMapper.getReviewList(itemId, 10, page);
        return reviewList;
    }
    public Long getItemReviewPage(Long itemId){
        Long itemReviewPagesize = reviewMapper.getItemReviewPagesize(itemId);
        if(itemReviewPagesize / 10 == 0){
            itemReviewPagesize = itemReviewPagesize / 10;
        }else{
            itemReviewPagesize = itemReviewPagesize / 10 + 1;
        }
        return itemReviewPagesize;
    }


    //리뷰 답변 작성 기능 답변기능 넣자면 넣기


    //리뷰 답변 삭제 기능

}
