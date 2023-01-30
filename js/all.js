const workUrl = "https://script.google.com/macros/s/AKfycbz-W7lFHAkAFpReiwmAn_bC1Ohsh_zFKMLuHezts1GeVCsGWlmvv2DDVa0FHiGUiU_R/exec"

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

        workListContent +=` <div class="work" data-name="${i.work_title}" data-id="${i.id}" data-description="${i.work_description}">
        <div class="img"><img src="${i.work_mainpic_url}" alt=""></div>
        <div class="work-title"><h4>${i.work_title}</h4></div>
        <div class="work-type"><p>${i.work_type}</p></div>
    </div>`


    })



    workList.innerHTML=workListContent
}


const work = document.querySelector(".js-works")


// work.addEventListener("click",renderWorkDetail)

function renderWorkDetail(e){
    // 找出按的是哪個作品
    const workId= e.target.dataset.id
    // 如沒按到作品則不執行
    if(!workId){return}
    // 取得全部作品資料
    axios.get(workUrl)
    .then(res => {
        const workData = res.data
    })
        // 篩選出按到作品的資料
        const nowWorkData = workData.filter(i=> i.id == workId)
    // 選到作品詳細資料div
    const workDetail = document.querySelector(".js-work-detail")

    // 先為作品詳細資料宣告一個空字串用來放HTML
    let workDetailContent="";
    // 用篩選出的作品資料跑forEach?
    nowWorkData.forEach(i=>{

        workDetailContent+=`<div class="title">
        <h4>${i.work_title} / ${i.work_type}</h4>
        <p>${i.work_description}</p>
    </div>
    <div class="work-photo">
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="img/${i.id}-01.png" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="img/${i.id}-02.png" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="img/${i.id}-03.png" class="d-block w-100" alt="...">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
    </div> 
    <div class="des">
        <p>${i.work_description}</p>
    </div>`

    })
    work.classList.add("hide")
    workDetail.innerHTML=workDetailContent
    workDetail.classList.add("show")
    window.scrollTo({
        top: 1080,
        behavior: "smooth"
    });

const otherWorkArea = document.querySelector(".other-works")
const otherWork = document.querySelector(".other-works .content .works-container")

let otherWorkContent="";

workData.forEach(i=>{   
    
    otherWorkContent+=`
    <div class="work">
    <img data-id="${i.id}"src="img/${i.id} (1).png" alt="">
    <div class="title">${i.work_title}</div>
    </div>
    `
})

otherWork.innerHTML=otherWorkContent
otherWorkArea.classList.add("show")
if(workData.length<5){
    const btn = document.querySelectorAll(".other-works .content .btn")

    btn.forEach(i=>{
        i.classList.add("hide")
    })

}

}
    

const otherWorks = document.querySelector(".other-works")

otherWorks.addEventListener("click",function(e){
    if(e.target.nodeName==="IMG"){
        renderWorkDetail(e)
    window.scrollTo({
        top: 1080,
        behavior: "smooth"
    });
    }
    else{
        const otherWork = document.querySelector(".other-works .content .works-container")
        if(e.target.classList.contains("next")){
            
            otherWork.scrollLeft += 216;
        }else{
            otherWork.scrollLeft -= 216;
        }
    }
    
})
