var width = 600;
var height = 300;

// when the input range changes update the circle
d3.select("#myRange").on("input", function() {
  update(p2v(this.value));
});

d3.select("#velocity_value").on("change", function() {
  validateInput(this.value);
  if (this.value>100) this.value=100;
  if (this.value<-100) this.value=-100;
  update(this.value);
});

// Initial velocity 0
update(0);

// update the elements
function update(nVelocity) {
  // adjust the text
  d3.select("#velocity_value").property("value",nVelocity);
  // adjust the slider
  d3.select("#myRange").property("value",v2p(nVelocity));

  // // update the circle color
  d3.select("#blue_star")
    .style("opacity", -nVelocity/100)
  d3.select("#red_star")
    .style("opacity", nVelocity/100)
}

// velocity to color
function v2c(v) {
    return "rgb("+(v/100*255).toString()+",0,"+(-v/100*255).toString()+")"
}

// slider position to velocity
function p2v(p) {
    return (-Math.log10(10-p)*100).toFixed(2)
}

// velocity to slider position
function v2p(v) {
    return (10-Math.pow(10,-v/100)).toFixed(2)
}

function validateInput(value) {
  var text;

  if (isNaN(value) || value < -100 || value > 100) {
    text = "Input not valid, range from -100 to 100";
  } else {
    text = null;
  }
  document.getElementById("validation").innerHTML = text;
}