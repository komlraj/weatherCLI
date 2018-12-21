// imported require node module
const http = require('http');
const chalk = require('chalk');
const logUpdate = require('log-update');
const spinner = require('elegant-spinner')();

// impor readline for reading data
const readline = require('readline').createInterface({
  input : process.stdin,
  output : process.stdout
})

// set header
const option = {
  header : {
    'User-Agent' : 'Weather-Info',
    'Content-Type': 'application/json'
  }
}


// this function for fetch weather api 
function fetchWeather(place) {
  let apiKey = 'b20156877d92ec0e892a415edb752569';

  interval =  setInterval(function(){
    logUpdate(
      '\t\t\n' + chalk.rgb(253, 245, 13).bold('Loading for data') + spinner()
    )
  }, 50)

  http.get(`http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}`, option, (res) => {
    if(res.statusCode != 200) {
      console.log(res.statusCode);
      clearInterval(interval);
    } else {
      var resData = '';
      res.on('data', (data) => {
        resData += data;
      })
      res.on('end', () => {
        resData = JSON.parse(resData);
        clearInterval(interval);
        displayInfo(resData);
      })
    }
  })
}

// displayInfo function for only console the information
function displayInfo(data) {
  console.log(chalk.rgb(0, 0, 255).bold('Your Place name : ') + chalk.rgb(220, 23, 207).bold(data.name) + '\n');
  console.log(chalk.rgb(0, 0, 255).bold('Weather : ') + chalk.rgb(220, 23, 207).bold(data.weather[0].description) +'\n');
  console.log(chalk.rgb(0, 0, 255).bold('Temp: ') + chalk.rgb(220, 23, 207).bold(parseInt(data.main.temp - 273.15)+ ' C') +'\n');
  console.log(chalk.rgb(0, 0, 255).bold('Min Tamp : ') + chalk.rgb(220, 23, 207).bold(parseInt(data.main.temp_min - 273.15) + ' C') + ' \n');
  console.log(chalk.rgb(0, 0, 255).bold('Max Temp : ') + chalk.rgb(220, 23, 207).bold(parseInt(data.main.temp_max - 273.15) + ' C') + '\n');
}

// here take input from user using readline.question
readline.question(chalk.rgb(66, 244, 116).bold('\n\n Enter your palce name : '), (placeName) => {

  fetchWeather(placeName);
  readline.close();
})