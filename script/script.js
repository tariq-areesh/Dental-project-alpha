let html = document.querySelector("html")
let menuContainer = document.querySelector(".container");
let menu = document.querySelector(".container .menu");



var jsonNum;
const caseNamesArray = ["Enamel infraction case", "Uncomplicated crown fracture (enamel- only fracture)",
 "Uncomplicated crown fracture (enamel- dentin fracture)", "Complicated crown fracture (enamel-dentin fracture with pulp exposure",
  "Uncomplicated crown – root fracture (without pulp exposure)", "complicated crown – root fracture (with pulp exposure)",
   "ROOT FRACTURE", "Intrusion case", "Lateral laxation", "Extrusion case", "Alveolar bone fracture", "Concussion case", "Subluxation case"];
for(i = 1;i<=14;i++) {
    if(i<=13){
        let buttonDiv = document.createElement("div");
        buttonDiv.className = 'menuButton';
    
        let button = document.createElement("button");
        button.className = 'caseButtons'
        button.id = `caseButton${i}`
        button.textContent = caseNamesArray[i-1];
        buttonDiv.appendChild(button);
        menuContainer.appendChild(buttonDiv);
        button.onclick = function () {
            isNotRandom = true;
            isRandom = false;
            if(button.id === "caseButton1") jsonNum = 1; if(button.id === "caseButton2") jsonNum = 2; if(button.id === "caseButton3") jsonNum = 3;
            if(button.id === "caseButton4") jsonNum = 4; if(button.id === "caseButton5") jsonNum = 5; if(button.id === "caseButton6") jsonNum = 6;
            if(button.id === "caseButton7") jsonNum = 7; if(button.id === "caseButton8") jsonNum = 8; if(button.id === "caseButton9") jsonNum = 9;
            if(button.id === "caseButton10") jsonNum = 10; if(button.id === "caseButton11") jsonNum = 11; if(button.id === "caseButton12") jsonNum = 12;
            if(button.id === "caseButton13") jsonNum = 13;
            html.remove();
            quizContainer();
            
        }
    }
    else {
        let buttonDiv = document.createElement("div");
        buttonDiv.className = 'menuButton';
    
        let button = document.createElement("button");
        button.className = 'randomCaseButton';
        button.id = 'randomCaseButton';
        button.textContent = "random case";
        buttonDiv.appendChild(button);
        menuContainer.appendChild(buttonDiv);

        button.onclick = function () {
            isRandom = true;
            isNotRandom = false;
            html.remove();
            quizContainer();
        }
    }
}


function quizContainer() {
    document.write('<html lang="en">');
    document.write('<head>');
    document.write('    <meta charset="UTF-8">');
    document.write('    <meta http-equiv="X-UA-Compatible" content="IE=edge">');
    document.write('    <meta name="viewport" content="width=device-width, initial-scale=1.0">');
    document.write('    <title>quiz</title> <link rel="stylesheet" href="style\\style.css">');
    document.write('</head>');
    document.write('<body>');
    document.write('    <div class="quiz-con">');
    document.write('        <a href="index.html"><img src="images\\Uly8Vjpr_400x400.jpg" alt="a" width="100" id="logo"></a>');
    document.write('        <div class="quiz-info">');
    document.write('            <div class="count">Steps Count: <span></span></div>');
    document.write('        </div>');
    document.write('        <div class="quiz-area">');
    document.write('            <div id="images"></div>');
    document.write('            ');
    document.write('        </div>');
    document.write('        <div class="answer-area">');
    document.write('            ');
    document.write('        </div>');
    document.write('        <button id="back-button" >Back</button>');
    document.write('        <button id="submit-button" >Next</button>');
    document.write('        <div class =\'step\'></div>');
    document.write('    <button class="shuffle-button">shuffle</button>');
    document.write('    </div>');
    document.write('    ');
    document.write('</body>');
    document.write('</html>');
    quizApp();

}

