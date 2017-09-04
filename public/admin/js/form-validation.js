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

	$("#").validate({

	});
});
