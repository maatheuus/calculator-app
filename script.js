'use strict';
const container = document.getElementById('container--display');
const inputData = document.querySelectorAll('input');
const btn = document.querySelector('.btn');
const year = document.getElementById('year');
const month = document.getElementById('month');
const days = document.getElementById('day');

console.log(year);
console.log(month);
console.log(days);

const firstHTML = function () {
  const html1 = `
<div class="saida">
    <div class="container-saida container--year">- -</div>
    years
</div>

<div class="saida">
    <div class="container-saida container--month">- -</div>
    months
</div>

<div class="saida">
    <div class="container-saida container--days">- -</div>
    days
</div>
    `;

  container.insertAdjacentHTML('beforeend', html1);
};
firstHTML();

const secondHTML = function (years, months, days) {
  const html2 = `
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
      `;
  container.insertAdjacentHTML('beforeend', html2);
  //   margin-right: -45px;
  //   margin-right: 24px;
};

// secondHTML(25, 18, 98);

inputData.forEach(data => {
  btn.addEventListener('click', function () {
    if (isNaN(data.value) === true || data.value === '')
      throw new Error('Valor invalido');
    // console.log(data.value);
    // data.value = '';
  });
});
btn.addEventListener('click', function () {
  console.log(days.value.length);
  console.log(month.value.length);
  console.log(year.value.length);
});
