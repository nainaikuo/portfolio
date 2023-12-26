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
    renderDonationProject(result.donation_project)
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
// 投票動畫
const introBlock = document.querySelector(".vote-box-wrap")

const introBlockObserver = new IntersectionObserver((entries)=>{
    
    const block=entries[0]
    const ticket = document.querySelector("img.vote")

    if(block.isIntersecting){
        console.log("IN") 
    ticket.style.transform="translateY(150%)"
    }else if(!block.isIntersecting){
        console.log("OUT")
        ticket.style.transform="translateY(-10%)"

    }
    // console.log(blocks)

},{
    threshold:0,
    rootMargin:"100px 0px -200px 0px"

})

introBlockObserver.observe(introBlock)

// 渲染捐款方案

function renderDonationProject(data){
    let donationProjectContent = ""
    data.forEach(pro=>{
        donationProjectContent+=
        `<div class="donation-card">
        <div class="card-header">
            <h4 class="title">「 ${pro.title} 」</h4>
            <p class="amount">捐款新台幣${pro.amount}元</p>
        </div>
        <div class="action">
            <button type="button" class="btn js-donate-btn" data-donate-id="${pro.id}" data-bs-toggle="modal" data-bs-target="#donation-pay">
                馬上支持
            </button>
            <p class="people">已有 ${pro.donate_num} 人贊助</p>
        </div>
    </div>`
    })
    const donationProjectArea = document.querySelector(".js-donation-project-area")
    donationProjectArea.innerHTML = donationProjectContent

}

const donation = document.querySelector(".js-donation")


donation.addEventListener("click",donate)

function donate(e){
    if(e.target.nodeName!=="BUTTON") return;
    
    const donateId  = e.target.dataset.donateId
    let nowDonateAmount=0
    let nowDonateName = ""
    if(donateId==="custom"){
        nowDonateName="自訂金額贊助"
        nowDonateAmount = document.querySelector(".js-custom-donate-amount").value;
        document.querySelector(".js-donate-project-amount").textContent=nowDonateAmount
        document.querySelector(".js-donate-project-name").textContent=nowDonateName
        document.querySelector(".js-total-donate-amount").textContent = nowDonateAmount
    }else{
        fetch("./data/data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    const nowDonationProject = result.donation_project.filter(i=>i.id===donateId)[0]
    nowDonateAmount= nowDonationProject.amount
    nowDonateName = nowDonationProject.title
    document.querySelector(".js-donate-project-amount").textContent=nowDonateAmount
    document.querySelector(".js-donate-project-name").textContent=nowDonateName
    document.querySelector(".js-total-donate-amount").textContent = nowDonateAmount
  });
  }




}
