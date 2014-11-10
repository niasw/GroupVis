/** Apache License 2.0 Applies **/
/** @author Sun Sibai & Liu Yu **/
d3.json("./example/data/D3group.json", function(error,data) {
 if (error) {console.log(error);}
 nodes=data.nodes;
 table=data.table;
 // draw graph
 drawinit();
 drawnodes(nodes);
 drawtable(table);
});
