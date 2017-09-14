$(document).ready(function(event) {

  var config = {
    apiKey: "AIzaSyDvywqJWnW5K3GtRfAIaYz3hnBda-6WDlI",
    authDomain: "judson-train-scheduler.firebaseapp.com",
    databaseURL: "https://judson-train-scheduler.firebaseio.com",
    projectId: "judson-train-scheduler",
    storageBucket: "",
    messagingSenderId: "672347465566"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var frequency = "";
  var nextArrival = "";

  $("#submitButton").focus().on("click", function(event) {
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    nextArrival = $("#nextArrival").val().trim();

    database.ref().push({
        name: trainName,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

  });

  database.ref().on("child_added", function(snapshot) {

  var sv = snapshot.val();

    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.frequency);
    console.log(sv.nextArrival);    

    var worked = "4 months"
    var totalBilled = 1000

    var now = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(now);

    var entry = $("#table").append ("<tr><td>" + sv.name + "</td><td>" + sv.role + "</td><td>" + sv.start + "</td><td>" + worked + "</td><td>" + sv.rate + "</td></tr>");

    console.log(entry);

});

});



  // orderByChild("dateAdded").limitToLast(1)