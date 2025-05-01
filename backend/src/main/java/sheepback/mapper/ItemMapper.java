package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.ItemDetailSimpleDto;
import sheepback.Dtos.ItemImgSimpleDto;
import sheepback.Dtos.ItemListByCategoryDto;

import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Mapper
public interface ItemMapper {
    List<ItemListByCategoryDto> getItemListBySearchKeyword(@Param("keyword") String keyword);
    List<ItemListByCategoryDto> getItemListByCategory(@Param("category") String category);
    HashMap<String, Object>  getItemById(@Param("id") Long id);
    ItemImgSimpleDto getItemImgById(@Param("id") Long id);
    List<ItemDetailSimpleDto> getItemDetail(@Param("id") Long id);
    void addCategory(@Param("category") String category);
    void updateCategory(@Param("newCategoryName") String newCategoryName, @Param("categoryName") String CategoryName);
    void deleteCategory(@Param("category") String category);

}
