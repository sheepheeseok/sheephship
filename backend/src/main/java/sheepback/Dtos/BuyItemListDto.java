package sheepback.Dtos;

import lombok.Data;

@Data
public class BuyItemListDto {

    private Long itemDetailId;
    private Long itemId;
    private String itemName;
    private Long price;
    private String mainUrl;
    private String color;
    private String size;
    private Long stockQuantity;
}
