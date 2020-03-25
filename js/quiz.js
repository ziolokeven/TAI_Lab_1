fetch('https://quiztai.herokuapp.com/api/quiz')
    .then(resp => resp.json())
    .then(resp => {
        preQuestions = resp;
        let next = document.querySelector('.next');
        let previous = document.querySelector('.previous');

        let question = document.querySelector('.question');
        let answers = document.querySelectorAll('.list-group-item');

        let pointsElem = document.querySelector('.score');
        let restart = document.querySelector('.restart');
        let index = 0;
        let points = 0;
        let averagePoints = document.querySelector('.average');
        let questionNumber =  document.querySelector("#questionNumber");
        let answerTab =[];
        activateAnswers();

        function setQuestion(index) {

            questionNumber.innerHTML = " " + (index + 1);
            question.innerHTML = preQuestions[index].question;

            answers[0].innerHTML = preQuestions[index].answers[0];
            answers[1].innerHTML = preQuestions[index].answers[1];
            answers[2].innerHTML = preQuestions[index].answers[2];
            answers[3].innerHTML = preQuestions[index].answers[3];
            answers[0].style.background = "white";
            answers[1].style.background = "white";
            answers[2].style.background = "white";
            answers[3].style.background = "white";
            if (preQuestions[index].answers.length === 2) {
                answers[2].style.display = 'none';
                answers[3].style.display = 'none';
            } else {
                answers[2].style.display = 'block';
                answers[3].style.display = 'block';

            }
        }

        setQuestion(0);

        next.addEventListener('click', function (event) {
            if(index != preQuestions.length-1){
                index++;
                setQuestion(index);
                activateAnswers();
                saveResults();
            }
        });


        previous.addEventListener('click', function (event) {//zabezpieczenie, na wyjście z tablicy
            if(index != 0) {
                index--;
                setQuestion(index);
                activateAnswers();
            }
        });

        function doAction(event) {

            if (event.target.innerHTML === preQuestions[index].correct_answer) {
                points++;
                pointsElem.innerText = points;
                event.target.style.background = "green";
            }
            else {
                event.target.style.background = "red";

            }

            if(index == (preQuestions.length-1)){
                document.querySelector(".results").style.display = "block";
                document.querySelector(".userScorePoint").innerHTML = points;
            }
            disableAnswers();
        }

        restart.addEventListener('click', function (event) {
            event.preventDefault();

            index = 0;
            points = 0;
            let userScorePoint = document.querySelector('.score');
            userScorePoint.innerHTML = points;
            setQuestion(index);
            activateAnswers();
            document.querySelector(".results").style.display = "none";
        });

        function disableAnswers(){
            for (let i = 0; i < answers.length; i++) {
                answers[i].removeEventListener('click', doAction);
            }
        }

        function activateAnswers(){
            for (let i = 0; i < answers.length; i++) {
                answers[i].addEventListener('click', doAction);
            }
        }


        function saveResults() {
            let gameCount = JSON.parse(localStorage.getItem("gameCount"));
            let sumOfPoint = JSON.parse(localStorage.getItem("sumOfPoint"));
            let avgPoints = 0;

            gameCount += 1;
            sumOfPoint += points;
            avgPoints = sumOfPoint/gameCount;

            averagePoints.innerHTML = avgPoints;

            localStorage.setItem("points", sumOfPoint);
            localStorage.setItem("gameCount", gameCount);
            localStorage.setItem("averagePoints",avgPoints);
        }
    });