import { catsData } from "/data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const onlyGifs = document.getElementById("gifs-only-option");

emotionRadios.addEventListener("change", highlightCheckedOption);

getImageBtn.addEventListener("click", getMatchingCatsArray);

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
