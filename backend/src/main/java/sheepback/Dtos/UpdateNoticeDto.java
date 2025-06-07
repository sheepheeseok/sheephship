package sheepback.Dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateNoticeDto {

    private String title;
    private String content;
    private String fileAddress;
    private String imgAddress;


}
