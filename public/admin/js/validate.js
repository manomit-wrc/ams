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
