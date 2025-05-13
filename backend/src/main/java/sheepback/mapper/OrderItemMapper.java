package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.SaveOrderItemDto;
import sheepback.Dtos.SimpleOrderItemDto;

import java.util.List;

@Mapper
public interface OrderItemMapper {
    void saveOrderItem(List<SaveOrderItemDto> orderItemList);
    SimpleOrderItemDto getOrderItembyOrderId(@Param("orderItemId") Long orderItemId, @Param("orderId") Long orderId );
}
