/** Apache License 2.0 Applies **/
/** @author Sun Sibai & Liu Yu **/
var dynaInterval;
function clearpath() {
 var tmppath=d3.selectAll('.sline');
 tmppath.remove();
}
function updateNodes() {
 var cs=d3.selectAll('circle.nodes')[0]; /* all circles in svg */
 var cse=d3.selectAll('circle.erase')[0];
 var cst=d3.selectAll('text.nodes')[0];
 for (var rlt in table) {
  var lft=nodes.indexOf(table[rlt].left);
  var rgt=nodes.indexOf(table[rlt].right);
  var rst=nodes.indexOf(table[rlt].result);
  var npos=animation(lft,rgt,rst,cs,cse,cst);
  // if I did not write following 3 lines, you may be wondering what I was doing here. (trade efficiency with readablility)
  var lftX=npos[0],lftY=npos[1];
  var rgtX=npos[2],rgtY=npos[3];
  var rstX=npos[4],rstY=npos[5];
  cs[lft].setAttribute('cx',lftX);cs[lft].setAttribute('cy',lftY);
  cs[rgt].setAttribute('cx',rgtX);cs[rgt].setAttribute('cy',rgtY);
  cs[rst].setAttribute('cx',rstX);cs[rst].setAttribute('cy',rstY);
  cse[lft].setAttribute('cx',lftX);cse[lft].setAttribute('cy',lftY);
  cse[rgt].setAttribute('cx',rgtX);cse[rgt].setAttribute('cy',rgtY);
  cse[rst].setAttribute('cx',rstX);cse[rst].setAttribute('cy',rstY);
  cst[lft].setAttribute('x',lftX);cst[lft].setAttribute('y',lftY+txtsize/2.5);
  cst[rgt].setAttribute('x',rgtX);cst[rgt].setAttribute('y',rgtY+txtsize/2.5);
  cst[rst].setAttribute('x',rstX);cst[rst].setAttribute('y',rstY+txtsize/2.5);
 }
 for (var node in nodes) { // central attraction
  var nodX=parseFloat(cs[node].getAttribute('cx')),nodY=parseFloat(cs[node].getAttribute('cy'));
  var nod_VX=central*(wid/2-nodX),nod_VY=central*(hgh/2-nodY);
  nodX+=nod_VX/viscsty;nodY+=nod_VY/viscsty;
  cs[node].setAttribute('cx',nodX);cs[node].setAttribute('cy',nodY);
  cse[node].setAttribute('cx',nodX);cse[node].setAttribute('cy',nodY);
  cst[node].setAttribute('x',nodX);cst[node].setAttribute('y',nodY+txtsize/2.5);
 }
 // redraw the links
 clearpath();
 drawgraph(table); // FIXME: Oh! This complex step slowdown the animation!!!
}
function arrangeNodes() {
 if (dynaInterval) {
  clearInterval(dynaInterval);
  dynaInterval=null;
 } else {
  dynaInterval=setInterval('updateNodes();',200);
 }
}

