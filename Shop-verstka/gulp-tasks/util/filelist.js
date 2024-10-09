'use strict';

var now = new Date();
var nowDay = 0;
var nowMounth = 0

if(now.getDate() < 10) {
  nowDay = '0' + now.getDate();
} else {
  nowDay = now.getDate();
}

if((now.getMonth() + 1) < 10) {
  nowMounth = '0' + (now.getMonth() + 1);
} else {
  nowMounth = (now.getMonth() + 1);
}

var dateFormat = nowDay + '.' + nowMounth + '.' + now.getFullYear() +  '  ' + now.getHours() + ':' + now.getMinutes();

module.exports = function (appPath, runPath) {
  return function (done) {
    var fs = require('fs');
    var projectData = {};
    var searchFolder = runPath;
    var pages = [];
    var pagesName = [];
    
    fs.readdirSync(searchFolder).forEach(function (fileName) {
      if (fileName.endsWith('html') && fileName !== 'index.html') {
        
        let fileContent = fs.readFileSync(searchFolder + '/' + fileName, "utf8");
        if (fileContent.match('<title>(.*?)</title>')) {
          let title = fileContent.match('<title>(.*?)</title>')[1]
          pagesName.push(title);
          pages.push(fileName);
        }
        
      }
    });
    
    projectData.lastChange = dateFormat;
    
    
    projectData.pages = pages;
    projectData.pagesName = pagesName;
    fs.writeFileSync(runPath + '/filelist.json', JSON.stringify(projectData));
    done();
  };
};
