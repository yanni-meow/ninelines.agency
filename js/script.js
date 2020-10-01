// стрелка, чекбоксы, счётчик
let pointer = document.getElementById('pointer');
let checkList = document.querySelectorAll('.checkbox__style');
let scorePlace = document.getElementById('score');

//градусы на один 'шаг' исходя из 180 на полукруг
let step = 180/checkList.length;

// кол-во отмеченных навыков
function calcChecked() {   
  let checkedBoxs = 0;
  checkList.forEach(element => {
    if (element.checked){
      checkedBoxs += 1;
    }
  })
  return checkedBoxs;
};

let exTotalChecked = calcChecked();

//функция - анимация счётчика 
function scoreGrowing (from, to) {
  let time = 500;
  let scoreStep = 1;
  if (from < to) {
    let t = Math.round(time/(to/scoreStep));
    let interval = setInterval(() =>{
      from = from + scoreStep;
      if (from == to) {
        clearInterval(interval)  
      }
      scorePlace.innerHTML = from;
    },
    t); 
  } else {
    let t = Math.round(time/(from/scoreStep));
    let interval = setInterval(() =>{
      from = from - scoreStep;
      if (from == to) {
        clearInterval(interval)  
      } 
      scorePlace.innerHTML = from;
    },
    t);
  };
};

//выбрано по дефолту
window.onload = function loadWind() {
  let totalChecked = calcChecked();
  pointer.animate([
    {transform: 'rotate 0deg)'},  
    {transform: 'rotate(' + step*totalChecked + 'deg)'}
  ], { 
      duration: 600,
      fill: 'forwards',
  });
  let from = (125*(totalChecked-1));    
  let to = (125*totalChecked);
      scoreGrowing(from, to);

      exTotalChecked = totalChecked;
};

//'выбор' навыка и анимация
checkList.forEach(element => {
    element.addEventListener('click', function(event) {        
      let totalChecked = calcChecked();  
      //анимация стрелки по клику
      pointer.animate([
        {transform: 'rotate(' + step*(exTotalChecked) + 'deg)'},  
        {transform: 'rotate(' + step*totalChecked + 'deg)'}
      ], { 
          duration: 500,
          fill: 'forwards',
      });
      //анимация счётчика по клику
        let from = (125*(exTotalChecked));
        let to = (125*totalChecked);
        scoreGrowing(from, to);

      exTotalChecked = totalChecked;
    });
});
