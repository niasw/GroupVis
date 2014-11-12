/** Apache License 2.0 Applies **/
/** @author Sun Sibai & Liu Yu **/
var nodes;
var table;
// constant declaration
var wid=700; // width
var hgh=700; // height
var txtsize=16; // text size in pt
var linsize=2; // line width in px
var circler=20; // circle radius
var linkwid=10; // link rect width in px
var strngth=0.001; // dynamic simulation (force)
var viscsty=1; // dynamic simulation (viscosity)
var baldist=330; // balance distance
var central=0.1; // central attraction to avoid moving away
// function declaration
function drawinit() {
 d3.select('body').append('div').attr('class','wrapper')
   .append('svg').attr('class','chart center')
   .attr('width',wid).attr('height',hgh);
}
