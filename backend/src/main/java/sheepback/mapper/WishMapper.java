package sheepback.mapper;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.AddWishDto;
import sheepback.Dtos.WishDto;

import java.util.List;

@Mapper
public interface WishMapper {
    void addWish(AddWishDto addWishDto);
    int checkWish(@Param("itemId") Long itemId,@Param("memberId") String memberId);
    void deleteWish(@Param("itemId") Long itemId,@Param("memberId") String memberId);

    List<WishDto> findWishListBymemberId(@Param("memberId") String memberId);
}
