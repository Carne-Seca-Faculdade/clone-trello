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
