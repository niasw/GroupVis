/** Apache License 2.0 Applies **/
/** @author Sun Sibai & Liu Yu **/
function twolin(x1,y1,x2,y2,wd) { /** return coordinates of link rectangle, (x1,y1) --- (x2,y2) rect-width=wd **/
 x1=parseFloat(x1);x2=parseFloat(x2);y1=parseFloat(y1);y2=parseFloat(y2);wd=parseFloat(wd);
// var dx=y1-y2,dy=x2-x1; // band link
 var dy=y2-y1,dx=x2-x1; // seam link
 var dd=Math.sqrt(dx*dx+dy*dy);
 dx=dx/dd;dy=dy/dd;
 return [{'x':x1+dx*wd/2,'y':y1+dy*wd/2},{'x':x2+dx*wd/2,'y':y2+dy*wd/2},{'x':x2-dx*wd/2,'y':y2-dy*wd/2},{'x':x1-dx*wd/2,'y':y1-dy*wd/2}];
}
function outlin(x1,y1,x2,y2,wd,out=true) { /** return coordinates of link triangle, (x1,y1) --- (x2,y2) triangle-width=wd **/
 x1=parseFloat(x1);x2=parseFloat(x2);y1=parseFloat(y1);y2=parseFloat(y2);wd=parseFloat(wd);
 var dx=y1-y2,dy=x2-x1;
 var Dy=y2-y1,Dx=x2-x1;
 var dd=Math.sqrt(dx*dx+dy*dy);
 dx=dx/dd;dy=dy/dd;Dx=Dx/dd;Dy=Dy/dd;
 if (out) {
  return [{'x':x1+dx*wd/2+Dx*circler*1.28,'y':y1+dy*wd/2+Dy*circler*1.28},{'x':x2,'y':y2},{'x':x1-dx*wd/2+Dx*circler*1.28,'y':y1-dy*wd/2+Dy*circler*1.28}];
 } else {
  return [{'x':x1+dx*wd/2+Dx*circler,'y':y1+dy*wd/2+Dy*circler},{'x':x2,'y':y2},{'x':x1-dx*wd/2+Dx*circler,'y':y1-dy*wd/2+Dy*circler}];
 }
}
function lineshift(x1,y1,x2,y2,dx,dy,flip=false) { /** along (dx,dy)-direction, shift 20%, return [path dots] **/
 x1=parseFloat(x1);x2=parseFloat(x2);y1=parseFloat(y1);y2=parseFloat(y2);dx=parseFloat(dx);dy=parseFloat(dy);
 var Dx=y1-y2;
 var Dy=x2-x1;
 var dd=Math.sqrt(dx*dx+dy*dy),DD=Math.sqrt(Dx*Dx+Dy*Dy);
 var SinAng=(dx*Dx+dy*Dy)/dd/DD;
 if (Math.abs(SinAng)<0.0001) { // too narrow
  if (flip) {
   return [{'x':x1,'y':y1},{'x':x1+dx/5,'y':y1+dy/5},{'x':x1+dx/5+Dx/5,'y':y1+dy/5+Dy/5},{'x':x2,'y':y2}];
  } else {
   return [{'x':x2,'y':y2},{'x':x1+dx/5+Dx/5,'y':y1+dy/5+Dy/5},{'x':x1+dx/5,'y':y1+dy/5},{'x':x1,'y':y1}];
  }
 } else {
  if (flip) {
   return [{'x':x1,'y':y1},{'x':x1+dx/3,'y':y1+dy/3},{'x':x2,'y':y2}];
  } else {
   return [{'x':x2,'y':y2},{'x':x1+dx/3,'y':y1+dy/3},{'x':x1,'y':y1}];
  }
 }
}
function drawtable(table) { /** 1st graph drawing (default). It draws all triadic relations in a group. So it looks like a woollen yarn ball. **/
 var cs=d3.selectAll('circle.nodes')[0]; /* all circles in svg */
 for (var rlt in table) {
  var lft=nodes.indexOf(table[rlt].left);
  var rgt=nodes.indexOf(table[rlt].right);
  var rst=nodes.indexOf(table[rlt].result);
  var linefun=d3.svg.line()
             .x(function(d) {return d.x;}).y(function(d) {return d.y;})
             .interpolate('linear'); // polygonal lines
  var linefunc=d3.svg.line()
             .x(function(d) {return d.x;}).y(function(d) {return d.y;})
             .interpolate('basis'); // B-spline curve
  if (lft!=rgt) { // left!=right (A)
   var tmpsline=twolin(cs[lft].getAttribute('cx'),cs[lft].getAttribute('cy'),cs[rgt].getAttribute('cx'),cs[rgt].getAttribute('cy'),linkwid);
   var tmpcurv1=lineshift((tmpsline[0].x+tmpsline[1].x)/2,(tmpsline[0].y+tmpsline[1].y)/2,cs[rst].getAttribute('cx'),cs[rst].getAttribute('cy'),tmpsline[1].x-tmpsline[0].x,tmpsline[1].y-tmpsline[0].y);
   var tmpcurv2=lineshift((tmpsline[2].x+tmpsline[3].x)/2,(tmpsline[2].y+tmpsline[3].y)/2,cs[rst].getAttribute('cx'),cs[rst].getAttribute('cy'),tmpsline[2].x-tmpsline[3].x,tmpsline[2].y-tmpsline[3].y,true);
   d3.select('svg').insert('path',':first-child').attr('class','sline').attr('d',linefunc(tmpcurv1)+'L'+linefunc(tmpcurv2).substr(1));
   if (rgt>lft) {d3.select('svg').insert('path',':first-child').attr('class','sline').attr('d',linefun(tmpsline));} // no repeat
  } else { // left=right (use O to present self relation)
   d3.select('svg')
     .insert('circle',':first-child').attr('class','sline')
     .attr('cx',cs[lft].getAttribute('cx')).attr('cy',cs[lft].getAttribute('cy')).attr('r',circler*1.3);
   if (rst!=lft) { // left=right!=result (Ox1+A)
    var tmpspath=outlin(cs[lft].getAttribute('cx'),cs[lft].getAttribute('cy'),cs[rst].getAttribute('cx'),cs[rst].getAttribute('cy'),linkwid);
    d3.select('svg')
      .insert('path',':first-child').attr('class','sline')
      .attr('d',linefun(tmpspath));
   } else { // left=right=result (Ox2)
    d3.select('svg')
      .insert('circle',':first-child').attr('class','sline')
      .attr('cx',cs[lft].getAttribute('cx')).attr('cy',cs[lft].getAttribute('cy')).attr('r',circler*1.5);
   }
  }
 }
}
function drawtable1ele(table) { /** 2nd graph drawing. It only draws triadic relations where the leftside is one specific element (spele). So it looks clear, but does not contain all information in the group. **/
 var cs=d3.selectAll('circle.nodes')[0]; /* all circles in svg */
 for (var rlt in table) {
  var lft=nodes.indexOf(table[rlt].left);
  var rgt=nodes.indexOf(table[rlt].right);
  var rst=nodes.indexOf(table[rlt].result);
  if (lft!=spele) continue;
  var linefun=d3.svg.line()
             .x(function(d) {return d.x;}).y(function(d) {return d.y;})
             .interpolate('linear'); // polygonal lines
  var linefunc=d3.svg.line()
             .x(function(d) {return d.x;}).y(function(d) {return d.y;})
             .interpolate('basis'); // B-spline curve
  if (lft!=rgt) { // left!=right (A)
   var tmpsline=twolin(cs[lft].getAttribute('cx'),cs[lft].getAttribute('cy'),cs[rgt].getAttribute('cx'),cs[rgt].getAttribute('cy'),linkwid);
   var tmpcurv1=lineshift((tmpsline[0].x+tmpsline[1].x)/2,(tmpsline[0].y+tmpsline[1].y)/2,cs[rst].getAttribute('cx'),cs[rst].getAttribute('cy'),tmpsline[1].x-tmpsline[0].x,tmpsline[1].y-tmpsline[0].y);
   var tmpcurv2=lineshift((tmpsline[2].x+tmpsline[3].x)/2,(tmpsline[2].y+tmpsline[3].y)/2,cs[rst].getAttribute('cx'),cs[rst].getAttribute('cy'),tmpsline[2].x-tmpsline[3].x,tmpsline[2].y-tmpsline[3].y,true);
   d3.select('svg').insert('path',':first-child').attr('class','sline').attr('d',linefunc(tmpcurv1)+'L'+linefunc(tmpcurv2).substr(1));
   if (rgt>lft) {d3.select('svg').insert('path',':first-child').attr('class','sline').attr('d',linefun(tmpsline));} // no repeat
  } else { // left=right (use O to present self relation)
   d3.select('svg')
     .insert('circle',':first-child').attr('class','sline')
     .attr('cx',cs[lft].getAttribute('cx')).attr('cy',cs[lft].getAttribute('cy')).attr('r',circler*1.3);
   if (rst!=lft) { // left=right!=result (Ox1+A)
    var tmpspath=outlin(cs[lft].getAttribute('cx'),cs[lft].getAttribute('cy'),cs[rst].getAttribute('cx'),cs[rst].getAttribute('cy'),linkwid);
    d3.select('svg')
      .insert('path',':first-child').attr('class','sline')
      .attr('d',linefun(tmpspath));
   } else { // left=right=result (Ox2)
    d3.select('svg')
      .insert('circle',':first-child').attr('class','sline')
      .attr('cx',cs[lft].getAttribute('cx')).attr('cy',cs[lft].getAttribute('cy')).attr('r',circler*1.5);
   }
  }
 }
}
function drawmultiL(table) { /** 3rd graph drawing. It draws binary relations: spele x ?1 = ?2 . It will provide us the cyclic property of the spele, may also some fuzzy information about the group's creators. The information it provides is identical with the 2nd graph drawing. Although it looks more clear than the 2nd, it needs convention declarement (i.e. who is the spele), while the 2nd one does not. **/
 var cs=d3.selectAll('circle.nodes')[0]; /* all circles in svg */
 for (var rlt in table) {
  var lft=nodes.indexOf(table[rlt].left);
  var rgt=nodes.indexOf(table[rlt].right);
  var rst=nodes.indexOf(table[rlt].result);
  if (lft!=spele) continue;
  var linefun=d3.svg.line()
             .x(function(d) {return d.x;}).y(function(d) {return d.y;})
             .interpolate('linear'); // polygonal lines
  if (rst!=rgt) { // right!=result (A)
   var tmpspath=outlin(cs[rgt].getAttribute('cx'),cs[rgt].getAttribute('cy'),cs[rst].getAttribute('cx'),cs[rst].getAttribute('cy'),linkwid,false);
   d3.select('svg')
     .insert('path',':first-child').attr('class','sline')
     .attr('d',linefun(tmpspath));
  } else { // right=result (O)
   d3.select('svg')
     .insert('circle',':first-child').attr('class','sline')
     .attr('cx',cs[rgt].getAttribute('cx')).attr('cy',cs[rgt].getAttribute('cy')).attr('r',circler*1.3);
  }
 }
}
function drawmultiR(table) { /** 4th graph drawing. It draws binary relations: ?1 x spele = ?2 . The difference from the 3rd is only the position of the first parameter in the triadic relation. (3rd=leftside, 4th=rightside) **/
 var cs=d3.selectAll('circle.nodes')[0]; /* all circles in svg */
 for (var rlt in table) {
  var lft=nodes.indexOf(table[rlt].left);
  var rgt=nodes.indexOf(table[rlt].right);
  var rst=nodes.indexOf(table[rlt].result);
  if (rgt!=spele) continue;
  var linefun=d3.svg.line()
             .x(function(d) {return d.x;}).y(function(d) {return d.y;})
             .interpolate('linear'); // polygonal lines
  if (rst!=lft) { // left!=result (A)
   var tmpspath=outlin(cs[lft].getAttribute('cx'),cs[lft].getAttribute('cy'),cs[rst].getAttribute('cx'),cs[rst].getAttribute('cy'),linkwid,false);
   d3.select('svg')
     .insert('path',':first-child').attr('class','sline')
     .attr('d',linefun(tmpspath));
  } else { // left=result (O)
   d3.select('svg')
     .insert('circle',':first-child').attr('class','sline')
     .attr('cx',cs[lft].getAttribute('cx')).attr('cy',cs[lft].getAttribute('cy')).attr('r',circler*1.3);
  }
 }
}
