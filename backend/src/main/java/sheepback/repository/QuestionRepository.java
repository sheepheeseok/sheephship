package sheepback.repository;


import jakarta.persistence.EntityManager;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import sheepback.domain.ItemQuestion;

@Repository
@AllArgsConstructor
public class QuestionRepository {
    private final EntityManager em;

    public void save(ItemQuestion itemQuestion) {
        em.persist(itemQuestion);

        em.flush();
        em.clear();
    }

    public void delete(ItemQuestion itemQuestion) {
        em.remove(itemQuestion);

        em.flush();
        em.clear();
    }

//    public Page<ItemQuestion> findAll(Pageable pageable) {
//
//    }


}
