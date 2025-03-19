package sheepback.repository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import sheepback.domain.Member;

@Repository
@RequiredArgsConstructor
public class MemberRepository {
    private final EntityManager em;

    //회원가입
    public void save(Member member) {
        em.persist(member);
    }
    //회원탈퇴
    public void delete(Member member) {
        em.remove(member);
    }

    //로그인
    public Member login(String id, String password) {
        Member member = em.find(Member.class, id);

        if (member != null && member.getPassword().equals(password)) {
            return member;
        } else {
            return null;
        }
    }

    //아이디 찾기

    //비밀번호 찾기

    //회원정보 찾기


}
