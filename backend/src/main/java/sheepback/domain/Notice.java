package sheepback.domain;


import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private String id;

    private String title;

    private String content;

    private LocalDateTime writeDateTime;

    private String fileAddress;

    private String img;


}
