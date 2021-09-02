const DATA = [{
    question: 'Сколько объектов вы готовы укомплектовывать в месяц?',
    subtitle: 'в выбранной ранее специализации',
    answers: [{
        id: '1',
        value: '1-5',
      },
      {
        id: '2',
        value: '5-10',
      },
      {
        id: '3',
        value: 'Более 10',
      },
    ],
  },
  {
    question: 'Сколько у вас лет опыта?',
    subtitle: 'в комплектации мебели',
    answers: [{
        id: '4',
        value: 'До 1 года',
      },
      {
        id: '5',
        value: 'От 2 до 3 лет',
      },
      {
        id: '6',
        value: 'От 3 и более',
      },
    ],
  },
  {
    question: 'Сколько объектов вы готовы укомплектовывать в месяц?',
    subtitle: 'в выбранной ранее специализации',
    answers: [{
        id: '7',
        value: 'От 1 - 10',
      },
      {
        id: '8',
        value: 'От 10 - 50',
      },
      {
        id: '9',
        value: 'Более 50',
      },
    ],
  },
]

let localResults = {}

document.addEventListener('DOMContentLoaded', () => {
  const parameters = document.querySelector('.parameters')
  const questions = document.querySelector('.parameters-questions')
  const result = document.querySelector('.parameters__result')
  const btnNext = document.querySelector('.btn-next') 
  const btnPrev = document.querySelector('.btn-prev') 
 const controls=document.querySelector('.parameters__controls')
  const renderQuestions = (index) => { 
    questions.dataset.currentStep = index
    const renderAnswers = () =>
      DATA[index].answers
      .map(
        (answer) => ` 
<li class="parameters__item">
  <label class="parameters__label">
    <input class="parameters__input" type="radio" name=${index} value=${answer.id} />
    ${answer.value}
  </label>
</li>
  `
      ).join('')
    questions.innerHTML = `
     
            <div class="parameters__items">
              <div class="parameters__question">${DATA[index].question}</div>
              <div class="parameters__subtitle">${DATA[index].subtitle}</div>
              <ul class="parameters__list-answer">
              ${renderAnswers()}
  </ul>
            </div>
`
  }

  parameters.addEventListener('change', (event) => {
    if (event.target.classList.contains('parameters__input')) {
      localResults[event.target.name] = event.target.value
      btnNext.disabled = false
      
    }
  }) 
  
  parameters.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-next')) {
      const nextQuestionNext = +questions.dataset.currentStep + 1
      if(nextQuestionNext >=1){ 
      btnPrev.classList.remove('btn-prev-hidden')
      } 
      if (DATA.length === nextQuestionNext) {
        questions.classList.add('questions-hidden') 
        result.classList.remove('result-hidden') 
        controls.classList.add('controls-hidden')
      } else {
        renderQuestions(nextQuestionNext)
      }
      btnNext.disabled = true
    }
    if (event.target.classList.contains('btn-prev')) {
      const nextQuestionNext = +questions.dataset.currentStep - 1
      renderQuestions(nextQuestionNext) 
      if(nextQuestionNext <=0){
        btnPrev.classList.add('btn-prev-hidden')
      }
      
      console.log('d');

    }
  })
  renderQuestions(0)
})

const callback = document.querySelector('.header__callback')

if (window.matchMedia("(min-width: 992px)").matches) {
  callback.innerHTML = 'Заказать обратный звонок'

}
document.getElementById('phone').addEventListener('input', (e) => {
  let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  e.target.value = !x[2] ? x[1] : '(' + x[1] + ')' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '');
});