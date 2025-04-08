package sheepback.repository.ItemQuery;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class HasSizeItemDto {


    private Long id;
    private String name;
    private String produce;
    private LocalDateTime created;
    private Long price;
    private Long deliveryFee;
    private String mainUrl;
    private Long salesVolume;
    private String contents;
    private List<ColorSizeSimpleDto> colors;
    ItemImgSimpleDto itemImg;

    public HasSizeItemDto(Long id, String name, String produce, String contents, LocalDateTime created,
                            Long price, Long deliveryFee, String mainUrl,
                            Long salesVolume, List<ColorSizeSimpleDto> colors, ItemImgSimpleDto itemImg) {
        this.id = id;
        this.name = name;
        this.produce = produce;
        this.contents = contents;
        this.created = created;
        this.price = price;
        this.deliveryFee = deliveryFee;
        this.mainUrl = mainUrl;
        this.salesVolume = salesVolume;
        this.colors = colors;
        this.itemImg = itemImg;
    }


}
