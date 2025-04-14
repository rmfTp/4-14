



window.addEventListener("DOMContentLoaded", function() {

frmBoard.addEventListener("submit", function (e) {

    e.preventDefault();
    console.log("짠!");
    
    //작성자 닉네임
    var user = document.getElementById("user").value;

    //작성자 닉네임이 빈칸인 경우 annonymous로 자동 변환
    if (user==''){
        user='annonymous';
    }

    //내용
    const content = document.getElementById("content").value;

    //내용이 없는 경우 오류 메시지 출력
    if (content==''){
        alert("내용을 입력하세요.")
        return;
    }

    //작성 시각:가공버전
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const dateString = year + '-' + month  + '-' + day;


    const output = document.getElementById("schedule-item-#{seq}");
  
    //스레드로 입력하기
    const newItem = document.createElement("div");

    const text1 = document.createElement("div");
    text1.innerHTML = '<b>' + user + '</b>' + ' ' + dateString + '<br>';
    text2 = document.createTextNode(content);
  
    output.appendChild(newItem);
    newItem.appendChild(text1);
    newItem.appendChild(text2);

    frmBoard.user.value='';
    frmBoard.content.value='';

    //삭제 버튼
    const button = document.createElement("button");
    button.innerText="삭제"
    newItem.appendChild(button);

  });
})
