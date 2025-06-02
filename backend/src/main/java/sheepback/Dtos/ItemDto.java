package sheepback.Dtos;

import lombok.Data;
import sheepback.domain.item.Item;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ItemDto {

    public ItemDto() {

    }

    public ItemDto(Long itemId, String name, String produce,
                   LocalDateTime created, Long price,
                   String mainUrl, Long salesVolume, String contents,
                   List<ItemDetailSimpleDto> colors, ItemImgSimpleDto image) {
        this.itemId = itemId;
        this.name = name;
        this.produce = produce;
        this.created = created;
        this.price = price;
        this.mainUrl = mainUrl;
        this.salesVolume = salesVolume;
        this.contents = contents;
        this.colors = colors;
        this.image = image;
    }

    private Long itemId;
    private String name;
    private String produce;
    private LocalDateTime created;
    private Long price;
    private String mainUrl;
    private Long salesVolume;
    private String contents;
    private List<ItemDetailSimpleDto> colors;
    private ItemImgSimpleDto image;


}
