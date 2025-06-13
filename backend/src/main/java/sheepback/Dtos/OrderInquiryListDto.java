package sheepback.Dtos;

import lombok.Data;
import sheepback.domain.Status;

import java.time.LocalDate;
import java.util.List;

@Data
public class OrderInquiryListDto {
    private Long orderId;
    private LocalDate orderDate;
    private Status status;
    List<OrderInquiryItemDto> orderInquiryItemDtoList;
}
