const userName=document.getElementById('userName');
const password=document.getElementById('password');
const signUpBtn=document.getElementById('signUpBtn');
signUpBtn.addEventListener('click',()=>{
    if(userName.value=='admin'&&password.value=='admin123'){
        alert('success to signUp');
        window.location.assign('main.html')
    }
    else{
        alert("SignUp failed");
    }
})
