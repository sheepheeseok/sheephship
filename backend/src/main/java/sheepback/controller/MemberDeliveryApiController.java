package sheepback.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sheepback.Dtos.MemberDeliveryInfoDto;
import sheepback.service.MemberDeliveryInfoService;

import java.util.List;

@RestController
@RequestMapping("/api/delivery-info")
public class MemberDeliveryApiController {

    @Autowired
    private MemberDeliveryInfoService memberDeliveryInfoService;

    // 배송정보 등록
    @PostMapping("/insert")
    public ResponseEntity<Void> createDeliveryInfo(
            @RequestBody MemberDeliveryInfoDto dto,
            @CookieValue("loginId") String memberId) {
        dto.setMemberId(memberId); // 쿠키에서 가져온 memberId 설정
        memberDeliveryInfoService.insertDeliveryInfo(dto);
        return ResponseEntity.ok().build();
    }

    // 배송정보 수정
    @PutMapping("/update/{deliveryInfoId}")
    public ResponseEntity<Void> updateDeliveryInfo(
            @PathVariable("deliveryInfoId") Long deliveryInfoId,
            @RequestBody MemberDeliveryInfoDto dto,
            @CookieValue("loginId") String memberId) {
        dto.setDeliveryInfoId(deliveryInfoId);
        dto.setMemberId(memberId); // 쿠키에서 가져온 memberId 설정
        memberDeliveryInfoService.updateDeliveryInfo(dto);
        return ResponseEntity.ok().build();
    }

    // 배송정보 삭제
    @DeleteMapping("/delete/{deliveryInfoId}")
    public ResponseEntity<Void> deleteDeliveryInfo(
            @PathVariable("deliveryInfoId") Long deliveryInfoId,
            @CookieValue("loginId") String memberId) {
        memberDeliveryInfoService.deleteDeliveryInfo(memberId, deliveryInfoId);
        return ResponseEntity.ok().build();
    }

    // 회원 배송정보 목록 조회
    @GetMapping
    public ResponseEntity<List<MemberDeliveryInfoDto>> getDeliveryInfos(
            @CookieValue("loginId") String memberId) {
        List<MemberDeliveryInfoDto> dtos = memberDeliveryInfoService.findByMemberId(memberId);
        return ResponseEntity.ok(dtos);
    }
}
