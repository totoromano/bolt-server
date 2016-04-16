
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

//Transaction Methods
Parse.Cloud.afterSave('transaction',function(req,res){
	console.log("Transaction saved!");
	var TransactionObject = Parse.Object.extend("transaction");
        var transactionObject = new TransactionObject();
          transactionObject.save({from: "system", "to": "user", "amount": 10}, {
          success: function(object) {
            console.log(object);
          },
          error: function(model, error) {
            console.log(error);
          }
        });
});

Parse.Cloud.beforeSave('transaction',function(req,res){
	console.log("Transaction saved!");
});

