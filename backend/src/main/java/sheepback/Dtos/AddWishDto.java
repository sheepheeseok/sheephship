package sheepback.Dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AddWishDto {

    private LocalDateTime addWishDate;
    private Long itemId;
    private String memberId;


}
