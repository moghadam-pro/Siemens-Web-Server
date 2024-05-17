// First read data and generate data table
$.ajaxSetup({ cache: false });
// write here your count of files app should read alphas
const fileCount = 2;
//////
for (let files = 0 ; files < fileCount ; files++){
    $.get("./IOread-" + files + ".htm", function (result) {
        try {
            const data = result.trim().split(/\r?\n/);
            createDT(data);
        } catch (err) {
            console.error(err);
        }
    });
    setInterval(1000);
}
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
            <button class="accordionRow activeAcc" id="netA${item}">Network Alpha #${item}</button>
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
                if(records[key].beta == "0"){
                // console.log("alpha : " + item + " beta : " +  records[key].beta);
                $('#netA' + item + '_records .cardBody').append(`                               
                <div class="cardBox zeroBeta" id="A${item}B${records[key].beta}">
                    <span class="cardID">A${item}B${records[key].beta}</span>
                    <span class="cardStatus cs_${records[key].status}" title="${records[key].status}"></span>
                    <div class="cardVal">
                        <span class="angle afterStyle degreeSign" title="Panel Angel">${records[key].panelAngel}</span>
                        <span class="wind_velocity afterStyle kmhSign" title="Wind Velocity">${records[key].windVelocity}</span>
                        <span class="wind_velocity afterStyle" title="Status">${records[key].motorVoltag}</span>
                    </div>
                    <select class="cardSelect" name="mode" id="mode_A_${item}_B_${records[key].beta}">
                        <option value="0">Net Autopilot</option>
                        <option value="1">Net East Storm</option>
                        <option value="2">Net West Storm</option>
                        <hr>
                        <option value="3" selected="selected">Autopilot</option>
                        <option value="4">East Wash</option>
                        <option value="5">West Wash</option>
                    </select>
                </div>
                `);
            }else{
                $('#netA' + item + '_records .cardBody').append(`                               
                <div class="cardBox" id="A${item}B${records[key].beta}">
                    <span class="cardID">A${item}B${records[key].beta}</span>
                    <span class="cardStatus cs_${records[key].status}" title="${records[key].status}"></span>
                    <div class="cardVal">
                        <span class="angle afterStyle degreeSign" title="Panel Angel">${records[key].panelAngel}</span>
                        <span class="wind_velocity afterStyle" title="Wind Velocity">${records[key].windVelocity}</span>
                    </div>
                    <select class="cardSelect" name="mode" id="mode_A_${item}_B_${records[key].beta}">
                        <option value="0">Net Autopilot</option>
                        <option value="1">Net East Storm</option>
                        <option value="2">Net West Storm</option>
                        <hr>
                        <option value="3" selected="selected">Autopilot</option>
                        <option value="4">East Wash</option>
                        <option value="5">West Wash</option>
                    </select>
                </div>
                `);
            }
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
        // $("#" + selectedID).find('.motor_voltage').html(records[xkey].motorVoltag);
    }
}
$(document).ready(function () {
    $.ajaxSetup({ cache: false });
    setInterval(function () {
        for (let files = 0 ; files < fileCount ; files++){
            $.get("./IOread-" + files + ".htm", function (result) {
                try {
                    const data = result.trim().split(/\r?\n/);
                    updateValue(data);
                } catch (err) {
                    console.error(err);
                }
            });
        }
    }, 8000);
    // Send mode chanes to PLC
    // replaced by amin code
    $(document,'.cardSelect').on('change',()=>{
        var selectedID = event.target.id;
        const splits = selectedID.split("_");
        var selectedVal = $("#" + selectedID).find(':selected').val();
        var selectedText = $("#" + selectedID).find(':selected').text();
        const url="IOwrite.htm";
        XalphaTitle='"webData".alfaNumber';
        XalphaValue = splits[2];
        XbetaValue = splits[4];
        myVal =  Number(selectedVal*10000)+Number(XalphaValue*100)+Number(XbetaValue);
        sdata=escape(XalphaTitle)+'='+ myVal;
        console.log(sdata);
        for (let counts = 0 ; counts < 10 ; counts++){
            $.post(url,sdata,function(result){
                console.log('|| writed into : ' + url);
                console.log(sdata);
                console.log("Seleced : " + selectedText);
            });
        }
    });
    // script for accordion headers
    $(document,'.accordionRow').on('click',()=>{
        var tagID = event.target.id + "_records";
        $("#" + tagID).toggle();
    });
});
// npx lite-server