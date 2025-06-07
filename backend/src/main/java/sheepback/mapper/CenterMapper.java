package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.*;

import java.util.List;

@Mapper
public interface CenterMapper {
    void insert(SaveCenterDto center);
    void update(@Param("centerId") Long centerid,@Param("dto") SaveCenterDto dto);
    void delete(Long centerId);
    List<CenterDto> findAll();

    List<ChainCenterListDto> findChainCenterList();
    List<ChainCenterDetailListDto> findChainCenterDetailList(@Param("chainName") String chainName);

    List<ChainListDto> finAllChainList();
}
