package sheepback.repository;

import jakarta.persistence.EntityManager;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import sheepback.domain.Category;
import sheepback.domain.ItemCategory;
import sheepback.domain.item.Color;
import sheepback.domain.item.Item;
import sheepback.domain.item.ItemImg;
import sheepback.repository.ItemQuery.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@AllArgsConstructor
public class ItemRepository {

    private final EntityManager em;
    //제품 상세페이지 후기와 상품문의 따로 만들어 batch결합
    public void save(Item item, List<Category> categories, ItemImg itemImg, List<Color> colors) {
        // 카테고리 추가
        for (Category category : categories) {
            if(!categories.isEmpty()){
                ItemCategory itemCategory = new ItemCategory();
                itemCategory.setCategory(category);
                itemCategory.setItem(item);
                em.persist(itemCategory);
                category.getCategories().add(itemCategory);
                item.getCategories().add(itemCategory);
            }else{
                throw new ArrayIndexOutOfBoundsException();
            }
        }

        // 색상 추가
        for (Color color : colors) {
            if(!colors.isEmpty()) {
                color.setItem(item);
                item.getColors().add(color);
            }else{
                throw new ArrayIndexOutOfBoundsException();
            }
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
    public List<SearchItemSimplDto> searchByName(String keyword, Pageable pageable) {
        return em.createQuery(
                        "SELECT NEW sheepback.repository.ItemQuery.SearchItemSimplDto(i.id,i.name,i.price,i.mainUrl) " +
                                "FROM Item i " +
                                "WHERE i.name LIKE :keyword " +
                                "Order by " + getOrderByClause(pageable.getSort()), SearchItemSimplDto.class)
                .setParameter("keyword", "%" + keyword + "%")
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();
    }

    // 브랜드로 검색
    public List<SearchItemSimplDto> searchByProduce(String keyword, Pageable pageable) {
        return em.createQuery(
                        "SELECT NEW sheepback.repository.ItemQuery.ItemByCategorySimpleDto(i.id,i.name,i.price,i.mainUrl)" +
                                " FROM Item i " +
                                "WHERE i.produce " +
                                "LIKE :keyword " +
                                "ORDER BY " + getOrderByClause(pageable.getSort()), SearchItemSimplDto.class)
                .setParameter("keyword", "%" + keyword + "%")
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();
    }

    public Long countByName(String keyword) {
        return (Long) em.createQuery(
                        "SELECT COUNT(i) FROM Item i WHERE i.name LIKE :keyword")
                .setParameter("keyword", "%" + keyword + "%")
                .getSingleResult();
    }

    //아이템 키워드 확인후 검색
    public List<SearchItemSimplDto> searchItems(String keyword, String searchType, Pageable pageable) {
        List<SearchItemSimplDto> items = new ArrayList<>();

        if (searchType.equals("name")) {
            items = searchByName(keyword,pageable);
        } else if (searchType.equals("produce")) {
            items = searchByProduce(keyword,pageable);
        }

        return items;
    }

    public List<ItemByCategorySimpleDto> findItemsByCategory(String categoryName, Pageable pageable) {
        return em.createQuery(
                        "SELECT NEW sheepback.repository.ItemQuery.ItemByCategorySimpleDto(i.id,i.name,i.price,i.mainUrl) FROM Item i " +
                                "JOIN i.categories ic " +
                                "JOIN ic.category c " +
                                "WHERE c.name = :categoryName " +
                                "ORDER BY " + getOrderByClause(pageable.getSort()), ItemByCategorySimpleDto.class)
                .setParameter("categoryName", categoryName)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();
    }

    // 전체 개수 조회
    public Long countItemsByCategory(String categoryName) {
        return em.createQuery(
                        "SELECT COUNT(DISTINCT i) FROM Item i " +
                                "JOIN i.categories ic " +
                                "JOIN ic.category c " +
                                "WHERE c.name = :categoryName", Long.class)
                .setParameter("categoryName", categoryName)
                .getSingleResult();
    }

    // 동적 정렬 조건 생성 (Sort → ORDER BY 문자열 변환)
    private String getOrderByClause(Sort sort) {
        if (sort.isUnsorted()) return "i.created DESC, i.price DESC";

        return sort.stream()
                .map(order -> "i." + order.getProperty() + " " + order.getDirection().name())
                .collect(Collectors.joining(", "));
    }

    //item 별로 색상 가져오기
    private List<Color> getColors(Long id) {
        return em.createQuery("select c from Item i join i.colors c where i.id = :id", Color.class)
                .setParameter("id", id).getResultList();
    }



    @Transactional(readOnly = true)
    public AllItemDto getAllItembyId(Long itemId){

        Item item = em.createQuery("select i from Item i join fetch i.itemImg im where i.id = :id", Item.class)
                .setParameter("id", itemId)
                .getSingleResult();

        List<Color> colors = getColors(itemId);

        List<ColorSimpleDto> colorSimpleDtos = colors.stream()
                .map(ColorSimpleDto::new).collect(Collectors.toList());

        ItemImgSimpleDto itemImgSimpleDto = new ItemImgSimpleDto(item.getItemImg());

        return new AllItemDto(
                item.getId(),
                item.getName(),
                item.getProduce(),
                item.getContents(),
                item.getCreated(),
                item.getPrice(),
                item.getDeliveryFee(),
                item.getMainUrl(),
                item.getSalesVolume(),
                colorSimpleDtos,
                itemImgSimpleDto);

    }




}


/*
1. DTO를 활용한 다중 엔티티 반환 (권장)
DTO 클래스 생성
여러 엔티티의 데이터를 포함하는 DTO를 정의합니다.

java
@Getter
@AllArgsConstructor
public class ItemWithCategoryDto {
    private Long itemId;
    private String itemName;
    private Long itemPrice;
    private String categoryName; // Category 엔티티 데이터 포함
    private String colorName;   // Color 엔티티 데이터 포함
}
JPQL 쿼리 작성
SELECT NEW를 사용하여 필요한 데이터를 DTO로 반환합니다.

java
public List<ItemWithCategoryDto> findItemsWithCategoryAndColor(String categoryName, Pageable pageable) {
    return em.createQuery(
            "SELECT NEW sheepback.dto.ItemWithCategoryDto(i.id, i.name, i.price, c.name, col.colorName) " +
            "FROM Item i " +
            "JOIN i.categories ic " +
            "JOIN ic.category c " +
            "JOIN i.colors col " + // Color 엔티티 추가
            "WHERE c.name = :categoryName " +
            "ORDER BY i.price DESC", ItemWithCategoryDto.class)
        .setParameter("categoryName", categoryName)
        .setFirstResult((int) pageable.getOffset())
        .setMaxResults(pageable.getPageSize())
        .getResultList();
}
* */