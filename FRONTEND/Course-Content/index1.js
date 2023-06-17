
const mainBody = document.querySelector(".courses-append")
const courseCount = document.querySelector(".course-count")
let loadingel = document.querySelector(".loading")
let formEl = document.querySelector(".searchForm")
let inputElement = document.querySelector('input[type="search"][placeholder="Search courses here..."]')
const selectElement = document.querySelector('.selecttag');
const job_card = document.querySelector(".job_card")


fetch("http://localhost:8080/courses/login", {
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        email:"a@gmail.com",
        password:"12"
    })
})
.then((res)=> res.json())
.then((data)=>{
    localStorage.setItem("token", JSON.stringify(data.token))
    console.log(data)
})
.catch((err)=>{
    console.log(err)
})

let global = []
let loading = false

setTimeout(()=>{
    const token = JSON.parse(localStorage.getItem("token"));
    fetch("http://localhost:8080/courses/get", {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":token
        }
    })
    .then((res=> res.json()))
    .then((data)=>{
        global = data.msg
        console.log(data)
        display(data.msg)
        courseCount.textContent = data.msg.length
    })
    .catch((err)=>{
        console.log(err)
    })
}, 5000)


formEl.addEventListener("submit", (e)=>{
e.preventDefault()
console.log(inputElement.value)
let filtered = global.filter((ele, ind)=>{
   
    if(ele.videoTitle.toLowerCase().includes(inputElement.value.toLowerCase())==true){
        return true
    }else {
        return false
    }
})
courseCount.textContent = filtered.length
display(filtered)
})

function display(data){

    mainBody.innerHTML = ""
 
    data.forEach((ele, ind)=>{

        let div1 = document.createElement("div")
        div1.setAttribute("class", "job_card")
        let div2 = document.createElement("div")
        div2.setAttribute("class", "job_details")
        let div3 = document.createElement("div")
        div3.setAttribute("class", "img")
        let i = document.createElement("img")
        i.setAttribute("src", ele.thumbnail)
        div3.append(i)
        let div4 = document.createElement("div")
        div4.setAttribute("class", "text")
        let title = document.createElement("h2")
        title.textContent = ele.videoTitle
        let span = document.createElement("span")
        span.textContent = ele.videoCategory
        div4.appendChild(title, span)
        div2.append(div3, div4)
        let div5 = document.createElement("div")
        div5.setAttribute("class", "job_salary")
        let price = document.createElement("h4")
        price.textContent = ele.videoPrice
        let span1 = document.createElement("span")
        span1.textContent = "1 day ago"
        div5.append(price, span1)
        div1.append(div2, div5)
        mainBody.append(div1)
       
        div1.addEventListener("click", () => {
           
            const url = ele._id;
            localStorage.setItem("url", url)
            window.location.href = "./course-details.html";
          });
    })

}
