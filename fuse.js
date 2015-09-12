var mapLength = 2000;



var list = new Array();
var colorList = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#8B00FF"];

// 红色 #FF0000 
// 橙色 #FF7F00
// 黄色 #FFFF00 
// 绿色 #00FF00 
// 青色 #00FFFF 
// 蓝色 #0000FF
// 紫色 #8B00FF

var player = {
	x: 300,
	y: 300,
	target_x: 300,
	target_y: 300,
	score: 20,
	color: colorList[randomColor()],
	radius: 20,
	speed: 2
};

function ListNode(color, radius, x, y) {

	this.color = color;
	this.radius = radius;
	this.x = x;
	this.y = y;
	this.next = null;
}

function randomCoordinate() {

	return Math.round(Math.random() * mapLength);
}

function randomRadius() {

	return (5 + Math.round(Math.random() * 4));
}

function randomColor() {
	return Math.floor(Math.random() * 7);
}

function getDistance(x1, y1, x2, y2) {

	var dis_x = x1 - x2;
	var dis_y = y1 - y2;
	return Math.sqrt(Math.pow(dis_x, 2) + Math.pow(dis_y, 2));
}

function getCoordinates(e) {
	var x = e.clientX;
	var y = e.clientY;

	player.target_x = x;
	player.target_y = y;
}


function updata() {

	var dis_x = player.target_x - 300;
	var dis_y = player.target_y - 300;
	var distance = Math.sqrt(Math.pow(dis_x, 2) + Math.pow(dis_y, 2));

	if (distance >= player.speed && player.x <= mapLength && player.y <= mapLength && player.x >= 0 && player.y >= 0) {
		var mov_x = player.speed * (dis_x / distance);
		var mov_y = player.speed * (dis_y / distance);

		if ((player.x + mov_x) > mapLength) {
			player.x = mapLength - player.radius;
			player.target_x = 300;
		} else if ((player.x + mov_x) < 0) {
			player.x = player.radius;
			player.target_x = 300;
		} else {
			player.x += mov_x;
		}
		if ((player.y + mov_y) > mapLength) {
			player.y = mapLength - player.radius;
			player.target_y = 300;
		} else if ((player.y + mov_y) < 0) {
			player.y = player.radius;
			player.target_y = 300;
		} else {
			player.y += mov_y;

		}


	}


	for (var i = 300 - list.length; i >= 0; i--) {

		var x = new ListNode(colorList[randomColor()], randomRadius(), randomCoordinate(), randomCoordinate());
		list.push(x);
	}

}

function draw(context) {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);

	for (var i = player.speed; i < 500; i += 60) {
		var x = i +

			context.beginPath();
		context.lineTo(i, 0);
		context.lineTo(i, 500);
		context.strokeStyle = "gray";
		context.stroke();

		context.beginPath();
		context.lineTo(0, i);
		context.lineTo(500, i);
		context.strokeStyle = "gray";
		context.stroke();
	}



	for (var i = 0; i < list.length; i++) {


		//判断接触
		if (getDistance(player.x, player.y, list[i].x, list[i].y) <= player.radius) {
			player.radius += 0.5;
			player.score += 1;
			player.color = list[i].color;
			var x = new ListNode(colorList[randomColor()], randomRadius(), randomCoordinate(), randomCoordinate());
			list.splice(i, 1, x);
		}

		//以用户的点作参考，绘制用户300半径以内的点
		if (getDistance(list[i].x, list[i].y, player.x, player.y) < 300) {

			context.beginPath();
			context.fillStyle = list[i].color;
			context.arc(list[i].x - player.x + 300, list[i].y - player.y + 300, list[i].radius, 0, Math.PI * 2);
			context.fill();
		}
	}



	//把用户的点绘制在（300,300）
	context.beginPath();
	context.fillStyle = player.color;
	context.arc(300, 300, player.radius, 0, Math.PI * 2);
	context.fill();

	document.getElementById("status").innerHTML = " Score:" + player.score + "</br>" + " Range:.....";

}

var i = 0;

function func() {
	var c = document.getElementById("mycanvas");
	c.width = 500;
	c.height = 500;
	var cxt = c.getContext("2d");

	updata();
	draw(cxt);
	console.log(player.x + "        :    " + player.y);
	requestAnimationFrame(func);

}
window.onload = func;