package sheepback.Dtos;

import lombok.Data;

import java.util.List;

@Data
public class StockReserveRequest {
    private Long itemDetailId;
    private String  memberId;
    private Long quantity;
}
