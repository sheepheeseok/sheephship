package sheepback.domain.item;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import sheepback.domain.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@DynamicInsert
public class Item {

    @Id
    @GeneratedValue
    @Column(name = "item_id")
    private Long id;//상품 고유번호

    private String produce;//제조업체명

    private String name;

    private LocalDateTime created;

    private Long deliveryFee;


    @NotNull
    @ColumnDefault("0")
    private Long price;

    private String contents;

    private String mainUrl;

    private Long salesVolume;


    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "item")
    private List<Color> colors = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItems> orderItems = new ArrayList<>();;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "item_img_id")
    private ItemImg itemImg;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ItemCategory> categories = new ArrayList<>();


    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Wish> wishes = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ItemQuestion> itemQuestions = new ArrayList<>();

    @Builder
    public Item(String produce, String name, Long price, String mainUrl,
                String contents, Long deliveryFee) {
        this.produce = produce;
        this.name = name;
        this.salesVolume = 0L;
        this.price = price;
        this.mainUrl = mainUrl;
        this.created = LocalDateTime.now();
        this.deliveryFee = deliveryFee;
        this.contents = contents;
    }

    public Item() {

    }

    public void addOrderItem(OrderItems orderItem) {
        this.orderItems.add(orderItem); // 컬렉션 초기화 보장
        orderItem.setItem(this);
    }


}
