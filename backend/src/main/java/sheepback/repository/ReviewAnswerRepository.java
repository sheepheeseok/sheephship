package sheepback.repository;

import jakarta.persistence.EntityManager;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import sheepback.domain.Review;
import sheepback.domain.ReviewAnswer;


@Repository
@AllArgsConstructor
public class ReviewAnswerRepository {


    private final EntityManager em;

    public void save(ReviewAnswer review) {
        em.persist(review);
        em.flush();
        em.clear();
    }

    public void delete(ReviewAnswer review) {

        em.createQuery("delete from ReviewAnswer ra " +
                "where ra.reviewAnswerId = :reviewId")
                .setParameter("reviewId", review.getReviewAnswerId())
                .executeUpdate();
        em.flush();
        em.clear();
    }

    public ReviewAnswer findById(Long id) {
        ReviewAnswer reviewAnswer = em.find(ReviewAnswer.class, id);
        return reviewAnswer;
    }


}
