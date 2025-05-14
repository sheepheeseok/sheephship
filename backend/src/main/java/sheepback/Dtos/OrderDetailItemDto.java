package sheepback.Dtos;

import lombok.Data;

@Data
public class OrderDetailItemDto {

    private Long orderItemId;
    private Long itemId;
    private String itemName;
    private String mainUrl;
    private Long quantity;
    private Long orderPrice;
    private String color;
    private String size;


}
