
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi 2');
});

//Transaction Methods
Parse.Cloud.afterSave('transaction',function(req,res){
	console.log("Transaction saved!");
	// Parse.Cloud.httpRequest({
	//   url: '/transaction/pull'
	// }).then(function(httpResponse) {
	//   // success
	//   console.log(httpResponse.text);
	// },function(httpResponse) {
	//   // error
	//   console.error('Request failed with response code ' + httpResponse.status);
	// });
	query = new Parse.Query("transaction");
  query.get(request.object.get("transaction").id, {
    success: function(operation) {
      operation.set("amount",99);
      operation.save();
    },
    error: function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
    }
  });
	 

});

Parse.Cloud.beforeSave('transaction',function(req,res){
	console.log("Transaction saved!");
	// req.object.set("amount",66);

	res.sucess();
});



Parse.Cloud.define("pull", function(req,res){
	res.success(req);
});
