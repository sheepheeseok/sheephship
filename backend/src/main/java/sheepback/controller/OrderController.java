package sheepback.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sheepback.domain.Address;
import sheepback.repository.OrderQuery.*;
import sheepback.service.OrderService;

import java.time.LocalDateTime;
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

    //결제페이지 아이템 가져오기
    @PostMapping("/api/getOrderItemById")
    public List<OrderItemByItemIdDto> orderItembyItemId(@RequestBody OrderItemByItemIdRequest request){

        List<OrderItemByItemIdDto> orderItemByItemId = orderService.findOrderItemByItemId(request.getItems());
        return orderItemByItemId;
    }


    //주문 조회
    @PostMapping("/api/getItemByDate")
    public List<SimpleOrderListDto> getItemByDate(@RequestBody orderListRequest request){
        List<SimpleOrderListDto> orderList = orderService.findOrderList(request.getStart(), request.getEnd(), request.getMemberId());
        return orderList;
    }

    @GetMapping("/api/getOrderDetail/{orderId}/{orderItemId}")
    public OrderDetailDto getOrderDetail(@PathVariable("orderId") Long id, @PathVariable("orderItemId") Long orderItemId){
        OrderDetailDto orderDetail = orderService.getOrderDetail(id, orderItemId);
        return orderDetail;
    }

    //주문 취소

    @Data
    private static class OrderRequest {
        private String memberId;
        private String paymentMethod;
        private String requireMents;
        private List<ItemsDto> items;
        private Address address;
    }


    @Data
    private static class orderListRequest {

        private String memberId;
        private LocalDateTime start;
        private LocalDateTime end;

    }
    @Data
    private static class OrderItemByItemIdRequest {
        private List<SimpleItemAndCountDto> items;
    }
}
