import { html, render } from "../../../node_modules/lit-html/lit-html.js";

async function solve() {

   const btn = document.querySelector('#searchBtn').addEventListener('click', onClick);
   const tBody = document.querySelector('tbody');
   
const data = await api();
const dataArr = [];
for (const key in data) {
   dataArr.push(data[key])
}
function onClick() {
   const inputField = document.getElementById('searchField');
   const trows = tBody.querySelectorAll('tr'); 
  
   const match = Array.from(trows).filter(x =>
      x.textContent.toLowerCase().includes(inputField.value.toLowerCase()));     

   if (match && inputField.value !== '') {
      match.map(x => x.style.backgroundColor = 'yellow')
      inputField.value = '';
   };

}

const template = (data) => html`

         ${data.map(x => html`
            <tr>
               <td>${x.firstName}${x.lastName}</td>
               <td>${x.email}</td>
               <td>${x.course}</td>
            </tr>
            `
         )}
`;
render(template(dataArr), tBody);
};
solve()

async function api() {
   try {
	   const resp = await fetch('http://localhost:3030/jsonstore/advanced/table');
      if (!resp.ok) {
         const err = await resp.json();
         throw new Error(err.message);

      };
      return resp.json()
   } catch (error) {
         alert(error.message);
         throw error
   }
   
}