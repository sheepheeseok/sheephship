package sheepback.repository;


import jakarta.persistence.EntityManager;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import sheepback.domain.ItemQuestion;
import sheepback.domain.QuestionAnswer;
import sheepback.domain.Review;
import sheepback.repository.QuestionQuery.QuestionAndAnswerDto;
import sheepback.repository.ReviewQuery.ReviewAndAnswerDto;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@AllArgsConstructor
public class QuestionRepository {
    private final EntityManager em;

    public void save(ItemQuestion itemQuestion) {
        em.persist(itemQuestion);
        em.flush();
        em.clear();
    }

    public ItemQuestion findById(Long id) {
        return em.find(ItemQuestion.class, id);
    }

    public void delete(ItemQuestion itemQuestion) {
        em.createQuery("DELETE FROM ItemQuestion iq " +
                "WHERE iq.id = :itemQuestion")
                .setParameter("itemQuestion", itemQuestion.getId())
                .executeUpdate();

        em.flush();
        em.clear();
    }

    public QuestionAndAnswerDto findQuestionAndAnswerById(Long id) {
        ItemQuestion questionId = em.createQuery("select distinct iq from ItemQuestion iq " +
                        "join fetch iq.questionAnswers qa " +
                        "where iq.id = :questionId", ItemQuestion.class)
                .setParameter("questionId", id)
                .getSingleResult();

        return new QuestionAndAnswerDto(questionId);
    }


    public List<QuestionAndAnswerDto> findAll(Long itemId, Pageable pageable) {
        List<ItemQuestion> itemQuestions = em.createQuery(
                        "SELECT DISTINCT iq FROM ItemQuestion iq " +
                                "JOIN FETCH iq.questionAnswers qa " +
                                "JOIN FETCH iq.item i " +
                                "WHERE i.id = :itemId " +
                                "ORDER BY iq.writeDateTime DESC", ItemQuestion.class)
                .setParameter("itemId", itemId)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();

        return itemQuestions.stream()
                .map(QuestionAndAnswerDto::new)
                .collect(Collectors.toList());
    }


    public Long countAll(Long itemId) {
        return em.createQuery("select count(r) from Review r " +
                        "join r.item i where i.id = :itemId", Long.class)
                .setParameter("itemId", itemId)
                .getSingleResult();
    }

}
