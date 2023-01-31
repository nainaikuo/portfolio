const workUrl = "https://script.google.com/macros/s/AKfycbyL2fxu_Fc3FkxFYO9r_x-q-ot02UoiWju9PL1sJJFwr19PwooXYfrnm1FXD8ovmaKY/exec"

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
        console.log(workData)
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

        workListContent +=` <div class="work" data-name="${i.title}" data-id="${i.id}" data-description="${i.work_description}">
        <div class="img"><img src="${i.mainpic_url}" alt=""></div>
        <div class="work-title"><h4>${i.title}</h4></div>
        <div class="work-type"><p>${i.type}</p></div>
    </div>`


    })



    workList.innerHTML=workListContent
}


const work = document.querySelector(".js-works")


work.addEventListener("click",renderWorkDetail)

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
        <h4>${i.title} / ${i.type}</h4>
        <p>${i.description}</p>
    </div>
    <div class="work-photo">
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner js-work-detail-pics">
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
    </div> `

    })
    work.classList.add("hide")
    workDetail.innerHTML=workDetailContent
    workDetail.classList.add("show")
    window.scrollTo({
        top: 1080,
        behavior: "smooth"
    });

const workPicsArea = document.querySelector(".js-work-detail-pics")

const nowWorkPics = nowWorkData[0].pic
let workPicsContent =""
nowWorkPics.forEach((pic,index)=>{
    if(index===0){
        workPicsContent+=
        `
        <div class="carousel-item active">
                        <img src="${pic.url}" class="d-block w-100" alt="${pic.des}">
        </div>
        `

    }else{
        // console.log(i)
        if(pic.url===undefined){
            return
        }
        workPicsContent+=
        `
        <div class="carousel-item">
                        <img src="${pic.url}" class="d-block w-100" alt="${pic.des}">
        </div>
        `
    }

})
workPicsArea.innerHTML=workPicsContent
const otherWorkArea = document.querySelector(".other-works")
const otherWork = document.querySelector(".other-works .content .works-container")

let otherWorkContent="";

workData.forEach(i=>{   
    
    otherWorkContent+=`
    <div class="work">
    <img data-id="${i.id}"src="${i.mainpic_url}" alt="">
    <div class="title">${i.title}</div>
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
