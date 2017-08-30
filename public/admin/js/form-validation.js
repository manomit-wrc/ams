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
				email: true
			},
			password: {
				required: true
			}
		}
	});
});