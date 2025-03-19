package sheepback.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

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
