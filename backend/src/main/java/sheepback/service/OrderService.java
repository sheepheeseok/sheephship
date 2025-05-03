package sheepback.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sheepback.Dtos.DeliveryInfoDto;
import sheepback.domain.*;
import sheepback.domain.item.Item;
import sheepback.mapper.OrderMapper;
import sheepback.repository.MemberRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;
    //주문 기존 배송지 가져오기
    public DeliveryInfoDto getDeliveryInfoById(String memberId){
        DeliveryInfoDto deliveryInfoByMemberId = orderMapper.getDeliveryInfoByMemberId(memberId);
        return deliveryInfoByMemberId;
    }

    //장바구니 바로구매 포함 주문페이지 이동시 해당 아이템 가져오기

    //주문시에 주문데이터 주문아이템 데이터 배송정보추가후 아이템 재고 -1

    //주문 취소시 주문취소로 STATUS 데이터 변경후 재고 +1

    //주문한 상품 리스트 정보 가져오기

    //주문상세정보 가져오기


}
