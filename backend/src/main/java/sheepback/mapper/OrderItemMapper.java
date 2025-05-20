package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.OrderInquiryItemDto;
import sheepback.Dtos.OrderInquiryListDto;
import sheepback.Dtos.SaveOrderItemDto;
import sheepback.Dtos.SimpleOrderItemDto;

import java.util.List;

@Mapper
public interface OrderItemMapper {
    void saveOrderItem(List<SaveOrderItemDto> orderItemList);
    List<SimpleOrderItemDto> getOrderItembyOrderId(@Param("orderItemId") Long orderItemId, @Param("orderId") List<Long> orderId );
    //List<OrderInquiryItemDto> getOrderInquiryByOrderId(@Param("orderId") Long orderId);
    List<OrderInquiryListDto> getOrderListWithItems(@Param("memberId") String memberId);
}
