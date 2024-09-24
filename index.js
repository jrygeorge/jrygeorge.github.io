const canvas = document.getElementById("logo_canvas");
const ctx = canvas.getContext("2d");

a = window.innerHeight;
b = window.innerWidth;
headerHeight = 100
if(a>b){headerHeight = Math.max(a,b)/7;}else{headerHeight = Math.max(a,b)/15;}

ctx.canvas.width  = headerHeight
ctx.canvas.height = headerHeight

document.getElementById("bar").style.height = headerHeight
heads  = document.getElementsByClassName("header")
heads[0].style.fontSize = headerHeight/4;
heads[1].style.fontSize = headerHeight/7;