module.exports = function(app, admin, fs) {
 	
 	var Admin = admin;
	var multer  = require('multer');
	var fileExt = '';
	var fileName = '';
	var xlsx = require('node-xlsx');
	var md5 = require('md5');
	var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, 'public/import-excel');
	  },
	  filename: function (req, file, cb) {
	    fileExt = 'xlsx';
	    fileName = req.user.id + '-' + Date.now() + '.' + fileExt;
	    cb(null, fileName);
	  }
	})

	var restrictImgType = function(req, file, cb) {

	    var allowedTypes = ['application/vnd.ms-excel'];
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
	app.get('/admin/import-excel', function(req, res) {

		res.render('admin/import-excel',{layout:'dashboard'});
	});


	app.post('/admin/import-excel', upload.single('excel_file'),  function(req, res) {
	    var array = xlsx.parse(fs.readFileSync('public/import-excel/'+fileName));
	    var importedData = JSON.stringify(convertToJSON(array[0].data));

	    var resultSet = JSON.parse(importedData);
	    for(var i=0;i<resultSet.length;i++) {
	    	Admin.create({
			first_name: resultSet[i].first_name,
			last_name: resultSet[i].last_name,
			address: resultSet[i].address,
			phone_no: resultSet[i].phone_no,
			email: resultSet[i].email,
			password: md5(resultSet[i].password),
			role_code: resultSet[i].role_code,
			reg_type: resultSet[i].reg_type,
			remarks: resultSet[i].remarks,
			group: resultSet[i].group
			}).then(function(result){
				
			}).catch(function(err){
				console.log(err);
				
			});
	    }

	    res.render('admin/import-excel',{layout:'dashboard',success_message:'User imported successfully'});
	    
  	});

	app.get('/admin/import-user', function(req, res) {
		Admin.findAll({where: {reg_type:'E'}}).then(function(section){
			res.render('admin/import-user',{layout:'dashboard', section:section});
		});
		
	});


	function convertToJSON(array) {
	  var first = array[0].join()
	  var headers = first.split(',');
	  
	  var jsonData = [];
	  for ( var i = 1, length = array.length; i < length; i++ )
	  {
	    var myRow = array[i].join();
	    var row = myRow.split(',');
	    
	    var data = {};
	    for ( var x = 0; x < row.length; x++ )
	    {
	      data[headers[x]] = row[x];
	    }
	    jsonData.push(data);
	 
	  }
	  return jsonData;
	}


};