module.exports = function(app) {
 
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
	    fileName = req.user.user_seq_no + '-' + Date.now() + '.' + fileExt;
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
        res.render('admin/profile', {layout: 'dashboard'}); // I assume I upload a picture, thus, {img:...}. Also, I'm passing csrf token here as well, so that one is able to upload again after having done so already - if not, it will report invalid csrf token, so we need it since the server would have regenerated it after the first upload.
  	});


};
