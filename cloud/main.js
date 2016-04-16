
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi 2');
});

//Transaction Methods
Parse.Cloud.afterSave('transaction',function(req,res){
	console.log("Transaction saved! - AfterSave");
	Parse.Cloud.httpRequest({
		method: 'GET',
		url: 'https://bolt-2.herokuapp.com/transaction/pull'
	}.then(function(data){
		console.log(data);
	},function(error){
		console.log(error);
	}));

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
	console.log("HTTP Request About to Exec");
	// Parse.Cloud.httpRequest({
	// 	method: 'POST',
	// 	uri : "https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pullfundstransactions",
	// 	key: fs.readFileSync(keyFile),
	// 	cert: fs.readFileSync(certificateFile),
	// 	headers: {
	// 	'Content-Type' : 'application/json',
	// 	'Accept' : 'application/json',
	// 	'Authorization' : 'Basic ' + new Buffer(userId + ':' + password).toString('base64')
	// 	},
	// 	body: data
	// 	}).then(function(data) {
	// 		// success
	// 		console.log(data);
	// 	},function(error) {
	// 		// error
	// 		console.error('Request failed with response code ' + error.status);
	// 	});
	console.log("HTTP Request Executed");
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
