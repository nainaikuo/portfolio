

function init() {
    fetch("./data/activity.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    renderActivity(result)
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
    observerImg()
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
        <p class="title">${act.title}</p>
        <p class="text-content">${act.description}</p>
    </div>
    </div>
        `
    })
    const actTextArea = document.querySelector(".js-act-text")
    actTextArea.innerHTML = actTextAreaContent
 }

 init()

 function observerImg() {
    let option={
        root:document.querySelector("js-act-imgs")
    }
    const actImgObserver = new IntersectionObserver ((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                console.log(entry.target.dataset.actid)
            }
            
        })
     },option)
    
     const actImgs = document.querySelectorAll(".js-act-imgs>img")
    actImgs.forEach(img=>{
        actImgObserver.observe(img)
    })
   }

 