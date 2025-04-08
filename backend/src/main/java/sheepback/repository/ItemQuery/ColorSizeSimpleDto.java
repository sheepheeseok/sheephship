package sheepback.repository.ItemQuery;

import lombok.Data;
import org.springframework.stereotype.Repository;
import sheepback.domain.item.Color;
import sheepback.domain.item.Size;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ColorSizeSimpleDto {
    private Long id;
    private String colorName;
    private Long stockQuantity;
    private List<SizeSimpleDto> sizeList;

    public ColorSizeSimpleDto(Color color) {
        this.id = color.getId();
        this.colorName = color.getColor();
        this.stockQuantity = color.getStockQuantity();
        this.sizeList = color.getSizes()
                .stream()
                .map(SizeSimpleDto::new)
                .collect(Collectors.toList());

    }
}
