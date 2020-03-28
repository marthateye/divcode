var pageList = new Array();
var currentPage = 1;
var numberPerPage = 12;
var numberOfPages = 0;
    
function getNumberOfPages() {
    return Math.ceil(result.length / numberPerPage);
}

function nextPage() {
    currentPage += 1;
    loadList();
}

function previousPage() {
    currentPage -= 1;
    loadList();
}

function firstPage() {
    currentPage = 1;
    loadList();
}

function lastPage() {
    currentPage = numberOfPages;
    loadList();
}

function loadList() {
    $('#Active-session').html($('#Active-session').data('old-state'));
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = result.slice(begin, end);
    alldata();
    check();
}
    
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
            numberOfPages = getNumberOfPages();
            loadList();
        };
        reader.readAsArrayBuffer(f);
    }
}

function alldata(){
    for (var i = 0; i < pageList.length; i++) {
        var x =
            '<div class="col-md-4 mt-4 mb-4">' +
            ' <div class="card">' +
            ' <div class="card-header">' + pageList[i]['Training Title'] + '   </div>' +
            ' <img class="card-img-top" src="' + pageList[i]['Cover Image'] + '">' +
            ' <div class="card-block">' +
            '<h4 class="card-title mt-3"> ' + 'Stack: '+ pageList[i]['Stack'] + '  </h4>' +

            '<div class="card-text"> <b>Price:</b> GHS'+ pageList[i]['Price']+ '.00  <b> Trainer:</b> ' + pageList[i]['Trainer'] + '  </div>' +
            ' </div>' +
            '<div class="card-footer text-muted">' +
            ' Start Date : ' + pageList[i].Date +
            ' <span class="btn btn-info float-right">' + pageList[i]['Duration'] + '</span>' +
            ' </div>' +
            '</div>' +

            ' </div>'
            ;
        
        var valu=$('#month_value').val();
        console.log(valu);
        if (pageList[i]['Training State'] == 'TRUE' && pageList[i]['Stack']==valu && valu!='All') {
            $('#Active-session').append(x);
        }
        else if (pageList[i]['Training State'] == 'TRUE' && valu=='All'){
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

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
}
