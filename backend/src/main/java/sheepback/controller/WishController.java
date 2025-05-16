package sheepback.controller;

import lombok.Data;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sheepback.Dtos.AddWishDto;
import sheepback.Dtos.WishDto;
import sheepback.service.WishService;

import java.util.List;

@RestController
public class WishController {

    @Autowired
    private WishService wishService;

    @PostMapping("/api/addWish")
    public String addWish(@RequestBody AddWishRequest request) {
        boolean b = false;
        if(request.getItemId() != null && request.getMemberId() != null) {
            b = wishService.addWish(request.itemId, request.memberId);
        }
        if(b){
            return "addWish success";
        }else{
            return "addWish fail";
        }
    }
    @DeleteMapping("/api/deleteWish")
    public String deleteWish(@RequestBody AddWishRequest request) {
        boolean b = false;
        if(request.getItemId() != null && request.getMemberId() != null) {
            b = wishService.deleteWish(request.itemId, request.memberId);
        }
        if(b){
            return "deleteWish success";
        }else{
            return "deleteWish fail";
        }
    }

    @GetMapping("/api/wishList/{memberId}")
    public List<WishDto> findWishList(@PathVariable("memberId") String memberId){
       return wishService.findWishListBymemberId(memberId);
    }

    @Data
    private static class AddWishRequest {
        private Long itemId;
        private String memberId;

    }
}
