//variables of elements in the page
const textPlace = document.getElementById("textarea")
const submitButton = document.getElementById("button")
const resultSpan = document.getElementById("span")
const loadingElement = document.getElementById("loading")
const statusPost = document.getElementById("status-image")

//this function is the handle function for the page. 
//this function send post request to an API url to get information from the API.
//after the function gets the information it activate functions to change the DOM elements.
async function getInfoFromApi(event){
        statusPost.src =""
        resultSpan.textContent=""
        let textForApi = textPlace.value
        loadingElement.hidden = false; 
        let response =await fetch ("https://sentim-api.herokuapp.com/api/v1/",{
            method : "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({text : textForApi})
        })
        let status=response.status
        addCatStatusToPage(status)
        loadingElement.hidden = true;
        if (response.ok){
            let resultOfPost = await response.json(); 
            resultOfPost=resultOfPost.result;
            console.log(resultOfPost)
            changeDOM(resultOfPost)
        }
    }
//this function get result => {polarity : , type:} and change the Dom elements to show it to the user
function changeDOM(result){
    resultSpan.textContent = "Polarity:" + JSON.stringify(result.polarity)+" Type:"+ JSON.stringify(result.type);
    if (result.polarity > 0){
            resultSpan.style.color = "green"
    }else if (result.polarity < 0){
            resultSpan.style.color = "red"
            }
} 
//this function change the url src of an image to show an image that tell us the post request status
function addCatStatusToPage(status){
    statusPost.src = `https://http.cat/${status}.jpg`
}   

//add eventListener to make the page works
submitButton.addEventListener("click", getInfoFromApi)

