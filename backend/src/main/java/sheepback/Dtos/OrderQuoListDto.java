package sheepback.Dtos;

import lombok.Data;

import java.util.List;

@Data
public class OrderQuoListDto {

    private Long beforeDepositCount;
    private Long pendingCount;
    private Long deliveriedCount;
    private Long cofirmCount;
    private List<OrderInquiryListDto> orderInquiryList;


}
