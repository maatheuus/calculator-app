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

// Função das entradas

const valor = [+days.value, +month.value, +year.value];
const date = new Date();
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
const lastDayDate = lastDay.toLocaleDateString();

function errorInputs() {
  if (isNaN(...valor)) {
    htmlData('X Invalid input');
  }
  // const date = new Date();

  timeOut.changeColor();

  if (days.value.length != 2 || days.value < 0) {
    err.dayError('Must be a valid day');
    timeOut.cleanDays(2);
  }
  if (month.value.length != 2 || month.value < 0) {
    err.monthError('Must be a valid month');
    timeOut.cleanMonth(2);
  }
  if (year.value.length != 4 || year.value < 0) {
    err.yearError('Must be a valid year');
    timeOut.cleanYear(2);
  }

  ////////////////////////////////////////////////////////////////////

  if (year.value > date.getFullYear()) {
    err._yearError('Must be in the past');
    timeOut.cleanYear(2);
  }
  if (days.value > lastDay) {
    err.dayError('Must be a valid day');
    timeOut.cleanDays(2);
  }
  if (month.value > 12 || month.value == 0) {
    err.monthError('Must be a valid month');
    timeOut.cleanMonth(2);
  }
}
////////////////////////////////////////////////////////////////////

function validInputs(resDay, resMonth, resYear) {
  // let resYear = date.getFullYear() - year.value;
  // let resMonth = date.getMonth() + 1 - month.value;
  // let resDay = date.getDate() - days.value;
  // let sum = resDay + lastDay.getDate();
  document.getElementById('container--display').innerHTML = '';

  html.HTMLinput(resDay, resMonth, resYear);
  // if (resDay < 0 || resDay == -1) {
  //   resMonth = date.getMonth() + 1 - 1 - month.value;
  //   console.log('menor que zero', resDay, sum);
  //   ////////////////////////////////////
  //   if (resDay <= -2) {
  //     document.getElementById('display--result').innerHTML = '';
  //     resMonth = date.getMonth() + 1 - 1 - month.value;
  //     html.HTMLinput(sum, resMonth, resYear);
  //     console.log('menor que menos2', resDay, sum);
  //   }
  // }
  // if (resDay < 0 || resDay == -1) {
  //   resMonth = date.getMonth() + 1 - 1 - month.value;
  //   html.HTMLinput(sum, resMonth, resYear);
  // } else {
  //   html.HTMLinput(resDay, resMonth, resYear);
  // }
}
// function calcularIdade() {
//   const birthdate = new Date(days.value, month.value, year.value);
//   const today = new Date();

//   const diff = today - birthdate;

//   const anos = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
//   const meses = Math.floor(
//     (diff % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000)
//   );
//   const dias = Math.floor(
//     (diff % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
//   );

//   const resultado = html.HTMLinput(anos, meses, dias);
//   return resultado;
//   // resultado.innerHTML = `Você tem ${anos} anos, ${meses} meses e ${dias} dias.`;
// }
btn.addEventListener('click', function () {
  const birthdate = new Date(+year.value, +month.value, +days.value);

  const today = new Date();

  const diff = today - birthdate;

  const anos = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
  let meses = Math.floor(
    (diff % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000)
  );
  const dias = Math.floor(
    (diff % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000) + 1
  );
  console.log(anos, meses + 1, dias);
  if (dias < 0) {
    meses + 1;
    console.log(meses + 1);
    const resultado = html.HTMLinput(dias, meses + 1, anos);
    return resultado;
  }
  const resultado = html.HTMLinput(dias, meses + 1, anos);
  return resultado;

  // resultado.innerHTML = `Você tem ${anos} anos, ${meses} meses e ${dias} dias.`;
});

// document.addEventListener('keypress', function (e) {
//   if (e.key === 'Enter') {
//     results.errorInputs();
//     e.target.blur();
//   }
// });
/*btn.addEventListener('click', function () {
  let resYear = date.getFullYear() - year.value;
  let resMonth = date.getMonth() + 1 - month.value;
  let resDay = date.getDate() - days.value;
  let sum = resDay + lastDay.getDate();
  document.getElementById('container--display').innerHTML = '';

  // if (resDay < 0 || resDay == -1) {
  //   resMonth = date.getMonth() + 1 - 1 - month.value;
  //   html.HTMLinput(lastDay.getDate(), resMonth, resYear);
  //   console.log('menor que zero', resDay, sum);
  //   ////////////////////////////////////
  //   if (resDay <= -2) {
  //     document.getElementById('display--result').innerHTML = '';
  //     resMonth = date.getMonth() + 1 - 1 - month.value;
  //     html.HTMLinput(sum, resMonth, resYear);
  //     console.log('menor que menos2', resDay, sum);
  //   }
  // }
  // html.HTMLinput(resDay, resMonth, resYear);
  if (days.value > 0) {
    document.getElementById('container--display').innerHTML = '';
    html.HTMLinput(resDay, resMonth, resYear);
    console.log('ta foda');
  }
  if (resDay < 0 || resDay == -1) {
    document.getElementById('container--display').innerHTML = '';
    resMonth = date.getMonth() + 1 - 1 - month.value;
    html.HTMLinput(sum, resMonth, resYear);
    console.log('menor que zero', resDay, sum);
  } else {
    console.log('ta foda 2');
    html.HTMLdisplay();
    results.errorInputs();
  }
});*/