function quizApp () {
    let countSpan = document.querySelector(".quiz-info .count span");
    let quizArea = document.querySelector(".quiz-area");
    let answerArea = document.querySelector(".answer-area");
    let nextBackButtons = document.querySelector(".nextBack-buttons");
    let submitButton = document.querySelector("#submit-button");
    let backButton = document.querySelector("#back-button");
    let stepcounter = document.querySelector(".step");
    let categorySpan = document.querySelector(".category span");
    let shuffleButton = document.querySelector(".shuffle-button");

    
    if(isNotRandom) {
        shuffleButton.remove();
    }

    index = 0;
    let flag = 0;
    let randomArray = new Array(3);
    arrayIndex = 0;
    
    getJson();
    questions();

    function getJson() {
        if(isRandom){
            jsonNum = getRandom();
        }

        if(jsonNum === 1) jsonFile = "json_files/questions.json";
        else if(jsonNum === 2) jsonFile = "json_files/questions2.json";
        else if(jsonNum === 3) jsonFile = "json_files/questions3.json";
        else if(jsonNum === 4) jsonFile = "json_files/questions4.json";
        else if(jsonNum === 5) jsonFile = "json_files/questions5.json";
        else if(jsonNum === 6) jsonFile = "json_files/questions6.json";
        else if(jsonNum === 7) jsonFile = "json_files/questions7.json";
        else if(jsonNum === 8) jsonFile = "json_files/questions8.json";
        else if(jsonNum === 9) jsonFile = "json_files/questions9.json";
        else if(jsonNum === 10) jsonFile = "json_files/questions10.json";
        else if(jsonNum === 11) jsonFile = "json_files/questions11.json";
        else if(jsonNum === 12) jsonFile = "json_files/questions12.json";
        else if(jsonNum === 13) jsonFile = "json_files/questions13.json";
    
    }


    function questions() {
        let request = new XMLHttpRequest();
    
        request.onreadystatechange = function () {
            if(this.readyState === 4 && this.status === 200){
                let questionsObj = JSON.parse(this.responseText)
                
                let stepsCount = questionsObj.length;
                
                stepsNumber(stepsCount, questionsObj[stepsCount-1]);

                insertData(questionsObj[index], stepsCount, questionsObj[stepsCount-1]);

                submitButton.onclick = function () {
                    let correctAnswer = questionsObj[index].rightAnswer;
                
                    flag = check(correctAnswer, stepsCount, questionsObj[index], flag);
                    if(flag === 1) {
                        flag = 0;
                        index++;
                        quizArea.innerHTML = " ";
                        answerArea.innerHTML = " ";
                        stepcounter.innerHTML = " ";
                        insertData(questionsObj[index], stepsCount, questionsObj[stepsCount-1]);
                    
                    }
                    donePage(stepsCount);
                };
                
                backButton.onclick = function () {
                    index--;
                    quizArea.innerHTML = " ";
                    answerArea.innerHTML = " ";
                    stepcounter.innerHTML = " ";
                    insertData(questionsObj[index], stepsCount);
                };
            
            }
        };
    
        request.open("GET", jsonFile, true);
        request.send();
    }

    

    function stepsNumber(number, object) {
        if("image" in object) {
            countSpan.innerHTML = number - 1;
        }
        else{
            countSpan.innerHTML = number;
        }
    }
    function insertData(object, count, checkImage) {
        if((index === count-1) && ("image" in object)) {
            backButton.style.visibility = "hidden";
            let image = document.createElement("img");
            image.src = object['image'];
            image.id = "image";
            quizArea.appendChild(image);
            submitButton.onclick = function () {
                index++;
                donePage(count);
                image.remove();
            };

        }

        else if (index < count) {
            if("title" in object) {
                let stepTitle = document.createElement("h3");
                let stepText = document.createTextNode(object['title']);
                stepTitle.appendChild(stepText);
                quizArea.appendChild(stepTitle);
            }
            
    
            let stepQuestion = document.createElement("h2");
            let questionText = document.createTextNode(object['question'])
            stepQuestion.id = "questionText";
            stepQuestion.appendChild(questionText);
            quizArea.appendChild(stepQuestion);

            for(let i = 1; i<=3;i++){
                let answerDiv = document.createElement("div");
                answerDiv.className = 'answer';
    
                let input = document.createElement("input");
                input.name = 'question';
                input.type = 'radio';
                input.id = `answer${i}`;
                input.dataset.answer = object[`answer${i}`];
            
                if(i === 1) input.checked = true;
            
    
                let label = document.createElement("label");
                label.htmlFor = `answer${i}`;
                let labelText = document.createTextNode(object[`answer${i}`]);
                label.appendChild(labelText);
    
                answerDiv.append(input);
                answerDiv.append(label);
    
                answerArea.append(answerDiv);
            }
            if(index === 0) {
               document.getElementById("back-button").style.visibility = "hidden";
            }
            else {
                document.getElementById("back-button").style.visibility = "visible";
            }
            
            if("image" in checkImage) {
                let stepcounterText = document.createTextNode(`${index + 1} out of ${count-1} steps`);
                stepcounter.appendChild(stepcounterText);
            }
            else {
                let stepcounterText = document.createTextNode(`${index + 1} out of ${count} steps`);
                stepcounter.appendChild(stepcounterText);
            }
            
        }
        
    
    }
    

    function check(correctAnswer, count, object, flag) {
        let answers = document.getElementsByName("question");
        let choosenAnswer;
        let answerIndex;
        for (let i = 0; i< answers.length; i++) {

            if (answers[i].checked) {
                choosenAnswer = answers[i].dataset.answer;
                answerIndex = i;
            }
        }
        if(choosenAnswer === correctAnswer) {
            if("correctAnswerMessage" in object) {
                alert(object['correctAnswerMessage']);
            }
            flag = 1;
            return flag;
        }
        else if (choosenAnswer != correctAnswer && answerIndex === 0) alert(object['wrongAnswer1']);

        else if (choosenAnswer != correctAnswer && answerIndex === 1) alert(object['wrongAnswer2']);
 
        else if (choosenAnswer != correctAnswer && answerIndex === 2) alert(object['wrongAnswer3']);
        
    }

    shuffleButton.onclick = function () {
        getJson();
        index = 0;
        quizArea.innerHTML = " ";
        answerArea.innerHTML = " ";
        stepcounter.innerHTML = " ";
        countSpan.innerHTML = " ";
        questions();
    }
    function donePage(stepsCount) {
        if(index === stepsCount) {
            if(isRandom) shuffleButton.remove();
            backButton.remove();
            submitButton.remove();
            let finishText = document.createElement('h1');
            let text = document.createTextNode("Done! \n please click the icon above to go back");
            finishText.id = 'finish-text';
            finishText.appendChild(text);
            quizArea.append(finishText);

            
        
        
        }
    }

    function getRandom() {
        var random;
        if(arrayIndex !=3) {
            while(true) {
                random = Math.floor((Math.random()*3)+1);
                if(randomArray.includes(random)) 
                    continue;
                else {
                    randomArray[arrayIndex] = random;
                    arrayIndex++;
                    return random;
                }
            }
        }
        else {
            arrayIndex = 0;
            randomArray = [];
            
        }
    }
}




