
var second = -1;	//second for timer, -1 mean don't countdown 
var cords = [];		//array for random generated cordinates.
var counter = setInterval(function(){timer() }, 1000);	//call timer every second
var score;
var bug_time = 0 ;	//counter for when to creat bug, default = 0 , creat 1 bug at beginning 
var vp;
var bug_number = 1;
var bug_position = {};

var animation = setInterval(function(){animate() }, 10);	//call timer every second
var dead_bugs = [];
var high_score = localStorage.getItem("hs");
function pageLoad(){

	document.getElementById("start").onclick = startFunction;
	document.getElementById("pause").onclick = pauseFunction;
	document.getElementById("restart").onclick = restartFunction;
	document.getElementById("home").onclick = backFunction;
	document.getElementById("viewport").onclick = scoreFunction;


	document.getElementById("pause").addEventListener("onmousedown", mousedown());

	document.getElementById("start").addEventListener("mouseover", startover);
	document.getElementById("start").addEventListener("mouseout", startout);
	document.getElementById("pause").addEventListener("mouseover", pauseover);
	document.getElementById("pause").addEventListener("mouseout", pauseout);

	document.getElementById("restart").addEventListener("mouseover", restartover);
	document.getElementById("restart").addEventListener("mouseout", restartout);
	document.getElementById("home").addEventListener("mouseover", homeover);
	document.getElementById("home").addEventListener("mouseout", homeout);


	if(high_score == null){
		document.getElementById("highscore").innerHTML = 0;
	}else{
		document.getElementById("highscore").innerHTML = high_score;
	}


}	

//Actions when start! is pressed. 
function startFunction(){
	vp = document.getElementById("viewport").getContext("2d");
	document.getElementById("startpg").style.display = "none";
	document.getElementById("gamingpg").style.display = "block";
	second = 59;	//set second to 60, start countdown  
	score = 0;		//reset score to 0 each turn. 
	document.getElementById("score").innerHTML = 0;
	random_food();	// generate randoom x and y coordinates for foods
	food_gen();		// generate food using the array of random numbers
}

//color change when mouse on start.
function startover(){
	document.getElementById("start").style.color = "#FFE3AC";
}
// color change when mouse out start.
function startout(){
	document.getElementById("start").style.color = "black";
}

//Actions when pause is pressed.
function pauseFunction(){
	var change = document.getElementById("pause");
	if (change.innerHTML == "Pause"){
		change.innerHTML = "Play";
		second = -1;
	}else{
		change.innerHTML = "Pause";
		second = document.getElementById("time").innerHTML;
	}
}

function mousedown(){
	if(document.getElementById("pause").innerHTML !== "Play"){
		document.getElementById("pause").innerHTML = "Pause";
	}
}

//color change when mouse on start.
function pauseover(){
	document.getElementById("pause").style.color = "#FFD175";
}
// color change when mouse out start.
function pauseout(){
	document.getElementById("pause").style.color = "#CCCC7A";

}

//function to refresh counter. 
function timer(){
	if (second == 0){		//stop timer when second is 0
		second = -1;
		bug_number = 1;
		dead_bugs =[];
		document.getElementById("time").innerHTML = 0;
		if (high_score == null || high_score < score){				//if got a new high score
			document.getElementById("highscore").innerHTML = score;		// replace score in home page with new high
			localStorage.setItem("hs", score);							//store new high score to local strg
			document.getElementById("newhigh").style.display = "block"	//show "new high score"
		}else{														//else
			document.getElementById("newhigh").style.display = "none"	//no change , and hide new high score
		}
		document.getElementById("showscore").innerHTML = score ;		//show at the end
		document.getElementById("gamingpg").style.display = "none";
		document.getElementById("gameover").style.display = "block";
		document.getElementById("time").innerHTML = 60;


	}else if(second != -1){	//refresh timer  each second.
		if(bug_time == 0){		//if the counter for bug is 0 , creat a bug
			var bug_type = Math.floor((Math.random() * 10));	//generate random btw 0-9 to determin which type of bug to generate.
			bug_gen(bug_type);			//creat bug 
			bug_time = Math.floor((Math.random() * 3) + 1); 	//give a random number between 3 - 1 second to bug_time
		}
		bug_time = bug_time - 1; 	//bug_time - 1, mean 1 second passed. 
		document.getElementById("time").innerHTML = second;		//replace timer with new time
		second = second - 1;			//decrement second by 1

	}
}
//Generates random coordinates for foods.
function random_food(){		
	cords = [];
	var x;
	var y;
	for (i = 0; i < 10; i++){
		x = Math.floor((Math.random() * 381));
		y = Math.floor((Math.random() * 281) + 300);
		cords.push(x);
		cords.push(y);
	}
}

