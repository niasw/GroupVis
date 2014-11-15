/** Apache License 2.0 Applies **/
/** @author Sun Sibai & Liu Yu **/
function fullgraph(lft,rgt,rst,cs,cse,cst) { // all nodes interacts
 var lftX=parseFloat(cs[lft].getAttribute('cx')),lftY=parseFloat(cs[lft].getAttribute('cy'));
 var rgtX=parseFloat(cs[rgt].getAttribute('cx')),rgtY=parseFloat(cs[rgt].getAttribute('cy'));
 var rstX=parseFloat(cs[rst].getAttribute('cx')),rstY=parseFloat(cs[rst].getAttribute('cy'));
 var dx_lft_rgt=rgtX-lftX,dy_lft_rgt=rgtY-lftY;
 var dx_lft_rst=rstX-lftX,dy_lft_rst=rstY-lftY;
 var dx_rgt_rst=rstX-rgtX,dy_rgt_rst=rstY-rgtY;
 var D_lft_rgt=Math.sqrt(dx_lft_rgt*dx_lft_rgt+dy_lft_rgt*dy_lft_rgt)+0.1;
 var D_lft_rst=Math.sqrt(dx_lft_rst*dx_lft_rst+dy_lft_rst*dy_lft_rst)+0.1;
 var D_rgt_rst=Math.sqrt(dx_rgt_rst*dx_rgt_rst+dy_rgt_rst*dy_rgt_rst)+0.1;
 var lft_VX = strngth*dx_lft_rgt/D_lft_rgt*(1-noddist/D_lft_rgt)
            + strngth*dx_lft_rst/D_lft_rst*(1-noddist/D_lft_rst),
     lft_VY = strngth*dy_lft_rgt/D_lft_rgt*(1-noddist/D_lft_rgt)
            + strngth*dy_lft_rst/D_lft_rst*(1-noddist/D_lft_rst);
 var rgt_VX =-strngth*dx_lft_rgt/D_lft_rgt*(1-noddist/D_lft_rgt)
            + strngth*dx_rgt_rst/D_rgt_rst*(1-noddist/D_rgt_rst),
     rgt_VY =-strngth*dy_lft_rgt/D_lft_rgt*(1-noddist/D_lft_rgt)
            + strngth*dy_rgt_rst/D_rgt_rst*(1-noddist/D_rgt_rst);
 var rst_VX =-strngth*dx_lft_rst/D_lft_rst*(1-noddist/D_lft_rst)
            - strngth*dx_rgt_rst/D_rgt_rst*(1-noddist/D_rgt_rst),
     rst_VY =-strngth*dy_lft_rst/D_lft_rst*(1-noddist/D_lft_rst)
            - strngth*dy_rgt_rst/D_rgt_rst*(1-noddist/D_rgt_rst);
 lftX+=lft_VX/viscsty;lftY+=lft_VY/viscsty;
 rgtX+=rgt_VX/viscsty;rgtY+=rgt_VY/viscsty;
 rstX+=rst_VX/viscsty;rstY+=rst_VY/viscsty;
 return [lftX,lftY,rgtX,rgtY,rstX,rstY];
}
function mononodes(lft,rgt,rst,cs,cse,cst) { // radial graph
 var lftX=parseFloat(cs[lft].getAttribute('cx')),lftY=parseFloat(cs[lft].getAttribute('cy'));
 var rgtX=parseFloat(cs[rgt].getAttribute('cx')),rgtY=parseFloat(cs[rgt].getAttribute('cy'));
 var rstX=parseFloat(cs[rst].getAttribute('cx')),rstY=parseFloat(cs[rst].getAttribute('cy'));
 var dx_lft_rgt=rgtX-lftX,dy_lft_rgt=rgtY-lftY;
 var dx_lft_rst=rstX-lftX,dy_lft_rst=rstY-lftY;
 var dx_rgt_rst=rstX-rgtX,dy_rgt_rst=rstY-rgtY;
 var D_lft_rgt=Math.sqrt(dx_lft_rgt*dx_lft_rgt+dy_lft_rgt*dy_lft_rgt)+0.1;
 var D_lft_rst=Math.sqrt(dx_lft_rst*dx_lft_rst+dy_lft_rst*dy_lft_rst)+0.1;
 var D_rgt_rst=Math.sqrt(dx_rgt_rst*dx_rgt_rst+dy_rgt_rst*dy_rgt_rst)+0.1;
 var lft_VX,lft_VY,rgt_VX,rgt_VY,rst_VX,rst_VY;
 if (lft==spele) { // attraction between right and result
  var ratio=1;
  lft_VX = lft_VY = 0;
  rgt_VX =-strngth*dx_lft_rgt/D_lft_rgt*(1-noddist/D_lft_rgt)*ratio
          +strngth*dx_rgt_rst/D_rgt_rst*(1-noddist/D_rgt_rst)*ratio;
  rgt_VY =-strngth*dy_lft_rgt/D_lft_rgt*(1-noddist/D_lft_rgt)*ratio
          +strngth*dy_rgt_rst/D_rgt_rst*(1-noddist/D_rgt_rst)*ratio;
  rst_VX =-strngth*dx_lft_rst/D_lft_rst*(1-noddist/D_lft_rst)*ratio
          -strngth*dx_rgt_rst/D_rgt_rst*(1-noddist/D_rgt_rst)*ratio;
  rst_VY =-strngth*dy_lft_rst/D_lft_rst*(1-noddist/D_lft_rst)*ratio
          -strngth*dy_rgt_rst/D_rgt_rst*(1-noddist/D_rgt_rst)*ratio;
 } else { // general repulsion to spread nodes
  var ratio=0.5;
  lft_VX =-strngth*dx_lft_rgt/D_lft_rgt*ratio
          -strngth*dx_lft_rst/D_lft_rst*ratio,
  lft_VY =-strngth*dy_lft_rgt/D_lft_rgt*ratio
          -strngth*dy_lft_rst/D_lft_rst*ratio;
  rgt_VX = strngth*dx_lft_rgt/D_lft_rgt*ratio
          -strngth*dx_rgt_rst/D_rgt_rst*ratio,
  rgt_VY = strngth*dy_lft_rgt/D_lft_rgt*ratio
          -strngth*dy_rgt_rst/D_rgt_rst*ratio;
  rst_VX = strngth*dx_lft_rst/D_lft_rst*ratio
          +strngth*dx_rgt_rst/D_rgt_rst*ratio,
  rst_VY = strngth*dy_lft_rst/D_lft_rst*ratio
          +strngth*dy_rgt_rst/D_rgt_rst*ratio;
 }
 lftX+=lft_VX/viscsty;lftY+=lft_VY/viscsty;
 rgtX+=rgt_VX/viscsty;rgtY+=rgt_VY/viscsty;
 rstX+=rst_VX/viscsty;rstY+=rst_VY/viscsty;
 return [lftX,lftY,rgtX,rgtY,rstX,rstY];
}
function animmultiL(lft,rgt,rst,cs,cse,cst) { // gathering left cosets
 var lftX=parseFloat(cs[lft].getAttribute('cx')),lftY=parseFloat(cs[lft].getAttribute('cy'));
 var rgtX=parseFloat(cs[rgt].getAttribute('cx')),rgtY=parseFloat(cs[rgt].getAttribute('cy'));
 var rstX=parseFloat(cs[rst].getAttribute('cx')),rstY=parseFloat(cs[rst].getAttribute('cy'));
 var dx_rgt_rst=rstX-rgtX,dy_rgt_rst=rstY-rgtY;
 var dx_lft_rgt=rgtX-lftX,dy_lft_rgt=rgtY-lftY;
 var dx_lft_rst=rstX-lftX,dy_lft_rst=rstY-lftY;
 var D_rgt_rst=Math.sqrt(dx_rgt_rst*dx_rgt_rst+dy_rgt_rst*dy_rgt_rst)+0.1;
 var D_lft_rgt=Math.sqrt(dx_lft_rgt*dx_lft_rgt+dy_lft_rgt*dy_lft_rgt)+0.1;
 var D_lft_rst=Math.sqrt(dx_lft_rst*dx_lft_rst+dy_lft_rst*dy_lft_rst)+0.1;
 var lft_VX,lft_VY,rgt_VX,rgt_VY,rst_VX,rst_VY;
 var ratio=5/(nodes.length+1); // general repulsion to spread nodes
 lft_VX =-strngth*dx_lft_rgt/D_lft_rgt*ratio
         -strngth*dx_lft_rst/D_lft_rst*ratio;
 lft_VY =-strngth*dy_lft_rgt/D_lft_rgt*ratio
         -strngth*dy_lft_rst/D_lft_rst*ratio;
 if (lft==spele) { // attraction between right and result
  var dispn=0.1;
  rgt_VX = strngth*dx_rgt_rst/D_rgt_rst*(1-noddist/D_rgt_rst*dispn)
          +strngth*dx_lft_rgt/D_lft_rgt;
  rgt_VY = strngth*dy_rgt_rst/D_rgt_rst*(1-noddist/D_rgt_rst*dispn)
          +strngth*dy_lft_rgt/D_lft_rgt;
  rst_VX =-strngth*dx_rgt_rst/D_rgt_rst*(1-noddist/D_rgt_rst*dispn)
          +strngth*dx_lft_rst/D_lft_rst;
  rst_VY =-strngth*dy_rgt_rst/D_rgt_rst*(1-noddist/D_rgt_rst*dispn)
          +strngth*dy_lft_rst/D_lft_rst;
 } else { // general repulsion to spread nodes
  rgt_VX = strngth*dx_lft_rgt/D_lft_rgt*ratio
          -strngth*dx_rgt_rst/D_rgt_rst*ratio,
  rgt_VY = strngth*dy_lft_rgt/D_lft_rgt*ratio
          -strngth*dy_rgt_rst/D_rgt_rst*ratio;
  rst_VX = strngth*dx_lft_rst/D_lft_rst*ratio
          +strngth*dx_rgt_rst/D_rgt_rst*ratio,
  rst_VY = strngth*dy_lft_rst/D_lft_rst*ratio
          +strngth*dy_rgt_rst/D_rgt_rst*ratio;
 }
 lftX+=lft_VX/viscsty;lftY+=lft_VY/viscsty;
 rgtX+=rgt_VX/viscsty;rgtY+=rgt_VY/viscsty;
 rstX+=rst_VX/viscsty;rstY+=rst_VY/viscsty;
 return [lftX,lftY,rgtX,rgtY,rstX,rstY];
}
function animmultiR(lft,rgt,rst,cs,cse,cst) { // gathering right cosets
 var lftX=parseFloat(cs[lft].getAttribute('cx')),lftY=parseFloat(cs[lft].getAttribute('cy'));
 var rgtX=parseFloat(cs[rgt].getAttribute('cx')),rgtY=parseFloat(cs[rgt].getAttribute('cy'));
 var rstX=parseFloat(cs[rst].getAttribute('cx')),rstY=parseFloat(cs[rst].getAttribute('cy'));
 var dx_rgt_rst=rstX-rgtX,dy_rgt_rst=rstY-rgtY;
 var dx_lft_rgt=rgtX-lftX,dy_lft_rgt=rgtY-lftY;
 var dx_lft_rst=rstX-lftX,dy_lft_rst=rstY-lftY;
 var D_rgt_rst=Math.sqrt(dx_rgt_rst*dx_rgt_rst+dy_rgt_rst*dy_rgt_rst)+0.1;
 var D_lft_rgt=Math.sqrt(dx_lft_rgt*dx_lft_rgt+dy_lft_rgt*dy_lft_rgt)+0.1;
 var D_lft_rst=Math.sqrt(dx_lft_rst*dx_lft_rst+dy_lft_rst*dy_lft_rst)+0.1;
 var lft_VX,lft_VY,rgt_VX,rgt_VY,rst_VX,rst_VY;
 var ratio=5/(nodes.length+1); // general repulsion to spread nodes
 rgt_VX = strngth*dx_lft_rgt/D_lft_rgt*ratio
         -strngth*dx_rgt_rst/D_rgt_rst*ratio;
 rgt_VY = strngth*dy_lft_rgt/D_lft_rgt*ratio
         -strngth*dy_rgt_rst/D_rgt_rst*ratio;
 if (rgt==spele) { // attraction between left and result
  var dispn=0.1;
  lft_VX = strngth*dx_lft_rst/D_lft_rst*(1-noddist/D_lft_rst*dispn)
          -strngth*dx_lft_rgt/D_lft_rgt;
  lft_VY = strngth*dy_lft_rst/D_lft_rst*(1-noddist/D_lft_rst*dispn)
          -strngth*dy_lft_rgt/D_lft_rgt;
  rst_VX =-strngth*dx_lft_rst/D_lft_rst*(1-noddist/D_lft_rst*dispn)
          +strngth*dx_rgt_rst/D_rgt_rst;
  rst_VY =-strngth*dy_lft_rst/D_lft_rst*(1-noddist/D_lft_rst*dispn)
          +strngth*dy_rgt_rst/D_rgt_rst;
 } else { // general repulsion to spread nodes
  lft_VX =-strngth*dx_lft_rgt/D_lft_rgt*ratio
          -strngth*dx_lft_rst/D_lft_rst*ratio,
  lft_VY =-strngth*dy_lft_rgt/D_lft_rgt*ratio
          -strngth*dy_lft_rst/D_lft_rst*ratio;
  rst_VX = strngth*dx_lft_rst/D_lft_rst*ratio
          +strngth*dx_rgt_rst/D_rgt_rst*ratio,
  rst_VY = strngth*dy_lft_rst/D_lft_rst*ratio
          +strngth*dy_rgt_rst/D_rgt_rst*ratio;
 }
 lftX+=lft_VX/viscsty;lftY+=lft_VY/viscsty;
 rgtX+=rgt_VX/viscsty;rgtY+=rgt_VY/viscsty;
 rstX+=rst_VX/viscsty;rstY+=rst_VY/viscsty;
 return [lftX,lftY,rgtX,rgtY,rstX,rstY];
}
