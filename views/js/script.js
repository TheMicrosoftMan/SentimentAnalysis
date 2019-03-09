let socket = io.connect();
let textarea = document.getElementById("textBox");
let ul = document.getElementById("resultList");
let startText = document.getElementById("startText");

textarea.value = "";

function sendText() {
    socket.emit('text', {
        text: textarea.value
    });
    textarea.value = "";
}

function toTextarea(e) {
    textarea.value = e.innerText;
}

socket.on("textStyle", function (data) {
    startText.remove();
    let st = (data.mark.score == 0) ? "😐" : ((data.mark.score > 0) ? "😄" : "😔");
    let li = document.createElement("li");
    let resultItem = document.createElement('div');
    resultItem.className = "result";
    resultItem.innerHTML = '<span id="sticker">' + st + '</span><div name="resultTextBox" id="resultTextBox" readonly>' + data.text + '</div>';
    li.appendChild(resultItem);
    ul.appendChild(li);

    ul.scrollTop = ul.scrollHeight;

});

function autosize() {
    setTimeout(function () {
        textarea.style.cssText = 'height:auto; padding:0';
        textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
    }, 0);
}