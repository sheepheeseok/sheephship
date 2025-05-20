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
    @GetMapping("/api/getItembyCategory/{category}/{page}")
    public ItemListDto getItemListbyCategory(@PathVariable("category") String category,
                                                             @PathVariable("page") int page){
        ItemListDto itemListDto = new ItemListDto();
        List<ItemListByCategoryDto> listByCategory = itemCategoryService.getListByCategory(category, page);
        int countItemListByCategory = itemCategoryService.getCountItemListByCategory(category);
        itemListDto.setListByCategory(listByCategory);
        itemListDto.setPage(countItemListByCategory);
        return itemListDto;
    }

    //검색 결과 찾기
    @GetMapping("/api/searchItem/{keyword}/{page}")
    public List<ItemListByCategoryDto> getItemListBySearchKeyword(@PathVariable("keyword") String keyword,
                                                             @PathVariable("page") int page){
        ItemListDto itemListDto = new ItemListDto();
        List<ItemListByCategoryDto> listBySearchKeyword = itemCategoryService.getListBySearchKeyword(keyword, page);
        int countItemListBySearchKeyword = itemCategoryService.getCountItemListBySearchKeyword(keyword);
        itemListDto.setListByCategory(listBySearchKeyword);
        itemListDto.setPage(countItemListBySearchKeyword);
        return  listBySearchKeyword;
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
    @Data
    private static class ItemListDto {
       private List<ItemListByCategoryDto> listByCategory;
       private int page;
    }
}
