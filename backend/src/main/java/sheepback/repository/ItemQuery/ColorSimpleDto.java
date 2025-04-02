package sheepback.repository.ItemQuery;

import lombok.Data;
import sheepback.domain.item.Color;

@Data
public class ColorSimpleDto {
    private Long id;
    private String colorName;
    private Long stockQuantity;

    public ColorSimpleDto(Color color) {
        this.id = color.getId();
        this.colorName = color.getColor();
        this.stockQuantity = color.getStockQuantity();
    }

}
