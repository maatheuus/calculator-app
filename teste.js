let count = 0;
var btns = document.getElementById('btn');
var disp = document.getElementById('display');
btns.onclick = function () {
  count++;
  disp.innerHTML = count;
  if (count === 5) console.log('Deu');
};
