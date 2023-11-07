const url="https://hexschool.github.io/js-filter-data/data.json"
let data;

axios.get(url)  
 .then(function(res){
  data=res.data.filter(i=>i.作物名稱)
})

const table=document.querySelector(".list table")

let showData=[]

// 渲染資料
function renderData(data){
  let str=""
  data.forEach((i,index)=>{
    let content=`<tr><td class="name bold">${i.作物名稱}</td>
          <td class="market bold">${i.市場名稱}</td>
          <td>${i.上價}</td>
          <td>${i.中價}2</td>
          <td>${i.下價}</td>
          <td>${i.平均價}</td>
          <td>${i.交易量}</td></tr>`
    str+=content
  })
  table.innerHTML=str
}

// 按鈕篩選功能

let category=""
const filter=document.querySelector(".filter")
const filterBtn=document.querySelectorAll(".filter button")

filter.addEventListener("click",filterCategory)

function filterCategory(e){
  if(e.target.nodeName=="BUTTON"){
    filterBtn.forEach(i=>{
    i.classList.remove("active")
    e.target.classList.add("active")
    })
    category=e.target.dataset.category
    showData=data.filter((i)=>{
      return i.種類代碼==category
    })
    renderData(showData)
  }else{
    return;
  }
  sortMessage.textContent=""
}


// 搜尋

const searchInput=document.querySelector("#search-input")
const searchBtn=document.querySelector(".searchBtn")
const sortMessage=document.querySelector(".sort-message")

searchBtn.addEventListener("click",search)
function search(e){
  showData=data.filter(i=>{
    return i.作物名稱.match(searchInput.value.trim())
  })
  if(showData.length==0){
    table.innerHTML=`<tr><td colspan="7" class="message">查詢不到當日的交易資訊QQ</td></tr>`
  }else if(searchInput.value.trim()==""){
    alert("請輸入作物名稱")
  }else{
    sortMessage.textContent=`查看「${searchInput.value.trim()}」比價結果`
    renderData(showData)
  }
  searchInput.value=""
  filterBtn.forEach(i=>{
    i.classList.remove("active")
  })
}

// 搜尋優化
searchInput.addEventListener("keyup",function(e){
  if(e.key=="Enter"){
    search(e)
  }
})

// 下拉式單排序
const select=document.querySelector(".sort select")

select.addEventListener("change",sortSelect)
function sortSelect(e){
  if(showData.length==0){
      alert("請先搜尋或選擇類別")
      sort.value="排序篩選"
      return;
  }
  switch(e.target.value){
      case "依上價排序":
      sortChange("上價")
      break;
      case "依中價排序":
      sortChange("中價")
      break;
      case "依下價排序":
      sortChange("下價")
      break;
      case "依平均價排序":
      sortChange("平均價");
      break;
      case "依交易量排序":
      sortChange("交易量");
      break;
  }
  function sortChange(value){
    showData.sort((a,b)=>{
      return a[value]-b[value]
    })
    renderData(showData)
  }
}

const tableHeader=document.querySelector(".table-header")

tableHeader.addEventListener("click",sortBtn)

function sortBtn(e){
 if(e.target.nodeName=="I"){
   if(showData.length==0){
      alert("請先搜尋或選擇類別")
      return;
    }
   select.value="排序篩選"
   let sort=e.target.dataset.sort
   if(e.target.classList.contains("up")){
     showData.sort((a,b)=>{
       return a[sort]-b[sort]
     })
     renderData(showData)
   }else{
     showData.sort((a,b)=>{
       return b[sort]-a[sort]
     })
     renderData(showData)
   }
 }
}