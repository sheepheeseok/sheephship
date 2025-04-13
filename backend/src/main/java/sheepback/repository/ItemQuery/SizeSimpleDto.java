package sheepback.repository.ItemQuery;

import lombok.Data;
import sheepback.domain.item.Size;

@Data
public class SizeSimpleDto {
    private Long sizeId;
    private String size;
    private Long stockQuantity;

    public SizeSimpleDto(Size size) {
        this.sizeId = size.getId();
        this.size = size.getSize();
        this.stockQuantity = size.getStockQuantity();

    }

}
