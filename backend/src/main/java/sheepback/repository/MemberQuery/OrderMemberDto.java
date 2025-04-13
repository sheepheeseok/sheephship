package sheepback.repository.MemberQuery;

import lombok.Data;
import sheepback.domain.Address;
import sheepback.domain.Member;

@Data
public class OrderMemberDto {

    public OrderMemberDto(Member member) {
        this.name = member.getName();
        this.address = member.getAddress();
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    private String name;
    private Address address;
    private String phoneNumber;
    private String email;
}
