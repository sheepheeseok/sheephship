package sheepback.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;
import sheepback.domain.Category;
import sheepback.domain.item.Color;
import sheepback.domain.item.Item;
import sheepback.domain.item.ItemImg;
import sheepback.repository.ItemRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    //아이템 추가
    public void insertItem(Item item, List<Category> categories, ItemImg itemImg,
                           List<Color> colors) {
        itemRepository.save(item, categories, itemImg, colors);
    }



    //아이템 검색
    public Page<Item> searchItemsPage(String keyword,String searchType, @PageableDefault(size = 10, page = 0) Pageable pageable) {
        List<Item> items = itemRepository.searchItems(keyword,searchType,pageable);
        Long total = itemRepository.countByName(keyword);

        return new PageImpl<>(items, pageable, total);
    }

}
