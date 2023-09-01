'use strict';
const inputData = document.querySelectorAll('input');
const entrada = document.querySelectorAll('.pontilhado');
const btn = document.querySelector('.btn');
const saida = document.getElementById('saida--display');

const renderHYMLOne = function () {
  const html1 = `
<div class="saida">
    <div class="container-saida">
        <span class="pontilhado"></span>
        <span class="pontilhado"></span>
    </div>
    years
</div>

<div class="saida">
    <div class="container-saida">
        <span class="pontilhado"></span>
        <span class="pontilhado"></span>
    </div>
    months
</div>

<div class="saida">
    <div class="container-saida">
        <span class="pontilhado"></span>
        <span class="pontilhado"></span>
    </div>
    days
</div>
    `;

  saida.insertAdjacentHTML('beforeend', html1);
};
renderHYMLOne();

const renderHYMLTwo = function (years, months, days) {
  const html2 = `
    <div class="saida">
    <div class="container-saida">${years}</div>
    years
  </div>
  
  <div class="saida">
    <div class="container-saida">${months}</div>
    months
  </div>
  
  <div class="saida">
    <div class="container-saida">${days}</div>
    days
  </div>
      `;
};
// inputData.forEach(data =>
//   data.addEventListener('keydown', function (e) {
//     // console.log(e);
//     if (e.key === 'Enter') {
//       console.log(data.value);
//       entrada.forEach(ent => {
//         entrada.replace(ent, data.value);
//       });
//     }
//   })
// );
