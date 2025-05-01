package sheepback.Dtos;

import lombok.Data;

@Data
public class ItemListByCategoryDto {
    private Long itemId;
    private String name;
    private Long price;
    private String mainUrl;

}
