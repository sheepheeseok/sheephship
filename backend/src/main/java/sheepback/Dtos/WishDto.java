package sheepback.Dtos;

import lombok.Data;

@Data
public class WishDto {
    private Long itemId;
    private String itemName;
    private String mainUrl;
    private Long price;
    private Long wishId;
}
