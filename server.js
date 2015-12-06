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
			res.status(200).json({message: 'delete done', id: req.params.id});
    	});
    });
});
app.delete('/:attrib/:attrib_value/:attrib1/:attrib_value1',function(req,res) {
	var criteria = {};
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
			res.status(200).json({message: 'delete done', id: req.params.id});
    	});
    });
});

/*--------------------------------------------------------------------------------------------*/
app.get('/:attrib/:attrib_value', function(req,res) {

	var criteria = {};

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
				res.status(200).json({message: 'No matching document'});
			}
			db.close();
    	});
    });
});
app.get('/:attrib/:attrib_value/:attrib1/:attrib_value1', function(req,res) {

	var criteria = {};
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
				res.status(200).json({message: 'No matching document'});
			}
			db.close();
    	});
    });
});


/*--------------------------------------------------------------------------------------------*/
/*app.put('/restaurant_id/:id/:attrib/:attrib_value', function(req,res) {
	
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
*/
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

	
/*
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost:27017/test');
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
				
			}
			db.close();
    	});
    });
});
*//*
app.put('/restaurant_id/:id/:attrib', function(req,res) {
	
	var criteria = {};

	var abc = req.params.attrib;	

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost:27017/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var rObj = {};
		switch (abc) {
		case "address":
		rObj.address = {};
		rObj.address.building = req.body.building;
		rObj.address.street = req.body.street;
		rObj.address.zipcode = req.body.zipcode;

		
		rObj.address.coord = [];
		rObj.address.coord.push(req.body.lon);
		rObj.address.coord.push(req.body.lat);
		break;

		case "borough":
		rObj.borough = req.body.borough;break;
		case "cuisine":
		rObj.cuisine = req.body.cuisine;break;
		case "name":
		rObj.name = req.body.name;break;
		case "restaurant_id":
		rObj.restaurant_id = req.body.restaurant_id;break;
		case "grades":
		rObj.grades = {};
		rObj.grades.date = req.body.date;
		rObj.grades.grade = req.body.grade;
		rObj.grades.score = req.body.score;break;

}

		console.log(rObj);

		var Restaurant = mongoose.model('Restaurant', restaurantSchema);

		//console.log(r);
		Restaurant.update({restaurant_id: req.params.id}, {$set:rObj}, function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant created!')
       		db.close();
			res.status(200).json({message: 'update done'});
    	});
    });
});*/

app.put('/:attrib/:attrib1/:attrib1_value',function(req,res) {
	//console.log(req.body);
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://tester:123456@ds052968.mongolab.com:52968/oucloud01');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var criteria = {};
		criteria[req.params.field] = req.params.field_values;
		
		Restaurant.find(criteria, function(err,results) {
		for(i=0 ; i < results.length ; i++){
		
		if(req.body.date != null) results[i].grades[0].date = req.body.date;
		if(req.body.grade != null) results[i].grades[0].grade = req.body.grade;	
                if(req.body.score != null) results[i].grades[0].score = req.body.score;

		if(req.body.building != null) results[i].address.building = req.body.building;
		if(req.body.street != null) results[i].address.street = req.body.street;
		if(req.body.zipcode != null) results[i].address.zipcode = req.body.zipcode;

		if(req.body.borough != null) results[i].borough = req.body.borough;
		if(req.body.cuisine != null) results[i].cuisine = req.body.cuisine;
		if(req.body.name != null) results[i].name = req.body.name;
		if(req.body.restaurant_id != null) results[i].restaurant_id = req.body.restaurant_id;
		

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
		}	
		
		results[i].save(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
		
       		
            });
	   }
		db.close();
		res.status(200).json({message: 'insert done'});
    	});
    });
});


app.listen(process.env.PORT || 8099);


/*var server = app.listen(process.env.PORT || 8099, function () {
 	var host = server.address().address;
	var port = server.address().port;
 	console.log('Example app listening at http://%s:%s', host, port);
}); */
