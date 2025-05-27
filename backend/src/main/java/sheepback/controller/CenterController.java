package sheepback.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sheepback.Dtos.*;
import sheepback.service.CenterService;

import java.util.List;

@RestController
@RequestMapping("/api/centers")
public class CenterController {

    @Autowired
    private CenterService centerService;

    // 센터 생성
    @PostMapping("/createCenter")
    public String createCenter(@RequestBody SaveCenterDto center) {
        centerService.createCenter(center);
        return "success create center";
    }

    // 센터 수정
    @PutMapping("/updateCenter/{centerId}")
    public String updateCenter(@PathVariable("centerId") Long centerId, @RequestBody SaveCenterDto dto) {
        centerService.updateCenter(centerId, dto);
        return "success update center";
    }

    // 센터 삭제
    @DeleteMapping("/delete/{centerId}")
    public String deleteCenter(@PathVariable("centerId") Long centerId) {
        centerService.deleteCenter(centerId);
        return "success delete center";
    }

    // admin 센터 리스트 정보 다 가져오기
    @GetMapping("/all")
    public List<CenterDto> getAllCenters() {
        return centerService.getAllCenters();
    }

    // 체인점 별로 센터 리스트 가져오기
    @GetMapping("/chain-centers")
    public List<ChainCenterListDto> getAllByChainCenter() {
        return centerService.getAllByChainCenter();
    }

    // 체인점 별로 센터 정보들 가져오기
    @GetMapping("/chain-centers/{chainName}")
    public List<ChainCenterDetailListDto> getAllByChainCenter(@PathVariable("chainName") String chainName) {
        return centerService.getAllByChainCenter(chainName);
    }

    // 체인점 리스트만 가져오기
    @GetMapping("/chains")
    public List<ChainListDto> getAllChainList() {
        return centerService.getAllChainList();
    }
}