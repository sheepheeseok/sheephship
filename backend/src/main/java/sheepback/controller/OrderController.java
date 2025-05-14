package sheepback.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sheepback.Dtos.*;
import sheepback.domain.Address;
import sheepback.service.OrderService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/api/MemberDeliveryInfo/{id}")
    public DeliveryInfoDto getDeliveryInfoById(@PathVariable("id") String memberId) {
        DeliveryInfoDto deliveryInfoById = orderService.getDeliveryInfoById(memberId);
        return deliveryInfoById;
    }


    @PostMapping("/api/buy-items")
    public List<BuyItemListDto> getBuyItems(@RequestBody List<BuyItemListDto> items) {
        List<BuyItemListDto> result = orderService.enrichItems(items);
        return result;
    }

    @PostMapping("/api/order")
    public String order(@RequestBody OrderDto orderDto) {
        orderService.ordered(orderDto);
        return "Order successful";
    }

    @PostMapping("/api/cancelorder")
    public String cancel(@RequestBody getIdsDto request) {
        orderService.cancelOrder(request.getOrderId(),request.getOrderItemIds());
        return "cancel successful";
    }

    @GetMapping("/api/orderList/{id}")
    public List<OrderInquiryListDto> getOrderList(@PathVariable("id") String memberId) {
        List<OrderInquiryListDto> result = orderService.getOrderList(memberId);
        return result;
    }

    @GetMapping("/api/orderDetail/{id}")
    public OrderDetailDto getOrderDetail(@PathVariable("id") Long orderId) {
      return orderService.getOrderDetail(orderId);
    }

    @Data
    private static class getIdsDto {
        private Long orderId;
        private List<Long> orderItemIds;
    }
}
