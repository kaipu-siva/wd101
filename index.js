let UserForm=document.getElementById("user-form");

const Entry = document.getElementById('dob');

Entry.addEventListener('input', (event) => {
    const o = new Date(event.target.value);
    const n = new Date();
    const age = n.getFullYear() - o.getFullYear();

    if ((age < 18) || age > 55) {
        Entry.setCustomValidity('Please enter a valid date of birth between ages 18 and 55.');
    }
    else{
        Entry.setCustomValidity('');
    }
});
let retrieveEntries = () => {
    let data = localStorage.getItem("user-entries");
    if (data) {
        try {
            data = JSON.parse(data);
        } catch (error) {
            console.error("Error parsing JSON data:", error);
            data = [];
        }
    } else {
        data = [];
    }
    return Array.isArray(data) ? data : [];
};


let Entries=retrieveEntries();
const displayE = () => {
    const data=retrieveEntries();
    const tableentries=data.map((entry)=>{
        const namecell=`<td >${entry.name}</td>`;
        const emailcell=`<td >${entry.email}</td>`;
        const passwordcell=`<td  >${entry.password}</td>`;
        const datecell=`<td >${entry.dob}</td>`;
        const acceptcell=`<td >${entry.acceptTermsAndconditions}</td>`;
        
        const row=`<tr>${namecell} ${emailcell} ${passwordcell} ${datecell} ${acceptcell}</tr>`;
        return row;
    }).join("\n");

    const table=`<table class="center"><tr>
    <th >Name</th>
    <th >Email</th>
    <th >Password</th>
    <th >Dob</th>
    <th >Accepted terms?</th>
</tr>${tableentries}</table> `;
  
let details=document.getElementById("user-entries");
details.innerHTML=table;
}

const saveUserForm = (event) => {
    event.preventDefault();
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const dob=document.getElementById("dob").value;

    const acceptTermsAndconditions=document.getElementById("acceptTerms").checked.toString();

    const entry = {
        name,
        email,
        password,
        dob,
        acceptTermsAndconditions
    };
    Entries.push(entry);
    localStorage.setItem("user-entries",JSON.stringify(Entries));
    displayE();
}
UserForm.addEventListener("submit",saveUserForm);
displayE();
