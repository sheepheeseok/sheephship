package sheepback.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Reviews {

    @Id
    @GeneratedValue
    @Column(name = "review_id")
    private Long id;


}
