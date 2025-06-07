package sheepback.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sheepback.Dtos.*;
import sheepback.mapper.CenterMapper;

import java.util.List;

@Service
public class CenterService {
    @Autowired
    private CenterMapper centerMapper;
    //센터생성
    public void createCenter(SaveCenterDto center) {
        centerMapper.insert(center);
    }

    public void updateCenter(Long centerId ,SaveCenterDto dto) {
        centerMapper.update(centerId, dto);
    }

    public void deleteCenter(Long centerId) {
        centerMapper.delete(centerId);
    }
    //admin 센터 리스트 정보 다가져오기
    public List<CenterDto> getAllCenters() {
        return centerMapper.findAll();
    }
    //체인점 별로 센터 리스트 가져오기
    public List<ChainCenterListDto> getAllByChainCenter(){
        List<ChainCenterListDto> chainCenterList = centerMapper.findChainCenterList();
        return chainCenterList;
    }

    //체인점 별로 센터 정보들 가져오기
    public List<ChainCenterDetailListDto> getAllByChainCenter(String chainName){
        List<ChainCenterDetailListDto> chainCenterDetailList = centerMapper.findChainCenterDetailList(chainName);
        return chainCenterDetailList;
    }

    //체인점 리스트만 가져오기
    public List<ChainListDto> getAllChainList(){
        List<ChainListDto> chainListDtos = centerMapper.finAllChainList();
        return chainListDtos;
    }
}
