'use strict';
//selecionando os elementos
const container = document.getElementById('container--display');
const containerInput = document.getElementById('container--input');
const year = document.getElementById('input--year');
const month = document.getElementById('input--month');
const days = document.getElementById('input--day');

////////////////////////////////////////////////////////////
// Substituindo o HTML de entrada pelo da saída
const html = {
  renderDisplay() {
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
  renderInput(days, months, years) {
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
html.renderDisplay();
////////////////////////////////////////////////////////////
// Erros de entrada
const error = document.getElementById('conatiner--error');

const err = {
  dayError(msgError) {
    days.style.border = '1px solid red';
    document.querySelector('.data--day').style.color = 'red';

    error.insertAdjacentHTML(
      'beforeend',
      `<div class="day-error">${msgError}</div> `
    );
  },
  monthError(msgError) {
    month.style.border = '1px solid red';
    document.querySelector('.data--month').style.color = 'red';

    error.insertAdjacentHTML(
      'beforeend',
      `<div class="month-error">${msgError}</div> `
    );
  },
  yearError(type, msgError) {
    type === 'year'
      ? error.insertAdjacentHTML(
          'beforeend',
          `<div class="year-error">${msgError}</div> `
        )
      : '';

    year.style.border = '1px solid red';
    document.querySelector('.data--year').style.color = 'red';
  },
};
////////////////////////////////////////////////////////////
// Limpando as entradas
const inputData = document.querySelectorAll('input');
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
      document.querySelectorAll('.data').forEach(color => {
        color.style.color = '#9a9999';
      });
    }, 2000);
  },
};
////////////////////////////////////////////////////////////
// Lógica
const date = new Date();
const lastDay = new Date(date.getFullYear(), month.value + 1, 0);

function validInputs() {
  document.getElementById('container--display').innerHTML = '';

  let resYear = date.getFullYear() - year.value;
  let resMonth = date.getMonth() + 1 - month.value;
  let resDay = date.getDate() - days.value;
  let sum = resDay + lastDay.getDate();

  // testando se o dia e o mês é menor que 0
  if (resDay < 0) {
    resMonth = date.getMonth() + 1 - 1 - month.value;
    html.renderInput(sum, resMonth, resYear);
  } else if (resMonth < 0) {
    resMonth += 12;
    resYear -= 1;
    html.renderInput(resDay, resMonth, resYear);
  } else {
    html.renderInput(resDay, resMonth, resYear);
  }

  // Testando se o tamanho do número é maior para ajustar a letra
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
}

// Erros de entrada
function inputErrors() {
  timeOut.changeColor();

  // Possíveis erros de entrada
  if (days.value < 0 || days.value == '' || days.value > lastDay.getDate()) {
    err.dayError('Must be a valid day');
    timeOut.cleanDays();
  } else if (
    month.value.length > 2 ||
    month.value < 0 ||
    month.value == 0 ||
    month.value > 12
  ) {
    err.monthError('Must be a valid month');
    timeOut.cleanMonth();
  } else if (year.value.length !== 4 || year.value < 0) {
    err.yearError('year', 'Must be a valid year');
    timeOut.cleanYear();
  }
  //testando se o ano está no passado
  else if (year.value > date.getFullYear()) {
    err.yearError('year', 'Must be in the past');
    timeOut.cleanYear();
  } else {
    validInputs();

    // Animação dos números
    const containerSaida = document.querySelectorAll('.container-saida');
    const interval = 1000;

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

const getForm = document.getElementById('container--input');

const init = function () {
  getForm.addEventListener('submit', function (e) {
    e.preventDefault();
    this.blur();
    inputErrors();
  });
};
init();
