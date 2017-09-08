module.exports = function(app, section) {

 	var Section = section;
	/*########### Listing - Begin #############*/
	app.get('/admin/section', function(req, res) {
		Section.findAll({where: {
      status:'1',
    },order:[
          ['id', 'ASC']
        ]}).then(function(section){
			res.render('admin/section/index',{layout:'dashboard', section:section,succ_add_msg:req.flash('succ_add_msg')[0]});
		});

	});
  /*########### Listing - End #############*/
  /*@@@@@@@@@@ Add - Begin @@@@@@@@@@@@@*/
	app.get('/admin/section/add', function(req, res){
		res.render('admin/section/add',{layout:'dashboard'});
	});

  app.post('/admin/section/add', function(req, res){
    Section.findAndCountAll({
       where: {
            name: req.body.name
       }
    })
    .then(function(result) {
      // console.log(result.count);
      var count = result.count;
      if(count == 0) {

        Section.create({
        name: req.body.name,
  			description: req.body.description,
  			remarks: req.body.remarks

        }).then(function(result){

          req.flash('succ_add_msg', 'Section added successfully');
          res.redirect('/admin/section');
        }).catch(function(err){
          
          var validation_error = err.errors;
          console.log(validation_error[0].message);
            res.render('admin/section/add', {
                layout: 'dashboard',
                error_message: validation_error[0].message,
                body: req.body
              });
        });
      } else {
          req.flash('error_message', 'Section already exists');
          var redirectUrl = '/admin/section/add';
          res.redirect(redirectUrl);
        }

    });

  });

    /*@@@@@@@@@@ Add - End @@@@@@@@@@@@@*/
    /*@@@@@@@@@@ Edit - Begin @@@@@@@@@@@@@*/

	app.get('/admin/section/edit/:id', function(req, res){
		Section.findById(req.params['id']).then(function(section){
			res.render('admin/section/edit', {
	        layout: 'dashboard',
	        section:section
	        });
		});
	});

	app.post('/admin/section/edit/:id', function(req, res){
		Section.update({
    		name: req.body.name,
    		description: req.body.description,
    		remarks: req.body.remarks
	    },{ where: { id: req.params['id'] } }).then(function(result){
	    	res.redirect('/admin/section');
	    }).catch(function(err){

	    });
	});
/*@@@@@@@@@@ Edit - End @@@@@@@@@@@@@*/
/*@@@@@@@@@@ Delete - Begin @@@@@@@@@@@@@*/
	app.get('/admin/section/delete/:id', function(req, res){
		Section.destroy({
		    where: {
		       id:req.params['id']
		    }
		}).then(function(response){
			res.redirect('/admin/section');
		});
	});
/*@@@@@@@@@@ Delete - End @@@@@@@@@@@@@*/
};
