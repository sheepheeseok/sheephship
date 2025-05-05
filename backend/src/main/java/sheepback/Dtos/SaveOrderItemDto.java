package sheepback.Dtos;

import lombok.Data;

@Data
public class SaveOrderItemDto {
    private Long orderId;
    private Long itemId;
    private Long orderPrice;
    private Long quantity;
}
