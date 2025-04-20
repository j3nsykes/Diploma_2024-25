//------------------------------------------
// Parse Serial
//------------------------------------------
let serialDevice;
let incomingData;
let inputBuffer = "";

let results = "";
let winner = "";
let label = "";
let p = [];
let prob = 0; //set at start


function parseSerialBuffer(buffer) {
    //console.log("Parsing " + buffer);
    //catch invalid JSON
    //ignore incomplete or double serial strings.
    try {
        const json = JSON.parse(buffer);
        processData(json); //only process Data if valid JSON
    } catch (e) {
        console.log("invalid json");
    }
}

/// Read Serial

function serialRead(data) {
    // Read data from the serial buffer
    for (let n = 0; n < data.length; ++n) {
        let c = data[n];
        // copy data to temp buffer
        inputBuffer += c;
        if ('\n' == c) {
            // when we find a newline, we process what we have so far
            parseSerialBuffer(inputBuffer);
            // and then start over
            inputBuffer = "";
        }
    }
}


function processData(_data) {
    results = _data;
    if (results) {
        //is there data?
        console.log(results);
        label = String(results[0].label); //read label
        prob = parseFloat(results[0].probability); //read probability
        console.log(label)
        console.log(prob)
        winner = String(results[0].winner); //read winner

        //display probability values for each label.
        for (let i = 0; i < LABELS.length; i++) {
            if (label === LABELS[i]) {
                p[i] = prob;

                // console.log("p1: " + p[0])
                // console.log("p2: " + p[1])
            }
        }
    }
}
function serialError(err) {
    print("Error:", err);
}