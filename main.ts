import fs from 'fs';
import axios from 'axios';
const ApplicationId = require('./applicationId');

async function main() {
    if (process.argv.length < 4) {
        console.log('Usage: main.js GET  url');
        console.log('       main.js POST url jsonfile');
        return;
    }
	
    const method = process.argv[2];
    const url = process.argv[3];
    const jsonFile = process.argv[4];

  let response;

  switch (method) {
      case 'GET':
        try{
          const url = "https://map.yahooapis.jp/search/zip/V1/zipCodeSearch?query=105-0011&output=json&appid=" + ApplicationId.getID
          response = await axios.get(url);
          console.log(response.status);
          console.log(response.headers);
          console.log(response.headers);
        }catch(err){
          //console.log(err);
          //console.log(err.status);
        }
          break;
      case 'POST':
          if (!jsonFile) {
              console.log('JSON file is not specified');
          } else {
              response = postJsonFile(url, jsonFile);
              console.log(response);
          }
          break;
      default:
          console.log('Unknown method');
          break;
  }
}

main();

function postJsonFile(url:string, jsonFile:string) {
  fs.readFile(jsonFile, async function(err, data) {
      if (err) {
          console.log(err);
      } else {
          const options = {
              headers: {
                  'content-type': 'application/json'
              },
              body: data
          }
          try{
            return await axios.post(url, options);
          }catch(err){
            console.log(err);
          }
      }
  });
}
