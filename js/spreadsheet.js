function getGrade(mark) {
    if (mark < 50.0) {
        return 'F';
    } else if (mark < 60.0) {
        return 'D';
    } else if (mark < 70.0) {
        return 'C';
    } else if (mark < 80.0) {
        return 'B';
    } else {
        return 'A';
    }
}

function deselectAll(){
    $('.selected').removeClass('selected');
}

function selectRow(rowIndex){
    $(`#row${rowIndex} td`).addClass('selected');

}

function selectColumn(colIndex){
    $(`#spreadsheet tr td:nth-child(${colIndex+1})`).addClass('selected');
}

$(document).ready(function(){
    for(let i = 1; i < 6; i++){
        $(`#col${i}`).click(function(){
            deselectAll();
            selectColumn(i);
        });
    }

    for(let i = 1; i < 10; i++){
        $(`#row${i}`).click(function(){
            deselectAll();
            selectRow(i);
        });
    }

    // td click handling
    ('td').each(function(){
        $(this).click(function(){
            deselectAll();
            $(this).css("background-color", "e0e0ff");
        })
    })

});


