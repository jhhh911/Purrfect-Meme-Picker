import { catsData } from "/data.js";

const emotionSelect = document.getElementById("emotion-select");
const getImageBtn = document.getElementById("get-image-btn");
const onlyGifs = document.getElementById("gifs-only-option");
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner");
const closeBtn = document.getElementById("meme-modal-close-btn");

closeBtn.addEventListener("click", closeModal);
getImageBtn.addEventListener("click", renderCat);

function closeModal() {
  memeModal.style.display = "none";
}

function renderCat() {
  const catObject = getSingleCatObject();
  if (!catObject) return; // no match or no emotion selected
  memeModalInner.innerHTML = `<img src="images/${catObject.image}" class="cat-img" alt="${catObject.alt}">`;
  memeModal.style.display = "flex";
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();
  return catsArray
    ? catsArray[Math.floor(Math.random() * catsArray.length)]
    : null;
}

function getMatchingCatsArray() {
  const selectedEmotion = emotionSelect.value;
  if (!selectedEmotion) return null;

  const isGif = onlyGifs.checked;

  return catsData.filter(cat => {
    if (isGif) {
      return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
    } else {
      return cat.emotionTags.includes(selectedEmotion);
    }
  });
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

function renderEmotionOptions(cats) {
  const emotions = getEmotionsArray(cats);
  let options = `<option value="">-- Choose an emotion --</option>`;
  emotions.forEach(emotion => {
    options += `<option value="${emotion}">${emotion}</option>`;
  });
  emotionSelect.innerHTML = options;
}

renderEmotionOptions(catsData);
