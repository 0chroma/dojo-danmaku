dojo.provide("touhou._base");
dojo.require("touhou.parser");

var script = "./scripts/sample1.txt"

dojo.addOnLoad(function(){
    touhou.parser.parse(script);
});
