import { catsData } from '/data.js'

const emotionRadios = document.getElementById("emotion-radios");

function getEmotionsArray(arr) {
  const emotionsArray = [];
  arr.forEach(cat => {
    cat.emotionTags.forEach(tag => {
      emotionsArray.push(tag);
    });
  });
  return emotionsArray;
}

function renderEmotionsRadios(cats) {
  let radioItems = "";
  const emotions = getEmotionsArray(cats);
  for (let item of emotions) {
    radioItems += `<p>${item}</p>`;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
