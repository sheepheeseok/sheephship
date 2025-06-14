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

    List<MemberDeliveryInfoDto> getDeliveryInfoListByMemberId(@Param("memberId") String memberId);
}
