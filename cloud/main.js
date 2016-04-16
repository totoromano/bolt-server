
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

//Transaction Methods
Parse.Cloud.afterSave('transaction',function(req,res){
	console.log("Transaction saved!");
});