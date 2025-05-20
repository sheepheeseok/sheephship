package sheepback.Dtos;

import lombok.Data;

@Data
public class OrderItemDetailDto {

    private Long quantity;
    private Long itemId;
    private String size;
    private String color;
    private Long resevationId;
}
