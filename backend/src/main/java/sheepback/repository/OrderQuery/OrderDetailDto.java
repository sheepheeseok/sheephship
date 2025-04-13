package sheepback.repository.OrderQuery;

import lombok.Data;
import sheepback.domain.Address;
import sheepback.domain.DeliveryStatus;
import sheepback.domain.Status;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class OrderDetailDto {

    private String name;
    private Address address;
    private String phoneNumber;
    private String requirements;
    private DeliveryStatus deliveryStatus;
    private Long orderId;
    private String mainUrl;
    private String title;
    private Long count;
    private Long orderPrice;
    private Long deliveryFee;
    private String paymentMethod;
    private Long point;
    private Status status;
    private LocalDate orderDate;

    public OrderDetailDto(String name, Address address,
                          String phoneNumber, String requirements,
                          DeliveryStatus deliveryStatus, Long orderId,
                          String mainUrl, String title, Long count, Long orderPrice,
                          Long deliveryFee, String paymentMethod,
                          Long point, Status status, LocalDateTime orderDate) {
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.requirements = requirements;
        this.deliveryStatus = deliveryStatus;
        this.orderId = orderId;
        this.mainUrl = mainUrl;
        this.title = title;
        this.count = count;
        this.orderPrice = orderPrice;
        this.deliveryFee = deliveryFee;
        this.paymentMethod = paymentMethod;
        this.point = point;
        this.status = status;
        this.orderDate = orderDate.toLocalDate();
    }
}
