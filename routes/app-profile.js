module.exports = function(app, appProfile, admin) {
 	
 	var AppProfile = appProfile;
 	var Admin = admin;
	
	// for index
	app.get('/admin/app-profile', function(req, res) {
		AppProfile.belongsTo(Admin, {foreignKey: 'user_id'});
		AppProfile.findAll({
			include: [{model: Admin}]
		}).then(function(appProfile){
			console.log(appProfile);
			res.render('admin/app-profile/index',{layout:'dashboard', appProfile:appProfile,succ_add_msg:req.flash('succ_add_msg')[0]});
		});
		
	});
};