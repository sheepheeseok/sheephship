package sheepback.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import sheepback.repository.ItemQuery.AllItemDto;
import sheepback.service.ItemService;

@RestController
@RequiredArgsConstructor
public class ItemDetailApiController {

    @Autowired
    private ItemService itemService;

    @PostMapping("/api/product/{id}")
    public AllItemDto getItemById(@PathVariable Long id){

    return itemService.getItemById(id);
}


}
