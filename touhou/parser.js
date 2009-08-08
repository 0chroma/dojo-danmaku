dojo.provide("touhou.parser");
dojo.require("dojo.string");

touhou.parser = {
    data: {
        config: {},
        sub: {},
    },
    parse: function(path){
        this.data = {};
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
    }
    _parseLine: function(line){
        if(line[0] == "#")
            this._parseHash(line);
    }
    _parseHash: function(line){
        line = substr(1, line.length);
        //if it's an include statement, tell the parser
        if(line.indexOf("include_script") == 0){
            //grab what's in the quotes

        }
    }
};
