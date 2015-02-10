$(function() {
    $( "#tabs" ).tabs(); //инициализация табов
    $("#answer").inputmask('9999');
  });
function btnClick (){ 
  var example = $("#example");
  var answer = $("#answer").val();
  var correctAnswersCount = $("#correctAnswersCount").text();
  var unCorrectAnswersCount = $("#unCorrectAnswersCount").text();
  var rightAnswer = getAnswer(example.text());
  if(answer.split("_")[0] == rightAnswer){
    ++correctAnswersCount;
    $("#correctAnswersCount").text(correctAnswersCount);
  }else {
     ++unCorrectAnswersCount;
      $("#unCorrectAnswersCount").text(unCorrectAnswersCount);
  }
  generateExample();
}
function btnGenerateExampleClick(){
  generateExample();
}
function generateExample(){
  var settings = getSettingsParameters(), operator1, operator2, operation, temp;
  var setValue = settings[Math.floor((Math.random() * settings.length))];
  if(settings.length !== 0){
    operator1 = Math.round(Math.random() * 100 + 1);
    operator2 = Math.round(Math.random() * 100 + 1);
    //в связи с заданием, пользователь не может вводить отрицательных значений, для этого тут обработчик
    switch(setValue) {
    case "addition":
      operation = "+";
      break;
    case "subtraction":
      operation = "-";
      break;
    case "multiplication":
      operation = "*";
    break;
    case "division":
      operation = "/";
      break;
    default:
      break;
    } 

    var testExample = {
      "operator1": operator1 >= operator2 ? operator1 : operator2,
      "operator2": operator1 < operator2 ? operator1 : operator2,
      "operation": operation
    }
    var example = $("#example");
    example.text(testExample.operator1 + " " + testExample.operation + " " + testExample.operator2);
    return testExample;
  } else {
    alert("Для начала нужно задать типы проверок на вкладке 'Установка'");
  }
}

function getSettingsParameters(){ //выбираем значения отмеченых чекбоксов
  var selected = [];
  $('#checkboxes input:checked').each(function() {
      selected.push($(this).val());
  });
  return selected;
}

function getAnswer(text){ //получение правильного ответа
  var arr = text.split(" "), operator1 = parseInt(arr[0]), operator2 = parseInt(arr[2]),
  operation = arr[1], result;
   switch(operation) {
  case "+":
    result = operator1 + operator2;
    break;
  case "-":
    result = operator1 - operator2;
    break;
  case "*":
    result = operator1* operator2;
  break;
  case "/":
    result = Math.round(operator1/operator2);
    break;
  default:
    break;
  } 
  return result;
}