//generate food from the coordinates.
function food_gen(){	
	vp.clearRect(0, 0, 400, 600);


	var food1 = document.getElementById("burger");
	vp.drawImage(food1, cords[0],cords[1],20,20);

	var food2 = document.getElementById("pizza");
	vp.drawImage(food2, cords[2],cords[3],20,20);

	var food3 = document.getElementById("salad");
	vp.drawImage(food3, cords[4],cords[5],20,20);

	var food4 = document.getElementById("pie");
	vp.drawImage(food4, cords[6],cords[7],20,20);

	var food5 = document.getElementById("cake");
	vp.drawImage(food5, cords[8],cords[9],20,20);
}

//generate bugs
function bug_gen(type){
	var x_cor = Math.floor((Math.random() * 381) + 10);
	var type;
	if(type < 3 ){
		var bug = document.getElementById("black_bug");
		type = "black";
	}else if (type < 6){
		var bug = document.getElementById("orange_bug");
		type = "orange";
	}else{
		var bug = document.getElementById("red_bug");
		type = "red" ;
	}
	vp.drawImage(bug, x_cor, 0, 10, 40);

	var x_string = "bug" + bug_number + "x" ;
	var y_string = "bug" + bug_number + "y" ;
	var type_string = "bug" + bug_number + "type" ;
	var state_string = "bug" +bug_number + "state";
	var opa_string = "bug" +bug_number + "opa"
	bug_position[x_string] = x_cor;
	bug_position[y_string] = 0;
	bug_position[type_string] = type;
	bug_position[state_string] = "live";
	bug_position[opa_string] = "100";
	
	bug_number = bug_number + 1;


	

}

//accumulate score  
function scoreFunction(){
	var canvas = document.getElementById("viewport");
	var bord = canvas.getBoundingClientRect();
	
	var x = event.clientX - bord.left;
	var y = event.clientY - bord.top;
	var distances = [];
	for (i = 1; i < bug_number; i = i + 1){
		var x_string = "bug" + i +"x";
		var y_string = "bug" + i +"y";
		var state_string = "bug" + i +"state";
		if(bug_position[state_string] == "live"){
			var dis = Math.sqrt(Math.pow((x - (bug_position[x_string] + 5)), 2) + Math.pow((y - (bug_position[y_string] + 20)), 2));
		}else{
			var dis = 100;
		}

		distances.push(Math.ceil(dis));

	}
	for (i = 0; i < bug_number; i++) {

		if(distances[i] < 30){		//bug is within 30px
			var type_string = "bug" + (i+1) + "type";
			var x_string = "bug" + (i+1) +"x";
			var y_string = "bug" + (i+1) + "y";
			var state_string = "bug" + (i+1) + "state";
			bug_position[state_string] = "dead";
			dead_bugs.push("bug" + (i+1));
			if(bug_position[type_string] == "red"){
				score = score + 3;
			}else if(bug_position[type_string] == "orange"){
				score  = score + 1;
			}else if(bug_position[type_string] == "black"){
				score = score + 5;
			}
			document.getElementById("score").innerHTML = score;
		}
	}
	/*for (b in dead_bugs){
		
		x_fading = bug_position[dead_bugs[b] + "x"];
		y_fading = bug_position[dead_bugs[b] + "y"];
		type_fading = bug_position[dead_bugs[b] + "state"];
		alpha = 1;
		which = "true";

	}*/

}	

