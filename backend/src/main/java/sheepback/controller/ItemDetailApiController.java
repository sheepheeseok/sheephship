package sheepback.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import sheepback.Dtos.ItemDto;
import sheepback.service.ItemService;

@RestController
@RequiredArgsConstructor
public class ItemDetailApiController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/api/showItem/{id}")
    public ItemDto getItemById(@PathVariable("id") Long id) {
        ItemDto itemById = itemService.getItemById(id);
        return itemById;
    }


}
