package sheepback.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import sheepback.domain.Review;
import sheepback.domain.ReviewAnswer;
import sheepback.repository.ReviewQuery.ReviewAndAnswerDto;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@AllArgsConstructor
public class ReviewRepository {

    private final EntityManager em;

    public void save(Review review) {
        em.persist(review);
        em.flush();
        em.clear();
    }

    public void delete(Review review) {
        em.createQuery("delete from Review r where r.id = :reviewId")
                .setParameter("reviewId", review.getId())
                .executeUpdate();
        em.flush();
        em.clear();
    }

    public List<ReviewAndAnswerDto> findAll(Long itemId, Pageable pageable) {
        List<Review> reviews = em.createQuery(
                        "SELECT DISTINCT r FROM Review r " +
                                "JOIN FETCH r.reviewAnswer ra " +
                                "JOIN FETCH r.item i " +
                                "WHERE i.id = :itemId " +
                                "ORDER BY r.writeDateTime DESC", Review.class)
                .setParameter("itemId", itemId)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();

        return reviews.stream()
                .map(ReviewAndAnswerDto::new)
                .collect(Collectors.toList());
    }


    public Long countAll(Long itemId) {
        return em.createQuery("select count(r) from Review r " +
                        "join r.item i where i.id = :itemId", Long.class)
                .setParameter("itemId", itemId)
                .getSingleResult();
    }


    public Review findById(Long id) {
        Review review = em.find(Review.class, id);
        return review;
    }
}
