/*Add*/ /*
// Altera a cor de fundo da página
function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
    localStorage.setItem('backgroundColor', color);
}
//Salva a cor de fundo da página
const savedColor = localStorage.getItem('backgroundColor');
if (savedColor) {
    document.body.style.backgroundColor = savedColor;
}
// controla se a paleta de cores está visível ou não
let isPaletteVisible = false;

// Faz com que a paleta de cores apareça e desapareça alternadamente, e a classe 'active' é usada para aplicar estilos específicos quando a paleta está visível.
function toggleColorPalette() {
    isPaletteVisible = !isPaletteVisible;
    const boxColors = document.getElementById('boxColors');
    boxColors.classList.toggle('active', isPaletteVisible);
}
*/

function bgChangeDiv() {
  let bgChangeDiv = document.getElementById("bgChangeDiv")
  if (bgChangeDiv.style.display === "none") {
    bgChangeDiv.style.display = "block"
  } else {
    bgChangeDiv.style.display = "none"
  }
}

const bgchange = (id) => {
  console.log(id)
  document.body.style.background = document.getElementById(id).innerHTML
}
