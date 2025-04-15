package sheepback.repository.OrderQuery;

import lombok.Data;
import sheepback.domain.DeliveryStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class SimpleOrderListDto {

    private Long orderId;
    private String mainUrl;
    private String title;
    private DeliveryStatus status;
    private Long count;
    private Long orderPrice;
    private LocalDate date;
    private Long orderItemId;


    public SimpleOrderListDto(Long orderId, String mainUrl, String title,
                              DeliveryStatus status, LocalDateTime orderDate,
                              Long count, Long orderPrice, Long orderItemId) {
        this.orderId = orderId; // Long을 String으로 변환
        this.mainUrl = mainUrl;
        this.title = title;
        this.status = status;
        this.date = orderDate.toLocalDate();
        this.count = count;
        this.orderPrice = orderPrice;
        this.orderItemId = orderItemId;
    }
}
