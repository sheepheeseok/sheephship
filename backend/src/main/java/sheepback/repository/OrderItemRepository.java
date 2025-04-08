package sheepback.repository;

import jakarta.persistence.EntityManager;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import sheepback.domain.OrderItems;
import sheepback.domain.exception.OutOfStockException;
import sheepback.domain.item.Color;
import sheepback.domain.item.Item;
import sheepback.domain.item.Size;

@Repository
@AllArgsConstructor
public class OrderItemRepository {

    private final EntityManager em;

    public void save(OrderItems orderItems) {
        em.persist(orderItems);
    }






}
