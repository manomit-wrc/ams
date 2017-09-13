$(document).ready(function(e){
	

	 $('.nav li').not('.active').addClass('disabled');
/*to actually disable clicking the bootstrap tab, as noticed in comments by user3067524*/
    $('.nav li').not('.active').find('a').removeAttr("data-toggle");

    $('button').click(function(){
        /*enable next tab*/
        $('.nav li.active').next('li').removeClass('disabled');
        $('.nav li.active').next('li').find('a').attr("data-toggle","tab")
    });

    // make only first tab enable on page loading
	$('#attorney-address-tab').removeClass('disabled');
	$('#attorney-address-tab').attr('class', 'active');

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
		          	if(response.length > 0){
		            	$("#attorney_zip_code").val(response[0].zip);
		            } else {
		            	$("#attorney_zip_code").val('');
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

	// to prevent alphabet character
	jQuery('#phone_no').keyup(function() {
        this.value = this.value.replace(/[^0-9\+]/g, '');
    });

    jQuery('#mobile').keyup(function() {
        this.value = this.value.replace(/[^0-9\+]/g, '');
    });

    jQuery('#fax').keyup(function() {
        this.value = this.value.replace(/[^0-9\+]/g, '');
    });
    //end

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
				required: "Please enter phone no"
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
			    		$('#attorney-address-tab').removeClass('active');
			    		$('#attorney-activity').removeClass('active');
			    		$('#attorney-generalInfo').addClass('active');
			    	} else {
			    		$("#alert-msg").html('<div class="alert alert-danger" id="result77">Something wrong</div>');
			    	}
			    }
			});
		}


	});

	//attorney details form tab validation and submit
	$("#attorney_general_info").validate({
		rules: {
			group: {
				required: true
			},
			'sections[]': {
				required: true
			},
			designation: {
				required: true
			},
			attorney_id: {
				required: true
			},
			attorney_code: {
				required: true
			},
			'jurisdictions[]': {
				required: true
			}
		},
		messages: {
			group: {
				required: "Please select group"
			},
			'sections[]': {
				required: "Please select section"
			},
			designation: {
				required: "Please select designation"
			},
			attorney_id: {
				required: "Please enter attorney ID"
			},
			attorney_code: {
				required: "Please enter attorney code"
			},
			'jurisdictions[]': {
				required: "Please select jurisdictions"
			}
		},
		submitHandler:function(form) {
			$.ajax({
				type: "POST",
				url: "/admin/attorney/update_attorney_details",
				data: {
					group: $("#group").val(),
					sections: $("#sections").val(),
					designation: $("#designation").val(),
					attorney_id: $("#attorney_id").val(), 
					attorney_code: $("#attorney_code").val(),
					attorney_type: $("#attorney_type").val(),
					education: $("#education").val(),
					bar_reg: $("#bar_reg").val(),
					job_type: $("#job_type").val(),
					practice_date: $("#practice_date").val(),
					firm_join_date: $("#firm_join_date").val(),
					jurisdictions: $("#jurisdictions").val(),
					practice_area: $("#practice_area").val(),
					industry_type: $("#industry_type").val(),
					remarks: $("#remarks").val(),

				},
			    success:function(response) {
			    	if(response == "success") {
			    		$('#attorney-photo-tab').addClass('active').removeClass('disabled');
			    		$('#attorney-generalInfo').removeClass('active');
			    		$('#attorney-picture').addClass('active');
			    	} else {
			    		$("#alert-msg").html('<div class="alert alert-danger" id="result77">Something wrong</div>');
			    	}
			    }
			});
		}


	});

});
 