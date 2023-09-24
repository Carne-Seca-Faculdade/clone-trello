function bgChangeDiv() {
  let bgChangeDiv = document.getElementById("bgChangeDiv")
  bgChangeDiv.style.display =
    bgChangeDiv.style.display === "none" ? "block": "none"
}

const bgchange = (id) => {
  console.log(id)
  document.body.style.background = document.getElementById(id).innerHTML
}
