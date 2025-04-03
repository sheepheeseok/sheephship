package sheepback.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sheepback.repository.ItemQuery.AllItemDto;
import sheepback.service.ItemService;

@RestController
@RequiredArgsConstructor
public class ItemDetailApiController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/api/product/{id}")
    public AllItemDto getItemById(@PathVariable("id") Long id) {
        return itemService.getItemById(id);
    }

}
