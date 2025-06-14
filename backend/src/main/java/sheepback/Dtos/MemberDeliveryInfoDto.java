package sheepback.Dtos;

import lombok.Data;
import sheepback.domain.Address;

@Data
public class MemberDeliveryInfoDto {

    private Long deliveryInfoId;
    private String memberId;
    private String firstAddress;
    private String secondAddress;
    private String phoneNumber;
    private Long basicDeliveryInfo;
    private String email;




}
