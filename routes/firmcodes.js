module.exports = function(app, firmcodes, codemaster) {

  var Firmcodes = firmcodes;

   	var Codemaster = codemaster;

	app.get('/admin/firmcodes', function(req, res) {
    Firmcodes.belongsTo(Firmcodes, {foreignKey: 'code_master_id'});
    Firmcodes.findAll({order:[
          ['id', 'ASC']
        ],
      include: [{model: Firmcodes}]
    }).then(function(firmcodes){
      console.log(firmcodes);
			res.render('admin/firmcodes/index',{layout:'dashboard', firmcodes:firmcodes});
		});

	});

	// app.get('/admin/codemaster/add', function(req, res){
  //   Codecategory.findAll().then(function(codecategory){
	// 		res.render('admin/codemaster/add',{layout:'dashboard', codecategory:codecategory});
	// 	});
	// });
  //
	// app.post('/admin/codemaster/add', function(req, res){
	// 	Codemaster.create({
	// 		categoryid: req.body.categoryid,
  //     code: req.body.code,
  //     shortdescription: req.body.shortdescription,
  //     longdescription: req.body.longdescription,
  //     remarks: req.body.remarks,
  //     createdby:`1`
	// 	}).then(function(result){
  //
	// 		res.redirect('/admin/codemaster');
	// 	}).catch(function(err){
	// 		var validation_error = err.errors;
	//     	res.render('admin/codemaster/add', {
	//         layout: 'dashboard',
	//         error_message: validation_error[0].message,
	//         body: req.body
	//         });
	// 	});
	// });
  //
	// app.get('/admin/codemaster/edit/:id', function(req, res){
	// 	Codemaster.findById(req.params['id']).then(function(codemaster){
  //     Codecategory.findAll().then(function(codecategory){
	// 		res.render('admin/codemaster/edit', {
	//         layout: 'dashboard',
	//         codemaster:codemaster,
  //         codecategory:codecategory
	//         });
  //       });
	// 	});
	// });
  //
	// app.post('/admin/codemaster/edit/:id', function(req, res){
	// 	Codemaster.update({
  //     categoryid: req.body.categoryid,
  //     code: req.body.code,
  //     shortdescription: req.body.shortdescription,
  //     longdescription: req.body.longdescription,
  //     remarks: req.body.remarks,
	//     },{ where: { id: req.params['id'] } }).then(function(result){
	//     	res.redirect('/admin/codemaster');
	//     }).catch(function(err){
  //
	//     });
	// });
  //
	// app.get('/admin/codemaster/delete/:id', function(req, res){
	// 	Codemaster.destroy({
	// 	    where: {
	// 	       id:req.params['id']
	// 	    }
	// 	}).then(function(response){
	// 		res.redirect('/admin/codemaster');
	// 	});
	// });

};
