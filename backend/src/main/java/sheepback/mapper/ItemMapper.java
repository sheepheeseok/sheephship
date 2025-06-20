package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.*;
import sheepback.service.RecentItemDto;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface ItemMapper {
    void insertItemDetail(List<ItemDetailSimpleDto> itemDetailSimpleDtoList);
    void updateItemDetail(List<ItemDetailSimpleDto> itemDetailSimpleDtoList);
    void deleteItemDetail(List<ItemDetailSimpleDto> itemDetailSimpleDtoList);
    void insertItemImg(ItemImgSimpleDto insetItemImgSimpleDto);
    void updateItemImg(ItemImgSimpleDto insetItemImgSimpleDto);
    void deleteItemImg(ItemImgSimpleDto insetItemImgSimpleDto);
    void insertItem(ItemDto insetItemDto);
    void updateItem(ItemDto insetItemDto);
    void deleteItem(ItemDto insetItemDto);
    List<ItemInfo> getBuyItemListById(@Param("list") List<Long> id);
    // 검색어 기반
    List<ItemListByCategoryDto> getItemListBySearchKeyword(
            @Param("keyword") String keyword,
            @Param("offset") int offset,
            @Param("limit") int limit

    );

    // 카테고리 기반
    List<ItemListByCategoryDto> getItemListByCategory(
            @Param("category") String category,
            @Param("offset") int offset,
            @Param("limit") int limit

    );
    int countItemListByCategory(@Param("category") String category);
    int countItemListBySearchKeyword(@Param("keyword") String keyword);
    HashMap<String, Object>  getItemById(@Param("id") Long id);
    ItemImgSimpleDto getItemImgById(@Param("id") Long id);
    List<ItemDetailSimpleDto> getItemDetail(@Param("id") Long id);
    void addCategory(@Param("category") String category);
    void updateCategory(@Param("newCategoryName") String newCategoryName, @Param("categoryName") String CategoryName);
    void deleteCategory(@Param("category") String category);
    ItemInfoForOrderDto getItemInfoForOrderDto(@Param("id") Long id, @Param("color") String color, @Param("size") String size);
    void changeQuantity(@Param("id") Long id, @Param("quantity") Long quantity, @Param("color") String color, @Param("size") String size);
    void cancelQuantity(@Param("quantity") Long quantity, @Param("itemDetailId") Long itemDetailId);
    Long getItemDetailId(@Param("itemId") Long itemId, @Param("color") String color, @Param("size") String size);

    int decreaseStock(@Param("itemDetailId") Long itemDetailId,@Param("quantity") Long quantity);

    List<ItemStockDto> getStocksForUpdate(@Param("itemDetailIds") List<Long> ids);

    int repairStock(@Param("itemDetailId") Long itemDetailId,@Param("quantity") Long quantity);

    List<RecentItemDto> getRecent(@Param("itemIds") List<Long> itemIds);
}
