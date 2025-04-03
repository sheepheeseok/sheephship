package sheepback.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

@PostMapping("/api/itemFindById")
    public AllItemDto getItemById(@RequestBody getIdRequest request){

    return itemService.getItemById(request.getId());
}

    @Data
    private static class getIdRequest {
    private Long id;
    }
}
