
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi 2');
});

//Transaction Methods
Parse.Cloud.afterSave('transaction',function(req,res){
	console.log("Transaction saved!");
	Parse.Cloud.run('pull',{ data: req.params
	}).then(function(data) {
              console.log(data);
     });
	// Parse.Cloud.httpRequest({
	//   url: '/transaction/pull',
	//   body:{
	//   	req
	//   }
	// }).then(function(httpResponse) {
	//   // success
	//   console.log(httpResponse.text);
	// },function(httpResponse) {
	//   // error
	//   console.error('Request failed with response code ' + httpResponse.status);
	// });
	req.object.set("user_id",1);

	res.sucess();

});

Parse.Cloud.beforeSave('transaction',function(req,res){
	console.log("Transaction saved!");
});



Parse.Cloud.define("pull", function(req,res){
	res.success(req);
});
