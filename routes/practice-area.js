module.exports = function(app, practiceArea) {
 	
 	var PracticeArea = practiceArea;
	
	// for index
	app.get('/admin/practice-area', function(req, res) {
		PracticeArea.findAll().then(function(practiceArea){
			//console.log(practiceArea[0].dataValues.id);
			res.render('admin/practice-area/index',{layout:'dashboard', practiceArea:practiceArea,succ_add_msg:req.flash('succ_add_msg')[0]});
		});
		
	});

	//for add view
	app.get('/admin/practice-area/add', function(req, res){
		res.render('admin/practice-area/add',{layout:'dashboard'});
	});

	//for add operation
	app.post('/admin/practice-area/add', function(req, res){
		PracticeArea.create({
			code: req.body.code,
			name: req.body.practice_name,
			remarks: req.body.remarks
		}).then(function(result){
			req.flash('succ_add_msg', 'Practice area added successfully');
			res.redirect('/admin/practice-area');
		}).catch(function(err){
			var validation_error = err.errors;
	    	res.render('admin/practice-area/add', {
	        layout: 'dashboard',
	        error_message: validation_error[0].message,
	        body: req.body
	        });
		});
	});

};