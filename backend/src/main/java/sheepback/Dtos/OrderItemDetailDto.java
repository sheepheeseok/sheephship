package sheepback.Dtos;

import lombok.Data;

@Data
public class OrderItemDetailDto {

    private Long itemDetailId;
    private Long quantity;
    private Long itemId;
    private String size;
    private String color;
}
