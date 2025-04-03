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
        // 단일 정렬 파라미터 처리
        String[] sortParams = request.getSort().split(",");
        Sort.Order order = new Sort.Order(
                Sort.Direction.fromString(sortParams[1]),
                sortParams[0]
        );

        Pageable pageable = PageRequest.of(
                request.getPage(),
                request.getSize(),
                Sort.by(order)  // 단일 정렬 조건 사용
        );

        return itemService.findByCategory(request.getCategory(), pageable);
    }

    @Data
    static class CategoryRequest {
        private String category;
        private int page = 0;
        private int size = 10;
        private String sort = "created,desc";  // List -> String으로 변경
    }
}
