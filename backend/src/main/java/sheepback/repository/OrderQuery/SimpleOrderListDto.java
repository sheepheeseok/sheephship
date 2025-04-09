package sheepback.repository.OrderQuery;

import lombok.Data;
import sheepback.domain.DeliveryStatus;

@Data
public class SimpleOrderListDto {

    private String orderId;
    private String mainUrl;
    private String title;
    private DeliveryStatus status;
    private Long count;
    private Long orderPrice;

    public SimpleOrderListDto(String orderId, String mainUrl, String title,
                              DeliveryStatus status, Long count, Long orderPrice) {
        this.orderId = orderId;
        this.mainUrl = mainUrl;
        this.title = title;
        this.status = status;
        this.count = count;
        this.orderPrice = orderPrice;
    }


}
