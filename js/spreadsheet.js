var grades = [];
var gradeCount = 0;

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
    d3.selectAll("svg").remove();
    $(`#row${rowIndex} td`).addClass('selected');
    $(`#row${rowIndex} td`).each(function(){
        grades[gradeCount] = $(this).text();
        gradeCount++;
        //console.log(`row: ${$(this).text()} ${gradeCount}`);
    });

    createGraph();

}

function selectColumn(colIndex){
    d3.selectAll("svg").remove();
    $(`#spreadsheet tr td:nth-child(${colIndex+1})`).addClass('selected');
    $(`#spreadsheet tr td:nth-child(${colIndex+1})`).each(function(){
        grades[gradeCount] = $(this).text();
        gradeCount++;
        //console.log(`col: ${$(this).text()} ${gradeCount}`);
    });
    createGraph();
}

function convertGrades(){
    var a=0,b=0,c=0,d=0,f=0;
    var current;

    for (let i = 0; i < grades.length; i++){
        current = getGrade(grades[i]);
        if (current == 'A') {
            a++;
        } 
        
        else if (current == 'B') {
            b++
        } 
        
        else if (current == 'C') {
            c++
        } 
        
        else if (current == 'D') {
            d++;
        } 
        
        else {
            f++;
        }
    }

    const percents = [
        (a/grades.length), (b/grades.length), (c/grades.length),
        (d/grades.length), (f/grades.length)
    ]

    const graphArray = [
        { "grade": "A", "freq": a, "percent": percents[0] },
        { "grade": "B", "freq": b, "percent": percents[1] },
        { "grade": "C", "freq": c, "percent": percents[2] },
        { "grade": "D", "freq": d, "percent": percents[3] },
        { "grade": "F", "freq": f, "percent": percents[4] }
    ];

    return graphArray;
}

function createGraph(){
    d3.select(".body").selectAll("svg").remove();

    const stats = convertGrades();
    const width = 600;
    const height = 600;
    const margin = 50;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin; 

    const colorScale = d3.scaleLinear()
        .domain([0, 1])
        .range(['white', 'blue'])

    const xScale = d3.scaleBand() 
        .domain(stats.map((data) => data.grade))
        .range([0, chartWidth])
        .padding(0.5)

    const yScale = d3.scaleLinear() 
        .domain([0, 1])
        .range([chartHeight, 0]);

    let svg = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height -15)
        .attr("text-anchor", 'middle')
        .text('Grade Freq(%)')
        svg.append('text')
    
    let graph = svg.append('g')
        .attr('transform', `translate(${margin},${margin})`)

    graph.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale))

    graph.append('g')
        .call(d3.axisLeft(yScale))

    let rects = graph.selectAll('rect')
        .data(stats)
        .enter()
        .append('rect')
        .attr('x', (data) => xScale(data.grade))
        .attr('y', (data) => yScale(data.percent))
        .attr("width", xScale.bandwidth())
        .attr("height", (data) => (chartHeight - yScale(data.percent)))
        .attr('fill', (data) => colorScale(data.percent))

}

$(document).ready(function(){
    $("input").hide();

    for(let i = 1; i < 6; i++){
        $(`#col${i}`).click(function(){
            deselectAll();
            selectColumn(i);
        });
    }

    for(let i = 1; i < 10; i++){
        $(`#rh${i}`).click(function(){
            deselectAll();
            selectRow(i);
        });
    }

    // td click handling
    $('td').each(function(){
        
        $(this).click(function(){
            $("input").hide();
            deselectAll();
            $(this).addClass('selected');

            var cell = $(this).attr('class');
            cell = cell.split(' ');

            var input = '.i' + cell[1] + cell[2];
            var cellInput = $(input);

            var data = '.d' + cell[1] + cell[2];
            var cellData = $(data);

            var cellText = $(cellData).text();
            $(cellData).text("");

            $(cellInput).show();
            $(cellData).val(cellText);
            var n = cellText;

            $(cellInput).keypress(function(event){
                var keycode = (event.keyCode ? event.keyCode : event.which);
                //13 is enter
                if(keycode == '13'){
                    $(cellInput).hide();
                    n = $(cellInput).val();
                    $(cellData).text(n);
                }
            });
        });
    })

});


