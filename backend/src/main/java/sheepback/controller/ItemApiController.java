package sheepback.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;
import sheepback.repository.ItemQuery.ItemByCategorySimpleDto;
import sheepback.repository.ItemQuery.SearchItemSimplDto;
import sheepback.service.ItemService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ItemApiController {

    private final ItemService itemService;

    @PostMapping("/api/searchItems")
    public Page<SearchItemSimplDto> searchItems(@RequestBody SearchRequest request) {

        String[] sortParams = request.getSort().split(",");
        Sort.Order order = new Sort.Order(
                Sort.Direction.fromString(sortParams[1]),
                sortParams[0]
        );

        // Pageable 생성
        Pageable pageable = PageRequest.of(
                request.getPage(),
                request.getSize(),
                Sort.by(order)
        );
        return itemService.searchItemsPage(request.getKeyword(), request.getSearchType(), pageable);
    }



    @PostMapping("/api/getItemByCategory")
    public PageImpl<ItemByCategorySimpleDto> getItemByCategory(@RequestBody CategoryRequest request) {
        // 단일 정렬 파라미터 처리
        String[] sortParams = request.getSort().split(",");
        Sort.Order order = new Sort.Order(
                Sort.Direction.fromString(sortParams[1]),
                sortParams[0]
        );
        // Pageable 생성
        Pageable pageable = PageRequest.of(
                request.getPage(),
                request.getSize(),
                Sort.by(order)
        );

        return itemService.findByCategory(request.getCategory(), pageable);
    }

    @Data
    private static class SearchRequest {
        private String keyword;
        private String searchType;
        private int page;
        private int size;
        private String sort = "created,desc";  // List -> String으로 변경
    }


    @Data
    static class CategoryRequest {
        private String category;
        private int page = 0;
        private int size = 10;
        private String sort = "created,desc";  // List -> String으로 변경
    }
}
