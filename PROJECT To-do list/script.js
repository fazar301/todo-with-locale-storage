const form = document.querySelector('form');
const ul = document.querySelector('ul');
const input = document.querySelector('input');

const items = JSON.parse(localStorage.getItem('items')) || []

ul.addEventListener('click', toggleDone)
ul.addEventListener('click', remove)
form.addEventListener('submit', addItem)
populateList(items, ul)
function addItem(e){
    e.preventDefault()
    if(input.value.length === 0)return;
    const text = input.value
    const item = {
        text: text,
        done: false
    }
    items.push(item)
    populateList(items,ul)
    localStorage.setItem('items',JSON.stringify(items))
    input.value =''
}

function populateList(plates = [], platesList){
    console.log(plates)
    platesList.innerHTML = plates.map((e,i) => {
      return `<li data-index="${i}" class="${e.done ? 'complete' : ''}">
                <p>${e.text}</p>
                <button type="submit" class="close">X</button>
              </li>`
    }).join('')
}
function toggleDone(e){
    if(!e.target.matches('li')) return;
    const el = e.target
    e.target.classList.toggle('complete')
    items[el.dataset.index].done = e.target.classList.contains('complete')
    localStorage.setItem('items',JSON.stringify(items))
    populateList(items,ul)
}

function remove(e){
    if(!e.target.matches('button')) return;
    const el = e.target.parentElement
    items.splice(el.dataset.index,1)
    el.remove()
    localStorage.setItem('items',JSON.stringify(items))
    populateList(items,ul)
}
/* <li onclick="ubah(this)">${input.value.split(' ').map(item => item[0].toUpperCase() + item.slice(1)).join(' ')} </li> */