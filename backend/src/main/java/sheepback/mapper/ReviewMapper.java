package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.AddReviewDto;
import sheepback.Dtos.EditReviewDto;
import sheepback.Dtos.ReviewResponse;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface ReviewMapper {
    void addReview(@Param("Dto") AddReviewDto reviewDto, @Param("addDate") LocalDateTime addDate);
    Long mypagehasPurchased(@Param("orderId") Long orderId);

    void deleteReview(@Param("reviewId") Long reviewId);

    void editReview(EditReviewDto reviewDto);

    List<ReviewResponse> getReviewList(@Param("itemId") Long itemId, @Param("limit") int i,@Param("offset") Long page);

    Long getItemReviewPagesize(@Param("itemId") Long itemId);
}
