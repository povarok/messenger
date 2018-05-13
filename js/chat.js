



Parse.$ = jQuery;
Parse.serverURL = "https://pg-app-87e2afuylh07dcx9yvl4lp0ludceiy.scalabl.cloud/1/";
Parse.initialize(
    "H0c8Nc9VB629EZp1hWypOUdISnpepF76kkiMCP9j",
    "jPsorL0c2TSoUXS65zE6ygO1ke7eaPpjFkCJUSpE"
  );

  

function parseUrlQuery() {



    var data = {};
    if (location.search) {
        var pair = (location.search.substr(1)).split('&');
        for (var i = 0; i < pair.length; i++) {
            var param = pair[i].split('=');
            data[param[0]] = param[1];
        }
    }
    return data;
}






var sender = Parse.User.current().get("username");
var recipient = parseUrlQuery()['Recipient'];
var msgBuffer = 0;

console.log("Current user: " + sender + "\nRecipient: " + recipient);




var query = new Parse.Query(Parse.User);
query.equalTo("username", recipient);  // find user
query.find({
    success: function (checked_usr) {

        if (checked_usr.length != 0) {
            //recipient = text;
            document.getElementById("recipient").innerText = recipient;
            //document.getElementById("recipient_input").value = "";
            //recipient = text;
            //document.getElementById("recipient").innerText = recipient;
        }
        else {
            alert("такого пользователя не существует");
        }
    },
    error: function (error) {

        console.log("Error: " + error.code + " " + error.message);
    }
});



document.getElementById("sender").innerText = sender;
//document.getElementById("recipient").innerText = recipient;

document.getElementById("msg_send").onclick = msg_send;
document.getElementById("to_main").onclick = function () {
    console.log("click working");
    window.location.href = "main.html"
}

var img = Parse.User.current().get("avatar");
console.log("img - " + img);
if (img != undefined) {
    document.getElementById("user_image").src = img.url();
}
document.getElementById("user_image").style.height = "68px";
document.getElementById("user_image").style.width = "68px";
document.getElementById("user_image").style.marginRight = "470px";
document.getElementById("user_image").style.marginTop = "1px";
document.getElementById("user_image").style.zIndex = 2;


document.getElementById("add_recipient").onclick = confirm_recipient;

function confirm_recipient() {
    var text = document.getElementById("recipient_input").value;
    if (text != "") {

        //var check_user = Parse.Object.extend("User");
        //console.log(check_user);

        //var dateQuery = new Parse.Query(check_user);
        //var dateQuery = new Parse.User.

        var query = new Parse.Query(Parse.User);
        query.equalTo("username", text);  // find all the women
        query.find({
            success: function (checked_usr) {
                //console.log("women.length" + women.length);
                if (checked_usr.length != 0) {
                    recipient = text;
                    document.getElementById("recipient").innerText = recipient;
                    document.getElementById("recipient_input").value = "";
                    recipient = text;
                    document.getElementById("recipient").innerText = recipient;
                }
                else {
                    alert("такого пользователя не существует");
                }
            },
            error: function (error) {

                console.log("Error: " + error.code + " " + error.message);
            }
        });


    }

}




