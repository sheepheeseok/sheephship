package sheepback.Dtos;

import lombok.Data;

import java.util.List;

@Data
public class CancelReserveRequest {
    private Long resevationId;
    private Long quantity;
}
