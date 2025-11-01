import { catsData } from "/data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const onlyGifs = document.getElementById("gifs-only-option");
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner");
const closeBtn = document.getElementById("meme-modal-close-btn");

emotionRadios.addEventListener("change", highlightCheckedOption);

getImageBtn.addEventListener("click", renderCat);

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function getMatchingCatsArray() {
  if (document.querySelector("input[type=radio]:checked")) {
    const selectedEmotion = document.querySelector(
      "input[type=radio]:checked"
    ).value;
    const isGif = onlyGifs.checked;

    const matchingCatsArray = catsData.filter(cat => {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingCatsArray;
  }
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();
  return catsArray[Math.floor(Math.random() * catsArray.length)];
}

function renderCat() {
  const catObject = getSingleCatObject();
  memeModalInner.innerHTML = `<img src="images/${catObject.image}" class="cat-img" alt="${catObject.alt}">`;
  memeModal.style.display = "flex";
}

function getEmotionsArray(arr) {
  const emotionsArray = [];
  arr.forEach(cat => {
    cat.emotionTags.forEach(tag => {
      if (!emotionsArray.includes(tag)) {
        emotionsArray.push(tag);
      }
    });
  });
  return emotionsArray;
}

function renderEmotionsRadios(cats) {
  let radioItems = "";
  const emotions = getEmotionsArray(cats);
  for (let emotion of emotions) {
    radioItems += `
    <div class="radio">
      <label for='${emotion}'>${emotion}</label>
        <input type='radio' id='${emotion}' name='emotions' value='${emotion}'>
      </div>
        `;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);

closeBtn.addEventListener("click", function () {
  memeModal.style.display = "none";
  matchingCatsArray = [];
});
