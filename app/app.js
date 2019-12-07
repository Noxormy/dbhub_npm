const axios = require('axios');
const request = axios.create({
    baseURL: "https://dbhub.herokuapp.com"
});


module.exports.getDatabase = (apikey) => {
    return new DbHub(apikey)
};

class DbHub {
    constructor(apikey) {
        this.apikey = apikey;
    }

    getCollection(collectionName) {
        return new Collection(this.apikey, collectionName);
    }
}

class Collection {
    constructor(apikey, collectionName) {
        this.apikey = apikey;
        this.collectionName = collectionName;
    }

    async create(doc) {
        let data = {
            secret: this.apikey,
            collectionName: this.collectionName,
            doc: doc
        };
        let [response, error] = await handle(request.post('', data));

        if (error) throw error;
        return response.data;
    }

    async read(id) {
        let [response, error] = await handle(request.get('/', {
            params: {
                id: id,
                secret: this.apikey,
                collectionName: this.collectionName
            }
        }));

        if(error) throw error;
        return response.data
    }

    async update(id, doc) {
        let data = {
            secret: this.apikey,
            collectionName: this.collectionName,
            id: id,
            doc: doc
        };
        let [response, error] = await handle(request.patch('', data));

        if (error) throw error;
        return response.data;
    }

    async delete(id) {
        let [response, error] = await handle(request.delete('/', {
            params: {
                id: id,
                secret: this.apikey,
                collectionName: this.collectionName
            }
        }));

        if(error) throw error;
        return response.data
    }
}

const handle = (promise) => {
    return promise
        .then(data => ([data, undefined]))
        .catch(error => Promise.resolve([undefined, error]));
};
