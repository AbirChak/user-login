'use strict';

const sha256 = require('sha256'),
        async = require('async');
    //   loginModel = require('../models/loginModels');

const login = (req,res) => {
    const reqData = req.body.params,
          version = req.body.version,
          userName = reqData.username,
          password = reqData.password,

          validateRequest = (callback) => {
              if(typeof userName !== 'string' || userName === '') {
                  callback('Invalid username!',null);
              } else if(typeof password !== "string" || password === '') {
                  callback('Invalid password!',null);
              } else {
                  callback(null);
              }       
          },

          authenticateUser = (callback) => {
              const encryptedPassword = sha256(password);
              loginModel.checkLogin(userName,encryptedPassword,callback);
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
                  if(result !== true) {
                      res.json({
                      status : false,
                      statusCode : 401,
                      version : version,
                      message : "Username/Password is not correct!"
                      })
                  } else {
                      let currentDate = new Date(),
                          encryptedData = sha256(userName+''+password),
                          authToken = sha256(encryptedData+''+currentDate);
                      res.json({
                        status : true,
                        statusCode : 200,
                        version : version,
                        message : "Successfully logged in",
                        authToken : authToken
                      })
                  }
              }
          })
          
};

module.exports = {
    login : login
}      