var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	id : { type : String ,  index : true, unique : true , required :true},
	email : { type : String, default:''},
	name : { type : String, default:''},
	picture:{
		data:{
			url:{ type : String, default:''}
		}
	},
	userSleepers:[{type : Schema.Types.ObjectId , ref: 'users'}],
 	alarms:[{
		day:{type : String },
		timeToArrive:{type: String},
		timeToWakeUp: {type: String},
		activities:[{type : Schema.Types.ObjectId , ref: 'activities'}],
		mode: { type : Boolean, default:false}
	}],
	
});

userSchema.statics.update_user=function(user,callback){
	var r = {msg:[],status:0};
	var query = {
		id:user.id
	};
	var options={
		upsert:true,
		new: true
	}
	this.model('users').findOneAndUpdate(query,{$set:user},options)
		.exec(function(err,result){
			if (err){
				r.msg.push(err);
				return callback(r);
			}

			r.msg.push("user found");
			r.status=1;
			r.user=result;
			return callback(r);
		});
}


userSchema.statics.get_user=function(userid,callback){
	var r = {msg:[],status:0};
	var query = {
		_id:userid
	};

	this.model('users').findOne(query)
		.exec(function(err,result){
			if (err){
				r.msg.push(err);
				return callback(r);
			}

			if (!result){
				r.msg.push("user was not found");
			}
			else{
				r.msg.push("user found");
				r.user=result;
				r.status=1;
			}

			return callback(r);
		});
}



User = mongoose.model('users', userSchema);