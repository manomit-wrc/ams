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
function codeMasterChkVal(val){
  if(val.search(/\S/) == '-1'){
      $("#code_error").show();
      $("#code_error").html("Please enter code");

      $("#shortdescription_error").show();
      $("#shortdescription_error").html("Please enter short description");

      $("#longdescription_error").show();
      $("#longdescription_error").html("Please enter long description");

  } else{
    $("#code_error").hide();
    $("#shortdescription_error").hide();
    $("#longdescription_error").hide();
  }
}
function categoryidChk(val){
  if(val == ' '){
    $("#categoryid_error").show();
    $("#categoryid_error").html("Please enter code");

  } else {
    $("#categoryid_error").hide();
  }
}
/* Code masters validation -END */


// practice area form validation

function validatePracticearea(){
    var code = $('#code').val();
    var name = $('#name').val();

  if(code ==''){
      document.getElementById('code').style.border = '1px solid red !important';
      $("#code_error").css("display", "block");
      document.getElementById("code_error").innerHTML = "Please enter area code";
      document.getElementById('code').focus();
      return false;
  }else{
      $("#code_error").css("display", "none");
      document.getElementById('code').style.border = '';
      document.getElementById("code_error").innerHTML = "";
  }

  if(name ==''){
      document.getElementById('name').style.border = '1px solid red !important';
      $("#name_error").css("display", "block");
      document.getElementById("name_error").innerHTML = "Please select category name";
      document.getElementById('name').focus();
      return false;
  }else{
      $("#name_error").css("display", "none");
      document.getElementById('name').style.border = '';
      document.getElementById("name_error").innerHTML = "";
  }
}
// end validation

// Designation form validation

function validateDesignation(){
    var code = $('#code').val();
    var designation = $('#designation').val();

  if(code ==''){
      document.getElementById('code').style.border = '1px solid red !important';
      $("#code_error").css("display", "block");
      document.getElementById("code_error").innerHTML = "Please enter designation code";
      document.getElementById('code').focus();
      return false;
  }else{
      $("#code_error").css("display", "none");
      document.getElementById('code').style.border = '';
      document.getElementById("code_error").innerHTML = "";
  }

  if(designation ==''){
      document.getElementById('designation').style.border = '1px solid red !important';
      $("#designation_error").css("display", "block");
      document.getElementById("designation_error").innerHTML = "Please enter designation name";
      document.getElementById('designation').focus();
      return false;
  }else{
      $("#designation_error").css("display", "none");
      document.getElementById('designation').style.border = '';
      document.getElementById("designation_error").innerHTML = "";
  }
}
// end validation

// Designation form validation

function validateGroup(){
    var code = $('#code').val();
    var group_name = $('#group_name').val();

  if(code ==''){
      document.getElementById('code').style.border = '1px solid red !important';
      $("#code_error").css("display", "block");
      document.getElementById("code_error").innerHTML = "Please enter designation code";
      document.getElementById('code').focus();
      return false;
  }else{
      $("#code_error").css("display", "none");
      document.getElementById('code').style.border = '';
      document.getElementById("code_error").innerHTML = "";
  }

  if(group_name ==''){
      document.getElementById('group_name').style.border = '1px solid red !important';
      $("#group_error").css("display", "block");
      document.getElementById("group_error").innerHTML = "Please enter designation name";
      document.getElementById('group_name').focus();
      return false;
  }else{
      $("#group_error").css("display", "none");
      document.getElementById('group_name').style.border = '';
      document.getElementById("group_error").innerHTML = "";
  }

    if(code ==''){
        document.getElementById('code').style.border = '1px solid red !important';
        $("#code_error").css("display", "block");
        document.getElementById("code_error").innerHTML = "Please enter designation code";
        document.getElementById('code').focus();
        return false;
    }else{
        $("#code_error").css("display", "none");
        document.getElementById('code').style.border = '';
        document.getElementById("code_error").innerHTML = "";
    }

    if(designation ==''){
        document.getElementById('designation').style.border = '1px solid red !important';
        $("#designation_error").css("display", "block");
        document.getElementById("designation_error").innerHTML = "Please enter designation name";
        document.getElementById('designation').focus();
        return false;
    }else{
        $("#designation_error").css("display", "none");
        document.getElementById('designation').style.border = '';
        document.getElementById("designation_error").innerHTML = "";
    }
}
// end validation

// Role form validation

function validateRole(){
    var code = $('#code').val();
    var role = $('#role').val();

    if(code ==''){
        document.getElementById('code').style.border = '1px solid red !important';
        $("#code_error").css("display", "block");
        document.getElementById("code_error").innerHTML = "Please enter role code";
        document.getElementById('code').focus();
        return false;
    }else{
        $("#code_error").css("display", "none");
        document.getElementById('code').style.border = '';
        document.getElementById("code_error").innerHTML = "";
    }

    if(role ==''){
        document.getElementById('role').style.border = '1px solid red !important';
        $("#role_error").css("display", "block");
        document.getElementById("role_error").innerHTML = "Please enter role";
        document.getElementById('role').focus();
        return false;
    }else{
        $("#role_error").css("display", "none");
        document.getElementById('role').style.border = '';
        document.getElementById("role_error").innerHTML = "";
    }
}
// end validation

// Industry form validation

function validateIndustry(){
    var code = $('#code').val();
    var industry = $('#industry').val();

    if(code ==''){
        document.getElementById('code').style.border = '1px solid red !important';
        $("#code_error").css("display", "block");
        document.getElementById("code_error").innerHTML = "Please enter industry code";
        document.getElementById('code').focus();
        return false;
    }else{
        $("#code_error").css("display", "none");
        document.getElementById('code').style.border = '';
        document.getElementById("code_error").innerHTML = "";
    }

    if(industry ==''){
        document.getElementById('industry').style.border = '1px solid red !important';
        $("#industry_error").css("display", "block");
        document.getElementById("industry_error").innerHTML = "Please enter industry";
        document.getElementById('industry').focus();
        return false;
    }else{
        $("#industry_error").css("display", "none");
        document.getElementById('industry').style.border = '';
        document.getElementById("industry_error").innerHTML = "";
    }

}
// end validation