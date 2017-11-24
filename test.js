var n2pct = .79
var o2pct = .33
var hepct = .00
var wvcoof = 0

var start_altitude = 0
var depth = 110
var gas_cuft = 160
var water_type = 'salt'
var ppo2_max = 1.4


function atm_depth( depth, measured_water_type, desired_water_type ) {
    const fsw_conv = 33/34  // column of fresh water weighs 33/34 of sea water
    if (!desired_water_type){desired_water_type = 'salt'}
    if (measured_water_type != desired_water_type) {
        if (measured_water_type = 'fresh') {
            return depth * fsw_conv
        } else {
            return depth / fsw_conv
        }
    } else {
        return depth
    }

}
function atm_to_depth ( atm, water_type){
    // this is TOTAL ATM (MUST include 1ATM of surface pressure)
    const atm_to_ft = 33
    if (!water_type){water_type = 'salt'}
    return atm_to_ft * atm
}
function gas_mod(o2pct, pp02_max) {
    return (pp02_max / o2pct) - 1
}

// Print out Recreational Nitrox Chart
var ppo2_max_array = [1.2,1.4,1.6,1.8,2.0]
for (var x = 0; x < ppo2_max_array.length; x++) {
    console.log("Calculating MOD table for " + ppo2_max_array[x] + ':')
    for (o2pct = .21; o2pct < .4; o2pct = o2pct + .01) {
        console.log("MOD of " + o2pct.toFixed(2) + " O2 is " + Math.round(atm_to_depth(gas_mod(o2pct, ppo2_max_array[x]))) + " ft")
    }
}




