package sheepback.Dtos;

import lombok.Data;
import sheepback.domain.Status;

import java.time.LocalDateTime;

@Data
public class SaveOrderDto {

    private Long orderId;
    private String memberId;
    private LocalDateTime orderDate;
    private String paymentMethod;
    private Status status;
    private String requireMents;


}
