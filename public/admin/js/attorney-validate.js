$(document).ready(function(e){
	// make all tabs disable
	$('.tab').attr('class', 'disabled');
	// make only first tab enable on page loading
	$('#address-tab').attr('class', 'active');

	//country is present in the first tab.If I forget to save the first tab on the next day the value(states, city) those are from on change of country will be saves as usual
	var country_id = $("#attorney_country_id").val();
	if(country_id) {
		setTimeout(function() {
        	$("#attorney_country_id").trigger('change');
    	},10);
	}
	//end

	// fetch all states of selected country in ajax (country on change)
	$("#attorney_country_id").change(function(){
		var country_id = $(this).val();
		//to remove other options than first option
		$("#attoney_state_id").find('option').not(':first').remove();
		//end
		if(country_id){
			$.ajax({
		          type: "POST",
		          url: "/admin/attorney/fetch_state",
		          data: {country_id:country_id},
		          async: false,
		          success:function(response) {
		            for (var i = 0; i < response.length; i++) {
		            	//console.log(response[i].name);
		            	$('#attoney_state_id').append('<option value="'+response[i].id+'">'+response[i].name+'</option>');
		            	$('#attoney_state_id option:eq(1)').attr('selected', 'selected');
		            }
		          }
        	});
		}

		//to keep selected states on changing country
		$("#attoney_state_id").trigger('change');
		//emd

	});
	//end


	// fetch all cities of selected state in ajax (state on change)
	$("#attoney_state_id").change(function(){
		var state_id = $(this).val();
		//to remove other options than first option
		$("#attoney_city_id").find('option').not(':first').remove();
		//end
		if(state_id){
			$.ajax({
		          type: "POST",
		          url: "/admin/attorney/fetch_city",
		          data: {state_id:state_id},
		          async: false,
		          success:function(response) {
		            for (var i = 0; i < response.length; i++) {
		            	//console.log(response[i].name);
		            	$('#attoney_city_id').append('<option value="'+response[i].id+'">'+response[i].name+'</option>');
		            	$('#attoney_city_id option:eq(1)').attr('selected', 'selected');
		            }
		          }
        	});
		}

		//to keep selected cities on changing country
		$("#attoney_city_id").trigger('change');
		//end


	});
	//end


	// fetch zipcode of selected city in ajax (city on change)
	$("#attoney_city_id").change(function(){
		var city_name = $('#attoney_city_id option:selected').text();
		if(city_name){
			$.ajax({
		          type: "POST",
		          url: "/admin/attorney/fetch_zipcode",
		          data: {city_name:city_name},
		          async: false,
		          success:function(response) {
		          	if(response){
		            	$("#attorney_zip_code").val(response[0].zip);
		            }
		          }
        	});
		}
	});
	//end



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

	jQuery('#phone_no').keyup(function() {
        this.value = this.value.replace(/[^0-9\+]/g, '');
    });

    jQuery('#mobile').keyup(function() {
        this.value = this.value.replace(/[^0-9\+]/g, '');
    });

	$("#attorney_address").validate({
		rules: {
			address: {
				required: true
			},
			phone_no: {
				required: true
			},
			attorney_country_id: {
				required: true
			},
			attoney_state_id: {
				required: true
			},
			attoney_city_id: {
				required: true
			},
			attorney_zip_code: {
				required: true
			}
		},
		messages: {
			address: {
				required: "Please enter address 1"
			},
			phone_no: {
				required: "Please enter phone no",
			},
			attorney_country_id: {
				required: "Please select country"
			},
			attoney_state_id: {
				required: "Please select state"
			},
			attoney_city_id: {
				required: "Please select city"
			},
			attorney_zip_code: {
				required: "Please select pincode"
			}
		},
		submitHandler:function(form) {

			$.ajax({
				type: "POST",
				url: "/admin/attorney/update_attorney_address",
				data: {
					address: $("#address").val(),
					address_2: $("#address_2").val(),
					address_3: $("#address_3").val(),
					phone_no: $("#phone_no").val(), 
					attorney_country_id: $("#attorney_country_id").val(),
					attoney_state_id: $("#attoney_state_id").val(),
					attoney_city_id: $("#attoney_city_id").val(),
					attorney_zip_code: $("#attorney_zip_code").val(),
					fax: $("#fax").val(),
					mobile: $("#mobile").val(),
					website: $("#website").val(),
					social: $("#social").val()
				},
			    success:function(response) {
			    	if(response == "success") {
			    		$('#attorney-details-tab').addClass('active').removeClass('disabled');
			    		$('#activity').removeClass('active');
			    		$('#generalInfo').addClass('active');
			    	} else {
			    		$("#alert-msg").html('<div class="alert alert-danger" id="result77">Something wrong</div>');
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
});
 