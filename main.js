const container = document.querySelector('.main');
let answers = [];
window.onload = event => {
    setTimeout( e => {
        document.querySelector('body').classList.add('loaded');
    },1000);

    let xhr = new XMLHttpRequest();
    xhr.open('GET','https://opentdb.com/api.php?amount=10&type=boolean', true);
    xhr.send();
    xhr.addEventListener('load', a => {
        if(xhr.status == 200) {
            const result = JSON.parse(xhr.response);
            for(let i=0; i<result.results.length; i++) {
                let questionSection = document.createElement('div');
                let categoryElement = document.createElement('div');
                let categorySpan = document.createElement('span');
                let difficultySpan = document.createElement('span');
                let questionElement = document.createElement('div');
                let answersElement = document.createElement('div');
                let sepDiv = document.createElement('div');
                let trueAnswer = document.createElement('button');
                let falseAnswer = document.createElement('button');

                answers.push(result.results[i].correct_answer);

                questionSection.className = 'container';
                categoryElement.className = 'quest__header';
                categorySpan.className = 'quest__header__category';
                difficultySpan.className = 'quest__header__difficulty';
                questionElement.className = 'question';
                answersElement.className = 'answers';
                sepDiv.className = 'sep'; 
                trueAnswer.className = 'answer';
                falseAnswer.className = 'answer';

                categorySpan.innerText = i+1 + '. ' + result.results[i].category;
                difficultySpan.innerText = result.results[i].difficulty;
                questionElement.innerHTML = result.results[i].question;
                trueAnswer.innerText = 'True';
                falseAnswer.innerText = 'False';
                
                container.appendChild(questionSection);
                questionSection.appendChild(categoryElement);
                categoryElement.appendChild(categorySpan);
                categoryElement.appendChild(difficultySpan);
                questionSection.appendChild(questionElement);
                questionSection.appendChild(answersElement);
                answersElement.appendChild(trueAnswer);
                answersElement.appendChild(falseAnswer);
                container.appendChild(sepDiv);
                if(i<9) {
                    for(let j=0; j<3; j++) { 
                        let sepStar = document.createElement('i');
                        sepStar.className = 'fas fa-star'
                        sepDiv.appendChild(sepStar) 
                    }
                }  
            }
        } else {
            container.innerText = 'Error 404 - not found';
        }


        // ADD CHECK BUTTON
        let checkButton = document.createElement('a');
        checkButton.className = 'check';
        checkButton.href = '#top';
        checkButton.innerText = 'Check answers';
        container.appendChild(checkButton);

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });


        // ADD CLASS TO BUTTON
        const answerButtons = document.querySelectorAll('.answer');
        for(let i=0; i<answerButtons.length; i++) {
            answerButtons[i].addEventListener('click', a => {
                answerButtons[i].classList.toggle('user__choice');
            })
        }

        
        // DISPLAY SCORE
        document.querySelector('.check').addEventListener('click', a => {
            const userChoice = document.querySelectorAll('.user__choice');
            if(userChoice.length > 10) {
                alert("You can't select more than one option in each question");
            } else if(userChoice.length < 10) {
                alert('You should give answer on all questions');
            } else {
                let score = 0;
                for(let i=0; i<answers.length; i++) {
                    if(userChoice[i].innerText == answers[i]) {
                        score += 1;
                    }
                }
                let scoreDiv = document.createElement('div');
                scoreDiv.className = 'score';
                if(score == 1) {
                    scoreDiv.innerText = 'Your score is ' + score + ' point.';
                } else {
                    scoreDiv.innerText = 'Your score is ' + score + ' points.';
                }
                container.prepend(scoreDiv);


                // ADD BORDER TO CORRECT ANSWERS
                for(let i=0; i<userChoice.length; i++) {
                    if(userChoice[i].innerText == answers[i]) {
                        userChoice[i].classList.add('correct__answer');
                    } else {
                        userChoice[i].classList.add('incorrect__answer');
                    }
                    userChoice[i].classList.remove('user__choice');
                }
            }
        })
    })
}

