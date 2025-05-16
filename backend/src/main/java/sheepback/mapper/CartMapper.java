package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.AddCartInfoDto;
import sheepback.Dtos.CartListDto;

import java.util.List;

@Mapper
public interface CartMapper {

     void changeCount(@Param("memberId") String memberId,@Param("itemId") Long itemId,
                      @Param("count") Long count);


    void addCart(@Param("infoDto") AddCartInfoDto infoDto,
                 @Param("itemDetailId") Long itemDetailId);

    void deleteCart(@Param("memberId") String memberId,@Param("itemId") Long itemId);

    List<CartListDto> getCartList(@Param("memberId") String memberId);
}
