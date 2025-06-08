package sheepback.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sheepback.Dtos.*;
import sheepback.domain.Address;
import sheepback.service.OrderService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/api/MemberDeliveryInfo/{id}")
    public DeliveryInfoDto getDeliveryInfoById(@PathVariable("id") String memberId) {
        DeliveryInfoDto deliveryInfoById = orderService.getDeliveryInfoById(memberId);
        return deliveryInfoById;
    }

    @PostMapping("/api/cancelStockReservation")
    public void cancelStockReservation(@RequestBody List<CancelReserveRequest> requests, @CookieValue("loginId") String memberId) {
        orderService.cancelStockReservation(requests, memberId);

    }

    public List<Long> reserveMultipleStocks(@RequestBody List<StockReserveRequest> requests) {
        List<Long> longs = orderService.reserveMultipleStocks(requests);
        return longs;

    }


    @PostMapping("/api/buy-items")
    public BuyItemListAndDeliveryFeeDto getBuyItems(@RequestBody List<BuyItemListDto> items, @CookieValue("loginId") String rmemberId) {
        List<StockReserveRequest> reserveInfo = items.stream()
                .map(item -> {
                    StockReserveRequest req = new StockReserveRequest();
                    req.setItemDetailId(item.getItemDetailId());
                    req.setMemberId(rmemberId);
                    // stockQuantity가 String이므로 Long으로 변환
                    req.setQuantity(item.getStockQuantity());
                    return req;
                })
                .collect(Collectors.toList());
        List<Long> longs = reserveMultipleStocks(reserveInfo);
        List<BuyItemListDto> result = orderService.enrichItems(items);
        List<Long> prices = items.stream().map(BuyItemListDto::getPrice).collect(Collectors.toList());
        Long deliveryFee = orderService.calculateTotalDeliveryFee(prices);
        BuyItemListAndDeliveryFeeDto dto = new BuyItemListAndDeliveryFeeDto();
        dto.setItemListDtos(result);
        dto.setDeliveryFee(deliveryFee);
        return dto;
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
    private static class BuyItemListAndDeliveryFeeDto {
        private Long deliveryFee;
        private List<BuyItemListDto> itemListDtos;
    }

    @Data
    private static class getIdsDto {
        private Long orderId;
        private List<Long> orderItemIds;

    }
}
