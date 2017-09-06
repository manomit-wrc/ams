module.exports = function(app, attorney_type) {
 	
 	var AttorneyType = attorney_type;
	
	// for index
	app.get('/admin/attorney-type', function(req, res) {
		AttorneyType.findAll({order:[
          ['id', 'ASC']
        ]}).then(function(attorney_type){
			//console.log(practiceArea[0].dataValues.id);
			res.render('admin/attorney-type/index',{layout:'dashboard', attorney_type:attorney_type,succ_add_msg:req.flash('succ_add_msg')[0]});
		});
		
	});

	//for add view
	app.get('/admin/attorney-type/add', function(req, res){
		res.render('admin/attorney-type/add',{layout:'dashboard',error_message:req.flash('error_message')[0]});
	});

	//for add process
	app.post('/admin/attorney-type/add', function(req, res){
		
		AttorneyType.findAndCountAll({
		   where: {
		      attorney: {
		        $like: '%'+req.body.attorney+'%'
		      }
		   }
		})
		.then(function(result) {
			//console.log(result.count);
			var count = result.count;
			if(count == 0) {

				AttorneyType.create({
					code: req.body.code,
					attorney: req.body.attorney,
					remark: req.body.remark
				}).then(function(result){
					req.flash('succ_add_msg', 'Attorney added successfully');
					res.redirect('/admin/attorney-type');
				}).catch(function(err){
					var validation_error = err.errors;
			    	res.render('admin/attorney-type/add', {
				        layout: 'dashboard',
				        error_message: validation_error[0].message,
				        body: req.body
		        	});
				});
			} else {
		    	req.flash('error_message', 'Attorney type already exists');
		    	var redirectUrl = '/admin/attorney-type/add';
	  			res.redirect(redirectUrl);
	  		}
		  	
		});
		
	});

	//for delete 
	app.get('/admin/attorney-type/delete/:attorney_id', function(req, res){
		AttorneyType.destroy({
		    where: {
		       id:req.params['attorney_id']
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Attorney type deleted successfully');
			res.redirect('/admin/attorney-type');
		});
	});

	//for edit view
	app.get('/admin/attorney-type/edit/:attorney_id', function(req, response){
		AttorneyType.findById(req.params['attorney_id']).then(function(attorney_details){
			response.render('admin/attorney-type/edit',{layout:'dashboard', attorney_details:attorney_details,error_message:req.flash('error_message')[0]});
		});
	});

	//for edit process
	app.post('/admin/attorney-type/edit/:attorney_id', function(req, res){
		AttorneyType.update({
    		code: req.body.code,
			attorney: req.body.attorney,
			remark: req.body.remark
	    },{ where: { id: req.params['attorney_id'] } }).then(function(result){
	    	req.flash('succ_add_msg', 'Attorney type edited successfully');
	    	res.redirect('/admin/attorney-type');
	    }).catch(function(err){
	    	
	    	var validation_error = err.errors;
	    	req.flash('error_message', validation_error[0].message);
	    	var redirectUrl = '/admin/attorney-type/edit/' + req.params['attorney_id'];
  			res.redirect(redirectUrl);
	    	
	    });
	});
};