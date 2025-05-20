package sheepback.Dtos;

import lombok.Data;
import sheepback.domain.Grade;
import sheepback.domain.Status;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDto {


    private List<OrderItemDetailDto> orderItemDetailDtos;
    private String memberId;
    private String paymentMethod;
    private String requireMents;
    private String firstAddress;
    private String secondAddress;
    private Grade grade;


}