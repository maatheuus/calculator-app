'use strict';
//selecionando os seletores
const container = document.getElementById('container--display');
const display = document.getElementById('display');
const inputData = document.querySelectorAll('input');
const btn = document.querySelector('.btn');
const year = document.getElementById('input--year');
const month = document.getElementById('input--month');
const days = document.getElementById('input--day');

//colocando o primeiro HTML sem valores
const firstHTML = function () {
  const html = `
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
    `;

  display.insertAdjacentHTML('beforeend', html);
};
firstHTML();

//colocando o segundo HTML com valores

const secondHTML = function (days, months, years) {
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
};

// rendererizando erros de entrada
const error = function () {
  document.querySelector('.year-error').style.opacity = 1;
  document.querySelector('.month-error').style.opacity = 1;
  document.querySelector('.day-error').style.opacity = 1;
};

// selecionando todas as entradas
inputData.forEach(data => {
  btn.addEventListener('click', function () {
    if (isNaN(data.value) || data.value === '') {
      //   data.value = '';
      error();
    } else {
      data.value = '';
    }
  });
});

//selecionando as entradas uma por uma
btn.addEventListener('click', function () {
  if (days.value.length > 2 || days.value.length < 0) {
    document.querySelector('.day-error').style.opacity = 1;
  }
  if (month.value.length > 2 || month.value.length < 0) {
    document.querySelector('.month-error').style.opacity = 1;
  }
  if (year.value.length > 4 || year.value.length < 4) {
    document.querySelector('.year-error').style.opacity = 1;
  } else {
    display.remove(firstHTML());
    secondHTML(days.value, month.value, year.value);
  }
});

// document.querySelector('.container--year').style.marginRight = '60px';
// document.querySelector('.container--month').style.marginRight = '60px';
// document.querySelector('.container--days').style.marginRight = '60px';
