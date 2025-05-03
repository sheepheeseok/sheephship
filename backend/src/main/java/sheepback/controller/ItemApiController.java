package sheepback.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sheepback.Dtos.ItemDto;
import sheepback.service.ItemService;

@RestController
public class ItemApiController {

    @Autowired
    private ItemService itemService;

    @PostMapping
    public ResponseEntity<String> createItem(@RequestBody ItemDto itemDto) {
        // 여기서 itemDto로 필요한 로직 처리 (예: DB 저장 등)
        // 예: itemService.save(itemDto);

        // 디버깅용 로그
        System.out.println("받은 아이템: " + itemDto);

        // 성공 응답 반환
        return ResponseEntity.ok("아이템 등록 성공");
    }


    @GetMapping("/api/showItem/{id}")
    public ItemDto getItemById(@PathVariable("id") Long id) {
        ItemDto itemById = itemService.getItemById(id);
        return itemById;
    }
}
