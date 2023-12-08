function Reroute(){
    window.open("https://www.editpad.org/tool/extract-text-from-image")
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
            else if(i === data.length - 1){
                dataArray.push(parseFloat(data.substring(index, i)))
            }
        }
    }
    else{
        for(let i = 0; i < data.length; i++){
            if(whitespace.has(data[i])){
                dataArray.push(parseInt(data.substring(index, i)))
                index = i
            }
            else if(i === data.length - 1){
                dataArray.push(parseFloat(data.substring(index, i)))
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
    let lastValue = parseFloat(document.getElementById("lastValue").value)
    if(isNaN(lastValue)){
        lastValue = dataArray[dataArray.length - 1]
    }
    let span = lastValue - firstValue
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
        if(i === dataArray.length - 1 || rightLimitArrayIndex === columnNumber - 1){
            frequency.push(dataArray.length - indexEnd)
            break
        }
        else if(dataArray[i] >= rightLimitArray[rightLimitArrayIndex]){
            rightLimitArrayIndex++
            frequency.push(i - indexEnd)
            indexEnd = i
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
    let realMedianPosition = parseInt(dataArray.length / 2)
    let medianIndex = 0
    let LowerFrequency = frequency[0]
    for(let i = 1; i < frequency.length; i++){
        if(LowerFrequency < realMedianPosition){
            LowerFrequency += frequency[i]
        }
        else{
            LowerFrequency -= frequency[i - 1]
            medianIndex = i - 1
            break
        }
    }
    let median = leftLimitArray[medianIndex] + (((dataArray.length / 2) - LowerFrequency) / frequency[medianIndex]) * (rightLimitArray[medianIndex] - leftLimitArray[medianIndex])
    document.write("<br> Trung vị là: ", median.toFixed(2))
    let firstHalfMedianPosition = parseInt(dataArray.length / 4)
    let firstHalfMedianIndex = 0
    let firstHalfLowerFrequency = frequency[0]
    for(let i = 1; i < frequency.length; i++){
        if(firstHalfLowerFrequency < firstHalfMedianPosition){
            firstHalfLowerFrequency += frequency[i]
        }
        else{
            firstHalfLowerFrequency -= frequency[i - 1]
            firstHalfMedianIndex = i - 1
            break
        }
    }
    let firstHalfMedian = leftLimitArray[firstHalfMedianIndex] + (((dataArray.length / 4) - firstHalfLowerFrequency) / frequency[firstHalfMedianIndex]) * (rightLimitArray[firstHalfMedianIndex] - leftLimitArray[firstHalfMedianIndex])
    document.write("<br> Tứ phân vị thứ nhất là: ", firstHalfMedian.toFixed(2))
    let secondHalfMedianPosition = parseInt(dataArray.length * 3 / 4)
    let secondHalfMedianIndex = 0
    let secondHalfLowerFrequency = frequency[0]
    for(let i = 1; i < frequency.length; i++){
        if(i === frequency.length - 1){
            secondHalfMedianIndex = frequency.length - 1
        }
        else if(secondHalfLowerFrequency < secondHalfMedianPosition){
            secondHalfLowerFrequency += frequency[i]
        }
        else{
            secondHalfLowerFrequency -= frequency[i - 1]
            secondHalfMedianIndex = i - 1
            break
        }
    }
    let secondHalfMedian = leftLimitArray[secondHalfMedianIndex] + (((dataArray.length * 3 / 4) - secondHalfLowerFrequency) / frequency[secondHalfMedianIndex]) * (rightLimitArray[secondHalfMedianIndex] - leftLimitArray[secondHalfMedianIndex])
    document.write("<br> Tứ phân vị thứ ba là: ", secondHalfMedian.toFixed(2))
}    
