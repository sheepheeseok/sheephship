package sheepback.service;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import sheepback.domain.Address;
import sheepback.domain.Category;
import sheepback.domain.Grade;
import sheepback.domain.Member;
import sheepback.domain.item.Color;
import sheepback.domain.item.Item;
import sheepback.domain.item.ItemImg;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class InitDb {

    private final InitService initService;

    @PostConstruct
    public void init() {
        //initService.dbInit();
        //initService.create100Item();
        // initService.create1Item();
        initService.createReviewandAnswer();
    }


}
