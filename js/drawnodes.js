/** Apache License 2.0 Applies **/
/** @author Sun Sibai & Liu Yu **/
function drawnodes(nodes) {
 for (var node in nodes) {
  var cx=Math.random()*(wid-circler*4)+circler*2;
  var cy=Math.random()*(hgh-circler*4)+circler*2;
  d3.select('svg')
    .append('circle').attr('class','erase')
    .attr('cx',cx).attr('cy',cy).attr('r',circler);
  d3.select('svg')
    .append('circle').attr('class','nodes')
    .attr('cx',cx).attr('cy',cy).attr('r',circler);
  d3.select('svg')
    .append('text').attr('class','nodes')
    .attr('x',cx).attr('y',cy+txtsize/2.5)
    .text(nodes[node]);
 }
}
