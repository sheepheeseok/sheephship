package sheepback.Dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AddCartInfoDto {

    private String memberId;
    private Long itemId;
    private Long count;
    private String size;
    private String color;
    private LocalDateTime addDate;

}
