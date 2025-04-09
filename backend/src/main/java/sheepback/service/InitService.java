package sheepback.service;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import sheepback.domain.*;
import sheepback.domain.item.Color;
import sheepback.domain.item.Item;
import sheepback.domain.item.ItemImg;
import sheepback.domain.item.Size;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Transactional
public class InitService {


    private final ReviewAndAnswerService reviewAndAnswerService;
    private final ItemService itemService;
    private final EntityManager em;

    public void createReviewandAnswer (){

        List<Category> categories = new ArrayList<>();
        List<Color> colors = new ArrayList<>();
        Color color = Color.builder()
                .color("blue") // 중복되지 않도록 이름을 다르게 설정
                .stockQuantity(10L)
                .build();
        colors.add(color);

        Color color2 = Color.builder()
                .color("red") // 중복되지 않도록 이름을 다르게 설정
                .stockQuantity(10L)
                .build();
        colors.add(color);

        // 이미지 생성
        ItemImg itemImg = ItemImg.builder()
                .subUrl1("subUrl1" )
                .subUrl2("subUrl2" )
                .subUrl3("subUrl3")
                .detailUrl1("detailUrl1" )
                .detailUrl2("detailUrl2" )
                .detailUrl3("detailUrl3")
                .detailUrl4("detailUrl4")
                .build();

        // 아이템 생성
        Item item = Item.builder()
                .name("클라이밍 팬츠")
                .mainUrl("메인사진 URL")
                .deliveryFee(2500L)
                .produce("클라이밍 제조사")
                .price(33000L)
                .build();

        Member member = createMember("UserA",
                "12345678",
                "배호준", "a@b.com",
                new Address("qwe", "qweqwe"),
                "010-1234-1234",
                Grade.RED, 0L);
        em.persist(member);

        itemService.insertItem(item, categories, itemImg, colors);

        Review review = new Review();
        review.setTitle("Review Title");
        review.setContent("Review Content");
        review.setWriteDateTime(LocalDateTime.now());
        review.setImgUrl1("Url1");
        review.setImgUrl2("Url2");
        review.setImgUrl3("Url3");

        reviewAndAnswerService.insertReview(item.getId(), member.getId(), review);

        ReviewAnswer reviewAnswer = new ReviewAnswer();
        reviewAnswer.setTitle("Review answer Title");
        reviewAnswer.setContent("Review answer Content");
        reviewAnswer.setWriteDateTime(LocalDateTime.now());
        reviewAnswer.setReview(review);

        reviewAndAnswerService.insertReviewAnswer(review.getId(), reviewAnswer);
    }

    public void create1Item() {
        List<Category> categories = new ArrayList<>();
        List<Color> colors = new ArrayList<>();
            Color color = Color.builder()
                    .color("blue") // 중복되지 않도록 이름을 다르게 설정
                    .stockQuantity(10L)
                    .build();
            colors.add(color);

        Color color2 = Color.builder()
                .color("red") // 중복되지 않도록 이름을 다르게 설정
                .stockQuantity(10L)
                .build();
        colors.add(color);

        // 이미지 생성
        ItemImg itemImg = ItemImg.builder()
                .subUrl1("subUrl1" )
                .subUrl2("subUrl2" )
                .subUrl3("subUrl3")
                .detailUrl1("detailUrl1" )
                .detailUrl2("detailUrl2" )
                .detailUrl3("detailUrl3")
                .detailUrl4("detailUrl4")
                .build();

        // 아이템 생성
        Item item = Item.builder()
                .name("클라이밍 팬츠")
                .mainUrl("메인사진 URL")
                .deliveryFee(2500L)
                .produce("클라이밍 제조사")
                .price(33000L)
                .build();

        itemService.insertItem(item, categories, itemImg, colors);

    }
    public void createHasSizeItem() {
        List<Category> categories = new ArrayList<>();
        List<Color> colors = new ArrayList<>();
        Color color = Color.builder()
                .color("blue") // 중복되지 않도록 이름을 다르게 설정
                .build();
        colors.add(color);

        Color color2 = Color.builder()
                .color("red") // 중복되지 않도록 이름을 다르게 설정
                .build();
        colors.add(color2);

        // 이미지 생성
        ItemImg itemImg = ItemImg.builder()
                .subUrl1("subUrl1" )
                .subUrl2("subUrl2" )
                .subUrl3("subUrl3")
                .detailUrl1("detailUrl1" )
                .detailUrl2("detailUrl2" )
                .detailUrl3("detailUrl3")
                .detailUrl4("detailUrl4")
                .build();

        List<Size> sizes = new ArrayList<>();

        Size size1 = new Size();
        size1.setSize("m");
        size1.setStockQuantity(10L);
        sizes.add(size1);

        Size size2 = new Size();
        size2.setSize("L");
        size2.setStockQuantity(10L);
        sizes.add(size2);

        Size size3 = new Size();
        size3.setSize("XL");
        size3.setStockQuantity(10L);
        sizes.add(size3);

        // 아이템 생성
        Item item = Item.builder()
                .name("클라이밍 팬츠")
                .mainUrl("메인사진 URL")
                .deliveryFee(2500L)
                .produce("클라이밍 제조사")
                .price(33000L)
                .build();

        itemService.inserthasSize(item, categories, itemImg, colors, sizes);

    }

    public void create100Item() {
        List<Category> categories = new ArrayList<>();

        // 카테고리 생성
        Category category = new Category();
        category.setName("testCategory"); // 중복되지 않도록 이름을 다르게 설정
        categories.add(category);
        for (int i = 0; i < 100; i++) {

            List<Color> colors = new ArrayList<>();



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