
// 페이지네이션
function pagination(data) {
    var paginationHtml = `
    <nav aria-label="...">
            <ul class="pagination pagination-sm">
`
    var nowPageFirstNumber = data.pageable.pageNumber - (data.pageable.pageNumber % 10) + 1;
    var nowPageLastNumber = data.totalPages < nowPageFirstNumber + 9 ? data.totalPages : nowPageFirstNumber + 9;

    //    1페이지면 없음
    if (data.pageable.pageNumber > 9) {
        paginationHtml += `<li class="page-item disabled">`
        paginationHtml += `</li>`
    }

    //    현재 클릭한 페이지 active 주기
    //    마지막인지 체크해서 마지막이면 해당 숫자까지만 보이게
    //    10페이지씩 보이게
    for (var i = nowPageFirstNumber; i <= nowPageLastNumber; i++) {
        if (data.pageable.pageNumber + 1 == i) {
            paginationHtml += `
            <li class="page-item active" aria-current="page">
              <a class="page-link" href="#">${i}</a>
            </li>
        `
        } else {
            paginationHtml += `<li class="page-item"><a class="page-link" href="#" onclick="getList(${i - 1})">${i}</a></li>`
        }
    }

    // 현재페이지 마지막숫자보다 토탈페이지수가 높으면 Next 버튼 출력
    if (nowPageLastNumber < data.totalPages) {
        paginationHtml += `<li class="page-item">`
        paginationHtml += `<a class="page-link" href="#" onclick="getList(${nowPageLastNumber})">Next</a>`
        paginationHtml += `</li>`
    }

    paginationHtml += `</ul>
                </nav>`;

    $('#boardPagenation').empty();
    $('#boardPagenation').append(paginationHtml);

}


function getLessonList(page) {
    console.log("page", page);
    // var adminLessonSearchCond = getSearchCond();

    $.ajax({
        url: `/api/list?page=${page}`,
        // data: adminLessonSearchCond,
        dataType: "json"
    }).done(res => {
        console.log("게시판 리스트 조회 성공", res);
        $('#boardTbodyData').empty();
        res.data.content.forEach((dto) => {
            boardTbodyData = `
                <tr onclick="location.href = '/api/list/${dto.id}'">
                  <td>${dto.id}</td>
                  <td>${dto.title}</td>
                  <td>${dto.createDate}</td>
                  <td>${dto.writer}</td>
                  <td>${dto.views}</td>
                </tr>
            `
            $('#boardTbodyData').append(lessonTableData);
        });

        pagination(res.data);

    }).fail(error => {
        console.log("게시판 리스트 조회 실패", error);
    });
}