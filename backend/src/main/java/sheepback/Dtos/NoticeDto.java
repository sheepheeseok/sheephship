package sheepback.Dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NoticeDto {

    private Long noticeId;
    private String title;
    private LocalDateTime writeDateTime;
    private String content;
    private String imgAddress;
    private String fileAddress;


}
