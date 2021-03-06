// Get references to page elements
var $first_name = $("#first_name");
var $last_name = $("#last_name");
var $mob_no = $("#mob_no");
var $username = $("#username");
var $password = $("#password");
var $submitBtn = $("#btn-signup");
var $loginBtn = $("#btn-login");

// The API object contains methods for each kind of request we'll make
var API = {
  saveUser: function (user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/Users",
      data: JSON.stringify(user)
    });
  },
  getUser: function (user) {

    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "api/signin",
      type: "POST",
      data: JSON.stringify(user)
    });
  }
};



// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var user = {
    first_name: $first_name.val().trim(),
    last_name: $last_name.val().trim(),
    phone: $mob_no.val().trim(),
    username: $username.val().trim(),
    password: $password.val().trim()
  };

  API.saveUser(user).then(function () {
    if (user) {

      $first_name.val("");
      $last_name.val("");
      $mob_no.val("");
      $username.val("");
      $password.val("");
      window.location.href = "/signin";
    }
  });

};


var handleLogin = function (event) {
  event.preventDefault();

  $("#nameInput").removeClass("is-invalid");
  $("#passwordInput").removeClass("is-invalid");
  $("#nameError").html("");
  $("#passwordError").html("");

  if(validate()) {
    var findUser = {
      username: $("#nameInput").val().trim(),
      password: $("#passwordInput").val().trim()
    };
  
  
    API.getUser(findUser).then(function (result) {
      console.log(result);
      if(result.error1) {
        $("#passwordInput").addClass("is-invalid");
        $("#passwordError").html(result.error1);
      } else if(result.error2) {
        $("#nameInput").addClass("is-invalid");
        $("#nameError").html(result.error2);
      } else {
        window.location.href = "/dashboard";
      }
      
    });
  }
  
}

var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

setInterval(updateGradient,10);

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$loginBtn.on("click", handleLogin);

function validate(e) {

  name = $("#nameInput").val().trim();
  pass = $("#passwordInput").val().trim();


  var errors;

  if (!checkLength(name, 1, 250)) {
    errors = true;
    $("#nameInput").addClass("is-invalid");
    $("#nameError").html("Username should be between 1 and 250 characters");
  }

  if (!checkLength(pass, 1, 25)) {
    errors = true;
    $("#passwordInput").addClass("is-invalid");
    $("#passwordError").html("Password should be between 1 and 250 characters");
  }

  if (errors) {

    return false;

  } else {
    return true;
  }


}

function validateSignup(e) {

  name = $("#nameInput").val().trim();
  pass = $("#passwordInput").val().trim();
  first_name = $("#first_name").val().trim();
  last_name = $("#last_name").val().trim();
  mob_no = $("#mob_no").val().trim();

  var errors;

  if (!checkLength(name, 1, 250)) {
    errors = true;
    $("#first_name").addClass("is-invalid");
    $("#firstNameError").html("First Name should be between 1 and 250 characters");
  }

  if (!checkLength(first_name, 1, 250)) {
    errors = true;
    $("#nameInput").addClass("is-invalid");
    $("#nameError").html("Last Name should be between 1 and 250 characters");
  }

  if (!checkLength(last_name, 1, 250)) {
    errors = true;
    $("#nameInput").addClass("is-invalid");
    $("#nameError").html("Username should be between 1 and 250 characters");
  }

  if (!checkLength(mob, 1, 11)) {
    errors = true;
    $("#nameInput").addClass("is-invalid");
    $("#nameError").html("Username should be between 1 and 250 characters");
  }

  if (!checkLength(pass, 1, 25)) {
    errors = true;
    $("#passwordInput").addClass("is-invalid");
    $("#passwordError").html("Password should be between 1 and 250 characters");
  }

  if (errors) {

    return false;

  } else {
    return true;
  }


}

function checkLength(text, min, max) {

  if (text.length < min || text.length > max) {
    return false;
  }
  return true;
}