package sheepback.service;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import sheepback.domain.*;
import sheepback.domain.item.Item;
import sheepback.domain.item.ItemImg;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Transactional
public class InitService {



    private final ItemService itemService;
    private final EntityManager em;





    private static Member createMember(String id, String password, String name, String email, Address address, String phoneNumber, Grade grade, long point) {
        Member member = new Member();
        member.setId(id);
        member.setPassword(password);
        member.setName(name);
        member.setEmail(email);
        member.setAddress(address);
        member.setPhoneNumber(phoneNumber);
        member.setGrade(grade);

        return member;
    }
}