
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi 2');
});

//Transaction Methods
Parse.Cloud.afterSave('transaction',function(req,res){
	console.log("Transaction saved! - AfterSave");
	console.log(req.object);
	var objId = req.object.id;
	console.log(objId);

	Parse.Cloud.run('pull', { id: objId}).then(function(data) {
	      console.log(data);
	      req.object.set("status","pulled");
	  },function(error){
	  	console.log(error);
	  });
	console.log("HTTP Request Executed");
});

Parse.Cloud.beforeSave('transaction',function(request,response){
	 console.log("Transaction saved! - BeforeSave");
	 console.log(request);
	request.object.set("amount", 66);

	response.success();
});


Parse.Cloud.define("pull", function(req,res){
	console.log("req.params IN pull function");
	console.log(req.params);
	var request = require('request');
	var req = request.defaults();
	var fs = require('fs');
	var data = JSON.stringify({
	   "systemsTraceAuditNumber" : "451001",
	   "retrievalReferenceNumber" : "330000550000",
	   "localTransactionDateTime" : "2016-04-16T14:39:47",
	   "acquiringBin" : "408999",
	   "acquirerCountryCode" : "840",
	   "senderPrimaryAccountNumber" : "4005520000011126",
	   "senderCardExpiryDate" : "2020-03",
	   "senderCurrencyCode" : "USD",
	   "amount" : "100",
	   "businessApplicationId" : "AA",
	   "surcharge" : "11.99",
	   "foreignExchangeFeeTransaction" : "11.99",
	   "cavv" : "0700100038238906000013405823891061668252",
	   "cardAcceptor" : {
	       "name" : "Acceptor 1",
	       "terminalId" : "ABCD1234",
	       "idCode" : "ABCD1234ABCD123",
	       "address" : {
	           "state" : "CA",
	           "county" : "San Mateo",
	           "country" : "USA",
	           "zipCode" : "94404"
	       }
	   }
	});
	var userId = '1JU5YLFNJP0ISHOWB4RL21rjbOfWnkbbE09d06EKCMQcIVcQs';
	var password = 'BBlUAZ1kcNEYZFB738K6Z';
	var keyFile = 'certificates/key_Bolt.pem';
	var certificateFile ='certificates/cert.pem';
	console.log("HTTP Request About to Exec on Pull");
	req.post({
	   uri : "https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pullfundstransactions",
	   key: fs.readFileSync(keyFile),
	   cert: fs.readFileSync(certificateFile),
	   headers: {
	     'Content-Type' : 'application/json',
	     'Accept' : 'application/json',
	     'Authorization' : 'Basic ' + new Buffer(userId + ':' + password).toString('base64')
	   },
	   body: data
	 }, function(error, response, body) {
	   if (!error) {
	     console.log("Response Code: " + response.statusCode);
	     console.log("Headers:");
	     for(var item in response.headers) {
	       console.log(item + ": " + response.headers[item]);
	     }
	     console.log("Body: "+ body);
	     var transaction = new Parse.Object.extend("transaction");
	        var query = new Parse.Query(transaction);
	        query.equalTo("_id", request.params.id);
	        query.first({
	           success: function(object) {
	              object.set("status","pulled");
	              object.save();
	           },
	           error: function(error) {
	              alert("Error: " + error.code + " " + error.message);
	           }
	        });
	   } else {
	     console.log("Got error: " + error.message);
	   }
	 }
	);
});
