package sheepback.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class RouteFind {

    @Id
    @Column(name = "route_id")
    private String id;

    private String sector;

    private String link;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "center_id")
    private Center center;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "admin_id")
    private Admin admin;
}
