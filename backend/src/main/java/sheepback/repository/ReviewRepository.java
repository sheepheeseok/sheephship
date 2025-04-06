package sheepback.repository;

import jakarta.persistence.EntityManager;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import sheepback.domain.Review;

@Repository
@AllArgsConstructor
public class ReviewRepository {

    private final EntityManager em;

    public void save(Review review) {
        em.persist(review);
    }

    public void delete(Review review) {
        em.remove(review);
    }

    public Page<Review> findAll(Pageable pageable) {

    }


}
