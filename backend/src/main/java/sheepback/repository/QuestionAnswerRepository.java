package sheepback.repository;


import jakarta.persistence.EntityManager;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import sheepback.domain.QuestionAnswer;
import sheepback.domain.ReviewAnswer;

@Repository
@AllArgsConstructor
public class QuestionAnswerRepository {

    private final EntityManager em;

    public void save(QuestionAnswer questionAnswer) {
        em.persist(questionAnswer);
        em.flush();
        em.clear();
    }

    public void delete(Long id) {
        em.createQuery("delete from QuestionAnswer qa where qa.id = :id")
                .setParameter("id", id)
                .executeUpdate();
        em.flush();
        em.clear();
    }

    public QuestionAnswer findByQuestionId(Long questionId) {
        return em.find(QuestionAnswer.class, questionId);
    }



}
