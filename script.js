const quizData = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      correctAnswer: 0
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correctAnswer: 1
    },
    {
      question: "This is a very long question to test the scrolling functionality. What is the result of 2 + 2 multiplied by the square root of 16, divided by the number of continents on Earth?",
      options: ["4", "8", "16", "32"],
      correctAnswer: 1
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 30;
  let quizEnded = false;
  let selectedOption = null;
  
  function startTimer() {
    const timerInterval = setInterval(() => {
      if (timeLeft > 0 && !quizEnded) {
        timeLeft--;
        updateProgressBar();
      } else {
        clearInterval(timerInterval);
        if (!quizEnded) handleNextQuestion();
      }
    }, 1000);
  }
  
  function renderQuiz() {
    const quizContent = document.getElementById('quiz-content');
    quizContent.innerHTML = `
      <div class="question-info">
        <div>Question ${currentQuestion + 1} of ${quizData.length}</div>
        <div>Time left: ${timeLeft}s</div>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-inner" id="progress-bar-inner"></div>
      </div>
      <h2>${quizData[currentQuestion].question}</h2>
      <div class="options">
        ${quizData[currentQuestion].options.map((option, index) => `
          <div class="option" data-index="${index}" onclick="handleOptionSelect(${index})">${option}</div>
        `).join('')}
      </div>
      <div class="score">Score: ${score}</div>
    `;
    updateProgressBar();
  }
  
  function updateProgressBar() {
    const progressBarInner = document.getElementById('progress-bar-inner');
    progressBarInner.style.width = `${(timeLeft / 30) * 100}%`;
  }
  
  function handleOptionSelect(index) {
    if (selectedOption === null) {
      selectedOption = index;
      const options = document.querySelectorAll('.option');
      if (index === quizData[currentQuestion].correctAnswer) {
        options[index].classList.add('correct');
        score++;
      } else {
        options[index].classList.add('incorrect');
        options[quizData[currentQuestion].correctAnswer].classList.add('correct');
      }
      setTimeout(handleNextQuestion, 1000);
    }
  }
  
  function handleNextQuestion() {
    selectedOption = null;
    timeLeft = 30;
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      renderQuiz();
    } else {
      quizEnded = true;
      renderEndScreen();
    }
  }
  
  function renderEndScreen() {
    const quizContent = document.getElementById('quiz-content');
    quizContent.innerHTML = `
      <h2>Your Score: ${score} / ${quizData.length}</h2>
      <div class="progress-bar">
        <div class="progress-bar-inner" style="width: ${(score / quizData.length) * 100}%"></div>
      </div>
      <p>${score === quizData.length ? 'Perfect score! Congratulations!' : score > quizData.length / 2 ? 'Great job! You did well.' : 'Keep practicing. You can do better!'}</p>
      <button onclick="resetQuiz()">Restart Quiz</button>
    `;
  }
  
  function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 30;
    quizEnded = false;
    selectedOption = null;
    renderQuiz();
    startTimer();
  }
  
  // Initial render
  renderQuiz();
  startTimer();
  