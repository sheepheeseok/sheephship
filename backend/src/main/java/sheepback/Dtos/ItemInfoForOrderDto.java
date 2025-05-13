package sheepback.Dtos;

import lombok.Data;

@Data
public class ItemInfoForOrderDto {

    private Long itemDetailId;
    private Long itemId;
    private String itemName;
    private Long price;


}
