document.addEventListener('DOMContentLoaded',()=>{

    const start = document.getElementById('startBtn')
    const restart = document.getElementById('restartBtn')
    const next = document.getElementById('nextBtn')
    const questionContainer = document.getElementById('question-container')
    const question = document.getElementById('question')
    const choiceList = document.getElementById('choices')
    const resultContainer = document.getElementById('resultContainer')

    const questions = [
        {
          question: "What is the capital of France?",
          choices: ["Paris", "London", "Berlin", "Madrid"],
          answer: "Paris",
        },
        {
          question: "Which planet is known as the Red Planet?",
          choices: ["Mars", "Venus", "Jupiter", "Saturn"],
          answer: "Mars",
        },
        {
          question: "Who wrote 'Hamlet'?",
          choices: [
            "Charles Dickens",
            "Jane Austen",
            "William Shakespeare",
            "Mark Twain",
          ],
          answer: "William Shakespeare",
        },
    ];

    let currentIndex = 0;
    let score = 0;

    start.addEventListener('click', startQuiz)
    next.addEventListener('click', ()=>{
        currentIndex++
        if(currentIndex < questions.length){
           showQuestion() 
        }
        else{
            showResult()
        }
    });

    restart.addEventListener("click", () => {
        currentIndex = 0;
        score = 0;
        restart.classList.add('hideIt');
        resultContainer.classList.add("hidden");
        startQuiz();
      });

    function startQuiz(){
        start.classList.add("hidden");
        resultContainer.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        showQuestion();
    }

    function showQuestion(){
        questionContainer.classList.remove('hideIt');
        question.textContent = `${questions[currentIndex]['question']}`
        choiceList.innerHTML = ''
        questions[currentIndex]['choices'].forEach(choice => {
            const li = document.createElement('li')
            li.innerHTML = `${choice}`
            li.addEventListener('click', () => {
                li.classList.add('alice')
                selected(choice)
            })
            choiceList.appendChild(li)
        })
        start.classList.add('hideIt')
    }

    function selected(choice){
        // choice.classList.add('alice')
        if(choice === questions[currentIndex]['answer']){
            score++;
        }
        next.classList.remove('hideIt')
    }

    function showResult(){
        questionContainer.classList.add('hideIt')
        next.classList.add('hideIt')
        resultContainer.classList.remove('hideIt')
        resultContainer.classList.remove('hidden')
        resultContainer.textContent = `Your Score is ${score} out of ${questions.length}`
        restart.classList.remove('hideIt')
    }

})