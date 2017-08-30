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
			alert("Hello");
		}
	});
});