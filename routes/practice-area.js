module.exports = function(app, practiceArea) {

 	var PracticeArea = practiceArea;

	// for index
	app.get('/admin/practice-area', function(req, res) {
		PracticeArea.findAll({order:[
          ['id', 'ASC']
        ]}).then(function(practiceArea){
			//console.log(practiceArea[0].dataValues.id);

			res.render('admin/practice-area/index',{layout:'dashboard', practiceArea:practiceArea,succ_add_msg:req.flash('succ_add_msg')[0]});

		});

	});

	//for add view
	app.get('/admin/practice-area/add', function(req, res){
		res.render('admin/practice-area/add',{layout:'dashboard',error_message:req.flash('error_message')[0]});
	});

	//for add process
	app.post('/admin/practice-area/add', function(req, res){

		PracticeArea.findAndCountAll({
		   where: {
    			code: req.body.code
  			}
		})
		.then(function(result) {
			//console.log(result.count);
			var count = result.count;
			console.log(count);
			if(count == 0) {

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
			} else {
		    	req.flash('error_message', 'Practice area already exists');
		    	var redirectUrl = '/admin/practice-area/add';
	  			res.redirect(redirectUrl);
	  		}

		});

	});

	//for delete
	app.get('/admin/practice-area/delete/:pid', function(req, res){
		PracticeArea.destroy({
		    where: {
		       id:req.params['pid']
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Practice area deleted successfully');
			res.redirect('/admin/practice-area');
		});
	});

	//for edit view
	app.get('/admin/practice-area/edit/:pid', function(req, response){
		PracticeArea.findById(req.params['pid']).then(function(practiceArea){
			response.render('admin/practice-area/edit',{layout:'dashboard', practiceArea:practiceArea,error_message:req.flash('error_message')[0]});
		});
	});

	//for edit process
	app.post('/admin/practice-area/edit/:pid', function(req, res){

		checkEdit(req.params['pid'], req.body.code).then(function(result){
			if(result.count > 0) {
				req.flash('error_message', 'Practice area code already exists');
		    	var redirectUrl = '/admin/practice-area/edit/'+req.params['pid'];
	  			res.redirect(redirectUrl);
			}
			else {
				PracticeArea.update({
		    		code: req.body.code,
					name: req.body.practice_name,
					remarks: req.body.remarks
			    },{ where: { id: req.params['pid'] } }).then(function(result){
			    	req.flash('succ_add_msg', 'Practice area edited successfully');
			    	res.redirect('/admin/practice-area');
			    }).catch(function(err){

			    	var validation_error = err.errors;
			    	req.flash('error_message', validation_error[0].message);
			    	var redirectUrl = '/admin/practice-area/edit/' + req.params['pid'];
		  			res.redirect(redirectUrl);

			    });
			}
		});

	});

	function checkEdit(pid,code) {
		return PracticeArea.findAndCountAll({
		   where: {
    			code: code,
    			id: {$not:[pid]}
  			}
		});
	}

};
