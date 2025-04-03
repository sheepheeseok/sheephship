package sheepback.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;
import sheepback.domain.Category;
import sheepback.domain.item.Color;
import sheepback.domain.item.Item;
import sheepback.domain.item.ItemImg;
import sheepback.repository.ItemQuery.AllItemDto;
import sheepback.repository.ItemQuery.ItemByCategorySimpleDto;
import sheepback.repository.ItemCategoryRepository;
import sheepback.repository.ItemRepository;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemCategoryRepository itemCategoryRepository;

    //아이템 추가
    public void insertItem(Item item, List<Category> categories, ItemImg itemImg,
                           List<Color> colors) {
        itemRepository.save(item, categories, itemImg, colors);
    }

    //아이디 받아 상세 제품 전체 보내주기
    public AllItemDto getItemById(Long id) {
        AllItemDto itemById = itemRepository.getAllItembyId(id);
        return itemById;
    }



    //아이템 검색
    public Page<Item> searchItemsPage(String keyword,String searchType,Pageable pageable) {
        // 1. 기본 정렬 조건 설정
        Sort defaultSort = Sort.by(
                Sort.Order.desc("created"));

        // 2. 요청 정렬 조건과 결합
        Sort combinedSort = pageable.getSort().and(defaultSort);

        // 3. 조정된 Pageable 생성
        Pageable adjustedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                combinedSort
        );


        List<Item> items = itemRepository.searchItems(keyword,searchType,adjustedPageable);
        Long total = itemRepository.countByName(keyword);

        return new PageImpl<>(items, adjustedPageable, total);
    }

    //카테고리로 아이템 찾기
    public PageImpl<ItemByCategorySimpleDto> findByCategory(String categoryName, Pageable pageable) {
        // 1. 기본 정렬 조건 설정
        Sort defaultSort = Sort.by(
                Sort.Order.desc("created"),
                Sort.Order.desc("price"),
                Sort.Order.desc("salesVolume")
        );

        // 2. 요청 정렬 조건과 결합
        Sort combinedSort = pageable.getSort().and(defaultSort);

        // 3. 조정된 Pageable 생성
        Pageable adjustedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                combinedSort
        );

        // 4. 데이터 조회
        List<ItemByCategorySimpleDto> items = itemRepository.findItemsByCategory(categoryName, adjustedPageable);
        Long total = itemRepository.countItemsByCategory(categoryName);

        // 5. Page 객체 생성
        return new PageImpl<>(items, adjustedPageable, total);
    }

    //검색기능으로 아이템 찾기

}
