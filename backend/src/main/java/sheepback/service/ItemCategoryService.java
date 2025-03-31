package sheepback.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sheepback.domain.Category;
import sheepback.domain.item.Item;
import sheepback.repository.ItemCategoryRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ItemCategoryService {

    private final ItemCategoryRepository itemCategoryRepository;

    //카테고리 저장
    @Transactional
    public void InsertCategory(Category category) {
        itemCategoryRepository.save(category);
    }

    //id로 찾아 삭제
    @Transactional
    public void DeleteCategory(Long id) {
        Category category = GetCategoryById(id);
        itemCategoryRepository.delete(category);
    }

    //id를 입력받아 업데이트
    @Transactional
    public void UpdateCategory(Long id, String name) {
        Category byId = itemCategoryRepository.findById(id);
        byId.setName(name);
    }

    //id를 입력받아 카테고리 반환
    public Category GetCategoryById(Long id) {
        Category byId = itemCategoryRepository.findById(id);
        return byId;
    }

    //모든 카테고리 반환
    public List<Category> GetAllCategories() {
        return itemCategoryRepository.findAll();
    }

    //이름으로 찾아 카테고리 반환
    public Category GetCategoryByName(String name) {
        return itemCategoryRepository.findByName(name);
    }

    //이름을 받아 페이지네이션 객체 생성
    public Page<Item> GetItemsByCategory(String name, Pageable pageable) {
        Page<Item> byCategory = itemCategoryRepository.findByCategory(name, pageable);
        return byCategory;
    }










}
