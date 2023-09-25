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

// const dayInTheMonth = function () {
//   let date = new Date(year.value, month.value, 0);
//   return date.getDate();
// };

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

const date = new Date();
const lastDay = new Date(date.getFullYear(), month.value + 1, 0);

function validInputs() {
  let resYear = date.getFullYear() - year.value;
  let resMonth = date.getMonth() + 1 - month.value;
  let resDay = date.getDate() - days.value;
  let sum = resDay + lastDay.getDate();
  document.getElementById('container--display').innerHTML = '';
  console.log(resDay.valueOf() > 10);
  console.log(resDay > 10);
  console.log(resDay > resDay.toPrecision(1));
  console.log(resDay.toPrecision(1));

  if (resDay < 0) {
    resMonth = date.getMonth() + 1 - 1 - month.value;
    html.HTMLinput(sum, resMonth, resYear);
  } else {
    html.HTMLinput(resDay, resMonth, resYear);
  }
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  if (resYear > 10 || resMonth < 10 || resDay > 10) {
    // document.querySelector('.container--days').style.marginRight = '-20px';
    document.querySelector('.container--year').style.letterSpacing = '-2px';
    document.querySelector('.container--month').style.marginRight = '-20px';
  } else {
    document.querySelector('.container--year').style.marginRight = '-50px';
    document.querySelector('.container--month').style.marginRight = '-45px';
    // document.querySelector('.container--days').style.marginRight = '-45px';
  }
}

btn.addEventListener('click', function () {
  timeOut.changeColor();

  if (
    days.value.length != 2 ||
    days.value < 0 ||
    !Number.isFinite(+days.value)
  ) {
    err.dayError('Must be a valid day');
    timeOut.cleanDays(2);
  }
  if (
    month.value.length != 2 ||
    month.value < 0 ||
    !Number.isFinite(+month.value)
  ) {
    err.monthError('Must be a valid month');
    timeOut.cleanMonth(2);
  }

  if (
    year.value.length != 4 ||
    year.value < 0 ||
    !Number.isFinite(+year.value)
  ) {
    err.yearError('Must be a valid year');
    timeOut.cleanYear(2);
  } else if (
    Number.isFinite(+year.value) &&
    Number.isFinite(+month.value) &&
    Number.isFinite(+days.value)
  ) {
    if (year.value > date.getFullYear()) {
      err._yearError('Must be in the past');
      timeOut.cleanYear(2);
    }
    if (days.value > lastDay.getDate()) {
      err.dayError('Must be a valid day');
      timeOut.cleanDays(2);
    }
    if (month.value > 12 || month.value == 0) {
      err.monthError('Must be a valid month');
      timeOut.cleanMonth(2);
    } else {
      validInputs();
    }
  }
});
