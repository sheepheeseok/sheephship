package sheepback.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Center {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "center_id")
    private String id;

    private String name;

    private String repImg;

    private String content;

    private String phonenumber;

    private String address;

    @Embedded
    private BusinessHours businessHours;

    private String img1;


    private String gradeImg;

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RouteFind> routeFinds = new ArrayList<>();
}
