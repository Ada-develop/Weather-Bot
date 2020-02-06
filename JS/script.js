//Variables :

var input = document.querySelector("input.form-control");
var btn = document.querySelector(".input-group-text");
var msg = document.querySelector(".outgoing-chats-msg");
var inputBar = document.querySelector(".input-group");
var chatBox = document.querySelector(".msg-page");
var botTime = document.querySelector(".time");
var header = document.querySelector(".msg-header");
var status = document.querySelector(".status");




//For a click
btn.addEventListener("click", function () {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&units=metric&appid=9218810acd6a0f190a92679d7e9f3c25")
        .then(response => response.json())
        .then(data => {
            var temperature = data["main"]["temp"];
            var temperature_min = data["main"]["temp_min"];
            var temperature_max = data["main"]["temp_max"];
            var wind = data["wind"]["speed"];
            var weatherStatus = data["weather"][0]["description"];
            var humidity = data["main"]["humidity"];
            var clouds = data["clouds"]["all"];

            var date = new Date();

            chatBox.innerHTML += "<div class='outgoing-chats'><div class='outgoing-msg'><div class='outgoing-chats-msg'><p>" + toTitleCase(input.value) + "</p><span class='time'>" + date.toUTCString(); + "</span></div></div><div class='outgoing-chats-img'><img src='IMG/avatar.jpg' alt='Avatar'></div></div>";
            chatBox.innerHTML += "<div class='received-chats'><div class='received-chats-img'><img src='IMG/avatar.jpg' alt='Avatar'></div><div class='received-msg'><div class='received-msg-inbox'><p>In " + toTitleCase(input.value) + " city at this moment weather is " + weatherStatus + ".<br> Temperature is : " + temperature + "&deg;C<br> Min temperature today is : " + temperature_min + "&deg;C<br>Max temperature today is : " + temperature_max + " &deg;C<br>Wind speed is : " + wind + " m/sec <br> Humidity is : " + humidity + " % <br> Cloudiness : " + clouds + "% <br></p><span class='time'>" + date.toUTCString(); + "</span></div></div></div>" + beep(); + "";
            input.value = "";

            chatBox.scrollTop = chatBox.scrollHeight;


        })
        //Error handeling



        .catch(err => (chatBox.innerHTML += "<div class='received-chats'><div class='received-chats-img'><img src='IMG/avatar.jpg' alt='Avatar'></div><div class='received-msg'><div class='received-msg-inbox'><p>Wrong city name!</p><span class='time'>" + date.toUTCString() + "</span></div></div></div>"));
    var date = new Date();

    //Auto - scrolling by added DIV

    chatBox.scrollTop = chatBox.scrollHeight;
})

//For Enter key 

input.addEventListener("keydown", function () {
    if (event.keyCode == 13) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&units=metric&appid=9218810acd6a0f190a92679d7e9f3c25")
            .then(response => response.json())
            .then(data => {
                var temperature = data["main"]["temp"];
                var temperature_min = data["main"]["temp_min"];
                var temperature_max = data["main"]["temp_max"];
                var wind = data["wind"]["speed"];
                var weatherStatus = data["weather"][0]["description"];
                var humidity = data["main"]["humidity"];
                var clouds = data["clouds"]["all"];

                var date = new Date();

                chatBox.innerHTML += "<div class='outgoing-chats'><div class='outgoing-msg'><div class='outgoing-chats-msg'><p>" + toTitleCase(input.value) + "</p><span class='time'>" + date.toUTCString(); + "</span></div></div><div class='outgoing-chats-img'><img src='IMG/avatar.jpg' alt='Avatar'></div></div>";
                chatBox.innerHTML += "<div class='received-chats'><div class='received-chats-img'><img src='IMG/avatar.jpg' alt='Avatar'></div><div class='received-msg'><div class='received-msg-inbox'><p>In " + toTitleCase(input.value) + " city at this moment weather is " + weatherStatus + ".<br> Temperature is : " + temperature + "&deg;C<br> Min temperature today is : " + temperature_min + "&deg;C<br>Max temperature today is : " + temperature_max + " &deg;C<br>Wind speed is : " + wind + " m/sec <br> Humidity is : " + humidity + " % <br> Cloudiness : " + clouds + "% <br></p><span class='time'>" + date.toUTCString(); + "</span></div></div></div>" + beep(); + "";
                input.value = "";


                chatBox.scrollTop = chatBox.scrollHeight;


            })
            //Error Handeling
            .catch(err => (chatBox.innerHTML += "<div class='received-chats'><div class='received-chats-img'><img src='IMG/avatar.jpg' alt='Avatar'></div><div class='received-msg'><div class='received-msg-inbox'><p>Wrong city name!</p><span class='time'>" + date.toUTCString() + "</span></div></div></div>"));
        var date = new Date();
        //Auto - scrolling by added DIV
        chatBox.scrollTop = chatBox.scrollHeight;
    }
})

//If input value in lower case , capitilize them for example : san diego , return San Diego
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}




//By clicking on input bar , bar width is starting be 90%
input.addEventListener("click", function () {
    inputBar.setAttribute("style", "width: 90%; transition:width 0.4s ease-out;");
})

input.addEventListener("blur", function () {
    inputBar.setAttribute("style", "width: 50%; transition:width 0.4s ease-out;");
})

//Bot's displaying message time Offline/Active status

header.addEventListener("click", function () {
    var date = new Date();
    botTime.textContent = date.toUTCString();
    status.classList.remove("status");
});

//Income message sound, beeep! c(:
function beep() {
    var snd = new Audio("./AUDIO/messenger.mp3");
    snd.play();
}