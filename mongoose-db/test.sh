# post request- save data into database
curl -H 'Content-Type: application/json' -X POST -d '{"_id": 1, "name": "savings", "balance": 1000}' 'http://localhost:3000/accounts';
sleep 2;

# put request- update data into database
curl -H 'Content-Type: application/json' -X PUT -d '{"balance": 50000000000}' 'http://localhost:3000/accounts/1';
sleep 2;

# get request- find data into database
curl 'http://localhost:3000/accounts';
sleep 2;

# delete request- delete data into database
curl -X DELETE 'http://localhost:3000/accounts/1';
