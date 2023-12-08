function Reroute(){
    window.open("https://www.imagetotext.info/")
}

function Main(){
    let data = document.getElementById("data").value
    let columnNumber = parseInt(document.getElementById("column").value)
    if(isNaN(columnNumber)){
        columnNumber = parseInt(5)
    }
    let isFloat
    let dataArray = []
    let whitespace = new Set([" ", "\t", "\n"]);
    if(data.includes(",")){
        isFloat = true
        data = data.replaceAll(",", ".")
    }
    else{
        isFloat = false
    }
    let index = 0
    if(isFloat){
        for(let i = 0; i < data.length; i++){
            if(whitespace.has(data[i])){
                dataArray.push(parseFloat(data.substring(index, i)))
                index = i
            }
        }
    }
    else{
        for(let i = 0; i < data.length; i++){
            if(whitespace.has(data[i])){
                dataArray.push(parseInt(data.substring(index, i)))
                index = i
            }
        }
    }
    dataArray.sort(function(a, b){
        return a - b;
    });
    let firstValue = parseFloat(document.getElementById("firstValue").value)
    if(isNaN(firstValue)){
        firstValue = dataArray[0]
    }
    if(Number.isInteger(dataArray.length / columnNumber)){
        let span = dataArray[dataArray.length - 1] - dataArray[0]
        let leftLimit = firstValue
        let temp = span / columnNumber
        let rightLimitArray = []
        let leftLimitArray = []
        for(let i = 0; i < columnNumber; i++){
            if(i != 0){
            leftLimit += parseFloat(temp.toFixed(1))
            }
            leftLimitArray.push(parseFloat(leftLimit.toFixed(1)))
            let rightLimit = leftLimit + temp
            rightLimitArray.push(parseFloat(rightLimit.toFixed(1)))
            document.write("[", leftLimit.toFixed(1), "; ", rightLimit.toFixed(1), ") ")
        }
        let rightLimitArrayIndex = 0
        let frequency = []
        let indexEnd = 0
        for(let i = 0; i < dataArray.length; i++){
            if(dataArray[i].toFixed(1) >= rightLimitArray[rightLimitArrayIndex].toFixed(1)){
                rightLimitArrayIndex++
                frequency.push(i - indexEnd)
                indexEnd = i
            }
            if(i === dataArray.length - 1){
                frequency.push(i + 1 - indexEnd)
            }
        }
        document.write("<br> Tần số lần lượt là: ",frequency.join("    "))
        let representative = []
        for(let i = 0; i < leftLimitArray.length; i++){
            let temp = (leftLimitArray[i] + rightLimitArray[i]) / 2
            representative.push(parseFloat(temp.toFixed(1)))
        }
        let average = 0
        for(let i = 0; i < representative.length; i++){
            average += representative[i] * frequency[i]
        }
        average = average / dataArray.length
        document.write("<br> Số trung bình là: ", average.toFixed(2))
        let highestFrequencyIndex = 0
        for(let i = 1; i < frequency.length; i++){
            if(frequency[i] > frequency[highestFrequencyIndex]){
                highestFrequencyIndex = i
            }
        }
        console.log(highestFrequencyIndex)
        let mode = 0
        if(highestFrequencyIndex === 0){
            mode = leftLimitArray[highestFrequencyIndex] + (frequency[highestFrequencyIndex]) / (2 * frequency[highestFrequencyIndex] - frequency[highestFrequencyIndex + 1]) * (rightLimitArray[highestFrequencyIndex] - leftLimitArray[highestFrequencyIndex])
        }
        else if(highestFrequencyIndex === frequency.length - 1){
            mode = leftLimitArray[highestFrequencyIndex] + (frequency[highestFrequencyIndex] - frequency[highestFrequencyIndex - 1]) / (2 * frequency[highestFrequencyIndex] - frequency[highestFrequencyIndex - 1]) * (rightLimitArray[highestFrequencyIndex] - leftLimitArray[highestFrequencyIndex]) 
        }
        else{
            mode = leftLimitArray[highestFrequencyIndex] + (frequency[highestFrequencyIndex] - frequency[highestFrequencyIndex - 1]) / (2 * frequency[highestFrequencyIndex] - frequency[highestFrequencyIndex - 1] - frequency[highestFrequencyIndex + 1]) * (rightLimitArray[highestFrequencyIndex] - leftLimitArray[highestFrequencyIndex])
        }
        document.write("<br> Mốt là: ", mode.toFixed(2))
    }    
    else{
        document.write(dataArray.length)
    }
    /*for(let i = 0; i < da.ttaArray.length; i++){
        document.write(dataArray[i], " ")
    }*/
}
//73,4 72,1 72,9 70,2 70,9 72,2 71,5 72,5 69,3 72,3 69,7 72,3 71,5 71,2 69,8 72,3 71,1 69,5 72,2 71,9 73.1 71,6 71,3 72,2 71,8 70,8 72,2 72.2 72,9 72,7 70,7
//4 2 7 12 5