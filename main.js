const mainContainer=document.getElementById('main-conatainer');
const btnAll=document.getElementById('btn-all');
const btnOpen=document.getElementById('btn-open');
const btnClose=document.getElementById('btn-closed');
const githubIsuueModal=document.getElementById('github-isuue-modal');
const detailsShow=document.getElementById('detailsShow');
const count=document.getElementById('count');
const searchBtn=document.getElementById('searchBtn');
const inputText=document.getElementById('inputText');
const activeTab=['bg-blue-500','text-white'];
const inactiveTab=['bg-gray-200','text-black'];
let currentTab="all";
let allIssue=[];
// toogle btn
function toggle(tab){
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
    filtteredIssue();
}

const createElement=(arr)=>{
    const htmlElement=arr.map(item=>`<div class="badge badge-warning">${item}</div>`)
    return htmlElement.join(' ');
    
}
// load by api
const loadAllIsuue=()=>{
    
    const url="https://phi-lab-server.vercel.app/api/v1/lab/issues"
    showLoading();
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        allIssue=data.data;
        filtteredIssue();
    })
}
// filter by button toggle
const filtteredIssue=()=>{
   
    if(currentTab=='all'){
        displayAllIssue(allIssue);
        count.innerText=allIssue.length;
    }
    else {
        const filtered=allIssue.filter(item=>item.status==currentTab);
        displayAllIssue(filtered);
        count.innerText=filtered.length;
    }
}


// diplay the issue card
  function displayAllIssue(data){
    mainContainer.innerHTML="";
    data.forEach(info=>{
        const newDiv=document.createElement('div');
        newDiv.innerHTML=`
         <div onclick="showIssueModal(${info.id})" class="card card-body shadow-2xl rounded-md bg-white space-y-3 ">

            <div class="flex justify-between items-center  ">
              <div>
                <img src="./assets/Open-Status.png" alt="">
              </div>
              <div class="badge badge-accent">${info.priority}</div>
            </div>
            <p class="font-bold text-[18px]">${info.title}</p>
            <p class="line-clamp-2">${info.description}</p>
            <div id="status" class="flex justify-between">${createElement(info.labels)}</div>
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
// show modal

async function showIssueModal(id){
const res=await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
const data=await res.json();
const modalDetails=data.data;
githubIsuueModal.innerHTML=`
 <div id="detailsShow" class="modal-box space-y-3 p-5 bg-white shadow rounded-2xl">
    <h1 class="text-2xl font-bold">${modalDetails.title}</h1>
    <div class="flex justify-between items-center ">

        <div class="badge badge-success">${modalDetails.status}</div>
        <div>${modalDetails.author}</div>
       
        <div>${new Date().toLocaleDateString()}</div>
    </div>
    <div>${createElement(modalDetails.labels)}</div>
    <div class="flex justify-between bg-base-200 p-3 font-blod">
        <div  class="space-y-2">
            <p>Assigne</p>
            <p>${modalDetails.assignee?modalDetails.assignee:"Not Assigne"}</p>
        </div>
        <div class="space-y-2">
            <p>prioty</p>
            <p class="badge badge-error">${modalDetails.priority}</p>
        </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary">Close</button>
      </form>
    </div>
  </div>
`
githubIsuueModal.showModal();
}

// search btn
searchBtn.addEventListener('click',()=>{
    const input=inputText.value.trim().toLowerCase();
    showLoading();
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${input}`)
    .then(res=>res.json())
    .then(data=>{
        allCart=data.data;
        const filterData=allCart.filter(item=>item.title.trim().toLowerCase().includes(input));
        displayAllIssue(filterData);
        count.innerText=filterData.length;
        if(filterData.length===0){
            mainContainer.innerHTML=`
            <div class=" col-span-full text-center space-y-3 font-bangla">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <h1 class="text-gray-400 font-bold  ">No found Issue</h1>
            <p class="font-bold text-4xl">Please try again</p>
          </div>
        
            `
        }
    })
})
// show loading
const showLoading=()=>{
    mainContainer.innerHTML=`
    <div class="flex justify-center items-center h-48">
        <span class="loading loading-bars loading-xl"></span>
    </div>
    `
}


toggle(currentTab);
loadAllIsuue();

