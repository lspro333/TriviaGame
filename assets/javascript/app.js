var triviaQuestions = [{
	question: "The gemstone called ____________ was named after the seeds of a pomegranate.",
	answerList: ["Ruby", "Garnet", "Red Diamond", "Pink Sapphire"],
	answer: 1
},{
	question: "____________ was named by Tiffany & Co. in honor of the east African country where it was discovered in the 1960s.",
	answerList: ["Iolite", "Sapphire", "Tanzanite", "Opal"],
	answer: 2
},{
	question: "Some ancient sailors used _____________ as an antidote for seasickness.",
	answerList: ["Amethyst", "Topaz", "Sapphire", "Aquamarine"],
	answer: 3
},{
	question: "____________(an alternative birthstone for October) is piezoelectric, meaning it can hold a static charge. If you rub it vigorously, it will attract small debris. The opposite ends will polarize like a magnet.",
	answerList: ["Tourmaline", "Onyx", "Citrine", "Topaz"],
	answer: 0
},{
	question: "In the Middle Ages, women would wear _____________ to protect the color of their blonde hair.",
	answerList: ["Emeralds", "Citrine", "Topaz", "Opals"],
	answer: 3
},{
	question: "It takes ______ years to grow a cultured pearl.",
	answerList: ["1-3", "3-5", "5-7", "7-9"],
	answer: 0
},{
	question: "What birthstone is notorious for changing from one color to another under different lighting?",
	answerList: ["Aquamarine", "Amethyst", "Alexandrite", "Peridot"],
	answer: 2
},{
	question: "Ametrine is a combination of what 2 birthstone months?",
	answerList: ["January and August", "February and November", "May and December", "October and March"],
	answer: 1
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8'];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	correct: "Correct!",
	incorrect: "Sorry! That's incorrect.",
	endTime: "Time's up!",
	finished: "Let's see how you did!"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
	

	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();

	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;

	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;


	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}