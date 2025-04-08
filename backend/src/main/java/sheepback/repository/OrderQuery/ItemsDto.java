package sheepback.repository.OrderQuery;

import lombok.Data;

@Data
public class ItemsDto {
    private Long itemId;
    private Long count;
    private Long colorId;
    private Long sizeId;
    private Long orderPrice;
}
