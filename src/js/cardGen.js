let c_id = "undefined";
let c_row = "undefined";
let c_col = "undefined";
let c_angle = "0";
let c_temp = "0";
let c_mode = "Automatic";

function c_generator(c_id,c_row,c_col,c_angle,c_temp,c_mode){
    let card_template = 
    '<div class="col-xl-2 col-md-3 mb-4"><div class="card border-left-primary shadow h-100"><div class="card-header py-3"><h6 class="m-0 font-weight-bold text-dark"><span class="badge bg-primary text-white mr-1">&sharp;'+c_id+'</span><span class="badge bg-gray-800 text-white mr-1">'+c_row+'</span><span class="badge bg-gray-800 text-white mr-1">'+c_col+'</span></h6></div><div class="card-body"><div class="row no-gutters align-items-center"><div class="col mr-2"><div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Panel angel</div><div class="h1 mb-0 font-weight-bold text-gray-800" id="counter">'+c_angle+'</div></div><div class="col mr-2"><div class="text-xs font-weight-bold text-info text-uppercase mb-1">Temperature</div><div class="h1 mb-0 font-weight-bold text-gray-800" id="counter">'+c_temp+'&#8451;</div></div></div><div class="dropdown-divider"></div><div class="small mb-1">Mode</div><nav class="navbar navbar-expand navbar-light bg-light"><a class="navbar-brand" href="#">'+c_mode+'</a><ul class="navbar-nav ml-auto"><li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a><div class="dropdown-menu dropdown-menu-right animated--grow-in" aria-labelledby="navbarDropdown"><a class="dropdown-item" href="#">Automatic</a><a class="dropdown-item" href="#" onclick="">Another action</a><div class="dropdown-divider"></div><a class="dropdown-item" href="#">Something else here</a></div></li></ul></nav></div></div></div>';
    return card_template;
}