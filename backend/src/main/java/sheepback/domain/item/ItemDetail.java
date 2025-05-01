    package sheepback.domain.item;

    import jakarta.persistence.*;
    import lombok.Getter;
    import lombok.Setter;

    @Entity
    @Getter @Setter
    public class ItemDetail {
        @Id
        @GeneratedValue
        @Column(name = "ItemDetail_id")
        private Long id;

        @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
        @JoinColumn(name = "item_id")
        private Item item;

        private String Color;

        private String size;

        private Long StockQuantity;



    }
