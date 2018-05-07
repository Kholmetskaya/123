function sendMessage(msg){
    var xhr = new XMLHttpRequest();
    var date = new Date();
    xhr.open("POST", "http://172.50.2.51:3000/message");
    xhr.onload = function(){
        console.log(this.responseText);
    }
    var body = JSON.stringify({
        message:msg,
        key: UID_KEY,
        name: "Jane",
        time: date.getHours()+":" + date.getMinutes()+":" + date.getSeconds()

    })
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(body);
}


function getMessage(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://172.50.2.51:3000/message");
    xhr.onload = function(){

        var json = JSON.parse(this.responseText);
        if(json.key === UID_KEY) {
            generateHTML(json,  "message_left"); 
        } else {
            generateHTML(json,  "message_right"); 
        }

        getMessage();
    }
    xhr.send();
}
getMessage();

var UID_KEY = (Math.random() * 1000000000000000).toString();
var btn = document.querySelector(".send-btn");
var msgField = document.getElementById("msg");
var content = document.querySelector(".content");

btn.addEventListener("click", function(event){
    event.preventDefault();
    sendMessage(msgField.value);
    msgField.value = "";
})

function generateHTML(json, cl){
    var msg = document.createElement("div");
    var msgText = document.createElement("textarea");
    msgText.innerHTML = json.message + " " + json.name + " " + json.time;
    msg.classList.add(cl);
    content.appendChild(msg);
    msg.appendChild(msgText);
}


