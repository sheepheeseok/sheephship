package sheepback.Dtos;

import lombok.Data;

@Data
public class ItemDetailSimpleDto {
    private Long item_detail_id;
    private String color;
    private String size;
    private Long stockQuantity;


}
