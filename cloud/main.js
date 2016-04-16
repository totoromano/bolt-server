
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi 2');
});

//Transaction Methods
Parse.Cloud.afterSave('transaction',function(req,res){
	console.log("Transaction saved! - AfterSave");
	Parse.Cloud.httpRequest({
	  url: '/transaction/pull'
	}).then(function(data) {
	  // success
	  console.log(data);
	},function(error) {
	  // error
	  console.error('Request failed with response code ' + error.status);
	});
});

Parse.Cloud.beforeSave('transaction',function(request,response){
	 console.log("Transaction saved! - BeforeSave");
	 console.log(request);
	request.object.set("amount", 66);

	response.success();
});



Parse.Cloud.define("pull", function(req,res){
	res.success(req);
});
