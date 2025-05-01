package sheepback.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sheepback.domain.Address;
import sheepback.service.OrderService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    //주문 받기


    //결제페이지 아이템 가져오기



    //주문 조회




    //주문 취소

    @Data
    private static class OrderRequest {
        private String memberId;
        private String paymentMethod;
        private String requireMents;
        private Address address;
    }


    @Data
    private static class orderListRequest {

        private String memberId;
        private LocalDateTime start;
        private LocalDateTime end;

    }

}
