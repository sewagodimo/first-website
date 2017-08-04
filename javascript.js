//////////////////////////////////////////////////////////////////////

window.onscroll = function() {scrolldown()};

function scrolldown() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
       
        document.getElementById("menuIcon").style.display = "block";
         document.getElementById("infoIcon").style.display = "block";
         document.getElementById("menu").style.display= "none"; 
            //     document.getElementById("menu").style.display= "block"; 
       // document.getElementById("menu").style.animationName= "slideOut";
      //document.getElementById("menu").style.WebkitAnimationName = "slideOut";
        
    }
    else{
    	document.getElementById("menu").style.display = "block";
    	document.getElementById("menuIcon").style.display= "none";
    	document.getElementById("infoIcon").style.display= "none";
    	//document.getElementById("menu").style.animationName= "slideIn";
     // document.getElementById("menu").style.WebkitAnimationName = "slideIn";
      
    	
    }
}

function showMenu(){
		
		document.getElementById("menuIcon").style.display= "none";
		document.getElementById("infoIcon").style.display= "none";
	//document.getElementById("menu").style.animationName= "slideIn";
     // document.getElementById("menu").style.WebkitAnimationName = "slideIn";
      document.getElementById("menu").style.display = "block";
    	

}
//////////////////////////////////////////////////////////////////////////////////
function checkWord() {

    //get the user's input, check it against the copy and we will have a winner

    if(guess.value==copy.value){
    	colors = ["#468966","#FFF0A5", "#FFB03B","#B64926", "#8E2800"];	
    }
    else if( (copy.value).includes(guess.value)){
    	return;
    }
    else{
		//you have lost;
    	colors = ["white","grey", "darkgray","green", "blue"];

    }
    guess.value="";
    initScene();

}


	var canvas = document.querySelector("#scene"),
		ctx = canvas.getContext("2d"),
		particles = [],
		amount = 0,
		mouse = {x:0,y:0},
		radius = 1;

	var colors = ["#468966","#FFF0A5", "#FFB03B","#B64926", "#8E2800"];

	var copy = document.querySelector("#copy");
	var guess = document.querySelector("#guesstext");
	var ww = canvas.width = window.innerWidth;
	var wh = canvas.height = window.innerHeight;

	function Particle(x,y){
		this.x =  Math.random()*ww;
		this.y =  Math.random()*wh;
		this.dest = {
			x : x,
			y: y
		};
		this.r =  Math.random()*5 + 2;
		this.vx = (Math.random()-0.5)*20;
		this.vy = (Math.random()-0.5)*20;
		this.accX = 0;
		this.accY = 0;
		this.friction = Math.random()*0.05 + 0.94;

		this.color = colors[Math.floor(Math.random()*6)];
	}

	Particle.prototype.render = function() {


		this.accX = (this.dest.x - this.x)/1000;
		this.accY = (this.dest.y - this.y)/1000;
		this.vx += this.accX;
		this.vy += this.accY;
		this.vx *= this.friction;
		this.vy *= this.friction;

		this.x += this.vx;
		this.y +=  this.vy;

		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
		ctx.fill();

		var a = this.x - mouse.x;
		var b = this.y - mouse.y;

		var distance = Math.sqrt( a*a + b*b );
		if(distance<(radius*70)){
			this.accX = (this.x - mouse.x)/100;
			this.accY = (this.y - mouse.y)/100;
			this.vx += this.accX;
			this.vy += this.accY;
		}

	}

	function onMouseMove(e){
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}

	function onTouchMove(e){
    if(e.touches.length > 0 ){
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
	}

function onTouchEnd(e){
  mouse.x = -9999;
  mouse.y = -9999;
}

	function initScene(){

 var text = document.querySelector("#copy");
    var count = Math.floor(Math.random() * 8);
    if(count==4){

    	text.value="success";
    }
    else if (count===0){
    	text.value="friends";
    }
     else if (count===1){
    	txt.value="women";
    }
     else if (count===2){
    	text.value="love";
    }
     else if (count===3){
    	text.value="happy";
    }
    else if (count===3){
    	text.value="billion";
    }
    else if (count===3){
    	text.value="peace";
    }
    else{
    	text.value="code";
    }

		
		ww = canvas.width = window.innerWidth;
		wh = canvas.height = window.innerHeight;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.font = "bold "+(ww/10)+"px sans-serif";
		ctx.textAlign = "center";
		ctx.fillText(copy.value, ww/2, wh/2);

		var data  = ctx.getImageData(0, 0, ww, wh).data;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.globalCompositeOperation = "screen";

		particles = [];
		for(var i=0;i<ww;i+=Math.round(ww/150)){
			for(var j=0;j<wh;j+=Math.round(ww/150)){
				if(data[ ((i + j*ww)*4) + 3] > 150){
					particles.push(new Particle(i+3,j+3));
				}
			}
		}
		amount = particles.length;

	}

	function onMouseClick(){
		radius++;
		if(radius ===5){
			radius = 0;
		}
	}

	function render(a) {
		requestAnimationFrame(render);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < amount; i++) {
			particles[i].render();
		}
	};

	copy.addEventListener("keyup", checkWord);
	window.addEventListener("resize", initScene);
	window.addEventListener("mousemove", onMouseMove);
	window.addEventListener("touchmove", onTouchMove);
	window.addEventListener("click", onMouseClick);
	window.addEventListener("touchend", onTouchEnd);
	window.addEventListener("keypress", checkWord);
	
	initScene();
	requestAnimationFrame(render);
	setInterval(initScene, 10000);