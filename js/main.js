/** Apache License 2.0 Applies **/
/** @author Sun Sibai & Liu Yu **/
function refresh() {
 d3.json(source, function(error,data) {
  if (error) {console.log(error);}
  try { delgraph(); } catch (exc) {}
  nodes=data.nodes;
  table=data.table;
  // setting graphics
  setdrawpara();
  // draw graph
  drawinit();
  drawnodes(nodes);
  drawgraph(table);
 });
}
