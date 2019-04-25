const mongoClient = require("mongodb").MongoClient,
      url = process.env.DBURI;

  const authenicateUser = (username,password,callback) => {
      mongoClient.connect(url,(err,db) => {
          const dbObject = db.db(process.env.DBNAME),
                dataObj = {"name" : username, "password" : password};
          dbObject.collection(process.env.COLLECTION).find(dataObj)
          .toArray((err,result) => {
              if(err) {
                  return !!callback("Internal server error!",null);
              } else {
                  if(result.length > 0){
                  return !!callback(null,result[0]._id);
                  } else {
                      return !!callback(null,false);
                  }
              }
          })
      })
  };

  module.exports = {
      authenticateUSer : authenicateUser
  }

