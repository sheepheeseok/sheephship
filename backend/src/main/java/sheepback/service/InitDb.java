package sheepback.service;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import sheepback.domain.Address;
import sheepback.domain.Category;
import sheepback.domain.Grade;
import sheepback.domain.Member;
import sheepback.domain.item.Color;
import sheepback.domain.item.Item;
import sheepback.domain.item.ItemImg;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class InitDb {
    private final InitService initService;
    private final ItemService itemService;
    @PostConstruct
    public void init() {
        initService.dbInit();
        initService.create100Item();
    }

    @Component
    @RequiredArgsConstructor
    @Transactional
    static class InitService {

        private final ItemService itemService;

        private void create100Item() {
            for (int i = 0; i < 100; i++) {
                List<Category> categories = new ArrayList<>();
                List<Color> colors = new ArrayList<>();

                // 카테고리 생성
                for (int j = 0; j < 5; j++) {
                    Category category = new Category();
                    category.setName("name" + i + j); // 중복되지 않도록 이름을 다르게 설정
                    categories.add(category);
                }

                // 색상 생성
                for (int j = 0; j < 5; j++) {
                    Color color = Color.builder()
                            .color("red" + i + j) // 중복되지 않도록 이름을 다르게 설정
                            .stockQuantity(10L)
                            .build();
                    colors.add(color);
                }

                // 이미지 생성
                ItemImg itemImg = ItemImg.builder()
                        .subUrl1("s1" + i)
                        .subUrl2("s2" + i)
                        .subUrl3("s3" + i)
                        .detailUrl1("d1" + i)
                        .detailUrl2("d2" + i)
                        .detailUrl3("d3" + i)
                        .detailUrl4("d4" + i)
                        .build();

                // 아이템 생성
                Item item = Item.builder()
                        .name("name" + i)
                        .mainUrl("url" + i)
                        .deliveryFee(1L + i)
                        .produce("produce" + i)
                        .price(1L + i)
                        .build();

                itemService.insertItem(item, categories, itemImg, colors);
            }
        }

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
