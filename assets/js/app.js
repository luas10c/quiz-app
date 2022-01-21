import questions from './questions.js';

let answeredQuestions = []
let rightAnswers = 0
let wrongAnswers = 0;
let questionAnsered = false;
let points = 0;
let loading = true;

const answer_options = {
  1: 'A', 2: 'B', 3: 'C',
  4: 'D', 5: 'E', 6: 'F',
  7: 'G', 8: 'H', 9: 'I'
}

const questionStatistics = document.querySelector('.question-statistics');
const copyQuestionStatistics = questionStatistics.cloneNode(true);
questionStatistics.remove();

const header = document.querySelector('.header');
const copyHeader = header.cloneNode(true);
header.remove();

const questionSection = document.querySelector('.question-section');
const copyQuestionSection = questionSection.cloneNode(true);
questionSection.remove();

window.addEventListener('load', () => {
  setTimeout(() => {
    loading = false;

    if (!loading) {
      document.querySelector('.loading').remove()
      document.body.appendChild(copyHeader)
      const title = copyQuestionSection.querySelector('.question > .container > header > h3')
      const date = copyQuestionSection.querySelector('.question > .container > header > p')
      
      function randomQuestion() {
        let question;
        while (true) {
          const randomNumber = Math.floor(Math.random() * questions.length);
          if (!answeredQuestions.includes(questions[randomNumber])) {
            question = questions[randomNumber];
            break;
          } else {
            console.log('Acabou todas questões')
            break;
          }
        }
        return question;
      }

      function randomQuestionAnswers(question) {
        const answers = [];
        while(true) {
          const randomNumber = Math.floor(Math.random() * question.answers.length)
          if (!answers.includes(question.answers[randomNumber])) {
            answers.push(question.answers[randomNumber]);
          }
          if (answers.length === question.answers.length) {
            break;
          }
        }
        return answers;
      }

      function handleAnswerQuestion(event) {
        const correctlyAnswer = question.answers[event.target.dataset.question.split(',')[1] - 1];
        if (question.answer === correctlyAnswer.value) {
          const container = document.createElement('div');
          container.classList.add('answer', 'answer-right');
          container.innerHTML = `<h2>Parabéns!</h2><p>Você acertou a resposta.</p>`
          document.body.appendChild(container);
          rightAnswers++
        } else {
          const container = document.createElement('div');
          container.classList.add('answer', 'answer-wrong');
          container.innerHTML = `<h2>Eiita Giovanaaa</h2><p>Você não acertou a resposta.</p>`
          document.body.appendChild(container);
          wrongAnswers++
        }
        questionAnsered = true;
        answeredQuestions.push(question)
      
        if (questionAnsered) {
          copyQuestionSection.remove();
          document.body.appendChild(copyQuestionStatistics)
        }
      }

      function handleNextQuestion() {
        const question = randomQuestion();
        const answerContainer = document.querySelector('.answer');
        if (question) {
          title.textContent = question.title
          date.textContent = `Criado em: ${question.created_at.toLocaleDateString('pt-BR')}`;
          copyQuestionSection.querySelector('.answers').innerHTML = '';
          
          const answers = randomQuestionAnswers(question)
          answers.forEach((answer, index) => {
            const li = document.createElement('li')
            li.classList.add('answer')
            li.setAttribute('data-question', `${question.id},${answer.id}`);
            li.innerText = `${answer_options[answer.id]}) - ${answer.value}`
            li.addEventListener('click', handleAnswerQuestion);
            copyQuestionSection.querySelector('.answers').appendChild(li)
          })
          
          document.body.appendChild(copyQuestionSection)
          answerContainer.remove();
          copyQuestionStatistics.remove();
        } else {
          return;
        }
      }

      const question = randomQuestion();
      const randomAnswers = randomQuestionAnswers(question);
      const nextQuestion = copyQuestionStatistics.querySelector('footer #next-question')
      title.textContent = question.title
      date.textContent = `Criado em: ${question.created_at.toLocaleDateString('pt-BR')}`;

      nextQuestion.addEventListener('click', handleNextQuestion);

      randomAnswers.forEach((answer) => {
        copyQuestionSection.querySelector('.answers').removeChild(copyQuestionSection.querySelectorAll('.answer')[0])
        const li = document.createElement('li')
        li.classList.add('answer')
        li.setAttribute('data-question', `${question.id},${answer.id}`);
        li.innerText = `${answer_options[answer.id]}) - ${answer.value}`
        li.addEventListener('click', handleAnswerQuestion);
        copyQuestionSection.querySelector('.answers').appendChild(li)
      })
      document.body.appendChild(copyQuestionSection)
    } 
  }, 200);
});