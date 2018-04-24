$(function() {
       alert("yay! it worked");
       Parse.$ = jQuery;
       Parse.serverURL="https://pg-app-ae2ym6gds1wddidtsydys97dwtryhv.scalabl.cloud/1/";
       //ApplicationID, JavaScriptKey 
       Parse.initialize(
        "mo33TVQ1g7F71UwmrXc64ExDQjOj9OPkSUEWT5i7",
        "5XHK2sMNkkDbnswmMmQ07qtaPj7Ea4RiOORWU9lT"
      );
    
       var TestObject = Parse.Object.extend("TestObject");
       var testObject = new TestObject();
       testObject.save({foo: "bar"}).then(function(object) {
         alert("yay! it worked");
       });
    
   });