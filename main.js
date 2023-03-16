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
    $('#detectedAlpha').html(alphas.size);
    $('#detectedBeta').html(Object.keys(records).length);
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
                        <option value="0">Autopilot</option>
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




// let angle = "0";
// let wind_velocity = "0";
// let motor_voltage = "0";
// const c_mode = ["Autopilot","West Wash","East Wash","Storm","Group Autopilot","Group West Wash","Group East Wash","Group Storm"];

// function c_generator(angle,wind_velocity){
//     let card_template = 
//     '<div class="col-xl-2 col-md-2 mb-4"> <div class="card border-left-primary shadow h-100"> <div class="card-body no-gutters"> <div class="" style="display:flex;flex-direction:row;align-items:flex-start;gap:18px;"> <div class="" style="display: flex;flex-direction: column;align-items: flex-start;gap:12px;"> <div class=""> <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">PANEL ANGEL</div> <div class="h5 mb-0 font-weight-bold text-gray-800">'+angle+'</div> </div> <div class=""> <div class="text-xs font-weight-bold text-info text-uppercase mb-1">WIND VELOCITY</div> <div class="h5 mb-0 font-weight-bold text-gray-800">'+wind_velocity+'</div> </div> <div class=""> <div class="text-xs font-weight-bold text-info text-uppercase mb-1">MOTOR VOLTAGE</div> <div class="h5 mb-0 font-weight-bold text-gray-800">'+motor_voltage+'</div> </div> </div> <div class="" style="display: flex;flex-direction: column;align-items: flex-end;"> <div class="btn-group"> <button class="btn btn-white btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">A </button> <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> <a class="dropdown-item active" href="#">Autopilot</a> <a class="dropdown-item" href="#">West Wash</a> <a class="dropdown-item" href="#">East Wash</a> <a class="dropdown-item" href="#">Storm</a> </div> </div> </div> </div> </div> </div> </div>';
//     return card_template;
// }

function updateValue(xdata){
    // test object and convert array to object for better addresing in fill boxs
    

    // $.each( xdata, function( key, value ) {
        // console.log( key + ": " + value );
        // $('#netA1_records').append(c_generator(key, value));
    // });
}



// $(document).ready(function () {
//     $.ajaxSetup({ cache: false });
//     //setInterval(function () {
//         $.get("./IOread.htm", function (result) {
//             try {
//                 const data = result.trim().split(/\r?\n/);
//                 updateValue(data);
//             } catch (err) {
//                 console.error(err);
//             }
//         });
//     //}, 1000);
//     $('.cardSelect').on('change', function () {
//         selected = this.value;
//         console.log(selected);
//         url="./IOwrite.htm";
//         name='"webdata".triangleWave';
//         // val=$('input[id=setvar]').val();
//         sdata=escape(name)+'='+selected;
//         $.post(url,sdata,function(result){});
//     });
// });