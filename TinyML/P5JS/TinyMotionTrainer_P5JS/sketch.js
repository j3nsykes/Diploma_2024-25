
/*
 * Config
 */
const LABELS = ["Punch", "Wave"]; //put your labels in here.
let col = ["#2ec4b6", "#ff9f1c", "#E86A92"];
let bgCol = ["#cbf3f0", "#FFBF699B", "#E86A924C"];

let connectButton;


function setup() {
  createCanvas(1000, 400);
  textFont("Source Code Pro");
  // Create a 'Connect' button
  connectButton = createButton("Connect");
  connectButton.mousePressed(connectToUsb);
  //set probability to zero on start before connection made
  for (var i = 0; i < LABELS.length; i++) {
    p[i] = 0;
  }
}





function draw() {
  background("#f8f9fa");

  //display the 'winning' result
  push()
  textAlign(LEFT, TOP);
  textSize(24);
  noStroke();
  fill("#4C5454");
  text("Winner is ...", 200, height - 200);
  textSize(72);
  text(winner, 220, height - 170);
  pop()


  //display results info
  drawOutputs();

  //do more with the results
  if (winner == LABELS[0]) {
    //do something with gesture [0]
  }


  else if (winner == LABELS[1]) {
    //do something with gesture [1]
  }


}

//------------------------------------------
//drawOutputs() iterates through all the results as displays as dynamic bar graph.
//
function drawOutputs() {

  if (p.length > 0) {
    for (let i = 0; i < LABELS.length; i++) {
      let ithLabel = LABELS[i];
      let ithConfidence = p[i];
      // console.log(ithLabel)
      // console.log(ithConfidence)
      fill(bgCol[i]);
      rect(10, 10 + i * 30, 75 + (width - 500), 25, 6);
      fill(col[i]);
      rect(10, 10 + i * 30, (width - 500) * ithConfidence, 25, 6);
      let str = ithLabel + ": ";
      str += nf(ithConfidence, 1, 1);
      fill("#4C5454");
      noStroke();
      textAlign(LEFT, TOP);
      text(str + "%", 15, 15 + i * 30);
    }
  }

}

/** Do not edit **/
function connectToUsb() {
  if (!!serialDevice) return;
  serialDevice = new SerialDevice(
    9600,
    (data) => serialRead(data),
    (err) => serialError(err)
  );
  connectButton.html("Disconnect");
}