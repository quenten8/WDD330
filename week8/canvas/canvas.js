function fillpattern() {
    var canvas = document.getElementById("myCanvas"); 
    var context = canvas.getContext("2d"); 
    context.strokeStyle = "red";
    context.fillStyle = "rgba(0, 100, 255, 0.3)";
    context.fillRect(10, 10, 100, 100);   
    context.strokeRect(10, 10, 100, 100);
}

function drawPattern() {
    var canvas = document.getElementById("demo2");
    var context = canvas.getContext("2d");
    context.strokeStyle = "red";
    
    var img = new Image();
    img.src = "bicycle.png";
    img.onload = function() {
    var pattern = context.createPattern(img, "repeat"); 
    context.fillStyle = pattern;                        
    context.fillRect(10, 10, 100, 100);                  
    context.strokeRect(10, 10, 100, 100);             
    };
}

function drawGradient() {
    var canvas = document.getElementById("demo3");
    var context = canvas.getContext("2d");
    context.strokeStyle = "red";
    var gradient = context.createLinearGradient(0, 0, 150, 200);
    gradient.addColorStop(0, "yellow"); 
    gradient.addColorStop(1, "red"); 
    context.fillStyle = gradient; 
    context.fillRect(10, 10, 100, 100); 
    context.strokeRect(10, 10, 100, 100); 
}

function drawCircle(canvas) {
    var canvas = document.getElementById("demo4");
    var context = canvas.getContext("2d");
    context.beginPath();
    context.arc(100, 100, 50, 0, Math.PI*2, true);
    context.closePath();
    context.strokeStyle = "red";
    context.fillStyle = "green";
    context.lineWidth = 3;
    context.fill(); 
    context.stroke(); 
}

fillpattern()
drawPattern()
drawGradient()
drawCircle()


