package sheepback.service;

import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sheepback.Dtos.ItemListByCategoryDto;
import sheepback.domain.Category;
import sheepback.domain.item.Item;
import sheepback.mapper.ItemMapper;


import java.util.List;

@Service
public class ItemCategoryService {

    @Autowired
    private ItemMapper itemMapper;

    //카테고리클릭시 동작하는 아이템 리스트
    public List<ItemListByCategoryDto> getListByCategory(String category) {
        return itemMapper.getItemListByCategory(category);
    }

    //검색시에 동작하는 아이템 리스트
    public List<ItemListByCategoryDto> getListBySearchKeyword(String keyword) {
        return itemMapper.getItemListBySearchKeyword(keyword);
    }


    public void saveCategory(String category) {
        itemMapper.addCategory(category);
    }

    public void updateCategory(String newCategoryName, String categoryName) {
        itemMapper.updateCategory(newCategoryName, categoryName);

    }


    public void deleteCategory(String category) {
        itemMapper.deleteCategory(category);
    }

    //카테고리 저장

    //id로 찾아 삭제

    //id를 입력받아 업데이트


    //id를 입력받아 카테고리 반환


    //모든 카테고리 반환

    //이름으로 찾아 카테고리 반환


}
