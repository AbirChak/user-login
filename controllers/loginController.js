'use strict';

const sha256 = require('sha256'),
        async = require('async'),
        loginModel = require('../models/loginModel');


    
const login = (req,res) => {

    const reqData = req.body.params,
          username = reqData.username,
          password = reqData.password,
          version  = req.body.version,  
          validateRequest = (callback) => {
              if(typeof username !== 'string' || username === '') {
                  callback('Invalid username!',null);
              } else if(typeof password !== "string" || password === '') {
                  callback('Invalid password!',null);
              } else {
                  callback(null);
              }       
          },
        
             
          authenticateUser = (callback) => {
              const encryptedPassword = sha256(password);
              loginModel.authenticateUSer(username,encryptedPassword,callback);    
          };

          async.waterfall([
              validateRequest,
              authenticateUser
          ],(err,result) => {
              if(err !== null) {
                  res.json({
                      status : false,
                      statusCode : 401,
                      version : version,
                      message : "Internal server error"
                  })
              } else {
                  if(result !== false) {
                      let currentDate = new Date(),
                          encryptedData = sha256(username,''+password,'',res),
                          authToken = sha256(encryptedData+''+currentDate);
                      res.json({
                        status : true,
                        statusCode : 200,
                        version : version,
                        message : "Successfully logged in",
                        authToken : authToken
                      });
                  } else {
                      res.json({
                      status : false,
                      statusCode : 401,
                      version : version,
                      message : "Username/Password is not correct!"
                      })
                  }
              }
          })
          
};

module.exports = {
    login : login
}      