var amountOfPassengers=0;
var maximumAmountOfPassengers=12;
var busID=0;
var passengerID=0;
var theBusHasCapasity=true;

var db = openDatabase('robotBusDB', '1.0', 'Test DB', 2 * 1024 * 1024);

function databaseActions(actionNumber)
{
	db.transaction(function (tx) {  
   		if(actionNumber===1)
   		{
   			tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, busID, amountOfPassengers)');
   		}
   		if(actionNumber===2)
   		{
   			tx.executeSql('INSERT INTO LOGS (id, busID,amountOfPassengers) VALUES ('+passengerID+', '+busID+', '+amountOfPassengers+')');
		}
		if(actionNumber==3)
		{
			tx.executeSql('SELECT * FROM LOGS',[],function (tx, results)
			{
      			var len = results.rows.length, i;
      			msg = "<p>Found rows: " + len + "</p>";
      			document.querySelector('#status').innerHTML +=  msg;
	
      			for (i = 0; i < len; i++)
      			{
         			alert(results.rows.item(i).log );
      			}
	
   			}, null););
		}
		if(actionNumber===4)
		{
			tx.executeSql('DELETE FROM LOGS WHERE id='+passengerID+')');
		}
	});
}
function recognizeCapacity()
{
	if(amountOfPassengers<maximumAmountOfPassengers)
	{
		theBusHasCapasity=true;
	}
	else
	{
		theBusHasCapasity=false;
	}
}
function passengerLeavesTheBus ()
{
	amountOfPassengers=amountOfPassengers-1;
}
function passengerComesOnTheBus()
{
	amountOfPassengers=amountOfPassengers+1;
}