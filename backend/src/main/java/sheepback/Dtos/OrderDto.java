package sheepback.Dtos;

import lombok.Data;
import sheepback.domain.Grade;
import sheepback.domain.Status;

import java.time.LocalDateTime;

@Data
public class OrderDto {

    private Long quantity;
    private Long itemId;
    private String memberId;
    private String size;
    private String color;
    private String paymentMethod;
    private String requireMents;
    private String firstAddress;
    private String secondAddress;
    private Grade grade;


}