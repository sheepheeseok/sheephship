package sheepback.repository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import sheepback.domain.Member;

import java.util.List;

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

    public List<Member> findId(String name, String phoneNumber) {
        return em.createQuery("select m from Member m " +
                "where m.name = :name and m.phoneNumber = :phoneNumber", Member.class)
                .setParameter("name", name)
                .setParameter("phoneNumber", phoneNumber)
                .getResultList();
    }
    //비밀번호 찾기
    public Member findPassword(String id, String phoneNumber) {
        Member member = em.find(Member.class, id);
        if (member != null && member.getPhoneNumber().equals(phoneNumber)) {
            return member;
        }else {
            return null;
        }
    }

    //회원정보 찾기
    public List<Member> findAll() {
        return em.createQuery("select m from Member m", Member.class).getResultList();
    }

}
