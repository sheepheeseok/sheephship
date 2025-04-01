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
import sheepback.domain.Category;
import sheepback.domain.ItemCategory;
import sheepback.domain.item.Color;
import sheepback.domain.item.Item;
import sheepback.domain.item.ItemImg;
import sheepback.repository.ItemCategoryRepository;
import sheepback.repository.ItemRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@RunWith(SpringRunner.class)
@Transactional
public class ItemCategorySeviceTest {

    @Autowired
    private ItemService itemService;
    @Autowired
    private ItemCategoryService itemCategoryService;
    @Autowired
    private ItemCategoryRepository itemCategoryRepository;
    @Autowired
    private EntityManager em;
    @Autowired
    private ItemRepository itemRepository;

    @Test
    public void 카테고리_저장() {

        // given
        Category category = new Category();
        category.setName("test");

        // when
        itemCategoryService.InsertCategory(category);
        em.flush();
        em.clear();

        // then
        Assert.assertEquals(category.getName(), itemCategoryRepository.findByName(category.getName()).getName());
    }


    @Test
    public void 카테고리_삭제() {

        // given
        Category category = new Category();
        category.setName("test");
        itemCategoryService.InsertCategory(category);
        em.flush();
        em.clear();

        Long categoryId = category.getId();

        // when
        itemCategoryService.DeleteCategory(categoryId);
        em.flush();
        em.clear();

        // then
        List<Category> categories = itemCategoryService.GetAllCategories();
        Assert.assertEquals("카테고리사이즈는 무조건 0이어야한다", 0, categories.size());
    }

    @Test
    public void 아이디로_카테고리_가져오기(){

    // given
    Category category = new Category();
    category.setName("test");
    itemCategoryService.InsertCategory(category);
    em.flush();
    em.clear();

    // when
        Category category1 = itemCategoryService.GetCategoryById(category.getId());


    // then
        Assert.assertEquals("가져온 카테고리의 이름은 생성했던 test이어야한다", "test", category1.getName());
    }

    @Test
    public void 이름으로_카테고리_가져오기(){

        // given
        Category category = new Category();
        category.setName("test");
        itemCategoryService.InsertCategory(category);
        em.flush();
        em.clear();

        // when
        Category category1 = itemCategoryService.GetCategoryByName("test");


        // then
        Assert.assertNotNull(category1);
    }
    @Test
    public void 모든_카테고리_가져오기(){

        // given
        Category category = new Category();
        category.setName("test");
        Category category1 = new Category();
        category.setName("test1");
        Category category2 = new Category();
        category.setName("test2");
        itemCategoryService.InsertCategory(category);
        itemCategoryService.InsertCategory(category1);
        itemCategoryService.InsertCategory(category2);
        em.flush();
        em.clear();

        // when
        List<Category> categories = itemCategoryService.GetAllCategories();


        // then
        Assert.assertEquals(3, categories.size());
    }

    @Test
    public void 카테고리_업데이트(){

        // given
        Category category = new Category();
        category.setName("test");
        itemCategoryService.InsertCategory(category);
        em.flush();
        em.clear();

        // when

        itemCategoryService.UpdateCategory(category.getId(), "test2");
        em.flush();
        em.clear();
        Category category1 = itemCategoryService.GetCategoryByName("test2");

        // then
        Assert.assertNotNull(category1);
    }

    @Test
    public void 카테고리별_페이지네이션(){//여기하면됨

        // given
        Category category = new Category();
        category.setName("test");
        itemCategoryService.InsertCategory(category);
        em.flush();
        em.clear();

        // when

        itemCategoryService.UpdateCategory(category.getId(), "test2");
        em.flush();
        em.clear();
        Category category1 = itemCategoryService.GetCategoryByName("test2");

        // then
        Assert.assertNotNull(category1);
    }

    @Test
    public void create100Item(){
        List<Category> categories = new ArrayList<>();
        List<Color> colors = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            Category category = new Category();
            category.setName("name"+i);
            categories.add(category);
            Color color = Color.builder()
                    .color("red"+i)
                    .stockQuantity(10L)
                    .build();
        }
        ItemImg itemImg = ItemImg.builder()
                .subUrl1("s1")
                .subUrl2("s2")
                .subUrl3("s3")
                .detailUrl1("d1")
                .detailUrl2("d2")
                .detailUrl3("d3")
                .detailUrl4("d4").build();
        for (int i = 0; i < 100; i++) {
        Item item = Item.builder()
                .name("name"+i)
                .mainUrl("url"+i)
                .deliveryFee(1L +i)
                .produce("produce"+i)
                .price(1L+i)
                .build();
            itemService.insertItem(item,categories,itemImg,colors);
        }





    }




}
