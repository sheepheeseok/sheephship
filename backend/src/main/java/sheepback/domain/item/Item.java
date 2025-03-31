package sheepback.domain.item;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import sheepback.domain.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicInsert
public class Item {

    @Id
    @GeneratedValue
    @Column(name = "item_id")
    private Long id;//상품 고유번호

    private String produce;//제조업체명

    private String name;

    @NotNull
    @ColumnDefault("0")
    private Long stockQuantity;

    @NotNull
    @ColumnDefault("0")
    private Long price;

    private String mainUrl;


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
    public Item(String produce, String name, Long stockQuantity, Long price, String mainUrl) {
        this.produce = produce;
        this.name = name;
        this.stockQuantity = stockQuantity;
        this.price = price;
        this.mainUrl = mainUrl;

    }

    public Item() {

    }
}
