module.exports = function(app, industry_type) {
 	
 	var IndustryType = industry_type;
	
	// for index
	app.get('/admin/industry-type', function(req, res) {
		IndustryType.findAll({order:[
          ['id', 'ASC']
        ]}).then(function(industryType){
			//console.log(practiceArea[0].dataValues.id);
			res.render('admin/industry-type/index',{layout:'dashboard', industryType:industryType,succ_add_msg:req.flash('succ_add_msg')[0]});
		});
		
	});

	//for add view
	app.get('/admin/industry-type/add', function(req, res){
		res.render('admin/industry-type/add',{layout:'dashboard',error_message:req.flash('error_message')[0]});
	});

	//for add process
	app.post('/admin/industry-type/add', function(req, res){
		
		IndustryType.findAndCountAll({
		   where: {
		      industry: {
		        $like: '%'+req.body.industry+'%'
		      }
		   }
		})
		.then(function(result) {
			//console.log(result.count);
			var count = result.count;
			if(count == 0) {

				IndustryType.create({
					code: req.body.code,
					industry: req.body.industry,
					remark: req.body.remarks
				}).then(function(result){
					req.flash('succ_add_msg', 'Industry added successfully');
					res.redirect('/admin/industry-type');
				}).catch(function(err){
					var validation_error = err.errors;
			    	res.render('admin/industry-type/add', {
				        layout: 'dashboard',
				        error_message: validation_error[0].message,
				        body: req.body
		        	});
				});
			} else {
		    	req.flash('error_message', 'Industry type already exists');
		    	var redirectUrl = '/admin/industry-type/add';
	  			res.redirect(redirectUrl);
	  		}
		  	
		});
		
	});

	//for delete 
	app.get('/admin/industry-type/delete/:type_id', function(req, res){
		IndustryType.destroy({
		    where: {
		       id:req.params['type_id']
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Industry type deleted successfully');
			res.redirect('/admin/industry-type');
		});
	});

	//for edit view
	app.get('/admin/industry-type/edit/:type_id', function(req, response){
		IndustryType.findById(req.params['type_id']).then(function(industry_details){
			response.render('admin/industry-type/edit',{layout:'dashboard', industry_details:industry_details,error_message:req.flash('error_message')[0]});
		});
	});

	//for edit process
	app.post('/admin/industry-type/edit/:type_id', function(req, res){
		IndustryType.update({
    		code: req.body.code,
			industry: req.body.industry,
			remark: req.body.remarks
	    },{ where: { id: req.params['type_id'] } }).then(function(result){
	    	req.flash('succ_add_msg', 'Industry type edited successfully');
	    	res.redirect('/admin/industry-type');
	    }).catch(function(err){
	    	
	    	var validation_error = err.errors;
	    	req.flash('error_message', validation_error[0].message);
	    	var redirectUrl = '/admin/industry-type/edit/' + req.params['rid'];
  			res.redirect(redirectUrl);
	    	
	    });
	});

};