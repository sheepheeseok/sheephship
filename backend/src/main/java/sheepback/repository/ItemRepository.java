package sheepback.repository;

import jakarta.persistence.EntityManager;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Repository;
import sheepback.domain.Category;
import sheepback.domain.ItemCategory;
import sheepback.domain.item.Color;
import sheepback.domain.item.Item;
import sheepback.domain.item.ItemImg;

import java.util.ArrayList;
import java.util.List;

@Repository
@AllArgsConstructor
public class ItemRepository {

    private final EntityManager em;
    //제품 상세페이지 후기와 상품문의 따로 만들어 batch결합
    public void save(Item item, List<Category> categories, ItemImg itemImg, List<Color> colors) {
        // 카테고리 추가
        for (Category category : categories) {
            ItemCategory itemCategory = new ItemCategory();
            itemCategory.setCategory(category);
            itemCategory.setItem(item);
            em.persist(itemCategory);
            category.getCategories().add(itemCategory);
            item.getCategories().add(itemCategory);
        }

        // 색상 추가
        for (Color color : colors) {
            color.setItem(item);
            item.getColors().add(color);
        }

        item.setItemImg(itemImg);

        em.persist(item);
    }
    public void delete(Item item) {
        em.remove(item);
    }
    public List<Item> findAll() {
        return em.createQuery("select i from Item i", Item.class).getResultList();
    }

    public Item findById(int id) {
        return em.find(Item.class, id);
    }

    // 제목으로 검색
    public List<Item> searchByName(String keyword, int page, int size) {
        return em.createQuery(
                        "SELECT i FROM Item i WHERE i.name LIKE :keyword", Item.class)
                .setParameter("keyword", "%" + keyword + "%")
                .setFirstResult(page * size)
                .setMaxResults(size)
                .getResultList();
    }

    // 브랜드로 검색
    public List<Item> searchByProduce(String keyword, int page, int size) {
        return em.createQuery(
                        "SELECT i FROM Item i WHERE i.produce LIKE :keyword", Item.class)
                .setParameter("keyword", "%" + keyword + "%")
                .setFirstResult(page * size)
                .setMaxResults(size)
                .getResultList();
    }

    public Long countByName(String keyword) {
        return (Long) em.createQuery(
                        "SELECT COUNT(i) FROM Item i WHERE i.name LIKE :keyword")
                .setParameter("keyword", "%" + keyword + "%")
                .getSingleResult();
    }

    //아이템 키워드 확인후 검색
    public List<Item> searchItems(String keyword, String searchType, Pageable pageable) {
        List<Item> items = new ArrayList<>();

        if (searchType.equals("name")) {
            items = searchByName(keyword,pageable.getPageSize(),pageable.getPageNumber());
        } else if (searchType.equals("produce")) {
            items = searchByProduce(keyword,pageable.getPageSize(),pageable.getPageNumber());
        }

        return items;
    }




}
