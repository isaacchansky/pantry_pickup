var Pantry = require('../models/pantry');
var extend = require('extend');

module.exports = function(app) {

  /*
   * GET all of a pantries food needs
   */

  app.get('/api/pantry/:pantry_id/food-needs', function(req, res) {
    Pantry.findById(req.params.pantry_id, function(err, pantry){
      if (err != null || pantry == null){
        res.send('unable to find that pantry', 404);
      }else{
        var needs = pantry.food_needs || [];
        res.send({ foodNeeds: needs }, 200);
      }
    })
  });


  /*
   * GET a single pantry
   */

  app.get('/api/pantry/:pantry_id/food-needs/:id', function(req, res) {
    Pantry.findById(req.params.pantry_id, function(err, pantry){
      if (err != null || pantry == null){
        res.send('unable to find that pantry', 404);
      }else{
        var need = pantry.food_needs.id(req.params.id);
        if(need){
          res.send({ foodNeed: need }, 200);
        }else{
          res.send("something went wrong", 500);
        }
      }
    })
  });

  /*
   * POST a single pantry
   */

  app.post('/api/pantry/:pantry_id/food-needs', function(req, res) {
    Pantry.findById(req.params.pantry_id, function(err, pantry){
      if (err != null || pantry == null){
        res.send('unable to find that pantry', 404);
      }else{
        pantry.food_needs.push({name:req.body.name, priority: req.body.priority})
        pantry.save(function(err, pantry){
          if(err!= null || pantry == null){
            console.log("unabled to create food need", err, pantry);
            res.send("unable to create food need", 500);
          } else {
            res.send({foodNeed: pantry.food_needs}, 200);
          }
        });
      }
    })
  });


  /*
   * PUT a single pantry
   */

  app.put('/api/pantry/:pantry_id/food-needs/:id', function(req, res) {
    Pantry.findById(req.params.pantry_id, function(err, pantry){
      if (err != null || pantry == null){
        res.send('unable to find that pantry', 404);
      }else{
        var need = pantry.food_needs.id(req.params.id);
        extend(need, req.body);
        pantry.save(function(err, pantry){
          if( err != null || pantry == null ){
            res.send("something went wrong", 500);
          }else{
            res.send({ foodNeed: need }, 200);
          }
        })
      }
    })
  });


  /*
   * DELETE a single pantry
   */

  app.delete('/api/pantry/:pantry_id/food-needs/:id', function(req, res) {
    Pantry.findById(req.params.pantry_id, function(err, pantry){
      if (err != null || pantry == null){
        res.send('unable to find that pantry', 404);
      }else{
        pantry.food_needs.id(req.params.id).remove();
        pantry.save(function(err, pantry){
          if( err != null || pantry == null ){
            res.send("something went wrong", 500);
          }else{
            res.send({ "message": "food need has been deleted" }, 200);
          }
        })
      }
    })
  });

}
