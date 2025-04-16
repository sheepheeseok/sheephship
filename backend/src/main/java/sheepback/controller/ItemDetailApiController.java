package sheepback.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sheepback.repository.ItemQuery.HasSizeItemDto;
import sheepback.repository.ItemQuery.NoHasSizeItemDto;
import sheepback.service.ItemService;

@RestController
@RequiredArgsConstructor
public class ItemDetailApiController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/api/Product/{id}")
    public ResponseEntity<?> etItemById(@PathVariable("id") Long id) {
        boolean countSizeByItemId = itemService.getCountByItemId(id);
        if (countSizeByItemId){
            return ResponseEntity.ok(itemService.getItemById_size(id));
         }else{
            return ResponseEntity.ok(itemService.getItemById(id));
        }

    }

}
