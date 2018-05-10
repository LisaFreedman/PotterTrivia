var ans = document.querySelectorAll(".answer");
var resetScore = document.querySelector("#resetscore");
var skipQues = document.querySelector("#skip");
var waiting = document.querySelector("#waiting");
var loadAnim = document.querySelector("#waitanim");
var curScore = 0;
var data;

function randIndex(){
	return Math.floor(Math.random()*4);
}
function fetchReq() {
	loading(true);
	axios("https://opentdb.com/api.php?amount=1&type=multiple")
	.then(updateQues)
}

function updateQues(response) {
	data = response.data.results[0];
	document.querySelector("#question").innerHTML = data.question;
	var options = data.incorrect_answers;
	options.splice(randIndex(),0,data.correct_answer);
	document.querySelector("#optn1").innerHTML = options[0];
	document.querySelector("#optn2").innerHTML = options[1];
	document.querySelector("#optn3").innerHTML = options[2];
	document.querySelector("#optn4").innerHTML = options[3];
	loading(false);
}
for (var i = 0; i < ans.length; i++) {
	ans[i].addEventListener("click",function(){
		checkAnswer(this);		
	});
}
function checkAnswer(ele) {
	if(ele.innerHTML === data.correct_answer){
		ele.classList.add("correct");
		loading(true);
		document.querySelector("#hscore").innerHTML = ++curScore;
		changeQues();
	}else {
		ele.classList.add("incorrect");
		loading(true);
		document.querySelector("#hscore").innerHTML = --curScore;
		changeQues();
	}
}
function changeQues() {
	
	setTimeout(function(){
		for (var j = 0; j < ans.length; j++) {
			ans[j].classList.remove("incorrect")
			ans[j].classList.remove("correct")
		}	
		fetchReq();
	},800)
}
function loading(fire){
	if(fire){
		waiting.classList.add("loading");
		loadAnim.classList.add("animation");
	}else{
		waiting.classList.remove("loading");
		loadAnim.classList.remove("animation");
	}
}
resetScore.addEventListener("click",function (argument) {
	curScore = 0;
	document.querySelector("#hscore").innerHTML = curScore;
});
skipQues.addEventListener("click",function() {
	loading(true);
	fetchReq();
})
fetchReq();