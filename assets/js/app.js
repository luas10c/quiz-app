import questions from './questions.js';

let answeredQuestions = []
let rightAnswers = 0
let wrongAnswers = 0;
let questionAnsered = false;
let loading = true;

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

      const randomQuestion = Math.floor(Math.random() * (((questions.length - 1) - 0) + (questions.length - 1)) + 1)
      const question = questions[randomQuestion - 1];
      const title = copyQuestionSection.querySelector('.question > .container > header > h3')
      const date = copyQuestionSection.querySelector('.question > .container > header > p')
      title.textContent = question.title
      date.textContent = `Criado em: ${question.created_at.toLocaleDateString('pt-BR')}`;

      function answerQuestion(event) {
        const correctlyAnswer = question.answers[event.target.dataset.question.split(',')[1] - 1];
        if (question.answer === correctlyAnswer.value) {
          rightAnswers++
        } else {
          wrongAnswers++
        }
        questionAnsered = true;
        answeredQuestions.push(question)

        if (questionAnsered) {
          copyQuestionSection.remove();
          document.body.appendChild(copyQuestionStatistics)
        }
      }

      function handleNextQuestion(event) {
        const randomQuestion = Math.floor(Math.random() * (((questions.length - 1) - 0) + (questions.length - 1)) + 1)
        const question = questions[randomQuestion - 1];
        
        questionAnsered = false;
        if (!questionAnsered) {
          question.answers.forEach((answer) => {
            copyQuestionSection.querySelector('.answers').removeChild(copyQuestionSection.querySelectorAll('.answer')[0])
            const li = document.createElement('li')
            li.classList.add('answer')
            li.setAttribute('data-question', `${question.id},${answer.id}`);
            li.innerText = `${options[answer.id]}) - ${answer.value}`
            li.addEventListener('click', answerQuestion);
            copyQuestionSection.querySelector('.answers').appendChild(li)
            document.body.appendChild(copyQuestionSection)
          })
          copyQuestionStatistics.remove();
        }
      }

      const nextQuestion = copyQuestionStatistics.querySelector('footer #next-question')
      nextQuestion.addEventListener('click', handleNextQuestion);

      const options = {
        1: 'A',
        2: 'B',
        3: 'C',
        4: 'D'
      }

      question.answers.forEach((answer) => {
        copyQuestionSection.querySelector('.answers').removeChild(copyQuestionSection.querySelectorAll('.answer')[0])
        const li = document.createElement('li')
        li.classList.add('answer')
        li.setAttribute('data-question', `${question.id},${answer.id}`);
        li.innerText = `${options[answer.id]}) - ${answer.value}`
        li.addEventListener('click', answerQuestion);
        copyQuestionSection.querySelector('.answers').appendChild(li)
      })
      
      document.body.appendChild(copyQuestionSection)
    }
  }, 200);
});