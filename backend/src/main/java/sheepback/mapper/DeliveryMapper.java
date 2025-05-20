package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.SaveDeliveryDto;
import sheepback.domain.Delivery;
import sheepback.domain.DeliveryStatus;

@Mapper
public interface DeliveryMapper {
    void addDelivery(SaveDeliveryDto deliveryDto);
    void changeDeliveryStatus(@Param("id") Long orderId, @Param("status") DeliveryStatus status);
}
