package sheepback.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sheepback.repository.ItemCategoryRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ItemCategoryService {

    private final ItemCategoryRepository itemCategoryRepository;




}
