sap.ui.define(["sap/ui/core/format/DateFormat"], function(DateFormat) {  
    return {

         getDate: function(){
            var oDateFormat = DateFormat.getDateInstance({
                pattern: "MM/d/yyyy"
            });
            
            return oDateFormat.format(new Date());;
        }
        
        };
});