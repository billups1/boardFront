
document.querySelector("#writeBtn").on("click", () =>{
    let postTitle = document.querySelector("#postTitle").value;
    let postContent = document.querySelector("#postContent").innerText;
    let postWiterName = document.querySelector("#postWiterName").innerText;
    let postWiterPassword = document.querySelector("#postWiterPassword").innerText;

    if (postTitle.trim() == "" || postContent.trim() == "") {
        alert("제목 또는 게시글을 입력하세요.");
        return;
    }

    if (postTitle.trim() == "" || postContent.trim() == "") {
        alert("제목 또는 게시글을 입력하세요.");
        return;
    }

    let data = {
        "postTitle" : postTitle,
        "postContent" : postContent,
        "postWiterName" : postWiterName,
        "postWiterPassword" : postWiterPassword
    }

    $.ajax({
        url: "/api/board/post",
        type: "POST",
        data: data,
        dataType: "json"
    }).done(res => {
        console.log("게시글 등록 성공", res);
        location.replace('/board');
    }).fail(error => {
        console.log("게시글 등록 실패", error);
    });

})

document.querySelector("#cancelBtn").on("click", () =>{
    location.replace('/board');
})