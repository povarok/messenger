



Parse.$ = jQuery;
Parse.serverURL = "https://pg-app-ae2ym6gds1wddidtsydys97dwtryhv.scalabl.cloud/1/";
Parse.initialize("mo33TVQ1g7F71UwmrXc64ExDQjOj9OPkSUEWT5i7", "5XHK2sMNkkDbnswmMmQ07qtaPj7Ea4RiOORWU9lT");

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






sender = Parse.User.current().get("username");
recipient = parseUrlQuery()['Recipient'];
console.log("Current user: " + sender + "\nRecipient: " + recipient);








document.getElementById("sender").innerText = sender;
document.getElementById("recipient").innerText = recipient;

document.getElementById("msg_send").onclick = msg_send;
document.getElementById("to_main").onclick = function () {
    console.log("click working");
    window.location.href = "main.html"
}

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
          success: function(checked_usr) {
            //console.log("women.length" + women.length);
            if (checked_usr.length != 0 ){
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
          error: function(error) {
            
            console.log("Error: " + error.code + " " + error.message);}
        });

        
    }

}


function msg_send() {
    var text = document.getElementById("msg_text").value;
    if (text != "") {
        console.log("Отправляем раз");

        var Chat = Parse.Object.extend("Chat");
        var dateQuery = new Parse.Query(Chat);
        dateQuery.equalTo("sender", sender);
        dateQuery.equalTo("recipient", recipient);
        dateQuery.find({
            success: function (msg) {
                //console.log(msg[0].get("sender"));
                var arr = msg[0].get("messages");
                //console.log("после " + text);
                arr.push({ "text": text, "date": new Date(),"author":sender })
                msg[0].set("messages", arr);
                msg[0].save();
            }
        });

        dateQuery = new Parse.Query(Chat);
        dateQuery.equalTo("sender", recipient);
        dateQuery.equalTo("recipient", sender);
        dateQuery.find({
            success: function (msg) {
                //console.log(msg[0].get("sender"));
                var arr = msg[0].get("messages");
                //console.log("после " + text);
                arr.push({ "text": text, "date": new Date(),"author":sender })
                msg[0].set("messages", arr);
                msg[0].save();
            }
        });

        

        //console.log("форма работает" + document.getElementById("msg_text").value);
        document.getElementById("msg_text").value = "";
    }
    else{
        console.log("Введите текст сообщения");
    }
}

// $('.msg_form').on('submit', function (e) {


//     console.log("форма работает");







//     var data = $(this).serializeArray(),
//         message = data[0].value;



// });




