(function () {
    var form = document.querySelector('.register');
    var formLogin = document.querySelector('.login');

    registration();
    login();

 // инициализируем юзера
 function init() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userName = document.querySelector("#user_name");
        userName.textContent = "Добро пожаловать, " + user.displayName;
      //  console.log(Object.keys(user)) 
      //   localStorage.setItem("login",user.email)
      //   console.log(localStorage.getItem("login",user.email))

      }
    });
  }
 //  поле для вывода ошибок
  function generateError(text) {
    var error = document.getElementById("errors");  
    error.style.color = 'red';
    error.innerHTML = text;
    return error;
  }
// очищаем поле ошибки после изменения
 function removeEr() {
    form.addEventListener("change", 
    function () {
        var errors = document.getElementById("errors");  
        errors.innerHTML = "";
    });
    formLogin.addEventListener("change", 
    function () {
        var errors = document.getElementById("errors");  
        errors.innerHTML = "";
    });

  }
// изменения страницы после регистрации или авторизации
function change(){
    formLogin.style.display="none";
    form.style.display="none"; 
    document.querySelector(".content").style.display="block" ;
}
// создаем нового пользователя
  function createUser(email, password, name) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
      user.updateProfile({
        displayName: name
      }).then(function () {
        init();
        change();
      });
    }).catch(function (err) {
      errors.innerHTML = err.message;
    });
  }
// функция регистрации
function registration() {   
    removeEr();
    form.addEventListener("submit", function (event) {
      event.preventDefault();     
        var fields = form.querySelectorAll('input');
        var name = form.querySelector('#register_name').value;
        var email = form.querySelector('#register_login').value;
        var password = form.querySelector('#register_password').value;
        var passwordConfirmation = form.querySelector('#password_confirmation').value;

// валидация формы регистрации
    for (var i = 0; i < fields.length; i++) {
        if (!fields[i].value) {
          var error = generateError('Поле не может быть пустым');   
        }
      }
      if (password !== passwordConfirmation) {
        var error = generateError('Пароли не совпадают');
      } 
      else if  (password.lenght <=6) {
        var error = generateError('Пароль дожен быть больше 6 знаков');
      }
      else {
        createUser(email, password, name);    
      } 
    });
}

function login() {
    removeEr();
    formLogin.addEventListener("submit", function (event) {
      event.preventDefault();
      var auth_login = formLogin.querySelector('#auth_login').value; 
      var auth_password = formLogin.querySelector('#auth_password').value;    
      firebase.auth().signInWithEmailAndPassword(auth_login, auth_password).then(function (user) {
        init();
        change();
      }).catch(function (err) {
        errors.innerHTML = err.message;
      });
    });

 }
})();