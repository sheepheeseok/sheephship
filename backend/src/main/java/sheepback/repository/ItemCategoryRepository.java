package sheepback.repository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Repository;
import sheepback.domain.Category;
import sheepback.domain.item.Item;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class ItemCategoryRepository {
    // 카테고리별 상품 페이지 검색기능 만들어야함ㅎㅎ
    private final EntityManager em;

    //카테고리 저장
    public void save (Category category) {
        em.persist(category);

    }

    public void delete (Category category) {
        em.remove(category);
    }

    //이름을 검색하여 카테고리 가져오기
    public Category findByName (String name) {
        return em.createQuery("select c from Category c where c.name = :name",
                Category.class).setParameter("name", name).getSingleResult();
    }

    //아이디을 이용해 카테고리 찾기
    public Category findById (Long Id) {
        Category category = em.find(Category.class, Id);
        return category;
    }

    //카테고리 전부 가져오기
    public List<Category> findAll() {
        return em.createQuery("select c from Category c", Category.class)
                .getResultList();
    }


}



