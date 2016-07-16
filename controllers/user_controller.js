
/**
 * receive user and update or create in the db
 * @param req
 * @param res
 */
exports.update_user = function(req,res,next){
	console.log("in update user")
	var r = {msg:[],status:0};
	var user = req.body.user;
	console.log(user);

	if (!user){
		console.log("user not exist or user id not found",user)
		r.msg.push('user not exist or user id not found',user);
		return res.json(r);
	}

	User.update_user(user,function(result){
		if (!result.status){
			console.log("update user failed")
			res.status(404).send("update user failed");

		}
		if (!result.user.alarms){
			result.newUser=true;
			
		}
		console.log("finishing update")
		return res.json(result)
	});
}


exports.get_user = function(req,res,next){
	console.log("in get user")
	var r = {msg:[],status:0};
	var user = req.body.user;

	if (!user){
		r.msg.push('user not exist or user id not found',user);
		return res.json(r);
	}

	User.get_user(user,function(result){
		if (!result.status){
			res.status(404).send("get user failed");
		}
		
		return res.json(result)
	});
}

