'use strict';
//selecionando os seletores
const container = document.getElementById('container--display');
const containerInput = document.getElementById('container--input');
// const display = document.getElementById('display');
const inputData = document.querySelectorAll('input');
const btn = document.querySelector('.btn');
const year = document.getElementById('input--year');
const month = document.getElementById('input--month');
const days = document.getElementById('input--day');

console.log(inputData);

//menssagens de erro a serem exibidas
// DAY: Must be a valid day
// MONTH: Must be a valid month
// YEAR: Must be in the past

//selecionar a class data também para o mesmo problema do erro, mensagem:'This field is required'
console.log(document.querySelectorAll('.data'));
console.log(document.getElementsByName('data'));

//fazer isso para a remoção e adicionar a cor vermelha para a exibição de um erro ou vários erros
// console.log(year.removeAttribute('style'));
// console.log((year.style.border = '1px solid red'));
// console.log(year.removeAttribute('style'));
// console.log((year.style.border = '1px solid #808080ba'));

//quando atualizar ou clicar sobre o input, é preciso arrumar e adicionar novamente os atributos originais

// inputData.forEach(data => {
//   data.addEventListener('click', function () {
//     // console.log((year.style.border = '1px solid red'));
//   });
// });

//colocando o primeiro HTML sem valores
const html = {
  HTMLdisplay() {
    const html = `
    <div id="display">
      <div class="saida">
          <div class="container-saida ">- -</div>
          years
      </div>
      
      <div class="saida">
          <div class="container-saida ">- -</div>
          months
      </div>
      
      <div class="saida">
          <div class="container-saida">- -</div>
          days
      </div>
    </div>
        `;

    container.insertAdjacentHTML('beforeend', html);
  },
  HTMLinput(days, months, years) {
    const html = `
      <div id="display--result">
        <div class="saida">
            <div class="container-saida container--year">${years}</div>
            years
        </div>
      
        <div class="saida">
            <div class="container-saida container--month">${months}</div>
            months
        </div>
      <div class="saida">
            <div class="container-saida container--days">${days}</div>
            days
        </div>
      </div>
          `;
    container.insertAdjacentHTML('beforeend', html);
  },
};
html.HTMLdisplay();

// rendererizando erros de entrada
// const error = function () {
//   document.querySelector('.month-error').style.opacity = 1;
//   document.querySelector('.day-error').style.opacity = 1;
//   document.querySelector('.year-error').style.opacity = 1;
// };

// const temp = setTimeout(() => {
//   document.querySelector('.year-error').style.opacity = 0;
//   document.querySelector('.month-error').style.opacity = 0;
//   document.querySelector('.day-error').style.opacity = 0;
// }, 4000);

// selecionando todas as entradas
// let dayError = document.querySelector('.day-error');
// let monthError = document.querySelector('.month-error');
// let yearError = document.querySelector('.year-error');

let error = document.getElementById('conatiner--error');
let dataStyle = document.querySelectorAll('.data');

const htmlData = function (msgError = 'This field is required') {
  const a = `
  <div class="day-error">${msgError}</div>
  <div class="month-error">${msgError}</div> 
  <div class="year-error">${msgError}</div> 
`;
  error.insertAdjacentHTML('beforeend', a);
};

const err = {
  dayError(msgError) {
    error.insertAdjacentHTML(
      'beforeend',
      `<div class="day-error">${msgError}</div> `
    );
    days.removeAttribute('style');
    days.style.border = '1px solid red';

    document.querySelector('.data--day').style.color = 'red';
  },
  monthError(msgError) {
    error.insertAdjacentHTML(
      'beforeend',
      `<div class="month-error">${msgError}</div> `
    );
    month.removeAttribute('style');
    month.style.border = '1px solid red';
    document.querySelector('.data--month').style.color = 'red';
  },
  yearError(msgError) {
    error.insertAdjacentHTML(
      'beforeend',
      `<div class="year-error">${msgError}</div> `
    );
    year.removeAttribute('style');
    year.style.border = '1px solid red';
    document.querySelector('.data--year').style.color = 'red';
  },
  _yearError(msgError) {
    error.insertAdjacentHTML(
      'beforeend',
      `<div class="year-error">${msgError}</div> `
    );
    year.removeAttribute('style');
    year.style.border = '1px solid red';
    document.querySelector('.data--year').style.color = 'red';
  },
};

// const btnAgain = btn.addEventListener('click', function (e) {
//   containerInput.remove(htmlData(e));
// });
let i = 0;
let data = document.querySelectorAll('.data');

const erro = function () {
  inputData.forEach(sty => {
    sty.removeAttribute('style');
    sty.style.border = '1px solid red';
  });
  dataStyle.forEach(color => {
    color.style.color = 'red';
  });
};

btn.addEventListener('click', function () {
  const valor = [Number(days.value), Number(month.value), Number(year.value)];

  if (isNaN(...valor)) {
    htmlData('X Invalid input');
  }
  setTimeout(() => {
    error.innerText = '';

    inputData.forEach(sty => {
      sty.removeAttribute('style');
      sty.style.border = '1px solid #808080ba';
    });
    // prettier-ignore
    dataStyle.forEach(color => {color.style.color = '#9a9999';});
  }, 1000);
  console.log(valor);

  if (days.value.length != 2 || days.value < 0) {
    err.dayError('Must be a valid day');
    // prettier-ignore
    setTimeout(() => {days.value = '';}, 2000);
  }
  if (month.value.length != 2 || month.value < 0) {
    err.monthError('Must be a valid month');
    // prettier-ignore
    setTimeout(() => {month.value = '';}, 2000);
  }
  if (year.value.length != 4 || year.value < 0) {
    err.yearError('Must be a valid year');
    // prettier-ignore
    setTimeout(() => {year.value = '';}, 2000);
  }

  ////////////////////////////////////////////////////////////////////
  // prettier-ignore
  const meses = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  // let date = new Date(year.value, month.value, 0);
  // const today = date.getDate();
  // const currentMonth = date.getMonth() + 1;

  if (year.value > date.getFullYear()) {
    // err._yearError('Must be in the past');
    // prettier-ignore
    setTimeout(() => {year.value = '';}, 2000);
  }
  if (days.value > dayInTheMonth()) {
    err.dayError('Must be a valid day');
  }
  if (month.value > 12 || month.value == 0) {
    err.monthError('Must be a valid month');
  }
  console.log(date.getMonth([meses]));
  //////////////////////////
  function dayInTheMonth() {
    let date = new Date(year.value, month.value, 0);

    return date.getDate();
  }
});
// Exemplo:
// console.log(dayInTheMonth(8, 2023)); // Exibe 28.

// let id = (Date.now() + '').slice(-10);
// // prettier-ignore
// console.log(meses[date.getMonth()]);
// console.log(date.getDate());
let date = new Date();

const today = date.getDate();
const currentMonth = date.getMonth() + 1;
console.log(today, currentMonth);
//O método getDate() retorna o dia atual do mês (de 1 a 31).
