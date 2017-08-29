$(document).ready(function(e){
	$("#frmFirm").validate({
		rules: {
			first_name: {
				required: true
			},
			last_name: {
				required: true
			}
		}
	});
});