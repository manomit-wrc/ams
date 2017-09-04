module.exports = function(app, job_type) {
 	
 	var JobType = job_type;
	
	// for index
	app.get('/admin/job-type', function(req, res) {
		JobType.findAll().then(function(job_type){
			//console.log(practiceArea[0].dataValues.id);
			res.render('admin/job-type/index',{layout:'dashboard', job_type:job_type,succ_add_msg:req.flash('succ_add_msg')[0]});
		});
		
	});

	//for add view
	app.get('/admin/job-type/add', function(req, res){
		res.render('admin/job-type/add',{layout:'dashboard',error_message:req.flash('error_message')[0]});
	});

	//for add process
	app.post('/admin/job-type/add', function(req, res){
		
		JobType.findAndCountAll({
		   where: {
		      job: {
		        $like: '%'+req.body.job+'%'
		      }
		   }
		})
		.then(function(result) {
			//console.log(result.count);
			var count = result.count;
			if(count == 0) {

				JobType.create({
					code: req.body.code,
					job: req.body.job,
					remark: req.body.remarks
				}).then(function(result){
					req.flash('succ_add_msg', 'Job type added successfully');
					res.redirect('/admin/job-type');
				}).catch(function(err){
					var validation_error = err.errors;
			    	res.render('admin/job-type/add', {
				        layout: 'dashboard',
				        error_message: validation_error[0].message,
				        body: req.body
		        	});
				});
			} else {
		    	req.flash('error_message', 'Job type already exists');
		    	var redirectUrl = '/admin/job-type/add';
	  			res.redirect(redirectUrl);
	  		}
		  	
		});
		
	});

	//for delete 
	app.get('/admin/job-type/delete/:job_id', function(req, res){
		JobType.destroy({
		    where: {
		       id:req.params['job_id']
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Job type deleted successfully');
			res.redirect('/admin/job-type');
		});
	});

	//for edit view
	app.get('/admin/job-type/edit/:job_id', function(req, response){
		JobType.findById(req.params['job_id']).then(function(job_details){
			response.render('admin/job-type/edit',{layout:'dashboard', job_details:job_details,error_message:req.flash('error_message')[0]});
		});
	});

	//for edit process
	app.post('/admin/job-type/edit/:job_id', function(req, res){
		JobType.update({
    		code: req.body.code,
			job: req.body.job,
			remark: req.body.remark
	    },{ where: { id: req.params['job_id'] } }).then(function(result){
	    	req.flash('succ_add_msg', 'Job type edited successfully');
	    	res.redirect('/admin/job-type');
	    }).catch(function(err){
	    	
	    	var validation_error = err.errors;
	    	req.flash('error_message', validation_error[0].message);
	    	var redirectUrl = '/admin/job-type/edit/' + req.params['job_id'];
  			res.redirect(redirectUrl);
	    	
	    });
	});
};