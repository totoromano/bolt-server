
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi 2');
});

//Transaction Methods
Parse.Cloud.afterSave('transaction',function(req,res){
	console.log("Transaction saved!");
	Parse.Cloud.httpRequest({
	  url: '/transaction/pull'
	}).then(function(httpResponse) {
	  // success
	  console.log(httpResponse.text);
	},function(httpResponse) {
	  // error
	  console.error('Request failed with response code ' + httpResponse.status);
	});
	// req.object.set("amount",66);

	res.sucess();

});

Parse.Cloud.beforeSave('transaction',function(req,res){
	console.log("Transaction saved!");
});



Parse.Cloud.define("pull", function(req,res){
	res.success(req);
});
