const workUrl = "https://script.google.com/macros/s/AKfycbxBDDUbfQcJHj5u5U_mKUrisq0_vMWQgN03DNpDoVlw-dHB9-oa4DBD4_7Zm_qS6p0h/exec"

let workData ;

init()

function init(){
    nameSet()
    getWorkData()
}



function nameSet(){
    const englishName = "NAI HSUNAN KUO"
    const name = "郭乃萱"
    const year = new Date().getFullYear()
    const rights = document.querySelector(".js-rights")
    rights.innerHTML=` ©
    <span class="year js-year">${year}</span>
    <span class="name js-name">${englishName}</span>`

}

function getWorkData(){
    axios.get(workUrl)
    .then(res => {
        workData = res.data;
        renderWrok(workData)
    })
    .catch(err => {
        console.error(err); 
    })
}

function renderWrok(data){
    const workList = document.querySelector(".js-worklist")
    let workListContent="";
    data.forEach(i=>{
        // console.log(i)
        workListContent +=` <div class="work ">
        <div class="img"><a href="${i.id}"><img src="${i.work_pic}" alt=""></a></div>
        <div class="work-title"><h4>${i.work_title}</h4></div>
        <div class="work-type"><p>${i.work_type}</p></div>
    </div>`

    // console.log(workListContent)
    })

    // console.log(workListContent)

    workList.innerHTML=workListContent
}


