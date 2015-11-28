var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongodbURL = 'mongodb://abc123:123456@ds052968.mongolab.com:52968/oucloud01';
var mongoose = require('mongoose');

app.post('/',function(req,res) {
	//console.log(req.body);
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://abc123:123456@ds052968.mongolab.com:52968/oucloud01');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var rObj = {};
		rObj.address = {};
		rObj.address.building = req.body.building;
		rObj.address.street = req.body.street;
		rObj.address.zipcode = req.body.zipcode;
		rObj.address.coord = [];
		rObj.address.coord.push(req.body.lon);
		rObj.address.coord.push(req.body.lat);
		rObj.borough = req.body.borough;
		rObj.cuisine = req.body.cuisine;
		rObj.name = req.body.name;
		rObj.restaurant_id = req.body.restaurant_id;

		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var r = new Restaurant(rObj);
		//console.log(r);
		r.save(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant created!')
       		db.close();
			res.status(200).json({message: 'insert done', id: r._id});
    	});
    });
});

app.delete('/restaurant_id/:id',function(req,res) {
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://abc123:123456@ds052968.mongolab.com:52968/oucloud01');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find({restaurant_id: req.params.id}).remove(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant removed!')
       		db.close();
			res.status(200).json({message: 'delete done', id: req.params.id});
    	});
    });
});

app.get('/restaurant_id/:id', function(req,res) {
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://abc123:123456@ds052968.mongolab.com:52968/oucloud01');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find({restaurant_id: req.params.id},function(err,results){
       		if (err) {
				res.status(500).json(err);
				throw err
			}
			if (results.length > 0) {
				res.status(200).json(results);
			}
			else {
				res.status(200).json({message: 'No matching document'});
			}
			db.close();
    	});
    });
});

app.put('/restaurant_id/:id/:attrib/:attrib_value', function(req,res) {
	
	var criteria = {};
	var abc = req.params.attrib;
	
	if (abc == 'street' || abc == 'zipcode' || abc == "building" || abc == 'coord'){	
	criteria["address."+req.params.attrib] = req.params.attrib_value;
	console.log(criteria);
	console.log("success");
	}
	else if (abc == 'date' || abc == 'grade' || abc == 'score'){
	criteria["grades."+req.params.attrib] = req.params.attrib_value;
	console.log("fail1");
	console.log(criteria);
	}
	else {
	criteria[req.params.attrib] = req.params.attrib_value;
	console.log("fail2");
	console.log(criteria); }

	/*if (criteria[req.params.attrib] == "building"){	
	criteria["address." + req.params.attrib] = req.params.attrib_value;
	console.log(criteria);
	console.log("success");
	}
	else{
	var abc = String(criteria[req.params.attrib]);
	console.log(abc);
	criteria["adress."+req.params.attrib] = req.params.attrib_value;
	console.log("fail");
	console.log(criteria);
	
	}*/

	

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://abc123:123456@ds052968.mongolab.com:52968/oucloud01');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurants', restaurantSchema);
		var abc = req.params.attrib;

		Restaurant.update({restaurant_id: req.params.id}, {$set:criteria}, function(err){
       		if (err) {
				res.status(500).json(err);
				throw err
			}
			
			else {
				res.status(200).json({message: 'updated'});
				/*console.log(abc);*/
			}
			db.close();
    	});
    });
});

app.listen(process.env.PORT || 8099);


/*var server = app.listen(process.env.PORT || 8099, function () {
 	var host = server.address().address;
	var port = server.address().port;
 	console.log('Example app listening at http://%s:%s', host, port);
}); */
