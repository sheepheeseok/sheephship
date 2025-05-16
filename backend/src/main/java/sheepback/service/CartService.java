package sheepback.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sheepback.Dtos.AddCartInfoDto;
import sheepback.Dtos.CartListDto;
import sheepback.mapper.CartMapper;
import sheepback.mapper.ItemMapper;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartMapper cartMapper;
    @Autowired
    private ItemMapper itemMapper;
    //장바구니 추가 API
    public void addCart(AddCartInfoDto infoDto) {
        Long itemDetailId = itemMapper.getItemDetailId(infoDto.getItemId(), infoDto.getColor(), infoDto.getSize());
        cartMapper.addCart(infoDto, itemDetailId);
    }

    //장바구니 갯수 추가 API
    public void changeCartCount(String memberId, Long itemId, Long count) {
        cartMapper.changeCount(memberId,itemId,count);
    }

    //장바구니 목록 API
    public List<CartListDto> getCartList(String memberId) {
        List<CartListDto> cartList = cartMapper.getCartList(memberId);
        return cartList;
    }

    //총배송비 계산 API
    public Long calculateTotalDeliveryFee(List<Long> price){
        Long sum = price.stream().mapToLong(Long::longValue).sum();
        if(sum > 30000){
            return 0L;
        }
        return 3000L;
    }

    //장바구니 삭제 API
    public void deleteCart(String memberId, Long itemId) {
        cartMapper.deleteCart(memberId,itemId);
    }

}
