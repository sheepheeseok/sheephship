package sheepback.Dtos;

import lombok.Data;

@Data
public class SimpleOrderItemDto {
    private Long itemId;
    private Long quantity;
    private Long itemDetailId;
}
