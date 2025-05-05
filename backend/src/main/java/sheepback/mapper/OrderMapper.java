package sheepback.mapper;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.DeliveryInfoDto;
import sheepback.Dtos.SaveOrderDto;

@Mapper
public interface OrderMapper {
    DeliveryInfoDto getDeliveryInfoByMemberId(@Param("id") String MemberId);
    void saveOrder(SaveOrderDto saveOrderDto);

}
