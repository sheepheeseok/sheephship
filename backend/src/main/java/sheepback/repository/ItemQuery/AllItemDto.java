package sheepback.repository.ItemQuery;

import lombok.Data;
import sheepback.domain.item.ItemImg;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class AllItemDto {



    private Long id;
    private String name;
    private String produce;
    private LocalDateTime created;
    private Long price;
    private Long deliveryFee;
    private String mainUrl;
    private Long salesVolume;
    private List<ColorSimpleDto> colors;
    ItemImgSimpleDto itemImg;

    public AllItemDto(Long id, String name, String produce, LocalDateTime created,
                      Long price, Long deliveryFee, String mainUrl,
                      Long salesVolume, List<ColorSimpleDto> colors, ItemImgSimpleDto itemImg) {
        this.id = id;
        this.name = name;
        this.produce = produce;
        this.created = created;
        this.price = price;
        this.deliveryFee = deliveryFee;
        this.mainUrl = mainUrl;
        this.salesVolume = salesVolume;
        this.colors = colors;
        this.itemImg = itemImg;
    }





}
