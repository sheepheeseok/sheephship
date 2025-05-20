package sheepback.mapper;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.DeliveryInfoDto;
import sheepback.Dtos.OrderDetailDto;
import sheepback.Dtos.SaveOrderDto;
import sheepback.domain.Status;

import java.util.List;
import java.util.Stack;

@Mapper
public interface OrderMapper {
    DeliveryInfoDto getDeliveryInfoByMemberId(@Param("id") String MemberId);
    void saveOrder(SaveOrderDto saveOrderDto);
    void changeOrderStatus(@Param("id") Long orderId, @Param("status") Status status);
    List<Long> getOrderIdByMemberId(@Param("id") String memberId);
    OrderDetailDto getOrderDetailByOrderId(@Param("orderId") Long orderId);

    Long hasPurchased(@Param("memberId") String memberId, @Param("itemId") Long itemId);


}
