package sheepback.Dtos;

import lombok.Data;

import java.util.List;

@Data
public class ChainCenterListDto {
    private Long chainCenterId;
    private String chainName;
    private List<CenterDto> centers;

}
