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
                        <span class="angle afterStyle oneSign" title="PANEL ANGEL">${records[key].panelAngel}</span>
                        <span class="wind_velocity afterStyle twoSign" title="WIND VELOCITY">${records[key].windVelocity}</span>
                        <span class="motor_voltage afterStyle threeSign" title="MOTOR VOLTAGE">${records[key].motorVoltag}</span>
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
            panelAngel: data[++key],
            windVelocity: data[++key],
            motorVoltag: data[++key],
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
    }, 1000);
    // script for accordion headers
    $(document,'.accordionRow').on('click',()=>{
        var tagID = event.target.id + "_records";
        $("#" + tagID).toggle();
    });
});
// npx lite-server