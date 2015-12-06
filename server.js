var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongodbURL = 'mongodb://tester:123456@ds052968.mongolab.com:52968/oucloud01';
var mongoose = require('mongoose');

app.post('/',function(req,res) {
	//console.log(req.body);
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://tester:123456@ds052968.mongolab.com:52968/oucloud01');
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
		//rObj.grades = {};

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

/*--------------------------------------------------------------------------------------------*/
app.delete('/:attrib/:attrib_value',function(req,res) {
	var criteria = {};
	var abc = req.params.attrib;
	criteria[req.params.attrib] = req.params.attrib_value;
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://tester:123456@ds052968.mongolab.com:52968/oucloud01');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find(criteria).remove(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant removed!')
       		db.close();
			var msg = {};
			msg.message = 'delete done';
			msg[req.params.attrib] = req.params.attrib_value
			res.status(200).json(msg);
    	});
    });
});
app.delete('/:attrib/:attrib_value/:attrib1/:attrib_value1',function(req,res) {
	var criteria = {};var abc = req.params.attrib;
	criteria[req.params.attrib] = req.params.attrib_value;
	criteria[req.params.attrib1] = req.params.attrib_value1;	

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://tester:123456@ds052968.mongolab.com:52968/oucloud01');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find(criteria).remove(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant removed!')
       		db.close();
			var msg = {};
			msg.message = 'delete done';
			msg[req.params.attrib] = req.params.attrib_value
			res.status(200).json(msg);
    	});
    });
});

/*--------------------------------------------------------------------------------------------*/

app.get('/:attrib/:attrib_value', function(req,res) {

	var criteria = {};var abc = req.params.attrib;

	criteria[req.params.attrib] = req.params.attrib_value;

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://tester:123456@ds052968.mongolab.com:52968/oucloud01');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find(criteria,function(err,results){
       		if (err) {
				res.status(500).json(err);
				throw err
			}
			if (results.length > 0) {
				res.status(200).json(results);
			}
			else {
				var msg = {};
				msg.message = 'No matching document';
				msg[req.params.attrib] = req.params.attrib_value
				res.status(200).json(msg);
			}
			db.close();
    	});
    });
});
app.get('/:attrib/:attrib_value/:attrib1/:attrib_value1', function(req,res) {

	var criteria = {};var abc = req.params.attrib;
	criteria[req.params.attrib] = req.params.attrib_value;
	criteria[req.params.attrib1] = req.params.attrib_value1;

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://tester:123456@ds052968.mongolab.com:52968/oucloud01');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find(criteria,function(err,results){
       		if (err) {
				res.status(500).json(err);
				throw err
			}
			if (results.length > 0) {
				res.status(200).json(results);
			}
			else {
				var msg = {};
				msg.message = 'No matching document';
				msg[req.params.attrib] = req.params.attrib_value
				res.status(200).json(msg);
			}
			db.close();
    	});
    });
});


/*--------------------------------------------------------------------------------------------*/


app.put('/:attrib/:attrib_value/:attrib1',function(req,res) {
	//console.log(req.body);
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://tester:123456@ds052968.mongolab.com:52968/oucloud01');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var criteria = {};
		criteria[req.params.attrib] = req.params.attrib_value;
		
		Restaurant.find(criteria, function(err,results) {
		for(i=0 ; i < results.length ; i++){
		
		if (req.body.date != null || req.body.grade != null || req.body.score != null){
		results[i].grades = {};
		if(req.body.date != null) results[i].grades[i].date = req.body.date;
		if(req.body.grade != null) results[i].grades[i].grade = req.body.grade;	
                if(req.body.score != null) results[i].grades[i].score = req.body.score;
		}
		if(req.body.building != null) results[i].address.building = req.body.building;
		if(req.body.street != null) results[i].address.street = req.body.street;
		if(req.body.zipcode != null) results[i].address.zipcode = req.body.zipcode;

		if(req.body.borough != null) results[i].borough = req.body.borough;
		if(req.body.cuisine != null) results[i].cuisine = req.body.cuisine;
		if(req.body.name != null) results[i].name = req.body.name;
		if(req.body.restaurant_id != null) results[i].restaurant_id = req.body.restaurant_id;

		if(req.body.lon != null || req.body.lat != null) {
		var lon = results[i].address.coord[0]
		var lat = results[i].address.coord[1]
		results[i].address.coord = [];
		if(req.body.lon != null && req.body.lat == null) {
		results[i].address.coord[0] = req.body.lon;
		results[i].address.coord[1] = lat;
		}

		if(req.body.lat != null && req.body.lon == null) {
		results[i].address.coord[0] = lon;
		results[i].address.coord[1] = req.body.lat;
		}
		
		if(req.body.lat != null && req.body.lon != null){
		results[i].address.coord[0] = req.body.lon;
                results[i].address.coord[1] = req.body.lat;
		}	}


		/*var rObj = {};
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
		rObj.restaurant_id = req.body.restaurant_id;*/

		//var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		//console.log(r);
		//Restaurant.update({restaurant_id: req.params.attrib_value}, {$set:results[0]}, function(err){
		results[i].save(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant created!')
		
       		db.close();
		
			res.status(200).json({message: 'update done'});
            });
	   }
    	});
    });
});

app.listen(process.env.PORT || 8099);
