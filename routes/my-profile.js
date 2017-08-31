module.exports = function(app, models){
  app.get('/admin/firm/my-profile',function(req, res){
    models.admin.hasMany(models.firm,{foreignKey: 'user_id'});
    models.admin.belongsTo(models.country,{foreignKey: 'country_id'});
    models.admin.belongsTo(models.state,{foreignKey: 'state_id'});
    models.admin.belongsTo(models.city,{foreignKey: 'city_id'});
    models.admin.belongsTo(models.designation,{foreignKey: 'designation_id'});

    models.admin.findAll({
      where: {
          role_code: 'FIRMADM'
       },
          include: [{model: models.firm},{model: models.country},{model: models.state},{model: models.city},{model:models.designation}]
    }
      ).then(function(firms){
          //console.log(firms);
      res.render('admin/firm/my-profile',{layout:'dashboard', firms:firms});
    });
  });
}
