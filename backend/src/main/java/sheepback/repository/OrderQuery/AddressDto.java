package sheepback.repository.OrderQuery;

import lombok.Data;
import sheepback.domain.Address;

@Data
public class AddressDto {
    private Address address = new Address(null, null);
}
