package sheepback.Dtos;

import lombok.Data;

import java.util.List;

@Data
public class OrderInquiryListDto {
    private Long orderId;
    List<OrderInquiryItemDto> orderInquiryItemDtoList;
}