function msg_send() {
    var text = document.getElementById("msg_text").value;
    var options = {
        year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    if (text != "") {
        console.log("Отправляем сообщение");
        // в чат отправитель/получатель
  
        var Chat = Parse.Object.extend("Chat");
        var dateQuery = new Parse.Query(Chat);
        dateQuery.equalTo("sender", sender);
        dateQuery.equalTo("recipient", recipient);
        dateQuery.find({
            success: function (msg) {
                console.log("msg.length - " + msg.length);
                if (msg.length == 0) {
                    var Chat = Parse.Object.extend("Chat");
                    var dateQuery = new Chat();
                    dateQuery.set("sender", sender);
                    dateQuery.set("recipient", recipient);
                    dateQuery.save(null, {
                        success: function (user) {
                            console.log("диалог создан")
                            
                            messages = [{ "text": text, "date": new Date().toLocaleTimeString("en-us", options), "author": sender }]
                            user.set("messages", messages);
                            user.save();
            
                        },
                        error: function (user, error) {
                            alert("Такой диалог уже существует");
                        }
                    });
                }
                var arr = msg[0].get("messages");
                //console.log("после " + text);
                arr.push({ "text": text, "date": new Date().toLocaleTimeString("en-us", options), "author": sender })
                msg[0].set("messages", arr);
                msg[0].save();
            }
        });
        if (recipient != sender) {
        // в чат получатель / отправитель
        dateQuery = new Parse.Query(Chat);
        dateQuery.equalTo("sender", recipient);
        dateQuery.equalTo("recipient", sender);
        dateQuery.find({
            success: function (msg) {
                if (msg.length == 0) {
                    var Chat = Parse.Object.extend("Chat");
                    var dateQuery = new Chat();
                    dateQuery.set("sender", recipient);
                    dateQuery.set("recipient", sender);
                    dateQuery.save(null, {
                        success: function (user) {
                            console.log("диалог создан")
                            messages = [{ "text": text, "date": new Date().toLocaleTimeString("en-us", options), "author": sender }]
                            user.set("messages", messages);
                            user.save();
                        },
                        error: function (user, error) {
                            alert("Такой диалог уже существует");
                        }
                    });
                }
                var arr = msg[0].get("messages");
                arr.push({ "text": text, "date": new Date().toLocaleTimeString("en-us", options), "author": sender })
                msg[0].set("messages", arr);
                msg[0].save();
            }
        });}

        document.getElementById("msg_text").value = "";
    }
    else {
        console.log("Введите текст сообщения");
        alert("Введите текст сообщения");
    }
}

var Chat = Parse.Object.extend("Chat");
var dateQuery = new Parse.Query(Chat);


sender = Parse.User.current().get("username");
recipient = parseUrlQuery()['Recipient'];

var articleDiv = document.querySelector("ul.shoutbox-content");
console.log("articleDiv" + articleDiv);

dateQuery.equalTo("sender", sender);
dateQuery.equalTo("recipient", recipient);
dateQuery.find({
    success: function (msg) {


        msgArr = msg[0].get("messages");
        msgBuffer = msgArr.length;
        console.log("начинаем вывод сообщений с  " + recipient + " кол-во сообщений - " + msgArr.length);
        for (let i = 0; i < msgArr.length; i++) {

            console.log("cообщение - " + i);
            var p = document.createElement("p");
            p.className = "shoutbox-comment";
            //Здесь будет цикл, но его пока нету:)
            var li = document.createElement("li");
            // li.onmouseenter="style"
            var span = document.createElement("span")
            span.className = "shoutbox-username";
            li.className = "liClass";
            // li.onclick = function (params) {
            //     //console.log("click working");
            //     window.location.href = "chat.html?Recipient=" + msg[i].get("recipient");
            // }
            var liText = document.createTextNode("от: " + msgArr[i]["author"]);
            //var liText = document.createTextNode("от: ");
            console.log("msgArr[i]['author'] = " + msgArr[i]["author"])
            span.appendChild(liText);


            var pText = document.createTextNode(msgArr[i]["text"]);
            //var pText = document.createTextNode("текст");
            p.appendChild(pText);

            var spanDate = document.createElement("span");
            spanDate.className = "shoutbox-comment-ago";

            //var dateText = document.createTextNode(msgArr[i]["date"].toLocaleTimeString("en-us", options)); //
            var dateText = document.createTextNode(msgArr[i]["date"]);
            //var dateText = document.createTextNode("дата");
            //dateText = dateText.slice(0,25);
            //console.log(dateText);
            spanDate.appendChild(dateText);

            li.appendChild(span);
            li.appendChild(p);
            li.appendChild(spanDate);

            articleDiv.appendChild(li);
        }

    }
});

//обновляем список сообщений раз в 5 секунд

function interval() {
    setInterval(function () {
        var Chat = Parse.Object.extend("Chat");
        var query = new Parse.Query(Chat);


        console.log("sender - " + sender + "recipient - " + recipient);

        query.equalTo("sender", sender);
        query.equalTo("recipient", recipient);

        query.find({
            success: function (msg) {

                var array = msg[0].get("messages");
                console.log("array len" + array.length)
                if (array.length != msgBuffer) {
                    console.log("Зашел в иф");
                    var articleDiv = document.querySelector("ul.shoutbox-content");
                    for (let i = msgBuffer; i < array.length; i++) {
                        var text = array[i]["text"];
                        var author = array[i]["author"];
                        var date = array[i]["date"];

                        var p = document.createElement("p");
                        p.className = "shoutbox-comment";

                        var li = document.createElement("li");
                        var span = document.createElement("span")
                        span.className = "shoutbox-username";
                        li.className = "liClass";
                        li.onclick = function () {
                            console.log("click li");
                            //Доделать ответ по клику
                            //window.location.href = "chat.html?ToUser=" + msg[i].get("ToUser");
                        }
                        var liText = document.createTextNode(author);
                        span.appendChild(liText);
                        var pText = document.createTextNode(text);
                        p.appendChild(pText);

                        var spanDate = document.createElement("span");
                        spanDate.className = "shoutbox-comment-ago";
                        var dateText = document.createTextNode(date);
                        spanDate.appendChild(dateText);

                        li.appendChild(span);
                        li.appendChild(p);
                        li.appendChild(spanDate);

                        articleDiv.appendChild(li);

                    }
                    msgBuffer = array.length;
                }
                console.log(array.length);
            }
        })
    }, 1500);
}




interval();

// $('.msg_form').on('submit', function (e) {


//     console.log("форма работает");







//     var data = $(this).serializeArray(),
//         message = data[0].value;



// });




