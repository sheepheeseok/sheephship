package sheepback.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import sheepback.domain.Member;
import sheepback.repository.MemberQuery.OrderMemberDto;

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
        em.createQuery("delete from Member m " +
                        "where m.id = :memberId")
                .setParameter("memberId", member.getId())
                .executeUpdate();
    }

    //로그인
    //비밀번호 암호화시 PasswordEncoder 주입 (예: BCrypt)
    public Member login(String id, String password) {
        // 1. ID로 회원 조회 (Null 체크 먼저)
        Member member = em.find(Member.class, id);
        if (member == null) {
            return null; // ID가 존재하지 않음
        }

        // 2. 비밀번호 비교 (평문 비교 - 보안 취약!)
        if (!member.getPassword().equals(password)) {
            return null; // 비밀번호 불일치
        }

        return member; // 로그인 성공
    }

    //아이디 찾기
    public String findId(String name, String phoneNumber) {
        List<String> result = em.createQuery("select m.id from Member m " +
                "where m.name=:name" +
                " and m.phoneNumber=:phoneNumber", String.class)
                .setParameter("name", name)
                .setParameter("phoneNumber", phoneNumber)
                .getResultList();

        return result.stream().findFirst().orElse(null);

    }


    public OrderMemberDto OrderfindbyId(String id){

        Member member = em.find(Member.class, id);
        return new OrderMemberDto(member);

    }

    //회원 정보 출력
    public Member findbyId(String id) {
        Member member = em.find(Member.class, id);
        return member;

    }

    //회원 정보 출력
    public Member insertToOrder(String id) {
        return em.createQuery("select distinct m from Member m " +
                "Left join fetch m.orders where m.id = :id", Member.class)
                .setParameter("id", id)
                .getSingleResult();

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
