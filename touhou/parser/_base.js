dojo.provide("touhou.parser._base");
dojo.require("dojo.string");
dojo.require("touhou.parser.const");
dojo.require("touhou.parser.var");

dojo.mixin(touhou.parser, {
    data: {
        config: {},
        sub: {},
    },
    parse: function(path){
        dojo.xhrGet({
            url: path,
            load: dojo.hitch(this, "_parse"),
            sync: true
        });
    },
    _parse: function(data){
        //kill windows newlines
        while(data.indexOf("\r") != -1)
            data = data.replace("\r", "\n");
        var dirtylines = data.split("\n");
        var lines = [];
        //remove whitespace
        for(var i=0; i<dirtylines.length; i++){
            if(dojo.string.trim(dirtylines[i]) != "")
                lines.push(dirtylines[i]);
        }
        //now we have all the clean lines in 'lines'. Delete dirtylines to clear up some memory.
        delete dirtylines;
        //parse the file
        for(var i=0; i<lines.length; i++){
            var line = dojo.string.trim(lines[i]);
            this._parseLine(line);
        }
    },
    _parseLine: function(line){
        if(line[0] == "#")
            this._parseHash(line);
    },
    _parseHash: function(line){
        line = line.substr(1, line.length);
        //if it's an include statement, tell the parser
        if(line.indexOf(this.const.include) == 0){
            // isolate the string declaration and parse
            line = line.substr(this.const.include.length, line.length-1);
            var script = this.var.parseVar(line);
            this.parse(dojo.moduleUrl("touhou.scripts", script).toString());
            return;
        }
        //Otherwise, it's metadata. Store in this.config
        var index = line.indexOf("[")
        var prop = line.substr(0, index == -1 ? line.length : index);
        var val = index == -1 ? null : line.substr(index+1, line.length-index-2);
        console.log(prop, val); 
        this.data.config[prop] = val;
    }
});
