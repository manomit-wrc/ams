$(document).ready(function(e){
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
});