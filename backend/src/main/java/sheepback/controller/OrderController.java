package sheepback.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import sheepback.domain.Address;
import sheepback.repository.OrderQuery.AddressDto;
import sheepback.repository.OrderQuery.ItemsDto;
import sheepback.service.OrderService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    //주문 받기
    @PostMapping("/api/order")
    public Long order(@RequestBody OrderRequest request){
        Long orderId = orderService.order(request.getMemberId(), request.getItems(),
                request.getPaymentMethod(), request.getRequireMents(), request.getAddress());
        return orderId;
    }


    //주문 조회


    //주문 취소

    @Data
    private static class OrderRequest {
        private String memberId;
        private String paymentMethod;
        private String requireMents;
        private List<ItemsDto> items;
        private AddressDto address;
    }




}
