
const url = "http://localhost:3000/api/"
fetchData();
const tbody = document.getElementById("data");
async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const experience = data.db;
        for(let entry of experience){
            let id = entry.id;
            const tr = document.createElement("tr");
            tr.contentEditable = true;
            tr.classList.add("exp");
            const td1 = document.createElement("td");
            td1.classList.add(id);
            td1.textContent = entry.companyname;
            const td2 = document.createElement("td");
            td2.classList.add(id);
            td2.textContent = entry.jobtitle;
            const td3 = document.createElement("td");
            td3.classList.add(id);
            td3.textContent = entry.location;
            const td4 = document.createElement("td");
            td4.classList.add(id);
            td4.textContent = entry.startdate;
            const td5 = document.createElement("td");
            td5.classList.add(id);
            td5.textContent = entry.enddate;
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", ()=>{
                deleteEntry(id);
            });
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", ()=>{
                editEntry(id);
            });
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(deleteBtn);
            tr.appendChild(editBtn);
            tbody.appendChild(tr);
        }
        
    } catch (error) {
        console.error('Fetch error:', error);
        /* errorDiv.style.display = 'block';
        errorDiv.innerHTML = ` Data är ej tillgänglig: ${error}` */
    } finally{
       
    }  
} 


async function deleteEntry(id){
    const confirm = window.confirm("Är du säker att du vill ta bort denna arbetserfarenhet?");

    if(confirm){
        try {
                const response = await fetch(`http://localhost:3000/api/workexp/${id}`, {method: 'DELETE'});
                const data = await response.json();
                
            } catch (error) {
                console.error('Fetch error:', error);
            } finally{
                window.location.reload();
            }
    }else{
        console.log("avbruten borttagning");
    }   
}

function editEntry(id){
    let tdATA = document.getElementsByClassName(id);
    
    for (let i = 0; i < tdATA.length; i++) {
        console.log(tdATA[i].textContent);
    }
    
}




const addBtn = document.getElementById("add");
addBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    const company = document.getElementById("coName");
    const jobTitle = document.getElementById("title");
    const jobLocation = document.getElementById("location");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("slutDatum");

    let companyname = company.value;
    let jobtitle = jobTitle.value;
    let location = jobLocation.value;
    let startdate = startDate.value;
    let enddate = endDate.value;
    
    if(companyname && jobtitle && location && startdate && enddate){
        postData(companyname, jobtitle, location, startdate, enddate);
    }else{

    }
});

async function postData(companyname, jobtitle, location, startdate, enddate){

    let exp = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate
    }

    let error;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exp)
        });
        const data = await response.json();
        
    } catch (error) {
        error = err;
        console.error('Fetch error:', error);
        document.getElementById("postErr").textContent = "Det gick inte att lägga till pga: " + error;
    }finally{
        if(!error){
            document.getElementById("printed").textContent = "En arbetserfarenhet har laggts till och kan synas på startsidan"
        }
    }
}