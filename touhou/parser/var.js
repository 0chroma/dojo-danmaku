dojo.provide("touhou.parser.var");

touhou.parser.var = {
    _isNum: function(dec){
        return parseInt(dec).toString() == "NaN";
    },
    _parseString: function(dec){
        dec = dec.substr(1, dec.length-2);
        //TODO: strip slashes
        return dec;
    },
    parseVar: function(dec){
        dec = dojo.string.trim(dec);
        if(dec.indexOf("\"") != -1){
            //string
            return this._parseString(dec);
        }
        if(this._isNum(dec)){
            //number
            return parseInt(dec);
        }
    }
}
