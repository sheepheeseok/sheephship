package sheepback.Dtos;

import lombok.Data;

@Data
public class ItemDetailSimpleDto {
    private Long itemDetailId;
    private String color;
    private String size;
    private Long stockQuantity;


}
