const form = document.querySelector("form");
const GIFContainer = document.querySelector("div");
const paragraphFeedback = document.createElement("p");

paragraphFeedback.setAttribute("data-feedback", "submit-feedback");

const APIKey = "LmAeW85zjEn1Ey351SEkDJ25Q5nJvj7Q";

const getGIFHYApiUrl = (GIFName) =>
  `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=1&q=${GIFName}`;

const fetchGIF = async (inputValue) => {
  try {
    const GIFHYApiUrl = getGIFHYApiUrl(inputValue);
    const response = await fetch(GIFHYApiUrl);

    if (!response.ok) {
      throw new Error("Não foi possível obter os dados");
    }
    return response.json();
  } catch (error) {
    alert(error.message);
  }
};
const generateGIFImg = (GIFDataImgUrl, GIFDataImgTitle) => {
  const img = document.createElement("img");
  img.setAttribute("src", GIFDataImgUrl);
  img.setAttribute("alt", GIFDataImgTitle);

  return img;
};

const insertGIFIntoDom = async (inputValue) => {
  const GIFData = await fetchGIF(inputValue);

  if (GIFData) {
    const GIFDataImgUrl = GIFData.data[0].images.downsized.url;
    const GIFDataImgTitle = GIFData.data[0].title;
    const img = generateGIFImg(GIFDataImgUrl, GIFDataImgTitle);
    GIFContainer.insertAdjacentElement("afterbegin", img);
    resetAndFocus();
  }
};

const resetAndFocus = () => {
  form.reset();
  form.search.focus();
};

const insertParagraphFeedback = () => {
  paragraphFeedback.textContent = "Preencha o campo";
  form.insertAdjacentElement("afterend", paragraphFeedback);
};

const removeParagraphFeedback = () => {
  const paragraphFeedbackExists = document.querySelector(
    '[data-feedback="submit-feedback"]'
  );

  if (paragraphFeedbackExists) {
    paragraphFeedback.remove();
  }
};

const eventSubmit = (event) => {
  event.preventDefault();
  const inputValue = event.target.search.value;
  if (!inputValue) {
    insertParagraphFeedback();
    return;
  }
  insertGIFIntoDom(inputValue);
};

form.addEventListener("submit", eventSubmit);
form.addEventListener("input", removeParagraphFeedback);
