
const weatherAPIURL = "https://api.openweathermap.org"
const weatherAPIKEY = "b44ad4b318b4bcd11af0888ec80e8032"
let searchHistory = []

let searchInput = $("#search-input")
let searchForm = $("#search-form ");
let searchHistoryContainer = $("#history")

function rendersearchHistory(search){
    searchHistoryContainer.html("")

            for(let i = 0; i < searchHistory.length; i++){
                let btn = $("<button>");
                btn.attr("type", "button")
                btn.addClass("history-btn btn-history")

                btn.attr("data-search", searchHistory[i])
                btn.text(searchHistory[i]) 
                searchHistoryContainer.append(btn)
            }

}

function appendSearchHistory(){
    if(searchHistory.indexOf(search) !== -1){
        return
    }
    searchHistory.push(search);

    localStorage.setItem("search-history", JSON.stringify(searchHistory));
    rendersearchHistory()

}

funtion fetchWeather(location){
    console.log(location);

}

function fetchCoord(search){
    let queryURL = `${weatherAPIURL}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherAPIKEY}`;
    console.log(queryURL,)
    fetch(queryURL, {method: "GET"}).then(function(data){
        return data.json()

    }).then(function(response){
        if(!response[0]){
            alert("location not found")
        } else {
            appendSearchHistory(search)
            fetchWeather(response[0])

            

            
        }
    });

    
}

function initializeHistory(){
    let storedHistory = localStorage.getItem("search-history");

    if(storedHistory) {
        searchHistory JSON.parse(storedHistory);

    }

    rendersearchHistory()

}


function submitSearchForm(event){

    event.preventDefault();
    

    let search = searchInput.val().trim()

    fetchCoord(search);
    searchInput.val("");

}

initializeHistory()
searchForm.on("submit", submitSearchForm);








