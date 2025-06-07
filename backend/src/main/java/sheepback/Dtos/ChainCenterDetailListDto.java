package sheepback.Dtos;

import lombok.Data;

import java.util.List;

@Data
public class ChainCenterDetailListDto {
    private Long chainCenterId;
    private String chainName;
    List<SimpleCenterDtos> simpleCenterDtos;
}
