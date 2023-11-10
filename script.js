const code_input = document.getElementById('code');
const output = document.getElementById('output');
const code_input1 = document.getElementById('probandoctm1');
const code_input2 = document.getElementById('probandoctm2');
const code_input3 = document.getElementById('probandoctm3');
const code_input4 = document.getElementById('probandoctm4');



function update() {
  const s = document.createElement('script');
  s.setAttribute('type','text/tikz');
  let DibujoViga = `
  \\draw[top color=gray,bottom color=gray,middle color=white]
  (0,0) rectangle (${code_input1.value},0.5);
  `
  let DibujoApoyosFijos = 
  `
  \\foreach \\x in {${code_input2.value}}
  {
  \\draw[white,top color=brown] (-0.45+\\x,-0.69282) rectangle (0.45+\\x,-1.19282);
  \\draw[fill=gray] (0+\\x,0) -- (0.4+\\x,-0.69282) -- (-0.4+\\x,-0.69282)--(0+\\x,0);
  }
  `;
  let DibujoApoyosMoviles = 
  `
  \\foreach \\x in {${code_input3.value}}
  {
    \\draw[white,top color=brown] (-0.45+\\x,-0.94282) rectangle (0.45+\\x,-1.39282);
    \\draw[fill = gray] (0+\\x,0) -- (0.4+\\x,-0.69282) -- (-0.4+\\x,-0.69282)--(0+\\x,0);
    \\draw (0+\\x,-0.81782) circle (0.125);
    \\draw (0.25+\\x,-0.81782) circle (0.125);
    \\draw (-0.25+\\x,-0.81782) circle (0.125);}
  `;

  let dsd = code_input4.value.split(',')

  let DibujoFuerzaDistribuidaConstante =
  `
  \\foreach \\i [evaluate=\\i as \\x using \\i*0.2+${dsd[0]}]  in {0,...,${(dsd[1]-dsd[0])*5}}
      {
        \\draw[<-, thick,red] (\\x,0.5)--(\\x,1.25); 
       }
       \\draw[thick,red] (${dsd[0]},1.25)--(${dsd[1]},1.25);
  `; 
  
  code_input.value =  DibujoViga + "\n" + DibujoApoyosFijos + "\n" + DibujoApoyosMoviles + "\n" + DibujoFuerzaDistribuidaConstante;
  
 s.textContent = `

\\begin{tikzpicture}[>=stealth]
${code_input.value}
\\end{tikzpicture}
  `;
  output.innerHTML = '';
  output.appendChild(s);
  process_tikz(s);
}

let debounce_update = null;
let debounce_do = false;

code_input.addEventListener('keyup',function() {
  if(debounce_update) {
    debounce_do = true;
    return;
  }
  update();
  debounce_update = setTimeout(function() {
    debounce_update = null;
    if(debounce_do) {
      update();
    }
    debounce_do = false;
  },500);
})
