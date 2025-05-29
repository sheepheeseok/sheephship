package sheepback.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Admin {

    @Id
    @Column(name = "admin_id")
    private String id;

    private String password;

    private String name;

    private AUTHORITY authority;

}
