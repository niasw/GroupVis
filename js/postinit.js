/** Apache License 2.0 Applies **/
/** @author Sun Sibai & Liu Yu **/
var source="example/data/demo.json";
var drawgraph=drawtable;
var animation=fullgraph;
var spele=0;
function updateSPeleAndRefresh() {
 spele=nodes.indexOf(document.getElementById('spele').value);
 if (spele==-1) alert('404: Special Element not Found!');
 refresh();
}
