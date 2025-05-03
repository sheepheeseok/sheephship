package sheepback.mapper;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.DeliveryInfoDto;

@Mapper
public interface OrderMapper {
    DeliveryInfoDto getDeliveryInfoByMemberId(@Param("id") String MemberId);


}
