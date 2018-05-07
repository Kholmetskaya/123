

 var button = document.getElementById("burger");
 button.addEventListener("click", function(){
    var sidebar = document.querySelector(".sidebar_menu");
    setTimeout(function(){
        sidebar.classList.toggle("active_button");    
    },500)
   
 })