package sheepback.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sheepback.Dtos.AddWishDto;
import sheepback.Dtos.WishDto;
import sheepback.mapper.WishMapper;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class WishService {

    @Autowired
    private WishMapper wishMapper;
    //찜 목록 추가하는 API
    public boolean addWish(Long itemId, String memberId) {
        if(checkWish(itemId , memberId) > 0) {
            return false;
        }else{
            AddWishDto addWishDto = new AddWishDto();
            addWishDto.setItemId(itemId);
            addWishDto.setMemberId(memberId);
            addWishDto.setAddWishDate(LocalDateTime.now());
            wishMapper.addWish(addWishDto);
            return true;
        }

    }

    //찜 목록에 해당 itemid가 있는지 확인
    public int checkWish(Long itemId, String memberId){
        int i = wishMapper.checkWish(itemId, memberId);
       return i;
    }

    //찜 목록 삭제 API
    public boolean deleteWish(Long itemId, String memberId) {
        if(checkWish(itemId , memberId) > 0){
            wishMapper.deleteWish(itemId , memberId);
            return true;
        }else {
            return false;

        }
    }

    //찜 목록 정보들 가져오기
    public List<WishDto> findWishListBymemberId(String memberId){
        List<WishDto> wishListBymemberId = wishMapper.findWishListBymemberId(memberId);
        return wishListBymemberId;
    }

}
