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
const html = {
  HTMLdisplay() {
    let html = `
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
  },
  HTMLinput(days, months, years) {
    let html = `
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
html['HTMLdisplay']();

// rendererizando erros de entrada
const error = function () {
  document.querySelector('.month-error').style.opacity = 1;
  document.querySelector('.day-error').style.opacity = 1;
  document.querySelector('.year-error').style.opacity = 1;
};

// const temp = setTimeout(() => {
//   document.querySelector('.year-error').style.opacity = 0;
//   document.querySelector('.month-error').style.opacity = 0;
//   document.querySelector('.day-error').style.opacity = 0;
// }, 4000);

// selecionando todas as entradas
let dayError = document.querySelector('.day-error');
let monthError = document.querySelector('.month-error');
let yearError = document.querySelector('.year-error');

btn.addEventListener('click', function () {
  for (const value of inputData) {
    if (isNaN(value.value) || value.value === '') {
      value.value.replace(
        value.value,
        dayError.insertAdjacentText('beforeend', 'Dia ivalido')
      );
    } else {
      console.log(value.value);
    }
  }
  //     if (isNaN(data.value) || data.value === '') {
  //       console.log('tem letra');
  //     }
  //     if (
  //       (days.value.length > 2 && data.value == Number) ||
  //       days.value.length < 0
  //     ) {
  //       error();
  //       document.querySelector('.day-error').style.opacity = 1;
  //     }
  //     if (
  //       (month.value.length > 2 && data.value == Number) ||
  //       month.value.length < 0
  //     ) {
  //       error();
  //       document.querySelector('.month-error').style.opacity = 1;
  //     }
  //     if (
  //       (year.value.length > 4 && data.value == Number) ||
  //       year.value.length < 4
  //     ) {
  //       error();
  //       document.querySelector('.year-error').style.opacity = 1;
  //     } else {
  //       display.remove(html['HTMLdisplay']());
  //       html['HTMLinput'](days.value, month.value, year.value);
  //       days.value = month.value = year.value = '';
  //     }
});

// btn.addEventListener('click', function () {
// if (days.value.length > 2 || days.value.length < 0) {
//   document.querySelector('.day-error').style.opacity = 1;
//   temp;
// }
// if (month.value.length > 2 || month.value.length < 0) {
//   document.querySelector('.month-error').style.opacity = 1;
//   temp;
// }
// if (year.value.length > 4 || year.value.length < 4) {
//   document.querySelector('.year-error').style.opacity = 1;
//   temp;
// } else {
//   display.remove(html['HTMLdisplay']());
//   html['HTMLinput'](days.value, month.value, year.value);
//   // HTMLinput(days.value, month.value, year.value);
//   days.value = month.value = year.value = '';
// }
// });
