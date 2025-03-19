package sheepback.domain;


import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter @Setter
public class BusinessHours {

    private String openHour;
    private String closeHour;

    protected BusinessHours() {

    }

    public BusinessHours(String openHour, String closeHour) {
        this.openHour = openHour;
        this.closeHour = closeHour;
    }

}
