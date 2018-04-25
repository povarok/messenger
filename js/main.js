$(function () {

    Parse.$ = jQuery;
    Parse.serverURL = "https://pg-app-ae2ym6gds1wddidtsydys97dwtryhv.scalabl.cloud/1/";
    Parse.initialize("mo33TVQ1g7F71UwmrXc64ExDQjOj9OPkSUEWT5i7", "5XHK2sMNkkDbnswmMmQ07qtaPj7Ea4RiOORWU9lT");

    Parse.User.enableUnsafeCurrentUser()
    var currentUser = Parse.User.current();
    if (currentUser) {
        console.log('current');
    } else {
        console.log('not');
    }
    username = Parse.User.current().get("username");
    document.getElementById("username").innerText = username;

    var img = Parse.User.current().get("avatar");
    console.log("img - " + img);
    if (img != undefined) {
        document.getElementById("user_image").src = img.url();
    }
    document.getElementById("user_image").style.height = "68px";
    document.getElementById("user_image").style.width = "68px";
    document.getElementById("user_image").style.marginRight = "430px";
    document.getElementById("user_image").style.marginTop = "1px";
    document.getElementById("user_image").style.zIndex = 2;

    
    document.getElementById("new_dialog").onclick = function () {
        //console.log("click working");
        window.location.href = "chat.html";
    }
    // var anotherQuery = new Parse.Query(img);
    // anotherQuery.equalTo("username", username);
    // anotherQuery.find({
    //     success: function (msg) {
    //         var file = msg[0].get("avatar");
    //         document.getElementById("user_image").src = file.url();
    //     }
    // });

    //document.getElementById("user_image").src = img;



    function logout() {
        //alert("logout working");
        window.location.href = "login.html";
        console.log("logout");

        Parse.User.logOut().then(() => {
            var currentUser = Parse.User.current();  // this will now be null

        });

    }
    // эта функция почему то вызывается сразу при переходе на страницу
    //document.getElementById('logout1').addEventListener('click', logout1());
    document.getElementById('logout').onclick = logout;


    // var btn = document.createElement("BUTTON");        // Create a <button> element
    // var t = document.createTextNode("CLICK ME");       // Create a text node
    // btn.appendChild(t);        
    // btn.onclick = function(){
    //     console.log("logout");
    // }                       // Append the text to <button>
    // document.body.appendChild(btn); 


    function getAllChats() {
        var Chat = Parse.Object.extend("Chat");
        //Основной элемент для заполнения
        var articleDiv = document.querySelector("ul.shoutbox-content");



        var dateQuery = new Parse.Query(Chat);
        //equalTo("title", "I'm Hungry");
        dateQuery.equalTo("sender", username);
        dateQuery.descending("updatedAt");
        dateQuery.limit(50);
        //console.log("dsf" + dateQuery.include("sender"));
        dateQuery.find({
            success: function (msg) {

                var msgArray = msg;
                for (let i = 0; i < msg.length; i++) {
                    //console.log()
                    //msg[i].get("text") = "changed";
                    console.log("msg[i].get() " + msg[i]);
                    // if (msg[i].get("sender") == username) {

                    var p = document.createElement("p");
                    p.className = "shoutbox-comment";
                    //Здесь будет цикл, но его пока нету:)
                    var li = document.createElement("li");
                    // li.onmouseenter="style"
                    var span = document.createElement("span")
                    span.className = "shoutbox-username";
                    li.className = "liClass";
                    li.onclick = function (params) {
                        console.log("click working");
                        window.location.href = "chat.html?Recipient=" + msg[i].get("recipient");
                    }
                    var liText = document.createTextNode(msg[i].get("recipient"));
                    span.appendChild(liText);
                    //last_msg = msg[i].get("messages")[msg[i].get("messages").length["text"]]
                    console.log(msg[i].get("messages")[msg[i].get("messages").length - 1]["text"]);

                    var pText = document.createTextNode(msg[i].get("messages")[msg[i].get("messages").length - 1]["text"]);
                    p.appendChild(pText);

                    var spanDate = document.createElement("span");
                    spanDate.className = "shoutbox-comment-ago";
                    var dateText = document.createTextNode(msg[i].get("updatedAt"));
                    spanDate.appendChild(dateText);

                    li.appendChild(span);
                    li.appendChild(p);
                    li.appendChild(spanDate);

                    articleDiv.appendChild(li);
                }
            }


        });


        // var mod = document.querySelectorAll('.liClass');
        // for (let index = 0; index < mod.length; index++) {
        //     mod[index].addEventListener('click', function () {
        //         console.log("dfsdf");
        //         //window.location.href = "chat.html?User=" + msgArray[index].get("ToUser");
        //     });
        // }

        //var ul = document.getElementById("chat-container");
        // var li = document.createElement("li");
        // li.innerText = "Created element by js";
        // ul.appendChild(li);

        // ul.append('<li>' +
        //     '<span class="shoutbox-username">' + Parse.User.current().get("username") + '</span>' +
        //     '<p class="shoutbox-comment">' + "comment to add" + '</p>' +
        //     '<div class="shoutbox-comment-details"><span class="shoutbox-comment-reply" data-name="' + "Another Name " + '">REPLY</span>' +
        //     '<span class="shoutbox-comment-ago">' + "Date here" + '</span></div>' +
        //     '</li>');
    }
    getAllChats();

    //Пример добавления и получения данных
    // var Chat = Parse.Object.extend("Chat");
    // var chat = new Chat();
    // chat.set("LastMessage", "Some message here");
    // chat.set("UserID", currentUser.id);
    // console.log(currentUser.id);
    // chat.set("UserName", currentUser.get("username"));
    // chat.save(null,{
    //     success: function(chat){
    //         var query = new Parse.Query(Chat);
    //         query.equalTo("UserID", currentUser.id);
    //         query.find({
    //             success:function (usersChat) {
    //                console.log(usersChat);
    //             }
    //         });
    //     }
    // });
});