const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

function init() {
    fetch("./data/data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    renderActivity(result.activity)
    renderPolicy(result.policy)
  });
  }

  function renderActivity (data){
    renderActivityImg(data)
    renderActivityText(data)
  }

 function renderActivityImg(data){

    let actImgAreacontent = ""
    data.forEach(act=>{
        actImgAreacontent+=
        `
        <img src="${act.img}" data-actid="${act.id}" alt="${act.title}">
        `
    })
    const actImgArea = document.querySelector(".js-act-imgs")
    actImgArea.innerHTML = actImgAreacontent
    observerActivityImg()
 }

 function renderActivityText(data){
    let actTextAreaContent = ""
    data.forEach(act=>{
        actTextAreaContent+=
        `
        <div class="item" data-actid=${act.id}>
        <div class="icon">
            <img src="img/paw.png" alt="">
        </div>
        <div class="text">
            <h4 class="date">${act.date}</h4>
        <p class="act-title">${act.title}</p>
        <p class="text-content">${act.description}</p>
    </div>
    </div>
        `
    })
    const actTextArea = document.querySelector(".js-act-text")
    actTextArea.innerHTML = actTextAreaContent
 }

 init()

 function observerActivityImg() {
    let option={
        root:document.querySelector("js-act-imgs"),
        threshold:1
    }
    const actImgObserver = new IntersectionObserver ((entries)=>{
        entries.forEach(entry=>{
            const currentid = entry.target.dataset.actid
            const currentText = document.querySelector(`.js-act-text>.item[data-actid=${currentid}]`)
            if(entry.isIntersecting){
                currentText.classList.add("select")
            }else if(!entry.isIntersecting){
                currentText.classList.remove("select")
            }
            
        })
     },option)
    
     const actImgs = document.querySelectorAll(".js-act-imgs>img")
    actImgs.forEach(img=>{
        actImgObserver.observe(img)
    })
   }

 function renderPolicyText(data,id){
    const policyTextArea = document.querySelector(".js-policy-text-area")
    const num = data.findIndex(i=>i.id===id)
    const nowSelectedPolicy = data.filter(policy=>policy.id===id)[0]
    let policyImgAreaContentUlContent=""
    nowSelectedPolicy.content.forEach((i,index)=>{
        policyImgAreaContentUlContent+=
        `
        <li>
                                <h5>0${index+1} ${i.title}</h5>
                                <p>${i.description}</p>
                            </li>
        `
        
    
    })
    let policyTextAreaContent = `
    <div class="num">No.${num+1}</div>
    <div class="header">
    
    <h3 class="policy-title">政策 No. 0<span class="no-id">.${num+1}</span></h3>
    <h4 class="subtitle">${nowSelectedPolicy.title}</h4>
</div>
<div class="policy-text-content">
    <ul class="policy-list ">
     ${policyImgAreaContentUlContent}   
    </ul>
</div>`
    
    policyTextArea.innerHTML = policyTextAreaContent
    policyTextArea.classList.add("display")
 }

 function renderPolicy(data) {
    let policyImgAreaContent="";
    data.forEach(policy=>{
        policyImgAreaContent+=
        `
        <img src="${policy.img}" alt="${policy.title}" data-polid="${policy.id}">
        `
    })
    const policyImgArea = document.querySelector(".js-policy-img-area")
    policyImgArea.innerHTML = policyImgAreaContent
    observerPolicyImg(data)
   }

function observerPolicyImg(data){
    let option={
        root:document.querySelector("js-policy-imgs"),
        threshold:0.5
    }    
    const observer = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const nowId = entry.target.dataset.polid
                renderPolicyText(data,nowId)
                entry.target.classList.add("select")
            }else if(!entry.isIntersecting){
                entry.target.classList.remove("select")
            }
        })
    },option)

    const poliyImgs = document.querySelectorAll(".js-policy-img-area>img")
    poliyImgs.forEach(img=>{
        observer.observe(img)
    })
}