##Installing
Using npm  

    $ npm install dbhub

##Usage
**Get your api key for the database on *website***    

After that include packet in your code:  

    const {getDatabase}  = require('dbhub');

Create your database:  

    let apikey = 'xxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    let db = getDatabase(apiKey)
    
Get collection(table) from database:  
    
    let collection = db.getCollection(collectionName)

##CRUD
Create new element in collection:
    
    collection.create(element)

Read element in collection:
    
    collection.read(id)

Update element in collection:

    collection.update(id, element)

Delete new element in collection:
    
    collection.delete(id)

From each *CRUD* function will be returned **Promise**, so you need
to use **then** or **await**  

    let result = await collection.create(element)
    let result = await collection.read(id)
    collection.update(id, element).then('Updated')
    collection.delete(id).then('Deleted')