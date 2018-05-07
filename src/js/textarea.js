


// $(document).ready(function() {
//     $('textarea.js-auto-size').autoResize();
// });

// document.addEventListener("DOMContentLoaded", autoResize( document.querySelectorAll("textarea") ));

a = document.querySelector("textarea");

// функции 
a.onkeyup = function(e) {

	checkHeight.call(this);
}

a.onkeydown = function(){
	checkHeight.call(this);
}
// Сравниванием высоту элемента видимую клиента, с высотой (скрола, если не равны, добавляем строку)
function checkHeight(){
	if(this.clientHeight != this.scrollHeight){
		var rows = +this.getAttribute("rows") + 1;
        this.setAttribute("rows", rows);
	}
}