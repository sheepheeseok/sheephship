package sheepback.Dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StockReservation {

    private Long reservationId;
    private Long itemDetailId;
    private String memberId;
    private Long quantity;
    private LocalDateTime expireAt;
    private String status;
}
