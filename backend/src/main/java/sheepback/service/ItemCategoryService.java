package sheepback.service;

import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
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
    public List<ItemListByCategoryDto> getListByCategory(String category, int page) {
        page = (page-1) * 32;
        return itemMapper.getItemListByCategory(category,page,32);
    }

    //검색시에 동작하는 아이템 리스트
    public List<ItemListByCategoryDto> getListBySearchKeyword(String keyword, int page) {
        page = (page-1) * 32;
        return itemMapper.getItemListBySearchKeyword(keyword,page,32);
    }

    public int getCountItemListByCategory(@Param("category") String category) {

        int totalPages = getTotalPages(itemMapper.countItemListByCategory(category));
        if(totalPages / 32 == 0) {
            totalPages = totalPages / 32;
        }else{
            totalPages = totalPages / 32 + 1;
        }
        return totalPages;
    }

    public int getCountItemListBySearchKeyword(@Param("keyword") String keyword) {
        int totalPages = getTotalPages(itemMapper.countItemListBySearchKeyword(keyword));
        if(totalPages / 32 == 0) {
            totalPages = totalPages / 32;
        }else{
            totalPages = totalPages / 32 + 1;
        }
        return totalPages;
    }


    //총 페이지 수 계산
    public int getTotalPages(int totalCount) {
        return (int) Math.ceil((double) totalCount / 32);
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
