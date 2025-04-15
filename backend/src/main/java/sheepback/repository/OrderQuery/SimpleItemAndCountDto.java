package sheepback.repository.OrderQuery;

import lombok.Data;

@Data
public class SimpleItemAndCountDto {

    private Long id;
    private Long count;
    private Long color_id;
    private Long size_id;

}
