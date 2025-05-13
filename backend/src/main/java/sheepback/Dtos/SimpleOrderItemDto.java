package sheepback.Dtos;

import lombok.Data;

@Data
public class SimpleOrderItemDto {
    private Long itemId;
    private String color;
    private String size;
    private Long quantity;
    private Long itemDetailId;
}
