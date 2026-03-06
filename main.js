const mainContainer=document.getElementById('main-conatainer');
const btnAll=document.getElementById('btn-all');
const btnOpen=document.getElementById('btn-open');
const btnClose=document.getElementById('btn-closed');
const activeTab=['bg-blue-500','text-white'];
const inactiveTab=['bg-gray','text-black'];
let currentTab="all";
// toogle btn
function toogle(tab){
    currentTab=tab;
    const tabs=["all","open","closed"];
    for(const t of tabs){
        const tabName=document.getElementById('btn-'+t);
        if(t==tab){
          tabName.classList.remove(...inactiveTab);
          tabName.classList.add(...activeTab);
        }
        else{
            tabName.classList.add(...inactiveTab);
           tabName.classList.remove(...activeTab);
        }
    }
}
toogle(currentTab);


const createElement=(arr)=>{
    const htmlElement=arr.map(item=>`<div class="badge badge-success">${item}</div>`)
    return htmlElement.join(' ');
    
}
const loadAllIsuue=()=>{
    const url="https://phi-lab-server.vercel.app/api/v1/lab/issues"
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayAllIssue(data.data))
}
displayAllIssue=(data)=>{
    mainContainer.innerHTML="";
    data.forEach(info=>{
        const newDiv=document.createElement('div');
        newDiv.innerHTML=`
         <div class="card card-body shadow-2xl rounded bg-white space-y-3">

            <div class="flex justify-between items-center">
              <div>
                <img src="./assets/Open-Status.png" alt="">
              </div>
              <div class="badge badge-accent">${info.priority}</div>
            </div>
            <p class="font-bold text-[18px]">${info.title}</p>
            <p class="line-clamp-2">${info.description}</p>
            <div id="status" class="">${createElement(info.labels)}</div>
            <hr>
            <div class="flex justify-between">
                <span>${info.author}</span>
                <span>${info.createdAt}</span>
                
            </div>
            <div class="flex justify-between">
                <span>${info.assignee?info.assignee:"UnAssigne"}</span>
                <span>${info.updatedAt}</span>
                
            </div>

        </div>
           

        `
        
        if(info.status=="open"){
           newDiv.classList.add('border-t-6','border-green-700')
           
          
           
        }
        else{
            newDiv.classList.add('border-t-6','border-blue-700')
            
            
        }

        mainContainer.append(newDiv);
        
       
        
        
    })
}
btnAll.addEventListener('click',()=>{
   loadAllIsuue(); 
})
loadAllIsuue();