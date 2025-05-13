package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import sheepback.Dtos.SaveDeliveryDto;
import sheepback.domain.Delivery;

@Mapper
public interface DeliveryMapper {
    void addDelivery(SaveDeliveryDto deliveryDto);
}
