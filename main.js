showdata();

// login btn
var loginbtn = document.getElementById('loginbtn');

// login form
let loginform = document.getElementById('login');


// to check login was done or not
logincheck = localStorage.getItem('logincheck');

//checking login
if (logincheck == null) {
  loginform.style.display = 'block';
  $('.body').addClass('blur');
  loginbtn.addEventListener('click', function() {

    let user = document.getElementById('username').value;

    let pass = document.getElementById('password').value;

    let checkuser = localStorage.getItem('user');
    let checkpass = localStorage.getItem('pass');

    if (user != checkuser) {
      if (pass != checkpass) {
        alert('Please Enter Correct Username Or Password');

      } else {
        if (user == '') {
          alert('Enter Username');
          return;
        } else if (user != checkuser) {
          alert('Username is Incorrect')
        } else {
          loginform.style.display = 'none';
          localStorage.setItem('logincheck', 'true');
          $('.body').removeClass('blur');
        }
      }
    } else {
      if (pass == '') {
        alert('Enter Password');
        return;
      } else if (pass != checkpass) {
        alert('Password is Incorrect')
      } else {
        loginform.style.display = 'none';
        localStorage.setItem('logincheck', 'true');
        $('.body').removeClass('blur');
      }
    }
  });
} else {
  loginform.style.display = 'none';
  $('.body').removeClass('blur');
}


//creating logout button and function
let logoutbtn = document.getElementById('logout');

logoutbtn.addEventListener('click', function() {
  location.reload();
  localStorage.removeItem('logincheck');
  loginform.style.display = 'block';
});

// to show the signup form
let clickherebtn = document.getElementById('create');

let signupform = document.getElementById('signup');

clickherebtn.addEventListener('click', function() {
  loginform.style.display = 'none';
  signupform.style.display = 'block';
});


// To show the loginform from singup form
let clickheretologin = document.getElementById('clickheretologin');

clickheretologin.addEventListener('click', function() {
  loginform.style.display = 'block';
  signupform.style.display = 'none';
});



//to get signup data
let signupbtn = document.getElementById('signupbtn');

signupbtn.addEventListener('click', function() {
  let signuser = document.getElementById('signuser').value;

  let signpass = document.getElementById('signpass').value;

  //login detail
  const username = signuser;
  const password = signpass;


  //setting login detail to local storage
  localStorage.setItem('user', username);

  localStorage.setItem('pass', password);

  alert('Username And Password Created Successfully Now Login');
  loginform.style.display = 'block';
  signupform.style.display = 'none';

});




var loader = document.getElementById('loader');
// adding preloader
window.addEventListener('load', function() {
  loader.style.display = 'none';
});


// creating addbtn and function to add expense details
let addbtn = document.getElementById('addbtn');

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

  title.value = '';
  date.value = '';
  amount.value = '';
  showdata();

});



// creating function to show expense data into table
function showdata() {
  let data = localStorage.getItem('data');

  if (data == null) {
    dataobj = [];
  } else {
    dataobj = JSON.parse(data);
  }


  let total = 0;

  let datatoadd = '';
  dataobj.forEach(function(element, index) {

    let number = parseInt(element.amount);

    total = total + number;


    datatoadd += `
     <tr class='tr'>
      <td>${element.title}</td>
      <td>${element.date}</td>
      <td>${element.amount}</td>
      <td><button class="btn btn-primary" onclick='deleterow(this.id)' id='${index}' type="button"><span class="material-symbols-outlined" style="margin-top:5px;">
          delete
         </span></button></td>
    </tr>
    
    `
  });

  let tbody = document.getElementById('tbody');

  if (dataobj.length != 0) {
    tbody.innerHTML = datatoadd;
  } else {
    tbody.innerHTML = 'Nothing To Show Here Go And Add Some Expense';
  }

  let totalexpense = document.getElementById('totalexpense');
  totalexpense.innerText = total;

  localStorage.setItem('expense', total);

  let addincomebtn = document.getElementById('addincome');
  let tinc = 0;
  let getfromlocal = localStorage.getItem('income');
  if (getfromlocal == null) {
    localStorage.setItem('income', 0);
    return;
  }
  addincomebtn.addEventListener('click', function() {
    let income = document.getElementById('income').value;

    tinc = parseInt(income) + parseInt(getfromlocal);


    localStorage.setItem('income', tinc);
    
    document.getElementById('income').value = '';
    let getincome = localStorage.getItem('income');

    document.getElementById('totalincome').innerText = getincome;
    location.reload();

  });

  let getincome = localStorage.getItem('income');
  document.getElementById('totalincome').innerText = getincome;

  let localexpense = localStorage.getItem('expense');
  let localincome = localStorage.getItem('income');

  let answer = localincome - localexpense;

  let savingtable = document.getElementById('savings').innerText = answer;

let newincome = document.getElementById('newincome');

newincome.addEventListener('click',function(){
  let income = document.getElementById('income').value;
  
  
  localStorage.setItem('income',income);
  location.reload();
  
});


}



// creating function to delete onee record
function deleterow(id) {
  let data = localStorage.getItem('data');

  if (data == null) {
    dataobj = [];
  } else {
    dataobj = JSON.parse(data);
  }


  dataobj.splice(id, 1);
  localStorage.setItem('data', JSON.stringify(dataobj));

  showdata();
}

// creating search functionality 
let search = document.getElementById('search');

search.addEventListener('input', function() {
  let searchvalue = search.value;
  if (searchvalue == '') {
    location.reload();
  }
  let tr = document.getElementsByClassName('tr');

  Array.from(tr).forEach(function(element) {
    let fromtable = element.getElementsByTagName('td')[0].innerText;

    if (fromtable.includes(searchvalue)) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';

    }
  });
});


// creating delete all record button

let deleteall = document.getElementById('deleteall');

deleteall.addEventListener('click', function() {
  let confirmation = confirm('Are You sure You want To Delete All Records');
  if (confirmation == true) {

    localStorage.removeItem('data');
  } else {
    return;
  }
  showdata();
});



$('.newshowincbtn').click(function(){
 
 $('#incomecard').slideToggle(1000);
  $(this).toggleClass('btn-dark btn-secondary');
  
});

$('.newshowexpbtn').click(function(){
  
  $(this).toggleClass('btn-dark btn-secondary');
  
  $('#expensecard').slideToggle(1000);
});


//let hexcolor = `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

//console.log(hexcolor);

//document.getElementById('test').style.color = hexcolor;