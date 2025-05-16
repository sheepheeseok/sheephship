package sheepback.Dtos;

import lombok.Data;

@Data
public class CartListDto {

    private Long itemId;
    private Long count;
    private String itemName;
    private String mainUrl;
    private Long price;
    private Long itemDetailId;
    private String size;
    private String color;


}
