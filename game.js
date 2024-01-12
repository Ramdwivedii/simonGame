var gamePattern=[];
var userClickedPattern=[];
var buttonColor=["red", "blue", "green", "yellow"];
var start = false;
var level = 0;
$(document).keypress(function(){
    if (!start){
        nextSequence();
        start=true;    
    }
});

function playSound (color){
    var audio= new Audio("sounds/"+color+".mp3");
    audio.play();
}

function checkAnswer (currentLevel)
{
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if (userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence()},500);
        }
    }
    else {
        
            $("body").addClass("game-over");
            playSound("wrong");
            setTimeout(function(){
                $("body").removeClass("game-over") }, 200);
            $("#level-title").text("Game Over, Press any key to restart.");
            startOver();
    }
}

$(".btn").on("click",function ()
{
     userClickedPattern.push($(this).attr("id"));
     var userChoosenColor = $(this).attr("id");
    $("."+userChoosenColor).delay(100).fadeOut().fadeIn('slow');
    playSound(userChoosenColor);
    animation(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
    
})
function animation(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed") 
    }, 100);
}


function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour=buttonColor[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).delay(100).fadeOut().fadeIn('slow');
    playSound(randomChosenColour);

}
function startOver(){
    gamePattern=[];
    start=false;
    level=0;
}




