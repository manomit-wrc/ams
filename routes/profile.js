module.exports = function(app, admin) {
 	
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

		res.render('admin/profile',{layout:'dashboard'});
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


};