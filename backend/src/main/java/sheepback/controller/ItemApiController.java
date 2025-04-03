package sheepback.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;
import sheepback.repository.ItemQuery.ItemByCategorySimpleDto;
import sheepback.service.ItemService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ItemApiController {

    private final ItemService itemService;

    @PostMapping("/api/getItemByCategory")
    public PageImpl<ItemByCategorySimpleDto> getItemByCategory(@RequestBody CategoryRequest request) {
        // Sort 생성
        List<Sort.Order> orders = request.getSort().stream()
                .map(s -> {
                    String[] parts = s.split(",");
                    return new Sort.Order(
                            Sort.Direction.fromString(parts[1]),
                            parts[0]
                    );
                })
                .toList();

        // Pageable 생성
        Pageable pageable = PageRequest.of(
                request.getPage(),
                request.getSize(),
                Sort.by(orders)
        );

        return itemService.findByCategory(request.getCategory(), pageable);
    }

    @Data
    static class CategoryRequest {
        private String category;
        private int page = 0;
        private int size = 10;
        private List<String> sort = List.of("created,desc", "price,desc"); // 기본값
    }
}
