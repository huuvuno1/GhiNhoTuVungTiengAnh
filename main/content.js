const frame_vu = document.createElement('div');
frame_vu.id = "frame_vu";
frame_vu.innerHTML = `
    <div id='vocabulary_vu'>Mean</div>
    <hr/>
    <div id='meaning_vu'>Nghĩa</div>
    <div id='close_vu'>x</div>
`
console.log("ok")
const body = document.querySelector('body');
body.appendChild(frame_vu);

const vocal = frame_vu.querySelector('#vocabulary_vu'); 
const meaning = frame_vu.querySelector('#meaning_vu'); 
const xClose = frame_vu.querySelector('#close_vu'); 

const addBtn = document.createElement('img');
addBtn.id = "addBtn"
addBtn.src = chrome.runtime.getURL('images/add-icon.png')

body.appendChild(addBtn)

xClose.addEventListener('click', () => {
    frame_vu.style.display = 'none'
});




setInterval(() => {
    //let num = getRandomInt(0, data.length);
    frame_vu.style.display = "block";

    chrome.extension.sendMessage({type: 'save_new_word'}, );

    setTimeout(() => {
        frame_vu.style.display = "none"
    }, 7000)
}, 15000)


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

document.querySelector('body').addEventListener('mouseup', (e) => {
    let text = window.getSelection().toString();
    if (text != '') {
        let x = e.pageX + 35;
        let y = e.pageY + 10;
        addBtn.style = `display: block; left: ${x}px; top: ${y}px;`;
        
    }
})
addBtn.addEventListener('click', () => {
    let text = window.getSelection().toString();
    if (text != '') {
        window.getSelection().empty();
        addBtn.style.display = 'none';
        addVocal(text)
    }
})

function addVocal(text) {
    
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        let result = JSON.parse(this.responseText);
        console.log(result)
        chrome.extension.sendMessage({
            type: 'save_new_word', 
            data: `{
                "vocabulary": "${result.sentences[0].orig}",
                "meaning": "${result.sentences[0].trans}"
            }`
        });
        
    }
    });

    xhr.open("GET", `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=vi&dt=t&dt=bd&dj=1&q=${text}`);
    xhr.send();
}