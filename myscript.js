
$(document).ready(function () {
    var colorWheel = ["D82424", "E2EB1B", "24D886", "1B5AEB", "DB1BEB"];
    var hexLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    var currentColor = "D82424"; //Red
    var currentColorRGB = [0, 0, 0];
    var nextColor = "";
    var nextColorRGB = [0, 0, 0];
    var index = 0;
    var newColor = true;
    
    $('body').css('background-color', currentColor); //set starting background color
    
    //Hex = RRBBGG - red-blue-green
    var hexToDec = function (color, array) {
        for (i=0; i <= 4; i += 2) {
            var hex = color[i] + color[i + 1];//Get Hex for either RB or G
            hex = parseInt(hex, 16);//convert to decimal
            if (i == 0) array[0] = hex;//Assign decimal to color array
            else if (i == 2) array[1] = hex;
            else if (i == 4) array[2] = hex;
        }
    }
    
    var changeColor = function () {
        if (newColor) { //Get new color
            if (index < colorWheel.length - 1) index++;
            else index = 0;
            nextColor = colorWheel[index];
            hexToDec(nextColor, nextColorRGB);
            newColor = false;
        } 
        
        var change = false;
        
        //Compare colors
        for (i=0; i<=2; i++) {
            if (currentColorRGB[i] > nextColorRGB[i]) {
                currentColorRGB[i] = currentColorRGB[i] - 1;
                change = true;
            } 
            else if (currentColorRGB[i] < nextColorRGB[i]) {
                currentColorRGB[i] = currentColorRGB[i] + 1;
                change = true;
            }
        }
        
        if (change == false) newColor = true; //Color is the same, time to pick a new one.
        
        //Convert decimal back to hex
        currentColor = "#" + currentColorRGB[0].toString(16) + currentColorRGB[1].toString(16) + currentColorRGB[2].toString(16);
        
        //document.body.style.background = hex;
        $('body').css('background-color', currentColor);

        $('#center_content').css('background-color', currentColor);
        
        window.setTimeout(changeColor, 10);
    }
    
    hexToDec(currentColor, currentColorRGB);
    changeColor();
});

$(document).ready(function () {
//Create canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
//  
document.getElementById("center_content").appendChild(canvas);

//Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
    // ctx.drawImage(bgImage, 0, 0);
};
bgImage.src = "dogeLion.jpg";

//Keyboard Event Listener
var keyDown = {};
/* document.addEventListener("keydown", function (e) {
    if (keyDown == null) {
        keyDown = e.keyCode;
    }
});
document.addEventListener("keyup", function (e) {
    if (e.keyCode == 40) {
        keyDown = null;
    }
    if (e.keyCode == 39) {
        keyDown = null;
    }
    if (e.keyCode == 38) {
        keyDown = null;
    }
    if (e.keyCode == 37) {
        keyDown = null;
    }
}); */
addEventListener("keydown", function (e) {
	keyDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keyDown[e.keyCode];
}, false);


var player = {
    x: 0,
    y: 0,
    color: "green",
    health: 100,
    width: 50,
    height: 50,
    speed: 256
};

var render = function () {
    //Up
    /* if (keyDown === 38) {
        player.y -= player.speed * dx;
    }
    //Down
    if (keyDown === 40) {
        player.y += player.speed * dx;
    }
    //Left
    if (keyDown === 37) {
        player.x -= player.speed * dx;
    }
    //Right
    if (keyDown === 39) {
        player.x += player.speed * dx;
    } */
    /* if (38 in keyDown) { // Player holding up
		player.y -= player.speed * modifier;
	}
	if (40 in keyDown) { // Player holding down
		player.y += player.speed * modifier;
	}
	if (37 in keyDown) { // Player holding left
		player.x -= player.speed * modifier;
	}
	if (39 in keyDown) { // Player holding right
		player.x += player.speed * modifier;
	} */
    
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    
}

var update = function(modifier) {
    if (38 in keyDown) { // Player holding up
		player.y -= player.speed * modifier;
	}
	if (40 in keyDown) { // Player holding down
		player.y += player.speed * modifier;
	}
	if (37 in keyDown) { // Player holding left
		player.x -= player.speed * modifier;
	}
	if (39 in keyDown) { // Player holding right
		player.x += player.speed * modifier;
	}
    
    //border
    if (player.x <= 0) player.x = 0;//left
    if (player.y <= 0) player.y = 0;//top
    if (player.x > (500 - player.width)) player.x = 500 - player.width;//right
    if (player.y > (500 - player.height)) player.y = 500 - player.height;
}

var main = function () {
    var now = Date.now();
    var delta = now - then;
    
    render();
    update(delta / 1000);
    then = now;
    
    requestAnimationFrame(main);
}

var then = Date.now();
main(); 
});










