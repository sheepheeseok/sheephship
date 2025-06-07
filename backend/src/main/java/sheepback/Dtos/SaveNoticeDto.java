package sheepback.Dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SaveNoticeDto {

    private String title;
    private String content;
    private LocalDateTime writeDateTime;
    private String fileAddress;
    private String imgAddress;



}
