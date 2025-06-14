package sheepback.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sheepback.Dtos.MemberDeliveryInfoDto;
import sheepback.domain.Member;
import sheepback.mapper.MemberDeliveryInfoMapper;

import java.util.List;

@Service
public class MemberDeliveryInfoService {


    @Autowired
    private MemberDeliveryInfoMapper memberDeliveryInfoMapper;

    //배송정보 삽입
    public void insertDeliveryInfo(MemberDeliveryInfoDto dto) {
        memberDeliveryInfoMapper.insertDeliveryInfo(dto);
        if(dto.getBasicDeliveryInfo()== 1){
            memberDeliveryInfoMapper.setrecentDeliveryInfo(dto.getMemberId(), dto.getDeliveryInfoId());
            memberDeliveryInfoMapper.setBasicDeliveryInfo(dto.getDeliveryInfoId());

        }

    }


    //배송정보 수정
    public void updateDeliveryInfo(MemberDeliveryInfoDto dto) {

        if(dto.getBasicDeliveryInfo() == 1){
            memberDeliveryInfoMapper.setrecentDeliveryInfo(dto.getMemberId(), dto.getDeliveryInfoId());
            memberDeliveryInfoMapper.setBasicDeliveryInfo(dto.getDeliveryInfoId());
        }
        memberDeliveryInfoMapper.updateDeliveryInfo(dto);
    }


    //배송정보 삭제
    public void deleteDeliveryInfo(String memberId, Long deliveryInfoId) {
        //배송지 정보 확인후 해당 배송지가 기본 배송지면 아무거나 기본배송지로 만들기
        memberDeliveryInfoMapper.deleteDeliveryInfo(memberId, deliveryInfoId);
    }


    //멤버아이디로 배송정보가져오기
    public List<MemberDeliveryInfoDto> findByMemberId(String memberId) {
       List<MemberDeliveryInfoDto> dtos = memberDeliveryInfoMapper.getDeliveryInfoListByMemberId(memberId);
       return dtos;
    }



}
