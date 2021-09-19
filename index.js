//Sends the user's text to API
async function getSentiment(text){
    const data ={
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json" },
            body: JSON.stringify({ "text": text })
    }
    const response = await fetch(`https://sentim-api.herokuapp.com/api/v1/`,data)
    const answer = await response.json()

    // console.log(answer.result)
    return answer.result
}

//Get input from textarea
async function getInput(){
    const text = document.getElementById("text-input").value
    return await getSentiment(text)
}

//Creates an element
function createElement(tagName, children = []){
    const element = document.createElement(tagName)

    for (const child of children) {
        element.append(child)
    }
    return element
}

//Creates and update a result element and append it to the DOM
async function createResultElement(){
    const { polarity, type } = await getInput()
    const resultDiv = document.getElementById("result")

    const polarityElement = createElement("div", ["Polarity: ", polarity])
    const typeElement = createElement("div", ["Type: ", type])
    const result = createElement("div",[ polarityElement, typeElement ])

    switch (type) {
        case "positive":
            result.classList.add("positive")
            break;
        case "negative":
            result.classList.add("negative")
            break;
        case "neutral":
            result.classList.add("neutral")
            break;
    }
    if(!resultDiv.firstChild){
        resultDiv.append(result)
    }
    else{
        resultDiv.removeChild(resultDiv.firstChild)
        resultDiv.append(result)
    }
}

//Adds event listener to the button
document.getElementById("analyze-button").addEventListener("click", createResultElement)