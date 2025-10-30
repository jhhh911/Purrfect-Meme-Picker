import { catsData } from "/data.js";

const emotionRadios = document.getElementById("emotion-radios");

function getEmotionsArray(arr) {
  const emotionsArray = [];
  arr.forEach(cat => {
    cat.emotionTags.forEach(tag => {
      if (emotionsArray.includes(tag)) {
        
      } else {
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
