const fileManager = require("./file_manager.js")

//Adds a new username, password (after confirming), first name, and last name
const fs = require('fs')
const addUser = (username, pw, cpw, fn, ln) => {
  if (pw === cpw) {
    var userObj = {
        username: username,
        pw: pw,
        fn: fn,
        ln: ln
    }
    fileManager.checkUserlist();
    var userArr = fileManager.getJSON();
    if (userArr.users.length != 0) {
      console.log("if: ", userArr);
    } else {
      console.log("else: ", userArr);
      userArr.users.push(userObj);
      fileManager.updateJSON(userArr);
      console.log("updated: ", userArr);
    }
//     console.log(userArr);
//     userObj.push(userArr);
//     fileManager.updateJSON()
//     fs.writeFileSync(users, JSON.stringify(userObj, null,2));
  } else {
    throw "Passwords must match";
  }
}


//Returns a user object specified by the user username
const getUser = (username) => {
  var userArray = fileManager.getJSON();
  if (userArray.users.length != 0) {
    for (i=0; i < userArray.users.length; i++) {
      if (userArray.users[i].username === username){
        returnedUser = userArray.users.splice(i, 1)
        return returnedUser
      } 
    }
    throw `There are currently no existing users matching user ID: '${username}'`
  } else {
    throw "There are currently no existing users to retrieve";
  }
}

module.exports = {
  addUser: addUser,
  getUser: getUser
}