let data=[]
const addItem=document.querySelector(".text")
const addBtn=document.querySelector(".add")
const listBlock=document.querySelector(".list")
const list=document.querySelector(".todolist")
const num=document.querySelector(".num")
const delDone=document.querySelector(".del_done")



// 渲染
function update(arr){
  let listContent=""
  arr.forEach(function(item,index){
  listContent+=`<li class="${item.done}" id=${item.id} >
          <button id=${item.id} data-index=${index} class="check ${item.done}">✓</button>
          ${item.name}
          <img data-index=${index} class="del" src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="" >
          </li>`
})
  list.innerHTML=listContent
}

function backAll(){
  nowStatus="all"
  updateStatus(data)
  const all=document.querySelector("#all")
  tabBtn.forEach(function(item){
    item.classList.remove("select")
    })
  all.classList.add("select")
}
// 新增
addBtn.addEventListener("click",function(e){
  if(addItem.value.trim()==""){
    return;}
  let obj={}
  obj.name=addItem.value.trim()
  obj.done=false
  obj.id=new Date().getTime()
  data.unshift(obj)
  backAll()
  addItem.value=""
})
// 刪除及完成
list.addEventListener("click",function(e){
  let id=e.target.getAttribute("id")
  let index=e.target.dataset.index
  if(e.target.getAttribute("class")=="del"){
    data.splice(index,1)
    updateStatus()
  }else{
    data.forEach(function(i,index){
      if(i.id==id){
         data[index].done=!data[index].done
      }
    })
  updateStatus()
  }
})

// tab樣式
const tab=document.querySelector(".tab")
const tabBtn=document.querySelectorAll(".tab-button")

let nowStatus="all"
function tabSwitch(e){
  tabBtn.forEach(function(item){
    item.classList.remove("select")
    })
  e.target.classList.add("select")
  nowStatus=e.target.getAttribute("id")
}

function updateStatus(){
  if(data.length==0){
    listBlock.style.display="none"
  }else{
    listBlock.style.display="block"
    let showData=[]
    if(nowStatus=="all"){
    showData=data
  }else if(nowStatus=="undone"){
    showData=data.filter(i=>i.done==false)
  }else if(nowStatus=="done"){
    showData=data.filter(i=>i.done==true)
  }
  let unDoneNum=data.filter(i=>i.done==false).length
  num.textContent=unDoneNum
  update(showData)
  }
}


tab.addEventListener("click",function(e){
  tabSwitch(e);
  updateStatus()
})

delDone.addEventListener("click",function(e){
  // 從data中篩選出未完成的物件
  const unDoneData=data.filter(function(item){
    return item.done==false
  })
  // 把data資料替換成未完成的陣列
  data=unDoneData
  // 重新渲染data(未完成)
  backAll()
  updateStatus(data)
})

// 初始
updateStatus(data)