package sheepback.Dtos;

import lombok.Data;
import sheepback.domain.Address;

@Data
public class DeliveryInfoDto {
    private String name;
    private String phoneNumber;
    private String email;
    private String firstAddress;
    private String secondAddress;

}
