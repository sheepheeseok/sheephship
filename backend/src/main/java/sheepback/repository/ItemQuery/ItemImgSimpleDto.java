package sheepback.repository.ItemQuery;

import lombok.Data;
import sheepback.domain.item.ItemImg;

@Data
public class ItemImgSimpleDto {
    public ItemImgSimpleDto(ItemImg itemImg) {
        this.id = itemImg.getId();
        this.subUrl1 = itemImg.getSubUrl1();
        this.subUrl2 = itemImg.getSubUrl2();
        this.subUrl3 = itemImg.getSubUrl3();
        this.detailUrl1 = itemImg.getDetailUrl1();
        this.detailUrl2 = itemImg.getDetailUrl2();
        this.detailUrl3 = itemImg.getDetailUrl3();
        this.detailUrl4 = itemImg.getDetailUrl4();
    }

    private Long id;
    private String subUrl1;
    private String subUrl2;
    private String subUrl3;
    private String detailUrl1;
    private String detailUrl2;
    private String detailUrl3;
    private String detailUrl4;



}
