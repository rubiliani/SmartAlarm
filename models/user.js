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
	hometown :{
		name:{ type : String, default:''},
		data:{ type: Schema.Types.Mixed, default:{}}
		
	},
	activities:[{name:{ type : String, default:''},
				duration:{ type : Number, default:0} }],
	defSleepHours: { type : Number, default:6},
	userSleepers:[{type : Schema.Types.ObjectId , ref: 'users'}],
 	alarms:[{
 		dayIndex:{type : Number , default:''},
		day:{type : String , default:''},
		timeToArrive:{type: String, default:''},
		timeToWakeUp: {type: String, default:''},
		timeToSleep: {type: String, default:''},
		activities:[{
				name:{ type : String, default:''},
				duration:{ type : Number, default:0}
		}],
		mode: { type : Number, default:0},
		sleepHours: { type : Number, default:6},
		location:{
		name:{ type : String, default:''},
		data:{ type: Schema.Types.Mixed, default:{}}
		}
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
	console.log("in get user",userid)
	var r = {msg:[],status:0};
	var query = {
		id:userid
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