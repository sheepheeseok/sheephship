package sheepback.repository.OrderQuery;

import lombok.Data;

@Data
public class SimpleItemAndCountDto {

    private Long id;
    private Long count;
    private Long colorId;
    private Long sizeId;

}
