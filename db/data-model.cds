namespace my.quizapp;

using {cuid} from '@sap/cds/common';

entity Users {
    key ID     : Integer;
        name   : String;
        quizes : Association to many Quiz
                     on quizes.users = $self;
}

entity Quiz {
    ID         : Integer;
    users      : Association to Users;
    category   : String;
    difficulty : String;
    score      : Integer;
}
