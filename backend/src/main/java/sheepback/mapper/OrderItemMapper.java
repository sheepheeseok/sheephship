package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.SaveOrderItemDto;

@Mapper
public interface OrderItemMapper {
    void saveOrderItem(SaveOrderItemDto orderItemDto);

}
