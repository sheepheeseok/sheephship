package sheepback.Dtos;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDetailDto {
    private Long orderId;
    private LocalDateTime orderDate;
    private String ordererName;
    private String firstAddress;
    private String secondAddress;
    private String requireMents;
    private Long deliveryFee;
    private List<OrderDetailItemDto> orderDetailItems;

}
