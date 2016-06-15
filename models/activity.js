var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
	title : { type : String, default:''},
	duration : { type : Number, default:''}	
});

activitySchema.statics.update_activity=function(activity,callback){
	var r = {msg:[],status:0};
	var query = {
		_id:activity._id
	};
	var options={
		upsert:true,
		new: true
	}
	this.model('activities').findOneAndUpdate(query,{$set:activity},options)
		.exec(function(err,result){
			if (err){
				r.msg.push(err);
				return callback(r);
			}

			r.msg.push("activity found");
			r.status=1;
			r.activity=result;
			return callback(r);
		});
}


activitySchema.statics.get_activity=function(activityid,callback){
	var r = {msg:[],status:0};
	var query = {
		_id:activityid
	};

	this.model('activities').findOne(query)
		.exec(function(err,result){
			if (err){
				r.msg.push(err);
				return callback(r);
			}

			if (!result){
				r.msg.push("activity was not found");
			}
			else{
				r.msg.push("activity found");
				r.activity=result;
				r.status=1;
			}

			return callback(r);
		});
}

Activity = mongoose.model('activities', activitySchema);