//to move the bugs   ==== testing motion in straight line =====
function animate(){
	if(second == -1){	//stops when paused(sets second to -1)

	}else{
		var i = 1; 
		while (i < bug_number){
			var x_string = "bug" + (i) + "x";
			var y_string = "bug" + (i) + "y";
			var type_string = "bug" + (i) + "type";
			var dis_string = "bug" + (i) + "distances";
			var state_string = "bug" + (i) + "state";
			var opa_string = "bug" + (i) + "opa";

			if(bug_position[type_string] == "black"){
				var bug = document.getElementById("black_bug");
				
			}else if(bug_position[type_string] == "orange"){
				var bug = document.getElementById("orange_bug");
				
			}else{
				var bug = document.getElementById("red_bug");
			}



			if(bug_position[state_string] == "live"){
				vp.clearRect(bug_position[x_string], bug_position[y_string], 10, 40);
				if(document.getElementById("level1").checked){			//if we are in level 1
					if(bug_position[type_string] == "black"){
						bug_position[y_string] = bug_position[y_string] + 1.5;
					
					}else if(bug_position[type_string] == "orange"){
						bug_position[y_string] = bug_position[y_string] + 0.6;
					
					}else{
						bug_position[y_string] = bug_position[y_string] + 0.75;
					}
				}else if(document.getElementById("level2").checked){	//if we are in level 2
					if(bug_position[type_string] == "black"){
						bug_position[y_string] = bug_position[y_string] + 2.0;
					
					}else if(bug_position[type_string] == "orange"){
						bug_position[y_string] = bug_position[y_string] + 0.8;
					
					}else{
						bug_position[y_string] = bug_position[y_string] + 1.0;
					}
				}
				vp.drawImage(bug, bug_position[x_string], bug_position[y_string], 10, 40);
			
			}else if(bug_position[state_string] == "dead"){
				vp.clearRect(bug_position[x_string], bug_position[y_string], 10, 40);
				/*
				alert("bug is" + "bug" + i);
				alert("alpha is" + bug_position[opa_string] )
				vp.globalAlpha = bug_position[opa_string]/100;
				vp.drawImage(bug, bug_position[x_string], bug_position[y_string], 10, 40);
				bug_position[opa_string] = (bug_position[opa_string] - 2);
				if(bug_position[opa_string] <= 0){
					break;
				}*/
			}
		i = i +1;
		}

	}
	
}
//fadout for the bugs

/*function fade_out(x_cord, y_cord, type){
	if (which != "false"){
		alert("in fade_out");
		alert("alpha is " + alpha);
		var get = type + "_bug"
		var bug = document.getElementById(get);
		vp.clearRect(x_cord, y_cord, 10, 40);
		vp.fillStyle = "red";
		vp.globalAlpha = alpha;
		vp.fillRect(x_cord, y_cord, 10, 40);
		//vp.drawImage(bug, x_cord, y_cord, 10, 40);
		alpha = alpha - 0.02;
		if(alpha < 0){
			which = "false";
		}
	}
}*/
//calculate bug and food distance  ################not finished
function bug_food_dis(bug, x_cord, y_cord){ 
	var all_targets = [];
	var target ;

	for(i = 0; i < 10; i = i + 2){		//compare all foods position with bug.  distance from 
		all_targets.push(Math.round(Math.sqrt(Math.pow(((x_cord + 5) - (cords[i] + 10)), 2) + Math.pow(((y_cord + 20) - (cords[i+1] + 10)), 2))));
		bug_position[bug] = all_targets;
	}
	var closest = Math.min.apply(Math, bug_position[bug]);
	for(i = 0; i < 5; i ++){		// get the smallest(nearest food) among the distances
		if(bug_position[bug][i] == closest){
			target = i *2;
		}
	}
	alert(target);

}

function backFunction(){
	document.getElementById("gameover").style.display = "none";
	document.getElementById("startpg").style.display = "block";
}

function restartFunction(){
	vp = document.getElementById("viewport").getContext("2d");
	document.getElementById("gameover").style.display = "none";
	document.getElementById("gamingpg").style.display = "block";
	second = 59;	//set second to 60, start countdown  
	score = 0;		//reset score to 0 each turn. 
	document.getElementById("score").innerHTML = 0;
	random_food();	// generate randoom x and y coordinates for foods
	food_gen();		// generate food using the array of random numbers
}

//color change when mouse on restart.
function restartover(){
	document.getElementById("restart").style.color = "#FFE3AC";
}
// color change when mouse out start.
function restartout(){
	document.getElementById("restart").style.color = "black";
}

//color change when mouse on home.
function homeover(){
	document.getElementById("home").style.color = "#FFE3AC";
}
// color change when mouse out home.
function homeout(){
	document.getElementById("home").style.color = "black";
}
window.onload = pageLoad;