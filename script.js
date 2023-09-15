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

//quando clicar no botao é preciso arrumar o display pra quando não for possivel obter as entradas

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

// function getAge() {
//   let hoje = new Date();
//   hoje.getFullYear() - year.value;
//   hoje.getMonth() + 1 - month.value;
//   hoje.getDate() - days.value;

//   return;
// }
// console.log(getAge());

const errResults = function () {
  const valor = [Number(days.value), Number(month.value), Number(year.value)];

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //Erros da entrada
  // console.log(valor);
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
  const dayInTheMonth = function () {
    let date = new Date(year.value, month.value, 0);

    return date.getDate();
  };
  let date = new Date();

  if (year.value > date.getFullYear()) {
    err._yearError('Must be in the past');
    // prettier-ignore
    setTimeout(() => {year.value = '';}, 2000);
  }
  if (days.value > dayInTheMonth()) {
    err.dayError('Must be a valid day');
    // prettier-ignore
    setTimeout(() => {days.value = '';}, 2000);
  }
  if (month.value > 12 || month.value == 0) {
    err.monthError('Must be a valid month');
    // prettier-ignore
    setTimeout(() => {month.value = '';}, 2000);
  }
  //////////////////////////
};
const inputs = function () {
  const today = new Date();
  let resYear = today.getFullYear() - year.value;
  let resMonth = today.getMonth() + 1 - month.value;
  let resDay = today.getDate() - days.value;

  document.getElementById('container--display').innerHTML = '';

  if (resDay < 0) {
    resDay = days.value - today.getDate();
    html.HTMLinput(resDay, resMonth, resYear);
    console.log('conta menos');
  }
  if (resYear > 10 || resMonth > 10 || resDay > 10) {
    document.querySelector('.container--days').style.marginRight = '-20px';
    document.querySelector('.container--year').style.marginRight = '-20px';
    document.querySelector('.container--month').style.marginRight = '-20px';
  } else {
    document.querySelector('.container--year').style.marginRight = '-50px';
    document.querySelector('.container--month').style.marginRight = '-45px';
    document.querySelector('.container--days').style.marginRight = '-45px';
  }
};

// btn.addEventListener('click', inputs());
btn.addEventListener('click', errResults());

// Exemplo:
// console.log(dayInTheMonth(8, 2023)); // Exibe 28.

// let id = (Date.now() + '').slice(-10);
// // prettier-ignore
// console.log(meses[date.getMonth()]);
// console.log(date.getDate());
// let date = new Date();

// const today = date.getDate();
// const currentMonth = date.getMonth() + 1;
// console.log(today, currentMonth);
//O método getDate() retorna o dia atual do mês (de 1 a 31).
