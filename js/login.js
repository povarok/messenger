$(function() {
    alert("shf,jnftn");
    Parse.$ = jQuery;
    Parse.serverURL="https://pg-app-ae2ym6gds1wddidtsydys97dwtryhv.scalabl.cloud/1/";
    //ApplicationID, JavaScriptKey 
    Parse.initialize(
        "mo33TVQ1g7F71UwmrXc64ExDQjOj9OPkSUEWT5i7",
        "5XHK2sMNkkDbnswmMmQ07qtaPj7Ea4RiOORWU9lT"
      );
 
    $('.form-signin').on('submit', function(e) {
 
        // Prevent Default Submit Event
        e.preventDefault();
     
        // Get data from the form and put them into variables
        var data = $(this).serializeArray(),
            username = data[0].value,
            password = data[1].value;
        
        // Call Parse Login function with those variables
        Parse.User.logIn(username, password, {
            // If the username and password matches
            success: function(user) {
                window.location.href="main.html";
                alert('Вы зашли как: '+username);
            },
            // If there is an error
            error: function(user, error) {
                console.log(error);
            }
        });
    });
});