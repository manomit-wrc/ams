module.exports = function(app, budgetcode, budgetcodetype) {

 	var budgetcode = budgetcode;
  var budgetcodetype = budgetcodetype;
	app.get('/admin/budgetcode', function(req, res) {
    budgetcode.belongsTo(budgetcodetype, {foreignKey: 'budget_code_type_id'});
    budgetcode.findAll({
      include: [{model: budgetcodetype}]
    }).then(function(budgetcode){
      //console.log(budgetcode);
			res.render('admin/budgetcode/index',{layout:'dashboard', budgetcode:budgetcode});
		});

	});

	app.get('/admin/budgetcode/add', function(req, res){
    budgetcodetype.findAll().then(function(budgetcodetype){
      // console.log(budgetcodetype);
			res.render('admin/budgetcode/add',{layout:'dashboard', budgetcodetype:budgetcodetype, error_message:req.flash('error_message')[0]});
		});
	});

	app.post('/admin/budgetcode/add', function(req, res){
    budgetcode.findAndCountAll({
		   where: {
		      budget_code: {
		        $like: '%'+req.body.budget_code+'%'
		      }
		   }
		})
		.then(function(result) {
			//console.log(result.count);
			var count = result.count;
			if(count == 0) {

		budgetcode.create({
			budget_code_type_id: req.body.budget_code_type_id,
      code: req.body.code,
      budget_code: req.body.budget_code,
      remarks: req.body.remarks
		}).then(function(result){
      req.flash('succ_add_msg', 'Budget Code added successfully');
			res.redirect('/admin/budgetcode');
		}).catch(function(err){
			var validation_error = err.errors;
	    	res.render('admin/budgetcode/add', {
	        layout: 'dashboard',
	        error_message: validation_error[0].message,
	        body: req.body
	        });
		});
  } else{
    req.flash('error_message', 'Budget Code already exists');
    var redirectUrl = '/admin/jurisdiction/add';
    res.redirect(redirectUrl);
  }
	});
  	});

	app.get('/admin/budgetcode/edit/:id', function(req, res){
		budgetcode.findById(req.params['id']).then(function(budgetcode){
	      	budgetcodetype.findAll().then(function(budgetcodetype){
	      		//console.log(codemaster);
				res.render('admin/budgetcode/edit', {layout: 'dashboard', budgetcode:budgetcode, budgetcodetype:budgetcodetype, error_message:req.flash('error_message')[0] });
	        });
		});
	});

	app.post('/admin/budgetcode/edit/:id', function(req, res){
		budgetcode.update({
		      budget_code_type_id: req.body.budget_code_type_id,
		      code: req.body.code,
		      budget_code: req.body.budget_code,
		      remarks: req.body.remarks
	    },{ where: { id: req.params['id'] } }).then(function(result){
	    	req.flash('succ_add_msg', 'Budget code edited successfully');
	    	res.redirect('/admin/budgetcode');
	    }).catch(function(err){

	    });
	});

	app.get('/admin/budgetcode/delete/:id', function(req, res){
		budgetcode.destroy({
		    where: {
		       id:req.params['id']
		    }
		}).then(function(response){
			res.redirect('/admin/budgetcode');
		});
	});

};
