const store = {
  questions: [
    {
      question: 'How many signs are there in the zodiac?',
      answers: [
        '14',
        '12',
        '10',
        '8'
      ],
      correctAnswer: '12'
    },
    {
      question: 'Which of these zodiac signs are associated with the element of fire?',
      answers: [
        'Gemini',
        'Capricorn',
        'Libra',
        'Leo'
      ],
      correctAnswer: 'Leo'
    },
    {
      question: 'Which of these zodiac signs are associated with the element of air?',
      answers: [
        'Taurus',
        'Aquarius',
        'Pisces',
        'Cancer'
      ],
      correctAnswer: 'Aquarius'
    },
    {
      question: 'Which of these zodiac signs are associated with the element of earth?',
      answers: [
        'Aries',
        'Gemini',
        'Libra',
        'Virgo'
      ],
      correctAnswer: 'Virgo'
    },
    {
      question: 'Which of these zodiac signs are associated with the element of water?',
      answers: [
        'Scorpio',
        'Aries',
        'Aquarius',
        'Sagittarius'
      ],
      correctAnswer: 'Scorpio'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function generateStart() {
  console.log('generateStart');
  return `<div class="start-page">
      <p>Each sign of the zodiac is associated with one of the four elements: earth, air, fire, and water.
      Test your knowledge of the zodiac in this astrology quiz!
      </p>
      <button type="button" id="start-btn" class="btn">Start!</button>
    </div>`;
}

function generateScore() {
  console.log('generateScore');
return `<p class="score-question">Score:${store.score}/${store.questions.length}</p>`;

}

function generateQuestionNumber() {
  console.log('generateQuestionNumber');
  return `<p class="score-question">Question Number:${store.questionNumber + 1}/${store.questions.length}</p>`;
}

function generateAnswers() {
  console.log('generateAnswers');
  const answersArray = store.questions[store.questionNumber].answers;
  let answersHtml = '';
  for(let i = 0; i < answersArray.length; i++) {
    let answer = answersArray[i];
  answersHtml += `
    <div class="question-number-${i}">
      <input type="radio" name="options" id="option${i + 1}" value="${answer}" required> 
      <label for="option${i + 1}">${answer}</label>
     </div>`;
  }
  return answersHtml;

}

function generateQuestions() {
  console.log('generateQuestions');
  let questionNumber = store.questions[store.questionNumber];
  
    return `
    <div>
    <form id="question-form"><div>
        <p class="question">${questionNumber.question}</p>
      </div>
      <div>
        <form>
          ${generateAnswers()}
        </form>
      </div>
      <div id="option-container-id">
      <div class="buttons">
        <button type="submit" id="submit-btn" class="btn">Submit Answer</button>
        <button type="button" id="next-btn" class="hidden btn">Next</button>
        
      </div>
    </form>
    </div>`;
    
  
}
function generateFeedback(answerStatus) {
  console.log('generateFeedback');
  
  let html = '';
  if (answerStatus === true) {
    html = `<p class="feedback-correct">Correct! Good job!</p>`;

  }
  else if (answerStatus === false){
    html = '<p class="feedback-incorrect">Incorrect</p>';
  } else {
    html = '<p>No answer given</p>';
  }
  return html;
}

function generateResults() {
  console.log('generateResults');
  return`<div class="results">
        <p class="results">Congratulations! Your Score is: ${store.score}/${store.questions.length}</p>
        <button type="button" id="restart-btn" class="btn">Restart!</button>
    </div>`;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function render() {
  console.log('render');
  let html = '';

  if(store.quizStarted === false) {
    $('main').html(generateStart());
    return;
    }
  else if(store.quizStarted >= 0 && store.questionNumber < store.questions.length) {
    html = generateQuestions();
    html += generateQuestionNumber()
    html += generateScore();
    $('main').html(html);
    }
    else {
      $('main').html(generateResults());
    }
  
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleStart() {
  $('body').on('click', '#start-btn', function(event) {
    console.log('handleStart');
    store.quizStarted = true;
    render();
    handleSubmit();
  });
}

function handleNext() {
  console.log('handleNext');
  $('main').on('click', '#next-btn', function(event) {
    render();
  });
}

function handleSubmit() {
  $('main').on('click', '#submit-btn', function(event) {
    console.log('handleSubmit');
    event.preventDefault();
    const questionNumber = store.questions[store.questionNumber];
    let selectedOption = $('input[name=options]:checked').val();
    let optionContainerId = `#option-container-id`
    if(selectedOption === questionNumber.correctAnswer) {
      store.score++;
      let feedbackTrue = generateFeedback(true);
      $(optionContainerId).append(feedbackTrue);
    }
    else if (selectedOption === undefined){
      let feedbackUndefined = generateFeedback(undefined);
      $(optionContainerId).append(feedbackUndefined);
    }
    else {
      let feedbackFalse = generateFeedback(false);
      $(optionContainerId).append(feedbackFalse);
    }
    
    store.questionNumber++;
    $('#submit-btn').hide();
    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });
    $('#next-btn').show();
  });
}

function restart() {
  console.log('restart');
  store.quizStarted = false,
  store.questionNumber = 0,
  store.score = 0
}

function handleRestart() {
  console.log('handleRestart');
$('main').on('click', '#restart-btn', function () {
  restart();
  render();
});
}

function handleQuizApp(){
render();
handleStart();
handleNext();
handleRestart();
}

$(handleQuizApp);