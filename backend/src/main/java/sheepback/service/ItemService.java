package sheepback.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import sheepback.domain.Category;
import sheepback.domain.item.Color;
import sheepback.domain.item.Item;
import sheepback.domain.item.ItemImg;
import sheepback.domain.item.Size;
import sheepback.repository.ItemQuery.HasSizeItemDto;
import sheepback.repository.ItemQuery.NoHasSizeItemDto;
import sheepback.repository.ItemQuery.ItemByCategorySimpleDto;
import sheepback.repository.ItemCategoryRepository;
import sheepback.repository.ItemQuery.SearchItemSimplDto;
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
        itemRepository.noSizeSave(item, categories, itemImg, colors);
    }

    public void inserthasSize(Item item, List<Category> categories, ItemImg itemImg,
                           List<Color> colors, List<Size> sizes) {
        itemRepository.hasSizeSave(item, categories, itemImg, colors, sizes);
    }

    //아이디 받아 상세 제품 전체 보내주기
    public NoHasSizeItemDto getItemById(Long id) {
        NoHasSizeItemDto itemById = itemRepository.getAllItembyId(id);
        return itemById;
    }

    public HasSizeItemDto getItemById_size(Long id) {
        HasSizeItemDto itemById = itemRepository.getAllItembyId_size(id);
        return itemById;
    }

    //업데이트 만들기
//    public Item
//    UpdateItem(Item item) {
//
//    }

    public boolean getCountByItemId(Long id) {
        boolean check = itemRepository.getCountHasSize(id);
        return check;
    }

    //아이템 검색
    public Page<SearchItemSimplDto> searchItemsPage(String keyword, String searchType, Pageable pageable) {
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

        List<SearchItemSimplDto> searchItems = itemRepository.searchItems(keyword,searchType,adjustedPageable);
        Long total = (searchItems.equals("name")) ?itemRepository.countByName(keyword) : itemRepository.countByProduce(keyword);

        return new PageImpl<>(searchItems, adjustedPageable, total);
    }

    //카테고리로 아이템 찾기
    public PageImpl<ItemByCategorySimpleDto> findByCategory(String categoryName, Pageable pageable) {
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

        // 4. 데이터 조회
        List<ItemByCategorySimpleDto> items = itemRepository.findItemsByCategory(categoryName, adjustedPageable);
        Long total = itemRepository.countItemsByCategory(categoryName);

        // 5. Page 객체 생성
        return new PageImpl<>(items, adjustedPageable, total);
    }

    //검색기능으로 아이템 찾기

}
