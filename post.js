var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/Blog';

module.exports = {
	addPost: function(title, subject,tag, callback){
		MongoClient.connect(url, function(err, db) {
		  	db.collection('post').insertOne( {
				"title": title,
				"subject": subject,
				"tag": tag
			},function(err, result){
				assert.equal(err, null);
		    	console.log("Saved the blog post details.");
		    	if(err == null){
		    		callback(true)
		    	}
		    	else{
		    		callback(false)
		    	}
			});
		});
	},
	updatePost: function(id, title, subject,tag, callback){
		MongoClient.connect(url, function(err, db) {
		  	db.collection('post').updateOne( 
		  		{ "_id": new mongodb.ObjectID(id) },
		  		{ $set: 
		  			{ "title" : title,
		  			  "subject" : subject ,
		  			  "tag" : tag
		  			}
		  		},function(err, result){
				assert.equal(err, null);
		    	console.log("Updated the blog post details.");
		    	if(err == null){
		    		callback(true)
		    	}
		    	else{
		    		callback(false)
		    	}
			});
		});
	},
	getPost: function(callback){
		
		MongoClient.connect(url, function(err, db){
			 db.collection('post', function (err, collection) {
		        collection.find().toArray(function (err, list) {
		            callback(list);
		        });
		     });
		})
	},
	getTag: function(callback){
		MongoClient.connect(url, function(err, db){
			 db.collection('tag', function (err, collection) {
		        collection.find().toArray(function (err, list) {
		            callback(list);
		        });
		     });
		})
	},
	addTag: function(tagName, callback){
		MongoClient.connect(url, function(err, db) {
		  	db.collection('tag').insertOne( {
				"name": tagName
			},function(err, result){
				assert.equal(err, null);
		    	console.log("Saved the tag details.");
		    	if(err == null){
		    		callback(true)
		    	}
		    	else{
		    		callback(false)
		    	}
			});
		});
	},
	deletePost: function(id, callback){

		MongoClient.connect(url, function(err, db){
			 db.collection('post').deleteOne({
			 	_id: new mongodb.ObjectID(id)
			 },
			 function(err, result){
				assert.equal(err, null);
		    	console.log("Deleted the post.");
		    	if(err == null){
		    		callback(true)
		    	}
		    	else{
		    		callback(false)
		    	}
			});
		})
	},
	getPostWithId: function(id, callback){

		MongoClient.connect(url, function(err, db){
			 db.collection('post').findOne({
			 	_id: new mongodb.ObjectID(id)
			 },
			 function(err, result){
				assert.equal(err, null);
		    	console.log("Retrived the entry.");
		    	if(err == null){
		    		callback(result)
		    	}
		    	else{
		    		callback(false)
		    	}
			});
		})
	}
}


