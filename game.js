var gamePattern = new Array();
var buttonColours = Array("red", "blue", "green", "yellow");
var userClickedPattern = new Array();
var gameRunning = false;
var level = 0;
var index = 0;

$(document).keydown(function() {
  if (gameRunning == false) {
    nextSequence();
    gameRunning = true;
  }

})

function nextSequence() {
  level++;
  userClickedPattern = []
  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);
  $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $('#level-title').text("Level " + level);

}

$('.btn').click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(level);

});

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');

  setTimeout(function() {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}



function checkAnswer(currentLevel) {
  if (userClickedPattern[index] == gamePattern[index]) {
    console.log("success");
    index++;
    if (index == currentLevel) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
      index = 0;
    }
  } else {
    console.log("fail");
    playSound("wrong");
    $('#level-title').text("Game Over, Press Any Key to Restart");
    $("body").addClass('game-over');
    setTimeout(function() {
      $("body").removeClass('game-over'), 200});
      startOver();
  }
}

function startOver(){
  gameRunning = false;
  level = 0
  gamePattern = [];
}
