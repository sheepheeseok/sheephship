package sheepback.service;


import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import sheepback.domain.Category;
import sheepback.domain.item.Item;
import sheepback.domain.item.ItemImg;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@RunWith(SpringRunner.class)
@Transactional
public class ItemSearchServiceTest {

    @Autowired
    private ItemService itemService;

    @Test
    public void 검색리스트_테스트(){

        //given
        create100Item();
        String keword = "name1";
        String searchType = "name";
        Pageable pageable = PageRequest.of(0, 10, Sort.sort(c));

        //when


        //then


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
                    .contents("콘텐츠"+ i)
                    .price(1L + i)
                    .build();

            itemService.insertItem(item, categories, itemImg, colors);
        }
    }


}
