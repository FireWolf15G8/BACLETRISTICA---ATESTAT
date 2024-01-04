const quizData = [
  {
    question: 'Ce poate semnifica simbolul luminii în poezia blagiană?',
    options: ['Cunoaștere', 'Eternitate', 'Moarte', 'Abolut'],
    answer: 'Cunoaștere',
  },
  {
    question: 'Care este tema poeziei Luceafărul de M. Eminescu?',
    options: ['Iubirea', 'Geniul', 'Problematizrea urâtului', 'Exitența'],
    answer: 'Geniul',
  },
  {
    question: 'Care este scopul comicului de caracter în piesa O scrioare pierdută de I.L.Caragiale?',
    options: ['Moralizator, conturând personajele ridicole prin trăsături negative', 'Pur estetic', 'De a evidenția perpectiva filosofică a lui Caragiale', 'Pentru a contrui portretul lui Nae Cațavencu'],
    answer: 'Moralizator, conturând personajele ridicole prin trăsături negative',
  },
  {
    question: 'Ce încercă să prezinte I. Slavici în nuvela Moara cu Noroc?',
    options: ['Conecințele setei de înavuțire aupra individului', 'Anliza psihologică a izolării umane', 'O perspectivă filosofică unică asupra morții', 'Mediul rural românesc de la finalul de secol 19'],
    answer: 'Conecințele setei de înavuțire aupra individului',
  },
  {
    question: 'În romanul Ion al lui Liviu Rebreanu, ce reprezintă pământul?',
    options: [
      'O forță exterioară, dictatorială aupra omului', 'O formă de avere', 'O formă inferioară a omului', 'Moarte',],
    answer: 'O forță exterioară, dictatorială aupra omului',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `Ai nimerit ${score} din ${quizData.length} întrebări!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Întrebare:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Răspunul dvs:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Răspunsul corect:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>Ai nimerit ${score} din ${quizData.length} întrebări!</p>
    <p>Întrebări greșite:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();