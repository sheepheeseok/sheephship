package sheepback.service;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import sheepback.domain.Address;
import sheepback.domain.Grade;
import sheepback.domain.Member;

@Component
@RequiredArgsConstructor
public class InitDb {
    private final InitService initService;

    @PostConstruct
    public void init() {
        initService.dbInit();
    }

    @Component
    @RequiredArgsConstructor
    @Transactional
    static class InitService {
        private final EntityManager em;
        public void dbInit() {
            Member member = createMember("UserA",
                    "12345678",
                    "배호준", "a@b.com",
                    new Address("qwe", "qweqwe"),
                    "010-1234-1234",
                    Grade.RED, 0L);
            em.persist(member);
        }

        private static Member createMember(String id, String password, String name, String email, Address address, String phoneNumber, Grade grade, long point) {
            Member member = new Member();
            member.setId(id);
            member.setPassword(password);
            member.setName(name);
            member.setEmail(email);
            member.setAddress(address);
            member.setPhoneNumber(phoneNumber);
            member.setGrade(grade);
            member.setPoint(point);
            return member;
        }
    }
}
