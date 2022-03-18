function deselectAll(){
    $('.selected').removeClass('selected');
}

function selectRow(rowIndex){
    $(`#row${rowIndex}`).addClass('selected');

}

function selectColumn(colIndex){
    $(`#spreadsheet tr td:nth-child(${colIndex+1})`).addClass('selected');
}

$(document).ready(function(){
    $('#col1').click(function(){
        deselectAll();
        selectColumn(1);
    });

    $('#col2').click(function(){
        deselectAll();
        selectColumn(2);
    });

    $('#col3').click(function(){
        deselectAll();
        selectColumn(3);
    });

    $('#row1').click(function(){
        deselectAll();
        selectRow(1);
    });

    $('#row2').click(function(){
        deselectAll();
        selectRow(2);
    });

    $('#row3').click(function(){
        deselectAll();
        selectRow(3);
    });
});


