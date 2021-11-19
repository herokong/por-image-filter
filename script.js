var imgHolder = document.getElementById("canvas");
var ctx = imgHolder.getContext("2d");

const darkToggle = document.getElementById("dark-toggler");
const imageName = document.getElementById("file-name");
const imageUploader = document.getElementById("file-uploader");
const downloadBtn = document.getElementById("download-btn")
var image = new Image();
var fileName = "";

imageUploader.addEventListener("change", () => {
  const file = imageUploader.files[0];
  const reader = new FileReader();
  fileName = file.name;
  imageName.innerHTML = fileName;
  reader.readAsDataURL(file);
  reader.addEventListener("load", () => {
      image = new Image();
      image.src = reader.result;
      image.onload = function() {
        imgHolder.width = image.width;
        imgHolder.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);
      };
    },
  );
})

document.addEventListener('change', e => {
  let bightnessVal = document.getElementById('brightness').value;
  let contrastVal = document.getElementById('contrast').value;
  let blurVal = document.getElementById('blur').value;
  let saturateVal = document.getElementById('saturate').value;
  let invertVal = document.getElementById('invert').value;
  let hueRotateVal = document.getElementById('hue-rotate').value;
  let sepiaVal = document.getElementById('sepia').value;
  let grayscaleVal = document.getElementById('grayscale').value;
  document.getElementById('brightness-value').innerHTML = bightnessVal;
  document.getElementById('contrast-value').innerHTML = contrastVal;
  document.getElementById('blur-value').innerHTML = blurVal;
  document.getElementById('sat-value').innerHTML = saturateVal;
  document.getElementById('inv-value').innerHTML = invertVal;
  document.getElementById('hue-value').innerHTML = hueRotateVal;
  document.getElementById('gray-value').innerHTML = grayscaleVal;
  document.getElementById('sepia-value').innerHTML = sepiaVal;
  if (e.target.classList.contains('effect-slider')) {
    ctx.filter = 'brightness('+ bightnessVal+'%) contrast('+contrastVal+'%) blur('+blurVal+'px) saturate(' +
    saturateVal+'%) invert('+invertVal+'%) hue-rotate('+hueRotateVal+'deg) sepia('+sepiaVal+'%) grayscale('+grayscaleVal+'%)';
    ctx.drawImage(image, 0, 0, image.width, image.height);
  }
})

document.addEventListener('click', e => {
  if (e.target.classList.contains('filter-btn')) {
    ctx.drawImage(image, 0, 0, image.width, image.height);
    let imgData = ctx.getImageData(0, 0, imgHolder.width, imgHolder.height);
    let newData = pixelsJS.filterImgData(imgData, e.target.id);
    ctx.putImageData(newData, 0, 0);
  }
})

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
})

downloadBtn.addEventListener('click', () => {
  let newFilename = "Image_Filter.jpg";
  download(imgHolder, newFilename);
})

function download(canvas, filename) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/jpeg", 0.89);
  let event = new MouseEvent("click");
  link.dispatchEvent(event);
}
