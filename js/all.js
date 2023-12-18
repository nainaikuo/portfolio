const workDataUrl = "https://nainaikuo.com/data/works.json"
const personalDataUrl = "https://nainaikuo.com/data/personal-data.json"
const tags = document.querySelector(".js-total-tags-area")
const fadeInBlock = [...document.querySelectorAll(".fade-in")]

function fadeIn() {
  fadeInBlock.forEach((i, index) => {
      setTimeout(() => {
          i.classList.remove("fade-in")
      }, index * 90)


  })
}

function showHide() {
  const hides = [...document.querySelectorAll(".hide")]
  hides.forEach((i, index) => {
      setTimeout(() => {
          i.classList.remove("hide")
      }, index * 30)

  })

}

function init(){
    renderinit()
    nameSet()
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

function renderinit(){
    fetch(workDataUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (res) {
    const workData = res;
    renderTags(workData)
    renderWorks(workData)
  });

  fetch(personalDataUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (res) {
    const personalData = res;
    renderPersonalData(personalData)
  });

}


function renderTags(data){

    let totalTags = []
    data.forEach(work=>{
        work.tags.forEach(tag=>{

            if(totalTags.indexOf(tag)===-1){
                totalTags.push(tag)
            }else{
                return
            }
            
        })    
    })

    let totalTagsContent = ""
    totalTags.forEach(tag=>{
        totalTagsContent+= `<div class="tag" id="${tag}">${tag}</div>`
    })
    const totalTagsArea = document.querySelector(".js-total-tags-area")
    totalTagsContent+=`<div class="reset" id="reset">RESET</div>`
    totalTagsArea.innerHTML=totalTagsContent
}

function renderWorks (data) {
    let workAreaContent=""
    data.forEach(work=>{
        const tags = work.tags
        let tagsContent =""

        tags.forEach(tag=>{
            tagsContent+=
            `<div class="tag"><p>${tag}</p></div>`
        })

        workAreaContent+=
        ` <div class="card hide" id="${work.title}" onclick="window.open('${work.link}','mywindow');">
        <div class="img"><img src="${work.pic}" alt=""></div>
        <div class="content">
          <h3 class="title">${work.title}</h3>
          <div class="tags">
            ${tagsContent}
          </div>
        </div>
      </div>`
    })



    const workArea = document.querySelector(".js-work-area")
    workArea.innerHTML=workAreaContent
    showHide()

  }
  
function renderFilterWorks(e){
  if(!e.target.id){
    return
  }
  // 移除未選中的tag樣式
  const tags = document.querySelectorAll(".js-total-tags-area>div")

  tags.forEach(tag=>{
    tag.classList.remove("select")
  })
  if(e.target.id==="reset"){
    console.log("RE")
    init()
    return
  }
  e.target.classList.toggle("select")

  const filtertag  = e.target.id;

    fetch(workDataUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (res) {
    const workData = res.filter(work=>work.tags.indexOf(filtertag)!==-1)

    renderWorks(workData)
    const y = document.querySelector("#work").getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top:y,
      behavior:"smooth"
    })
  });

    
}

function renderPersonalData(data){
  console.log(data)
}

tags.addEventListener("click",renderFilterWorks)
window.addEventListener("DOMContentLoaded", fadeIn)
init()