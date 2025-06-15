package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.MemberDeliveryInfoDto;

import java.util.List;

@Mapper
public interface MemberDeliveryInfoMapper {


    void insertDeliveryInfo(MemberDeliveryInfoDto dto);

    void setrecentDeliveryInfo(@Param("memberId") String memberId, @Param("deliveryInfoId") Long memberDeliveryId);

    void setBasicDeliveryInfo(@Param("deliveryInfoId") Long memberDeliveryId);

    void updateDeliveryInfo(MemberDeliveryInfoDto dto);

    void deleteDeliveryInfo(@Param("memberId") String memberId,@Param("deliveryInfoId") Long deliveryInfoId);

    void setFirstDeliveryAsDefault(@Param("memberId") String memberId);
    List<MemberDeliveryInfoDto> getDeliveryInfoListByMemberId(@Param("memberId") String memberId);

    Long isbasicdeliveryInfo(@Param("memberId") String memberId,@Param("deliveryInfoId") Long deliveryInfoId);
}
