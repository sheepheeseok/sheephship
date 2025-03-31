package sheepback.repository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Repository;
import sheepback.domain.Category;
import sheepback.domain.item.Item;

import java.util.List;

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

    //카테고리별 아이템 가져오기
    public Page<Item> findByCategory(String categoryName,
                                     @PageableDefault(size =10, page = 0) Pageable pageable) {
        // 1. 페치 조인 쿼리 (Item + ItemCategory + Category)
        List<Item> items = em.createQuery(
                        "SELECT DISTINCT i.id, i.itemImg, i.price, i.name FROM Item i " +
                                "JOIN FETCH i.categories ic " +      // Item과 ItemCategory 페치 조인
                                "JOIN FETCH ic.category c " +        // ItemCategory와 Category 페치 조인
                                "WHERE c.name = :categoryName " +    // 카테고리 이름으로 필터링
                                "ORDER BY i.id DESC", Item.class)    // 정렬 조건 (필수)
                .setParameter("categoryName", categoryName)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();

        // 2. 전체 개수 조회 쿼리 (COUNT 사용)
        Long total = em.createQuery(
                        "SELECT COUNT(DISTINCT i) FROM Item i " +
                                "JOIN i.categories ic " +
                                "JOIN ic.category c " +
                                "WHERE c.name = :categoryName", Long.class)
                .setParameter("categoryName", categoryName)
                .getSingleResult();

        // 3. Page 객체 반환
        return new PageImpl<>(items, pageable, total);
    }



}
