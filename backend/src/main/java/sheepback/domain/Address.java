package sheepback.domain;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter @Setter
public class Address {

    private String firstAddress;
    private String secondAddress;

    protected Address() {

    }

    public Address(String firstAddress, String secondAddress) {
        this.firstAddress = firstAddress;
        this.secondAddress = secondAddress;
    }

}
