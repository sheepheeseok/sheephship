package sheepback.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import sheepback.Dtos.ItemListByCategoryDto;
import sheepback.service.ItemCategoryService;
import sheepback.service.ItemService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ItemCategoryApiController {

    private final ItemService itemService;
    private final ItemCategoryService itemCategoryService;




    //카테고리별 아이템 찾기
    @GetMapping("/api/getItembyCategory/{category}")
    public List<ItemListByCategoryDto> getItemListbyCategory(@PathVariable("category") String category){
        return itemCategoryService.getListByCategory(category);
    }

    //검색 결과 찾기
    @GetMapping("/api/searchItem/{keyword}")
    public List<ItemListByCategoryDto> getItemListByCategory(@PathVariable("keyword") String keyword){
        return itemCategoryService.getListBySearchKeyword(keyword);
    }

    @PostMapping("/api/saveCategory/{category}")
    public void saveCategory(@PathVariable("category") String category){
        itemCategoryService.saveCategory(category);
    }

    @PatchMapping("/api/update")
    public void updateCategory(@RequestBody ChangeCategoryRequset requset){
        itemCategoryService.updateCategory(requset.getNewCategoryName(),requset.getCategoryName());
    }
    @DeleteMapping("/api/delete/{category}")
    public void deleteCategory(@PathVariable("category") String category){
        itemCategoryService.deleteCategory(category);
    }

    @Data
    private static class ChangeCategoryRequset {
        private String CategoryName;
        private String newCategoryName;
    }
}
