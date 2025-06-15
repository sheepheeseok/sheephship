package sheepback.service;

import lombok.Data;

@Data
public class RecentItemDto {

    private Long itemId;
    private String name;
    private Long price;
    private String mainUrl;
    private String produce;

}
