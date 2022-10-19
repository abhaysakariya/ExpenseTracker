
function clearinput(){
  display.value = '';
}

function displaynumber(text){
  document.getElementById('display').value += text;
}


function answer(){
  let num = document.getElementById('display').value;
  
  num = eval(num);
  
  document.getElementById('display').value = num;
}


function backspace(){
  let num = document.getElementById('display').value;
  
  document.getElementById('display').value = num.substr(0,num.length - 1);
}


$('.funcbtn').focus(function(){
  $(this).addClass('funcbtn2');
});

$('.row1, .row2').click(function(){
  $('.funcbtn').removeClass('funcbtn2');
});


// creating addbtn and function to add expense details
function addfromcalc(){
  
 $('.addfromcalc').css('display','block');
 
 $('.body').addClass('blur');
 
 $('#cancelbtn').click(function(){
  $('.addfromcalc').css('display','none');
  $('.body').removeClass('blur');
});
  
let addbtn = document.getElementById('addbtn');

let displaytoamount = document.getElementById('display').value;

document.getElementById('amount').value = displaytoamount;

addbtn.addEventListener('click', function() {

  let title = document.getElementById('title');

  let date = document.getElementById('date');

  let amount = document.getElementById('amount');

  if (title.value == '') {
    alert('Enter Title');
    return;
  } else if (amount.value == '') {
    alert('Enter Amount ');
    return;
  } else if (date.value == '') {
    alert('Enter Date');
    return;
  }

  let data = localStorage.getItem('data');

  if (data == null) {
    dataobj = [];
  } else {
    dataobj = JSON.parse(data);
  }

  let mydata = {
    title: title.value,
    date: date.value,
    amount: amount.value
  }

  dataobj.push(mydata);
  localStorage.setItem('data', JSON.stringify(dataobj));

 $('.addfromcalc').css('display','none');
 
 $('.body').removeClass('blur');

});
}


