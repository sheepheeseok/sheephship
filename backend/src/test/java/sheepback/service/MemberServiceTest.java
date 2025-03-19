package sheepback.service;


import jakarta.persistence.EntityManager;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import sheepback.domain.Address;
import sheepback.domain.Member;
import sheepback.repository.MemberRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class MemberServiceTest {

    @Autowired
    private MemberService memberService;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private EntityManager em;

    void joinMember() {
        // given

        Member member = Member.MemberBuilder()
                .id("userA")
                .email("userA@email.com")
                .phoneNumber("123456789")
                .address(new Address("tr","qwe"))
                .name("양희석").build();

        // when
        joinMember(member);

        // then

    }
}
