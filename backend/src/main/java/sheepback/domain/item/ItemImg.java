package sheepback.domain.item;

import jakarta.persistence.*;
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

    private String mainUrl;

    private String subUrl1;

    private String subUrl2;

    private String subUrl3;

    private String detailUrl1;

    private String detailUrl2;

    private String detailUrl3;

    private String detailUrl4;

    private String detailUrl5;



}
