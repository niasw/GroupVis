/** Apache License 2.0 Applies **/
/** @author Sun Sibai & Liu Yu **/
var dynaInterval;
function updateNodes() {
 var cs=d3.selectAll('circle.nodes')[0]; /* all circles in svg */
 var cse=d3.selectAll('circle.erase')[0];
 var cst=d3.selectAll('text.nodes')[0];
 for (var rlt in table) {
  var lft=nodes.indexOf(table[rlt].left);
  var rgt=nodes.indexOf(table[rlt].right);
  var rst=nodes.indexOf(table[rlt].result);
  if (lft!=0&&rgt!=0&&rst!=0) { // remove 1
   var lftX=parseFloat(cs[lft].getAttribute('cx')),lftY=parseFloat(cs[lft].getAttribute('cy'));
   var rgtX=parseFloat(cs[rgt].getAttribute('cx')),rgtY=parseFloat(cs[rgt].getAttribute('cy'));
   var rstX=parseFloat(cs[rst].getAttribute('cx')),rstY=parseFloat(cs[rst].getAttribute('cy'));
   var dx_lft_rgt=rgtX-lftX,dy_lft_rgt=rgtY-lftY;
   var dx_lft_rst=rstX-lftX,dy_lft_rst=rstY-lftY;
   var dx_rgt_rst=rstX-rgtX,dy_rgt_rst=rstY-rgtY;
   var D_lft_rgt=Math.sqrt(dx_lft_rgt*dx_lft_rgt+dy_lft_rgt*dy_lft_rgt);
   var D_lft_rst=Math.sqrt(dx_lft_rst*dx_lft_rst+dy_lft_rst*dy_lft_rst);
   var D_rgt_rst=Math.sqrt(dx_rgt_rst*dx_rgt_rst+dy_rgt_rst*dy_rgt_rst);
   var lft_VX=strngth*dx_lft_rgt*(D_lft_rgt-baldist)+strngth*dx_lft_rst*(D_lft_rst-baldist),lft_VY=strngth*dy_lft_rgt*(D_lft_rgt-baldist)+strngth*dy_lft_rst*(D_lft_rst-baldist);
   var rgt_VX=-strngth*dx_lft_rgt*(D_lft_rgt-baldist)+strngth*dx_rgt_rst*(D_rgt_rst-baldist),rgt_VY=-strngth*dy_lft_rgt*(D_lft_rgt-baldist)+strngth*dy_rgt_rst*(D_rgt_rst-baldist);
   var rst_VX=-strngth*dx_rgt_rst*(D_rgt_rst-baldist)-strngth*dx_lft_rst*(D_lft_rst-baldist),rst_VY=-strngth*dy_rgt_rst*(D_rgt_rst-baldist)-strngth*dy_lft_rst*(D_lft_rst-baldist);
   lftX+=lft_VX/viscsty;lftY+=lft_VY/viscsty;
   rgtX+=rgt_VX/viscsty;rgtY+=rgt_VY/viscsty;
   rstX+=rst_VX/viscsty;rstY+=rst_VY/viscsty;
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
 }
 for (var node in nodes) {
  var nodX=parseFloat(cs[node].getAttribute('cx')),nodY=parseFloat(cs[node].getAttribute('cy'));
  var nod_VX=central*(wid/2-nodX),nod_VY=central*(hgh/2-nodY);
  if (node!=0) { // except 1
   nodX+=nod_VX/viscsty;nodY+=nod_VY/viscsty;
  } else {
   nodX-=nod_VX/viscsty*0.5;nodY-=nod_VY/viscsty*0.5;
  }
  cs[node].setAttribute('cx',nodX);cs[node].setAttribute('cy',nodY);
  cse[node].setAttribute('cx',nodX);cse[node].setAttribute('cy',nodY);
  cst[node].setAttribute('x',nodX);cst[node].setAttribute('y',nodY+txtsize/2.5);
 }
 // redraw the links
 clearpath();
 drawtable(table); // FIXME: Oh! This complex step slowdown the animation!!!
}
function clearpath() {
 var tmppath=d3.selectAll('.sline');
 tmppath.remove();
}
function arrangeNodes() {
 if (dynaInterval) {
  clearInterval(dynaInterval);
  dynaInterval=null;
 } else {
  dynaInterval=setInterval('updateNodes();',200);
 }
}

