package sheepback.Dtos;

import lombok.Data;

@Data
public class OrderInquiryItemDto {

    private Long orderItemId;
    private Long quantity;
    private Long itemDetailId;
    private Long itemId;
    private Long orderPrice;
    private String name;
    private String mainUrl;

}
