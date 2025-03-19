package sheepback.repository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
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
        return em.createQuery("select m.id from Member m " +
                "where m.name = :name and m.phoneNumber = :phoneNumber", Member.class)
                .setParameter("name", name)
                .setParameter("phoneNumber", phoneNumber)
                .getResultList();
    }
    //비밀번호 찾기
    public Member findbyId(String id) {
        Member member = em.find(Member.class, id);
        return member;

    }

    //회원정보 찾기
    public List<Member> findAll() {
        return em.createQuery("select m from Member m", Member.class).getResultList();
    }

    //아이디 중복체크
    public boolean exisxtId(String id) {
        return em.createQuery("select count(m) from Member m where m.id =:id", Long.class)
                .setParameter("id", id)
                .getSingleResult() > 0;
    }

}
