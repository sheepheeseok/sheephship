package sheepback.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sheepback.Dtos.*;
import sheepback.domain.Address;
import sheepback.service.OrderService;

import java.time.LocalDateTime;
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
    public void cancelStockReservation(@RequestBody List<CancelReserveRequest> requests) {
        orderService.cancelStockReservation(requests);

    }

    @PostMapping("/api/reserveMultipleStocks")
    public List<Long> reserveMultipleStocks(@RequestBody List<StockReserveRequest> requests) {
        List<Long> longs = orderService.reserveMultipleStocks(requests);
        return longs;

    }





    @PostMapping("/api/buy-items")
    public BuyItemListAndDeliveryFeeDto getBuyItems(@RequestBody List<BuyItemListDto> items) {
        List<Long> prices = items.stream().map(BuyItemListDto::getPrice).collect(Collectors.toList());
        Long deliveryFee = orderService.calculateTotalDeliveryFee(prices);
        List<BuyItemListDto> result = orderService.enrichItems(items);
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
