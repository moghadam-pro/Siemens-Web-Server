// First read data and generate data table
$.ajaxSetup({ cache: false });
$.get("./IOread.htm", function (result) {
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
            <button class="accordionRow activeAcc" id="netA${item}">Network Alpha #${item}</button>
            <!-- Card Content - Collapse -->
            <div class="panelAcc" id="netA${item}_records" style="display: block;">   
                <div class="cardBody d-flex flex-wrap"></div>                             
            </div>
        </div>
        `);
    }
    for (const item of alphas){
        for (const key of Object.keys(records)){
            if (records[key].alpha == item){
                // console.log("alpha : " + item + " beta : " +  records[key].beta);
                $('#netA' + item + '_records .cardBody').append(`                               
                <div class="cardBox" id="A${item}B${records[key].beta}">
                    <span class="cardID">A${item}B${records[key].beta}</span>
                    <span class="cardStatus cs_normal" title="${records[key].status}"></span>
                    <div class="cardVal">
                        <span class="angle" title="PANEL ANGEL">${records[key].panelAngel}</span>
                        <span class="wind_velocity" title="WIND VELOCITY">${records[key].windVelocity}</span>
                        <span class="motor_voltage" title="MOTOR VOLTAGE">${records[key].motorVoltag}</span>
                    </div>
                    <select class="cardSelect" name="mode" id="mode_A${item}B${records[key].beta}">
                        <option value="0" selected="selected">Autopilot</option>
                        <option value="1">West Wash</option>
                        <option value="2">East Wash</option>
                        <option value="3">Storm</option>
                    </select>
                </div>
                `);
            }else{
                continue;
            }
        }
    }
}
function updateValue(xdata){
    console.log('verified all data in 1 second period')
}
$(document).ready(function () {
    $.ajaxSetup({ cache: false });
    setInterval(function () {
        $.get("./IOread.htm", function (result) {
            try {
                const data = result.trim().split(/\r?\n/);
                updateValue(data);
            } catch (err) {
                console.error(err);
            }
        });
    }, 1000);
    // Send mode chanes to PLC
    $(document,'.cardSelect').on('change',()=>{
        const selected = 00;
        const url="./IOwrite.htm";
        const XalphaTitle=':="webData".alfaNumber';
        const XbetaTitle=':="webData".betaNumber';
        const XmodeTitle=':="webData".operationMode';
        const XalphaValue = 99;
        const XbetaValue = 88;
        const sdata = XalphaTitle + '=' + XalphaValue + ':\n' + XbetaTitle + '=' + XbetaValue + ':\n' + XmodeTitle + '=' + selected + ':';
        $.post(url,sdata,function(result){
            console.log('|| writed into : ' + url);
            console.log(sdata);
        });
    });
    // script for accordion headers
    // $(document,'.accordionRow').on('click',()=>{
    //     console.log('toggle header clicked');
    // });
});
// npx lite-server