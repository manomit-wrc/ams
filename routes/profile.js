module.exports = function(app, admin) {
 	var md5 = require('md5');
 	var Admin = admin;
	var multer  = require('multer');
	var im = require('imagemagick');
	var fileExt = '';
	var fileName = '';
	var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, 'public/profile');
	  },
	  filename: function (req, file, cb) {
	    fileExt = file.mimetype.split('/')[1];
	    if (fileExt == 'jpeg'){ fileExt = 'jpg';}
	    fileName = req.user.id + '-' + Date.now() + '.' + fileExt;
	    cb(null, fileName);
	  }
	})

	var restrictImgType = function(req, file, cb) {

	    var allowedTypes = ['image/jpeg','image/gif','image/png'];
	      if (allowedTypes.indexOf(req.file.mimetype) !== -1){
	        // To accept the file pass `true`
	        cb(null, true);
	      } else {
	        // To reject this file pass `false`
	        cb(null, false);
	       //cb(new Error('File type not allowed'));// How to pass an error?
	      }
	};

    var upload = multer({ storage: storage, limits: {fileSize:3000000, fileFilter:restrictImgType} });
	app.get('/admin/dashboard', function(req, res) {

		res.render('admin/dashboard',{layout:'dashboard'});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/admin/logout', function(req, res) {
		req.logout();
		res.redirect('/admin');
	});
	
	app.get('/admin/profile', function(req, res) {

		res.render('admin/profile',{layout:'dashboard', success_message:req.flash('success_message')[0]});
	});

	app.post('/admin/profile', upload.single('avator'),  function(req, res) {
	    var photo = null;
	    var allowedTypes = ['image/jpeg','image/gif','image/png'];
	    if (req.file){
	            photo = fileName;
	            // save thumbnail -- should this part go elsewhere?
	            im.crop({
	              srcPath: 'public/profile/'+ fileName,
	              dstPath: 'public/profile/thumbs/'+ fileName,
	              width: 100,
	              height: 100
	            }, function(err, stdout, stderr){
	              if (err) throw err;
	              console.log('100x100 thumbnail created');
	            });
	    }

	    Admin.update({
    		first_name: req.body.first_name,
    		last_name: req.body.last_name,
    		address: req.body.address,
    		phone_no: req.body.phone_no,
    		avator: fileName
	    },{ where: { id: req.user.id } }).then(function(result){
	    	res.render('admin/profile', {
	        layout: 'dashboard',
	        success_message: "Profile updated successfully"
	        });
	    }).catch(function(err){
	    	var validation_error = err.errors;
	    	res.render('admin/profile', {
	        layout: 'dashboard',
	        error_message: validation_error[0].message
	        });
	    });
  	});

	//check password for site admin change password//
  	app.post('/admin/check_password', function(req, res){
		Admin.findAll({
		  where: {
		    password: md5(req.body.old_password),
		    id: req.user.id
		  },
		  raw: true,
		}).then(function(result){
			if(result.length > 0) {
				res.send(true);
			}
			else {
				res.send(false);
			}
		});
	});
	//end//

	// site admin change password//
	app.post('/admin/change_password', function(req, res){
		Admin.update({
    		password: md5(req.body.new_password)
	    },{ where: { id: req.user.id } }).then(function(result){
	    	req.flash('success_message', 'Password changed successfully');
	    	res.redirect('/admin/profile');
	    }).catch(function(err){
	    	
	    	var validation_error = err.errors;
	    	req.flash('error_message', validation_error[0].message);
	    	var redirectUrl = '/admin/profile';
  			res.redirect(redirectUrl);
	    	
	    });
	});
	//end//
};