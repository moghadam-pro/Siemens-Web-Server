// First read data and generate data table
$.ajaxSetup({ cache: false });
$.get("./IOread-sub.htm", function (result) {
    try {
        const data = result.trim().split(/\r?\n/);
        createDT(data);
    } catch (err) {
        console.error(err);
    }
});
// Convert Array to Object and Creat All Records
function createDT(data){
    let records = {};
    const alphas = new Set();
    let counter = 0;
    for (let key = 0 ; key < data.length ; key++){
        records[counter] = {
            alpha: data[key],
            beta: data[++key],
            panelAngel: data[++key],
            windVelocity: data[++key],
            motorVoltag: data[++key],
            status: data[++key]
        };
        counter++;
    }
    // console.log(records);
    for (const key of Object.keys(records))
    {
        alphas.add(records[key].alpha);
    }
    // console.log(alphas);
    createRecords(records,alphas);
}
// Generate Records box
function createRecords(records,alphas){
    for (const item of alphas){
        $('#contentWrap').append(`
        <div class="networkRow">
            <!-- Card Header - Accordion -->
            <button class="accordionRow activeAcc" id="netA${item}">Substation ${item}</button>
            <!-- Card Content - Collapse -->
            <div class="panelAcc" id="netA${item}_records">   
                <div class="cardBody d-flex flex-wrap"></div>                             
            </div>
        </div>
        `);
    }
    for (const item of alphas){
        for (const key of Object.keys(records)){
            if (records[key].alpha == item){
                $('#netA' + item + '_records .cardBody').append(`                               
                <div class="cardBox" id="A${item}B${records[key].beta}">
                    <div class="cardVal">
                        <span class="angle afterStyle beforeStyle lineCurrentTitle lineCurrentSign" title="Line Current (A)">${records[key].panelAngel}</span>
                        <span class="wind_velocity afterStyle beforeStyle lineVoltageSign lineVoltageTitle" title="Line Voltage (V)">${records[key].windVelocity}</span>
                        <span class="motor_voltage afterStyle beforeStyle apparentPowerSign apparentPowerTitle" title="Apparent Power (kVA)">${records[key].motorVoltag}</span>
                    </div>
                </div>
                `);
            }else{
                continue;
            }
        }
    }
}
function updateValue(data){
    let records = {};
    let counter = 0;
    for (let key = 0 ; key < data.length ; key++){
        records[counter] = {
            alpha: data[key],
            beta: data[++key],
            panelAngel: Math.round(data[++key]),
            windVelocity: Math.round(data[++key]),
            motorVoltag: Math.round(data[++key]),
            status: data[++key]
        };
        counter++;
    }
    // console.log(records);
    for (const xkey in records)
    {
        var selectedID = "A" + records[xkey].alpha + "B" + records[xkey].beta;
        // $("#" + selectedID).find('.cardStatus').attr('title') = records[xkey].status;
        $("#" + selectedID).find('.angle').html(records[xkey].panelAngel);
        $("#" + selectedID).find('.wind_velocity').html(records[xkey].windVelocity);
        $("#" + selectedID).find('.motor_voltage').html(records[xkey].motorVoltag);
    }
}

function updateChart(newData){
    let chartNewObj = {};
    var now = new Date();
    var pretty = [now.getSeconds()].join('');
    let counter = 0;
    for (let key = 0 ; key < newData.length ; key++){
        chartNewObj[counter] = {
            start: newData[key],
            size: newData[++key],
            data: newData[++key],
            color: newData[++key],
        };
        counter++;
    }
    // console.log(chartNewObj);
    $("#sub-line-chart tbody").append(`
    <tr>
        <th scope="row"> Q${pretty} </th>
        <td style="--start: ${chartNewObj[0].start}; --size: ${chartNewObj[0].size};"><span class="data"> ${chartNewObj[0].data} </span></td>
        <td style="--start: ${chartNewObj[1].start}; --size: ${chartNewObj[1].size};"><span class="data"> ${chartNewObj[1].data} </span></td>
        <td style="--start: ${chartNewObj[2].start}; --size: ${chartNewObj[2].size};"><span class="data"> ${chartNewObj[2].data} </span></td>
        <td style="--start: ${chartNewObj[3].start}; --size: ${chartNewObj[3].size};"><span class="data"> ${chartNewObj[3].data} </span></td>
    </tr>
    `);
    var trCount = $("#sub-line-chart tbody").children().length;
    if(trCount>288){
        $("#sub-line-chart tbody").find('tr:first').remove();
    }
}
$(document).ready(function () {
    $.ajaxSetup({ cache: false });
    setInterval(function () {
        $.get("./IOread-sub.htm", function (result) {
            try {
                const data = result.trim().split(/\r?\n/);
                updateValue(data);
            } catch (err) {
                console.error(err);
            }
        });
        $.get("./IOread-history.htm", function (result) {
            try {
                const newData = result.trim().split(/\r?\n/);
                updateChart(newData);
            } catch (err) {
                console.error(err);
            }
        });
    }, 1000);
    // script for accordion headers
    $(document,'.accordionRow').on('click',()=>{
        var tagID = event.target.id + "_records";
        $("#" + tagID).toggle();
    });
});
// npx lite-server