package sheepback.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sheepback.Dtos.DeliveryInfoDto;
import sheepback.domain.Address;
import sheepback.service.OrderService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/api/MemberDeliveryInfo/{id}")
    public DeliveryInfoDto getDeliveryInfoById(@PathVariable("id") String memberId) {
        DeliveryInfoDto deliveryInfoById = orderService.getDeliveryInfoById(memberId);
        return deliveryInfoById;
    }





}
