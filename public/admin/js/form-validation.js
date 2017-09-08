$(document).ready(function(e){
	$('.tab').attr('class', 'disabled');
	$('#address-tab').click(function(event){
        if ($(this).hasClass('disabled')) {
            return false;
        }

    });
    $('#firm-tab').click(function(event){
        if ($(this).hasClass('disabled')) {
            return false;
        }

    });
    $('#approval-tab').click(function(event){
        if ($(this).hasClass('disabled')) {
            return false;
        }

    });
    $('#photo-tab').click(function(event){
        if ($(this).hasClass('disabled')) {
            return false;
        }

    });
	$("#frmFirm").validate({
		rules: {
			first_name: {
				required: true
			},
			last_name: {
				required: true
			},
			email: {
				required: true,
				email: true,
				remote: {
				    type: 'post',
				    url: '/admin/firm/check-firm-email',
				    dataType: 'json'
				}
			},
			password: {
				required: true
			}
		},
		messages: {
			first_name: {
				required: "Please Enter First Name"
			},
			last_name: {
				required: "Please Enter Last Name"
			},
			email: {
				required: "Please Enter Email ID",
				email: "Please Enter Valid Email ID",
				remote: "Email ID Already In Use"
			},
			password: {
				required: "Please Enter Password"
			}
		},
		submitHandler:function(form) {
			form.submit();
			//console.log($(this).serialize());
			console.log(req.body);
		}
	});

	$("#change_pass_form").validate({
		rules: {
			old_password: {
				required: true,
				remote: {
				    type: 'post',
				    url: '/admin/check_password',
				    dataType: 'json'
				}
			},
			new_password: {
				required: true
			},
			confirm_password: {
				required: true,
				equalTo: "#new_password"
			}
		},
		messages: {
			old_password: {
				required: "Enter old password",
				remote: "Wrong password entered"
			},
			new_password: {
				required: "Enter new password"
			},
			confirm_password: {
				required: "Confirm password",
				equalTo: "Password not matched"
			}
		}
	});
//@#@#@#@#@#@ First tab of "my-profile" #@#@#@#@#@#//
	$("#frmFirmAddress").validate({
		rules: {
			address: {
				required: true
			},
			address_2: {
				required: true
			},
			address_3: {
				required: true
			},
			phone_no: {
				required: true
			},
			country_id: {
				required: true
			},
			state_id: {
				required: true
			},
			city_id: {
				required: true
			},
			zipcode: {
				required: true
			}
		},
		messages: {
			address: {
				required: "Please enter address 1"
			},
			address_2: {
				required: "Please enter address 2"
			},
			address_3: {
				required: "Please enter address 3"
			},
			phone_no: {
				required: "Please enter phone no"
			},
			country_id: {
				required: "Please select country"
			},
			state_id: {
				required: "Please select state"
			},
			city_id: {
				required: "Please select city"
			},
			zipcode: {
				required: "Please select pincode"
			}
		},
		submitHandler:function(form) {

			$.ajax({
				type: "POST",
				url: "/admin/firm/update-address",
				data: {
					address: $("#address").val(),
					address_2: $("#address_2").val(),
					address_3: $("#address_3").val(),
					phone_no: $("#phone_no").val(),
					country_id: $("#country_id").val(),
					state_id: $("#state_id").val(),
					city_id: $("#city_id").val(),
					zipcode: $("#zipcode").val(),
					fax: $("#fax").val(),
					mobile: $("#mobile").val(),
					website: $("#website").val(),
					social: $("#social").val()
				},
			    success:function(response) {
			    	if(response == "1") {
			    		$('#address-tab').removeClass("disabled");
						$("#firm-tab").addClass("active").removeClass("disabled");
						$("#activity").removeClass("active");
						$("#generalInfo").addClass("active");
			    	}
			    }
			});
		}


	});
	//@#@#@#@#@#@# Second tab of "my-profile" #@#@#@#@#@#@#@//
	$("#formgeneralInfo").validate({
		rules: {
			firmName:{
				required: true
			},
			firmRegistration: {
				required: true
			},
			firm_code: {
				required: true
			},
			"sections[]": {
			    required: true
			 },
			 "practice_area[]": {
 			    required: true
 			 },
			 "firm_jurisdiction[]": {
 			    required: true
 			 }

		},
		messages: {
			firmName:{
				required: "Please enter Firm Name"
			},
			firmRegistration: {
				required: "Please enter Firm Registration"
			},
			firm_code: {
				required: "Please enter Firm Code"
			},
			"sections[]": {
			    required: "Please select sections"
			 },
			 "practice_area[]": {
 			    required: "Please select practice area"
 			 },
			 "firm_jurisdiction[]": {
 			    required: "Please select firm jurisdiction"
 			 }
		},
		submitHandler:function(form) {
			$.ajax({
				type: "POST",
				url: "/admin/firm/update-generalInfo",
				data: {
					firmId: $("#firmId").val(),
					firmName: $("#firmName").val(),
					firmRegistration: $("#firmRegistration").val(),
					firm_code: $("#firm_code").val(),
					sections: $("#sections").val(),
					practice_area: $("#practice_area").val(),
					firm_jurisdiction: $("#firm_jurisdiction").val(),

				},
				success:function(response) {
					if(response == "2") {
						$('#firm-tab').removeClass("disabled");
						$("#approval-tab").addClass("active").removeClass("disabled");
						$("#generalInfo").removeClass("active");
						$("#approval").addClass("active");
					}
				}

		});

	}
});
	//@#@#@#@#@#@# Third tab of "my-profile" #@#@#@#@#@#@#@//
	//
	$("#approvalForm").validate({
		rules: {
			spName:{
				required: true
			},
			spContact: {
				required: true
			},
			designation_id_1: {
				required: true
			}
		},
		messages: {
			spName:{
				required: "Please enter single point contact name"
			},
			spContact: {
				required: "Please enter single point contact role"
			},
			designation_id_1: {
				required: "Please enter level 1 designation"
			}
		},
		submitHandler:function(form) {
			$.ajax({
				type: "POST",
				url: "/admin/firm/update-approval",
				data: {
					firmId: $("#firmId1").val(),
					spName: $("#spName").val(),
					spContact: $("#spContact").val(),
					designation_id_1: $("#designation_id_1").val(),
					designation_id_2: $("#designation_id_2").val(),
					designation_id_3: $("#designation_id_3").val(),
					designation_id_4: $("#designation_id_4").val(),
					approval_process:$(".approval_process:checked").val()
				},
				success:function(response) {
					if(response == "3") {
						$('#firm-tab').removeClass("disabled");
						$("#approval-tab").removeClass("disabled")
						$("#photo-tab").addClass("active").removeClass("disabled");
						$("#approval").removeClass("active");
						$("#picture").addClass("active");
					}
				}

		});

	}
});

	//@#@#@#@#@#@# Fourth tab of "my-profile" #@#@#@#@#@#@#@//
	//
	$("#imageForm").validate({
		rules: {
			profile_photo: {
				required: true,
				extension: 'jpg|png'
			}
		},
		messages: {
			profile_photo: {
				required: "Please upload profile image",
				extension: 'Image type must be jpg or png'
			}
		},
		submitHandler:function(form) {
			var fd = new FormData($("#imageForm").get(0));

			$.ajax({
			  url: '/admin/firm/update-profile-photo',
			  data: fd,
			  processData: false,
			  contentType: false,
			  type: 'POST',
			  success: function(data){
			    if(data == "4") {
					window.location.href = "/admin/firm/my-profile";
				}
			  }
			});
		}
	});

});
