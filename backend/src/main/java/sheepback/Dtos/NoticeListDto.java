package sheepback.Dtos;

import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Data
public class NoticeListDto {

    private Long noticeId;
    private String title;
    private LocalDateTime writeDateTime;



}
