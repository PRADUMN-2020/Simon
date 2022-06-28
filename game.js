var buttonColours=["red","blue","green","yellow"]
var gamePattern=[];
var userClickedPattern=[];
var level=0,once=true;
$(".btn").click(onClick);
var itr=0;
$(".start-btn").click(function(){
  if(once)
  {  level=0;
  gamePattern=[];
  once=false;
  nextSequence();

  }
});

$("body").keypress(function()
{
  if(once)
  {  level=0;
  gamePattern=[];
  once=false;
  nextSequence();

  }
});
function nextSequence()
{
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomColourChosen=buttonColours[randomNumber];
  gamePattern.push(randomColourChosen);
  $("#"+randomColourChosen).animate({opacity:"0"},100).animate({opacity:"1"},100);
  playSound(randomColourChosen);
  userClickedPattern=[];
  itr=0;
}
function onClick()
{
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  if(userClickedPattern[itr]===gamePattern[itr])
  {
    itr++;
    if(userClickedPattern.length===gamePattern.length)
    {

      setTimeout(nextSequence,1000);
    }
  }
  else
  {
    gameOver();
  }

}
function playSound(name)
{
  var voice = new Audio('sounds/'+name+'.mp3');
  voice.play();

}
function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);

}
function gameOver()
{
  var voice=new Audio("sounds/wrong.mp3");
  voice.play();
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over");},200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  once=true;
}
