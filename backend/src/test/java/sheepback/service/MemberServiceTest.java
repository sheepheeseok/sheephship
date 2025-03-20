package sheepback.service;


import jakarta.persistence.EntityManager;
import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import sheepback.domain.Address;
import sheepback.domain.Member;
import sheepback.repository.MemberRepository;

import java.util.List;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@RunWith(SpringRunner.class)
@Transactional
public class MemberServiceTest {

    @Autowired
    private MemberService memberService;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private EntityManager em;

    //회원가입 아이디중복체크 동시 테스트
    @Test
    public void joinMember() throws Exception{
        // given

        Member joinmember = getMember("userA", "password", "userA@email.com", "123456789", new Address("tr", "qwe"), "양희석");

        // when
        memberService.joinMember(joinmember);
        Member findbyId = memberRepository.findbyId(joinmember.getId());
        // then
        Assert.assertEquals(joinmember,findbyId);
        System.out.println("joinmember = " + findbyId.getId());
    }

    @Test
    public void 멤버정보전부_가져오기(){
        //given
        Member m1 =  getMember("userA", "password",
                "userA@email.com",
                "123456789",
                new Address("tr", "qwe"),
                "양희석");
        Member m2 =  getMember("userB", "passworded",
                "userB@email.com",
                "1234567891",
                new Address("tr", "qwe"),
                "B희석");
        Member m3 =  getMember("userC", "passwordeC",
                "userC@email.com",
                "1234567CCCCCC",
                new Address("tr", "Cwe"),
                "C희석");
        em.persist(m1);
        em.persist(m2);
        em.persist(m3);
        em.flush();
        em.clear();
        //when
        List<Member> members = memberService.getMembers();

        //then

        Assert.assertEquals(m1.getId(),members.get(0).getId());
        Assert.assertEquals(m2.getId(),members.get(1).getId());
        Assert.assertEquals(m3.getId(),members.get(2).getId());

    }

    @Test
    public void 로그인(){
        //given
        Member m1 =  getMember("userA", "password",
                "userA@email.com",
                "123456789",
                new Address("tr", "qwe"),
                "양희석");
        em.persist(m1);
        em.flush();
        em.clear();
        //when
        Member login = memberService.login("userA", "password");

        //then
        Assert.assertNotNull(login);
        Assert.assertEquals("userA", login.getId());


    }

    @Test
    public void 아이디_찾기(){
        //given
        Member m1 =  getMember("userA", "password",
                "userA@email.com",
                "123456789",
                new Address("tr", "qwe"),
                "양희석");
        em.persist(m1);
        em.flush();
        em.clear();
        //when
        List<String> id = memberService.findId("양희석", "123456789");

        //then

        Assert.assertNotNull(id);
        Assert.assertEquals(m1.getId(),id.get(0));


    }

    @Test
    public void 비밀번호_찾기(){
        //given
        Member m1 =  getMember("userA", "password",
                "userA@email.com",
                "123456789",
                new Address("tr", "qwe"),
                "양희석");
        em.persist(m1);
        em.flush();
        em.clear();
        //when
        boolean userA = memberService.findPassword("userA", "123456789");
        //then


        Assert.assertEquals(true, userA);


    }

    @Test
    public void 회원정보_수정(){
        //given
        Member m1 =  getMember("userA", "password",
                "userA@email.com",
                "123456789",
                new Address("tr", "qwe"),
                "양희석");
        em.persist(m1);
        em.flush();
        em.clear();
        //when
        Member member = memberService.updateMember("userA", "pass1234", new Address("zzz", "xxxx"), "httpq:123asdzxc");

        //then


        System.out.println("member = " + member.getProfilePicture());
        Assert.assertEquals("pass1234", member.getPassword() );


    }


    //회원정보 집어넣기
    private static Member getMember(String id, String password, String email, String phoneNumber, Address address, String name) {
        Member joinmember = Member.builder()
                .id(id)
                .password(password)
                .email(email)
                .phoneNumber(phoneNumber)
                .address(address)
                .name(name).build();
        return joinmember;
    }



}
