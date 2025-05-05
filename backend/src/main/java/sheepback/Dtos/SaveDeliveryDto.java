package sheepback.Dtos;

import lombok.Data;
import sheepback.domain.DeliveryStatus;

@Data
public class SaveDeliveryDto {
    private Long orderId;
    private String firstAddress;
    private String secondAddress;
    private DeliveryStatus deliveryStatus;
}
