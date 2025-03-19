package sheepback.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Center {

    @Id
    @Column(name = "center_id")
    private String id;

    private String name;

    private String repImg;

    private String content;

    private String phonenumber;

    private String address;

    private String priceImg;

    @Embedded
    private BusinessHours businessHours;

    private String img1;

    private String img2;

    private String img3;

    private String img4;

    private String img5;

    private String img6;

    private String img7;

    private String gradeImg;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "admin_id")
    private Admin admin;

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RouteFind> routeFinds = new ArrayList<>();
}
