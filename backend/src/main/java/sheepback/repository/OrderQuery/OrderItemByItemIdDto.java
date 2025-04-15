package sheepback.repository.OrderQuery;

import lombok.Data;

@Data
public class    OrderItemByItemIdDto {
    private Long itemId;
    private String name;
    private String mainUrl;
    private Long count;           // 나중에 setter로 설정
    private Long orderItemPrice;  // 나중에 setter로 설정
    private Long colorId;
    private Long sizeId;
    private Long itemPrice;
    private String size;
    private String color;

    // count와 orderItemPrice는 생성자에서 제외
    public OrderItemByItemIdDto(Long itemId, String name, String mainUrl, Long itemPrice, Long colorId, Long sizeId, String color, String size) {
        this.itemId = itemId;
        this.name = name;
        this.mainUrl = mainUrl;
        this.itemPrice = itemPrice;
        this.colorId = colorId;
        this.sizeId = sizeId;
        this.color = color;
        this.size = size;
    }
}
