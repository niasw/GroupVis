/** Apache License 2.0 Applies **/
/** @author Sun Sibai & Liu Yu **/
var nodes;
var table;
// constant declaration
var wid=700; // width
var hgh=700; // height
var txtsize=15; // text size in pt
var linsize=2; // line width in px
var circler=20; // circle radius
var linkwid=10; // link rect width in px
var strngth=1; // dynamic simulation (force)
var viscsty=1; // dynamic simulation (viscosity)
var noddist=500; // balance distance for a single link
var central=0.1; // central attraction to prevent drifting away
// function declaration
function drawinit() {
 d3.select('body').append('div').attr('class','wrapper').attr('id','canvas')
   .append('svg').attr('class','chart center')
   .attr('width',wid).attr('height',hgh);
}
function delgraph() {
 d3.select('div#canvas').remove();
}
function setdrawpara() {
 noddist=1600/Math.sqrt(nodes.length+1);
 if (nodes.length>50) {
  circler=20/Math.sqrt(nodes.length-50);
  txtsize=Math.round(circler*0.75);
 }
}
