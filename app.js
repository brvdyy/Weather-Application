$(document).ready(function() {

    //SIMPLE TITLECASE FUNCITON
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    let submitLocation = function() {
            const submitButton = $('#submitButton');
            const apiKey = '65d13f67e21ebcb62d7216fc63eaad79';
            let searchBarValue = $('#searchBar').val();;
            let currentWeather = {};

            //CLEARS ERROR MESSAGE, WEATHER/LOCATION INFO, AND WEATHER OBJECT
            $('#error, #weatherInfo, #locationText, #temperature').empty();
            currentWeather = {};

            if (searchBarValue != '') {
                //AJAX REQUEST FOR WEATHER DATA
                $.ajax({
                    url: 'http://api.openweathermap.org/data/2.5/weather?q=' + searchBarValue + '&units=imperial&APPID=' + apiKey,
                    type: 'GET',
                    dataType: 'jsonp',
                    //ON SUCCESS THE DATA IS STORED IN AN OBJECT
                    success: function(data) {
                        currentWeather = {
                            'main': {
                                'humidity': data.main.humidity,
                                'temp': data.main.temp,
                                'temp_min': data.main.temp_min,
                                'temp_max': data.main.temp_max
                            },
                            'wind': {
                                'speed': data.wind.speed
                            },
                            'weather': {
                                'description': data.weather[0].description
                            }
                        }

                        //INJECTING WEATHER INFO INTO THE DOM
                        $('#locationText').html('Showing weather for: ' + toTitleCase(searchBarValue));
                        $('#temperature').html(Math.round(currentWeather.main.temp) + '	&#176');

                        $('<li>Temperature High: ' + Math.round(currentWeather.main.temp_max) + ' &#176</li>').addClass('list-group-item').appendTo('#weatherInfo');
                        $('<li>Temperature Low: ' + Math.round(currentWeather.main.temp_min) + ' &#176</li>').addClass('list-group-item').appendTo('#weatherInfo');
                        $('<li>Humidity: ' + currentWeather.main.humidity + ' %</li>').addClass('list-group-item').appendTo('#weatherInfo');
                        $('<li>Wind Speed: ' + currentWeather.wind.speed + ' mph</li>').addClass('list-group-item').appendTo('#weatherInfo');
                    },

                    //IF AN ERROR IS THROWN, THE DOM IS MODIFIED TO SHOW AN ERROR MESSAGE
                    error: function() {
                        $('#error').html('Error: API Request Failed.');
                    }
                });

            } else {
                //SEND ERROR MESSAGE TO DOM SAYING TEXT CANT BE EMPTY
                $('#error').html('Field cannot be empty! Please enter a city.');
            }

            //RESETS THE VALUE OF SEARCHBAR
            searchBar.value = '';

            //KEEPS THE PAGE FROM BEING REFRESHED ON SUBMIT
            event.preventDefault();
        }
        //RUNS SUBMITLOCATION FUNCTION ABOVE WHEN SEARCH BUTTON IS CLICKED
    submitButton.onclick = submitLocation;
});