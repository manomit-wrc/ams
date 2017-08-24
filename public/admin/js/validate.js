/* Category name validation -BEGIN */
function validatecodecategory(){
  var categoryname = $('#categoryname').val();
  if(categoryname ==''){
  document.getElementById('categoryname').style.border = '1px solid red !important';
  $("#categoryname_error").css("display", "block");
  document.getElementById("categoryname_error").innerHTML = "Please enter category name";
  document.getElementById('categoryname').focus();
  return false;
}else{
  $("#categoryname_error").css("display", "none");
  document.getElementById('categoryname').style.border = '';
  document.getElementById("categoryname_error").innerHTML = "";
}
}
function nameCheckVal(val){
  if(val.search(/\S/) == '-1'){
      $("#categoryname_error").show();
      $("#categoryname_error").html("Please enter category name");

  } else{
    $("#categoryname_error").hide();
  }

}
/* Category name validation -END */
/* Code masters validation -BEGIN */
function validateCodemasters(){
  var categoryid = $('#categoryid').val();
  var code = $('#code').val();
  var shortdescription = $('#shortdescription').val();
  var longdescription = $('#longdescription').val();

  if(categoryid ==''){
  document.getElementById('categoryid').style.border = '1px solid red !important';
  $("#categoryid_error").css("display", "block");
  document.getElementById("categoryid_error").innerHTML = "Please select category name";
  document.getElementById('categoryid').focus();
  return false;
}else{
  $("#categoryid_error").css("display", "none");
  document.getElementById('categoryid').style.border = '';
  document.getElementById("categoryid_error").innerHTML = "";
}
if(code ==''){
document.getElementById('code').style.border = '1px solid red !important';
$("#code_error").css("display", "block");
document.getElementById("code_error").innerHTML = "Please select category name";
document.getElementById('code').focus();
return false;
}else{
$("#code_error").css("display", "none");
document.getElementById('code').style.border = '';
document.getElementById("code_error").innerHTML = "";
}

if(shortdescription ==''){
document.getElementById('shortdescription').style.border = '1px solid red !important';
$("#shortdescription_error").css("display", "block");
document.getElementById("shortdescription_error").innerHTML = "Please select category name";
document.getElementById('shortdescription').focus();
return false;
}else{
$("#shortdescription_error").css("display", "none");
document.getElementById('shortdescription').style.border = '';
document.getElementById("shortdescription_error").innerHTML = "";
}
if(longdescription ==''){
document.getElementById('longdescription').style.border = '1px solid red !important';
$("#longdescription_error").css("display", "block");
document.getElementById("longdescription_error").innerHTML = "Please select category name";
document.getElementById('longdescription').focus();
return false;
}else{
$("#longdescription_error").css("display", "none");
document.getElementById('longdescription').style.border = '';
document.getElementById("longdescription_error").innerHTML = "";
}

}

/* Code masters validation -END */
