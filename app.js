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
  var firstTrain = "";

  $("#submitButton").focus().on("click", function(event) {
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    firstTrain = $("#firstTrain").val().trim();

    database.ref().push({
        name: trainName,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

  });

  database.ref().on("child_added", function(snapshot) {

    var sv = snapshot.val();   

    var tFrequency = sv.frequency;
    var firstTime = sv.firstTrain;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    // Current Time
    var currentTime = moment();
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var trainArrival = moment(nextTrain).format("hh:mm");

    var entry = "<tr><td>" + sv.name + "</td><td>" + sv.destination + "</td><td>" + sv.frequency + "</td><td>" + trainArrival + "</td><td>" + tMinutesTillTrain + "</td></tr>";
    $("#table").append(entry);

  });

});
