package sheepback.Dtos;

import lombok.Data;

@Data
public class ItemInfo {
    private Long itemId;
    private String itemName;
    private Long price;
    private String mainUrl;
    private Long deliveryFee;
}
