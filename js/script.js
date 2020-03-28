function handleFile() {
  
    var fileInput = document.getElementById("files");
    //console.log(fileInput)
    var files =fileInput.files;
    var i;

    //Loop through files

    for (i = 0, f = files[i]; i != files.length; ++i) {
        var reader = new FileReader();
        var name = f.name;
        console.log(name)
        reader.onload = function (e) {
            console.log(e)
            var data = e.target.result;

            //var result;
            var workbook = XLSX.read(data, { type: 'binary' });

            var sheet_name_list = workbook.SheetNames;
            sheet_name_list.forEach(function (m) { 
                //loop through all the sheets in excel file.
                //Convert the cell value to Json
                var object_row = XLSX.utils.sheet_to_json(workbook.Sheets[m]);
                if (object_row.length > 0) {
                    result = object_row;
                }
            });

            //Get the first column first cell value
            $('#Active-session').html($('#Active-session').data('old-state'));
            alldata();
        };
        reader.readAsArrayBuffer(f);
    }
}

function alldata(){
    for (i = 0; i < result.length; i++) {

        var x =
            '<div class="col-md-4 mt-4 mb-4">' +
            ' <div class="card">' +
            ' <div class="card-header">' + result[i]['Training Title'] + '   </div>' +
            ' <img class="card-img-top" src="' + result[i]['Cover Image'] + '">' +
            ' <div class="card-block">' +
            '<h4 class="card-title mt-3"> Stack: ' + result[i]['Stack'] + '  </h4>' +

            '<div class="card-text"> Price: GHS'+ pageList[i]['Price']+ '.00  Trainer: ' + pageList[i]['Trainer'] + '  </div>' +
            ' </div>' +
            '<div class="card-footer text-muted">' +
            ' Start Date : ' + result[i].Date +
            ' <span class="btn btn-info float-right">' + result[i]['Duration'] + '</span>' +
            ' </div>' +
            '</div>' +

            ' </div>'
            ;

        var valu=$('#month_value').val();
        console.log(valu);
        if (result[i]['Training State'] == 'TRUE' && result[i]['Stack']==valu && valu!='All') {
            $('#Active-session').append(x);
        }
        else if (result[i]['Training State'] == 'TRUE' && valu=='All'){
            $('#Active-session').append(x);
        }     
        
        $('.file').hide(500);
        $('.month-text').html(valu + "- Sessions");
       
    }

}

$(document).ready(function () {
    var fileInput = document.getElementById("files");
    $('#Active-session').data('old-state', $('#Active-session').html());
    $('#files').change(handleFile);

    $('#month_value').change(handleFile);
    
});
var result;
var f;
