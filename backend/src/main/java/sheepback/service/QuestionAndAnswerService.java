package sheepback.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sheepback.repository.QuestionAnswerRepository;
import sheepback.repository.QuestionRepository;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class QuestionAndAnswerService {

    private QuestionAnswerRepository questionAnswerRepository;
    private QuestionRepository questionRepository;




}
