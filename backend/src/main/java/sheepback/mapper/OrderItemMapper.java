package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Mapper
public interface OrderItemMapper {
    void saveOrderItem(List<SaveOrderItemDto> orderItemList);
    List<SimpleOrderItemDto> getOrderItembyOrderId(@Param("orderItemId") Long orderItemId, @Param("orderId") List<Long> orderId );
    //List<OrderInquiryItemDto> getOrderInquiryByOrderId(@Param("orderId") Long orderId);
    List<OrderInquiryListDto> getOrderListWithItems(@Param("memberId") String memberId,@Param("startDate") LocalDate startDate,@Param("endDate") LocalDate endDate);

    List<OrderInquiryListDto> getCancelOrderListWithItems(@Param("memberId") String memberId);
    Map<String, Long>selectOrderStatusCounts(@Param("memberId") String memberId,@Param("startDate") LocalDateTime startDate,@Param("endDate") LocalDateTime endDate);
    List<OrderInquiryListDto> getOrderQuo(@Param("memberId") String memberId,@Param("startDate") LocalDateTime startDate,@Param("endDate") LocalDateTime endDate);
}
