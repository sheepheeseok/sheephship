package sheepback.controller;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sheepback.Dtos.AddCartInfoDto;
import sheepback.Dtos.CartListDto;
import sheepback.service.CartService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @PutMapping("/api/addCart")
    public String addCart(@RequestBody addCartRequest request){
            AddCartInfoDto addCartInfoDto = new AddCartInfoDto();
            addCartInfoDto.setMemberId(request.getMemberId());
            addCartInfoDto.setItemId(request.getItemId());
            addCartInfoDto.setCount(request.getCount());
            addCartInfoDto.setSize(request.getSize());
            addCartInfoDto.setColor(request.getColor());
            addCartInfoDto.setAddDate(LocalDateTime.now());
            cartService.addCart(addCartInfoDto);
            return "Add Cart success";
    }

    @GetMapping("/api/getCartList/{memberId}")
    public CartListAndDeliveryFeeDto getCartList(@PathVariable("memberId") String memberId){
        List<CartListDto> cartList = cartService.getCartList(memberId);
        List<Long> TotalPrice = cartList.stream().map(CartListDto::getPrice).collect(Collectors.toList());
        Long l = cartService.calculateTotalDeliveryFee(TotalPrice);
        CartListAndDeliveryFeeDto listAndDeliveryFeeDto = new CartListAndDeliveryFeeDto();
        listAndDeliveryFeeDto.setDeliveryFee(l);
        listAndDeliveryFeeDto.setCartList(cartList);
        return listAndDeliveryFeeDto;
    }

    @PostMapping("/api/changeCartCount")
    public String ChangeCartCount(@RequestBody ChangeCartRequest request){
        cartService.changeCartCount(request.getMemberId(),request.getItemId(),request.getCount());
        return "Change Cart Success";
    }

    @DeleteMapping("/api/deleteCart")
    public String deleteCart(@RequestBody deleteCartRequest request){
        cartService.deleteCart(request.getMemberId(),request.getItemId());
        return "delete Cart Success";
    }


    @Data
    private static class addCartRequest{

        private String memberId;
        private Long itemId;
        private Long count;
        private String size;
        private String color;

    }

    @Data
    private static class ChangeCartRequest {
        private String memberId;
        private Long itemId;
        private Long count;
    }
    @Data
    private static class deleteCartRequest {
        private String memberId;
        private Long itemId;
    }

    @Data
    private static class CartListAndDeliveryFeeDto {
        private Long deliveryFee;
        private List<CartListDto> cartList;
    }
}
