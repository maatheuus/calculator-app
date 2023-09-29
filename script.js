'use strict';
//selecionando os elementos
const container = document.getElementById('container--display');
const containerInput = document.getElementById('container--input');
const inputData = document.querySelectorAll('input');
const btn = document.querySelector('.btn');
const year = document.getElementById('input--year');
const month = document.getElementById('input--month');
const days = document.getElementById('input--day');
const error = document.getElementById('conatiner--error');
const dataStyle = document.querySelectorAll('.data');

////////////////////////////////////////////////////////////
// Substituindo o HTML de entrada pelo da saída
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
            <div class="container-saida container--year" data-val="${years}">- -</div>
            years
        </div>
      
        <div class="saida">
            <div class="container-saida container--month" data-val="${months}">- -</div>
            months
        </div>
      <div class="saida">
            <div class="container-saida container--days" data-val="${days}">- -</div>
            days
        </div>
      </div>
          `;
    container.insertAdjacentHTML('beforeend', html);
  },
};
html.HTMLdisplay();
////////////////////////////////////////////////////////////
// Erros de entrada
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
////////////////////////////////////////////////////////////
// Limpando as entradas
const timeOut = {
  cleanDays() {
    // prettier-ignore
    setTimeout(() => {
      days.value = '';
    }, 2000);
  },
  cleanMonth() {
    // prettier-ignore
    setTimeout(() => {
      month.value = '';
    }, 2000);
  },
  cleanYear() {
    // prettier-ignore
    setTimeout(() => {
      year.value = '';
    }, 2000);
  },

  changeColor() {
    setTimeout(() => {
      error.innerText = '';

      inputData.forEach(sty => {
        sty.removeAttribute('style');
        sty.style.border = '1px solid #808080ba';
      });
      // prettier-ignore
      dataStyle.forEach(color => {
        color.style.color = '#9a9999';
      });
    }, 2000);
  },
};
////////////////////////////////////////////////////////////
// Lógica
const date = new Date();
const lastDay = new Date(date.getFullYear(), month.value + 1, 0);
const lastDai = new Date(date.getFullYear(), month.value + 1, 0);

function validInputs() {
  document.getElementById('container--display').innerHTML = '';

  let resYear = date.getFullYear() - year.value;
  let resMonth = date.getMonth() + 1 - month.value;
  let resDay = date.getDate() - days.value;
  let sum = resDay + lastDay.getDate();

  // testando se o dia e o mês é menor que 0
  if (resDay < 0) {
    resMonth = date.getMonth() + 1 - 1 - month.value;
    html.HTMLinput(sum, resMonth, resYear);
  } else if (resMonth < 0) {
    resMonth += 12;
    resYear -= 1;
    html.HTMLinput(resDay, resMonth, resYear);
  } else {
    html.HTMLinput(resDay, resMonth, resYear);
  }

  // Testando se o tamnho é maior para ajustar a letra
  if (resDay.valueOf() >= 10 || resDay.valueOf() <= 0)
    document.querySelector('.container--days').style.width = '64px';
  else document.querySelector('.container--days').style.width = '32px';

  if (resMonth.valueOf() >= 10)
    document.querySelector('.container--month').style.width = '50px';
  else document.querySelector('.container--month').style.width = '32px';

  if (resYear.valueOf() >= 100)
    document.querySelector('.container--year').style.width = '82px';
  else if (resYear.valueOf() >= 10)
    document.querySelector('.container--year').style.width = '60px';
  else document.querySelector('.container--year').style.width = '32px';

  // else document.querySelector('.container--year').style.width = '62px';
}

btn.addEventListener('click', function () {
  // Possíveis erros de entrada
  timeOut.changeColor();

  if (+days.value == ' ' && +month.value == ' ' && +year.value == ' ') {
    htmlData();
  } else if (
    days.value.length != 2 ||
    days.value < 0 ||
    days.value > lastDay.getDate() ||
    days.value == 0 ||
    !Number.isFinite(+days.value)
  ) {
    err.dayError('Must be a valid day');
    timeOut.cleanDays(2);
  } else if (
    month.value.length != 2 ||
    month.value < 0 ||
    month.value > 12 ||
    month.value == 0 ||
    !Number.isFinite(+month.value)
  ) {
    err.monthError('Must be a valid month');
    timeOut.cleanMonth(2);
  } else if (
    year.value.length != 4 ||
    year.value < 0 ||
    year.value == 0 ||
    !Number.isFinite(+year.value)
  ) {
    err.yearError('Must be a valid year');
    timeOut.cleanYear(2);
  } else if (
    Number.isFinite(+year.value) &&
    Number.isFinite(+month.value) &&
    Number.isFinite(+days.value)
  ) {
    //testando se o ano está no passado
    if (year.value > date.getFullYear() || !Number.isFinite(+year.value)) {
      err._yearError('Must be in the past');
      timeOut.cleanYear(2);
    } else {
      // Exibindo as entradas
      validInputs();

      // Animação dos números
      let containerSaida = document.querySelectorAll('.container-saida');
      let interval = 1000;

      containerSaida.forEach(containerValue => {
        let startValue = 0;
        let endValue = parseInt(containerValue.getAttribute('data-val'));
        let duration = Math.floor(interval / endValue);

        let counter = setInterval(function () {
          startValue += 1;
          containerValue.textContent = startValue;
          if (startValue === endValue) {
            clearInterval(counter);
          } else if (endValue == 0 || endValue < 0) {
            clearInterval(counter);
          }
          if (endValue == 0) {
            startValue += 0;
            containerValue.textContent = endValue;
            clearInterval(counter);
          }
        }, duration);
      });
    }
  }
});
