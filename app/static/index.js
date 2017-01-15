/**
 * Created by Pratik on 1/15/2017.
var search_data;

function readQuery() {
    debugger;
    var q = document.getElementById("SearchQuery").value;
    search_data = {}
    search_data['query'] = q;
    var a = $.ajax({
        type : "POST",
        url : "/search",
        data: JSON.stringify(search_data),
        contentType: 'application/json;charset=UTF-8;',
        success: function(result) {
            console.log("" + result);
            console.log("Hola");
        }
    });
}
 */