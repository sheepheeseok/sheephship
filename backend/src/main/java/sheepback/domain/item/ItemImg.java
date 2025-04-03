package sheepback.domain.item;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
public class ItemImg {
    @Id
    @GeneratedValue
    @Column(name = "item_img_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "itemImg")
    private Item item;


    private String subUrl1;

    private String subUrl2;

    private String subUrl3;

    private String detailUrl1;

    private String detailUrl2;

    private String detailUrl3;

    private String detailUrl4;


    public ItemImg() {

    }

    @Builder
    public ItemImg(String subUrl1, String subUrl2, String subUrl3, String detailUrl1,
                   String detailUrl2, String detailUrl3, String detailUrl4) {

        this.subUrl1 = subUrl1;
        this.subUrl2 = subUrl2;
        this.subUrl3 = subUrl3;
        this.detailUrl1 = detailUrl1;
        this.detailUrl2 = detailUrl2;
        this.detailUrl3 = detailUrl3;
        this.detailUrl4 = detailUrl4;

    }


}
