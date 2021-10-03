
let body = document.querySelector('body');

let header = document.createElement('div');
header.classList.add('header');

let h1_for_header = document.createElement('h1');
h1_for_header.textContent = 'Sketch pad';
h1_for_header.classList.add('header_title')

header.appendChild(h1_for_header);

body.appendChild(header);

let options_div = document.createElement('div');

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

    let each_grid_div = document.querySelectorAll('.each_grid_div');

    each_grid_div.forEach(each_div => {
    each_div.addEventListener('mouseover', changeColor)
})
    
}


sketch_Pad_Container.appendChild(sketch_Pad);

body.appendChild(sketch_Pad_Container);


// grid construction--------------------------->
constructGrid(22);

let slider_div = document.createElement('div');
let slider_input = document.createElement('input');

slider_input.setAttribute('type','range');
slider_input.setAttribute('min','1');
slider_input.setAttribute('max','64');
slider_input.setAttribute('value','22');
slider_input.setAttribute('id','myRange');

slider_input.classList.add('slider');

let h1_for_range_output = document.createElement('h1');
h1_for_range_output.textContent = `${slider_input.value} X ${slider_input.value}`;
h1_for_range_output.setAttribute('id','range_output');

slider_input.oninput = function() {
    h1_for_range_output.textContent = `${this.value} X ${this.value}`;
    removeGrid();
    constructGrid(this.value);
}




function removeGrid(){
    while(sketch_Pad.firstChild){
        console.log(sketch_Pad.lastChild);
        sketch_Pad.removeChild(sketch_Pad.lastChild)
    }
}


let pen = document.createElement('button');
pen.textContent = 'pen'
pen.classList.add('pen');
pen.classList.add('selected_btn');

let pen_selected = true;

options_div.appendChild(pen);



// event listeners







let erase_btn = document.createElement('button');
erase_btn.textContent = 'eraser';
erase_btn.classList.add('erase_btn');

options_div.appendChild(erase_btn);


let erase = false;

erase_btn.addEventListener('click', () => { erase = true })

let clear_btn = document.createElement('button');
clear_btn.textContent = 'clear';
clear_btn.classList.add('clear_btn')

clear_btn.addEventListener('click', clearAll);

function clearAll(){
    let all_coloured_divs = document.querySelectorAll('.colored');
    
    all_coloured_divs.forEach(each_coloured_div => {
        each_coloured_div.style.cssText += 'background-color: white';
        each_coloured_div.classList.remove('colored');
    })
}

options_div.appendChild(clear_btn)

let rainbow = false;

function changeColor(e){
    // console.log(e.target.getAttribute('id'));
    if(rainbow)
     {
        changeColorRainbow(e);
     }else{    
    
        let selected_div = document.querySelector(`#${e.target.getAttribute('id')}`)
        
        if(erase){
            selected_div.style.cssText += 'background-color: white'
            selected_div.classList.remove('colored');
        }else{
            selected_div.style.cssText += 'background-color: black'
            selected_div.classList.add('colored');
        }
     }
    
}


let rainbow_btn = document.createElement('button');
rainbow_btn.textContent = 'rainbow';
rainbow_btn.classList.add('rainbow_btn');

rainbow_btn.addEventListener('click', () => { rainbow = true });

options_div.appendChild(rainbow_btn);

function changeColorRainbow(e){
    
    let selected_div = document.querySelector(`#${e.target.getAttribute('id')}`)
    
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

let container = document.createElement('div');
container.classList.add('container')

container.appendChild(options_div);
container.appendChild(sketch_Pad_Container);
body.appendChild(container);



//   ui ------------------------>

options_div.classList.add('options_div');

rainbow_btn.addEventListener('click', () => {
    rainbow_btn.classList.add('selected_btn');
    clear_btn.classList.remove('selected_btn');
    erase_btn.classList.remove('selected_btn');
    pen.classList.remove('selected_btn');
    erase = false;

})

erase_btn.addEventListener('click', () => {
    erase_btn.classList.add('selected_btn');
    clear_btn.classList.remove('selected_btn');
    rainbow_btn.classList.remove('selected_btn');
    pen.classList.remove('selected_btn');
})

pen.addEventListener('click', () => {
    pen.classList.add('selected_btn');
    erase_btn.classList.remove('selected_btn');
    rainbow_btn.classList.remove('selected_btn');
    rainbow = false;
    erase = false;
})


slider_div.appendChild(h1_for_range_output)
slider_div.appendChild(slider_input);
options_div.appendChild(slider_div);


