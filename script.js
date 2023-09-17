'use strict';
//selecionando os seletores
const container = document.getElementById('container--display');
const containerInput = document.getElementById('container--input');
const inputData = document.querySelectorAll('input');
const btn = document.querySelector('.btn');
const year = document.getElementById('input--year');
const month = document.getElementById('input--month');
const days = document.getElementById('input--day');
const error = document.getElementById('conatiner--error');
const dataStyle = document.querySelectorAll('.data');
let data = document.querySelectorAll('.data');

//
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

const erro = function () {
  inputData.forEach(sty => {
    sty.removeAttribute('style');
    sty.style.border = '1px solid red';
  });
  dataStyle.forEach(color => {
    color.style.color = 'red';
  });
};

const dayInTheMonth = function () {
  let date = new Date(year.value, month.value, 0);
  return date.getDate();
};

const timeOut = {
  cleanDays() {
    // prettier-ignore
    setTimeout(() => {days.value = '';}, 2000);
  },
  cleanMonth() {
    // prettier-ignore
    setTimeout(() => {month.value = '';}, 2000);
  },
  cleanYear() {
    // prettier-ignore
    setTimeout(() => {year.value = '';}, 2000);
  },

  changeColor() {
    setTimeout(() => {
      error.innerText = '';

      inputData.forEach(sty => {
        sty.removeAttribute('style');
        sty.style.border = '1px solid #808080ba';
      });
      // prettier-ignore
      dataStyle.forEach(color => {color.style.color = '#9a9999';});
    }, 2000);
  },
};

// Função das entradas

const valor = [Number(days.value), Number(month.value), Number(year.value)];
const results = {
  errorInputs() {
    if (isNaN(...valor)) {
      htmlData('X Invalid input');
    }

    timeOut.changeColor();

    if (days.value.length != 2 || days.value < 0) {
      err.dayError('Must be a valid day');
      timeOut.cleanDays();
    }
    if (month.value.length != 2 || month.value < 0) {
      err.monthError('Must be a valid month');
      timeOut.cleanMonth();
    }
    if (year.value.length != 4 || year.value < 0) {
      err.yearError('Must be a valid year');
      timeOut.cleanYear();
    }

    ////////////////////////////////////////////////////////////////////
    let date = new Date();

    if (year.value > date.getFullYear()) {
      err._yearError('Must be in the past');
      timeOut.cleanYear();
    } else if (days.value > dayInTheMonth()) {
      err.dayError('Must be a valid day');
      timeOut.cleanDays();
    } else if (month.value > 12 || month.value == 0) {
      err.monthError('Must be a valid month');
      timeOut.cleanMonth();
    } else {
      this.validInputs();
    }
  },
  ////////////////////////////////////////////////////////////////////

  validInputs() {
    const today = new Date();
    let resYear = today.getFullYear() - year.value;
    let resMonth = today.getMonth() + 1 - month.value;
    let resDay = today.getDate() - days.value;

    document.getElementById('container--display').innerHTML = '';
    html.HTMLinput(resDay, resMonth, resYear);

    //arrumar a distância das letras dos números

    if (resDay < days.value.length) {
      resDay = days.value - today.getDate();
    } else if (resYear > 10 || resMonth < 10 || resDay > 10) {
      document.querySelector('.container--days').style.marginRight = '-20px';
      document.querySelector('.container--year').style.marginRight = '-20px';
      document.querySelector('.container--month').style.marginRight = '-20px';
    } else {
      document.querySelector('.container--year').style.marginRight = '-50px';
      document.querySelector('.container--month').style.marginRight = '-45px';
      document.querySelector('.container--days').style.marginRight = '-45px';
    }

    // setTimeout(() => {});
    // if (valor > 1) {
    //   html.HTMLdisplay();
    //   timeOut;
    // }
  },
};

btn.addEventListener('click', function (e) {
  results.errorInputs();
});
// btn.addEventListener('click', function () {
//   const validInputs = (...valor) => valor.every(inp => Number.isFinite(inp));
//   const allPositive = (...valor) => valor.every(inp => inp > 0);

//   allPositive(Number(days.value), Number(month.value), Number(year.value)) &&
//   validInputs(Number(days.value), Number(month.value), Number(year.value))
//     ? results.validInputs()
//     : results.errorInputs();

//   console.log(Number(days.value), Number(month.value), Number(year.value));
// });
// Arrumar pra quando passar um certo tempo, limpar as entradas e zerar novamente
//arrumar quando for número negativo no mês

// let sorted = false;
// btnSort.addEventListener('click', function (e) {
//   e.preventDefault();
//   displayMovements(currentAccount.movements, !sorted);
//   sorted = !sorted; //Isso está invertendo a váriavel, para cada vez que for clicada
//   //ela vire true ou false;
// });

/* talvez colocar tudo dentro de um objeto pra poder relaizar essa tarefa, então fazer um if com click caso tenha atingido tal result */
