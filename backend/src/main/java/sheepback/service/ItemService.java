package sheepback.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import sheepback.Dtos.ItemDetailSimpleDto;
import sheepback.Dtos.ItemDto;
import sheepback.Dtos.ItemImgSimpleDto;
import sheepback.domain.Category;
import sheepback.domain.item.Item;
import sheepback.domain.item.ItemImg;
import sheepback.mapper.ItemMapper;


import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Service
public class ItemService {

    @Autowired
    private ItemMapper itemMapper;

    public ItemDto getItemById(Long id) {
        HashMap<String, Object> itemById = itemMapper.getItemById(id);
        ItemImgSimpleDto itemImgById = itemMapper.getItemImgById(id);
        List<ItemDetailSimpleDto> itemDetail = itemMapper.getItemDetail(id);

        return new ItemDto(
                (Long) itemById.get("item_id"),
                (String) itemById.get("name"),
                (String) itemById.get("produce"),
                (LocalDateTime) itemById.get("created"),
                (Long) itemById.get("price"),
                (String) itemById.get("main_url"),
                (Long) itemById.get("sales_volume"),
                (String) itemById.get("contents"),
                itemDetail,
                itemImgById
        );
    }

    public void insertItem(ItemDto insetItemDto) {

        itemMapper.insertItemImg(insetItemDto.getImage());
        itemMapper.insertItem(insetItemDto);
    }

    public List<RecentItemDto> getRecent

}

    //아이템 추가

    //아이디 받아 상세 제품 전체 보내주기


    //업데이트 만들기
//    public Item
//    UpdateItem(Item item) {
//
//    }


    //아이템 검색


    //카테고리로 아이템 찾기


    //검색기능으로 아이템 찾기


