if (!localStorage.getItem('data')) {
    localStorage.setItem('data', `[]`)
}

chrome.extension.onMessage.addListener(
    function (request) {
        switch(request.type) {
            case 'save_new_word':
                let data = JSON.parse(request.data)
                saveNewWord(data)
                break;
            case 'get_word':
                console.log(request)
                break;
        }
});

function saveNewWord(data) {
    let datas = JSON.parse(localStorage.getItem('data'));
    datas.push(data);
    localStorage.setItem('data', JSON.stringify(datas))
}