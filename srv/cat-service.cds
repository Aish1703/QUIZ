using my.quizapp as my from '../db/data-model';

service CatalogService {
    // @readonly entity Questions as projection on my.Questions;
    entity Users as projection on my.Users;
    entity Quiz  as projection on my.Quiz;
    action addUser(user_name : String)                                                            returns Integer;
    action updateQuiz(user_id : Integer, category : String, difficulty : String, score : Integer) returns Integer;

}
