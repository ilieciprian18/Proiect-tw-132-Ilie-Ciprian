
function sterge() {
  var list = document.getElementById("myList");
  list.removeChild(list.childNodes[0]);
}
function review() {
	var x = document.getElementById("myText").value;
	var z = document.createElement('p');
	z.innerHTML = x;
  document.body.appendChild(z);
}
function shop() {
  shopp=window.open("https://www.cinemacity.ro/#/","bilete","width=600,height=600");
}
function closea() {
  shopp.close();
}
function culoare()
{
	var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
	console.log(bgColor);

document.getElementById("titlee").style.color = bgColor;
	
}
window.onload = myMain;
function myMain() {
document.getElementById("quiz").onsubmit = totalQuiz;}
function totalQuiz() {
var fe = document.getElementById("quiz").elements;
var q1 = fe[0].elements;
var q2 = fe[4].elements;
var x=0;
for (var i = 0; i<q1.length; i++) 
	if (q1[i].checked) x = x + parseInt(q1[i].value);
for (var i = 0; i<q2.length; i++) 
	if (q2[i].checked) x = x + parseInt(q2[i].value);
alert(x);
}

