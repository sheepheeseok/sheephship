package sheepback.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sheepback.repository.ItemQuery.HasSizeItemDto;
import sheepback.repository.ItemQuery.NoHasSizeItemDto;
import sheepback.service.ItemService;

@RestController
@RequiredArgsConstructor
public class ItemDetailApiController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/api/NoSizeProduct/{id}")
    public NoHasSizeItemDto getItemById(@PathVariable("id") Long id) {
        return itemService.getItemById(id);
    }

    @GetMapping("/api/HasSizeProduct/{id}")
    public HasSizeItemDto getItemById_size(@PathVariable("id") Long id) {
        return itemService.getItemById_size(id);
    }
}
