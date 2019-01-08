const fs = require('fs')

//Create an array of users inside JSON file if it doesn't exist
let checkUserlist = (file = "data.json") => {
  try {
    JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (err){
    let json = {
      "users":[]
    };
    fs.writeFileSync("data.json", JSON.stringify(json,null,2));
  }
};

//Reads and passes a JSON file as an arguement (returns JSON object)
let getJSON = (file = "data.json") => {
  return JSON.parse(fs.readFileSync(file));
};

//Writes updated JSON object to file
let updateJSON = (file = "data.json", newArray) => {
  fs.writeFileSync("data.json", JSON.stringify(newArray, null, 2));
}

module.exports = {
  checkUserlist: checkUserlist,
  getJSON: getJSON,
  updateJSON: updateJSON
}