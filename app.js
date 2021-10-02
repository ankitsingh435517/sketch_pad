
let body = document.querySelector('body');

let sketch_Pad_Container = document.createElement('div');

sketch_Pad_Container.classList.add('sketch_Pad_Container');

let sketch_Pad = document.createElement('div');

sketch_Pad.setAttribute('id','sketch_Pad');

function constructGrid(side){

    let div_count = 1;

    for(let  i = 0 ; i < side; i++){
        let row_div = document.createElement('div');
        row_div.classList.add('row_div');
        for(let j = 0; j < side; j++){
            let div = document.createElement('div');
            div.setAttribute('id', `key_${div_count++}`);
            div.classList.add('each_grid_div');
            div.style.cssText += `height: ${300/side}px;
                                  width: ${300/side}px`
    
            row_div.appendChild(div);
        }    
        sketch_Pad.appendChild(row_div);
    }
    
}


sketch_Pad_Container.appendChild(sketch_Pad);

body.appendChild(sketch_Pad_Container);







// event listeners
constructGrid(14);

let each_grid_div = document.querySelectorAll('.each_grid_div');

each_grid_div.forEach(each_div => {
    each_div.addEventListener('mouseover', changeColor)
})

let erase_btn = document.createElement('button');
erase_btn.textContent = 'erase';

body.appendChild(erase_btn);


let erase = false;

erase_btn.addEventListener('click', () => { erase = !erase })

let clear_btn = document.createElement('button');
clear_btn.textContent = 'clear';

clear_btn.addEventListener('click', clearAll);

function clearAll(){
    let all_coloured_divs = document.querySelectorAll('.colored');
    
    all_coloured_divs.forEach(each_coloured_div => {
        each_coloured_div.style.cssText += 'background-color: white';
        each_coloured_div.classList.remove('colored');
    })
}

body.appendChild(clear_btn)

let rainbow = false;

function changeColor(e){
    // console.log(e.target.getAttribute('id'));
    if(rainbow)
     {
        changeColorRainbow(e);
     }else{
        console.log('changeColor() ------> fired');
    
    
        let selected_div = document.querySelector(`#${e.target.getAttribute('id')}`)
        console.log(selected_div)
        if(erase){
            selected_div.classList.remove('change_To_Black_Color');
            selected_div.classList.remove('colored');
        }else{
            selected_div.classList.add('change_To_Black_Color');
            selected_div.classList.add('colored');
        }
     }
    
}


let rainbow_btn = document.createElement('button');
rainbow_btn.textContent = 'rainbow';

rainbow_btn.addEventListener('click', () => { rainbow = !rainbow });

body.appendChild(rainbow_btn);

function changeColorRainbow(e){
    console.log('changeColorRainbow() ------> fired');

    let selected_div = document.querySelector(`#${e.target.getAttribute('id')}`)
    console.log(selected_div)
    if(erase){
        selected_div.style.cssText += 'background-color: white;';
        selected_div.classList.remove('colored');
    }else{
        selected_div.style.cssText += `background-color: #${randomColor()}`;
        selected_div.classList.add('colored');
    }
}

function randomColor(){
  return Math.floor(Math.random()*16777215).toString(16);
}