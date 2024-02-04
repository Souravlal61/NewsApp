const API_KEY ="3255042c4f8d4d9a93827c080ce9afd3";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
   const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data = await res.json();
   bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards_container");
    const newsCardTemplate = document.getElementById("template_news_card");

    cardsContainer.innerHTML='';

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone , article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone , article){
    const newsImg = cardClone.querySelector('#news_img')
    const newsTitle = cardClone.querySelector('#news_title')
    const newsSource = cardClone.querySelector('#news_source')
    const newsDesc = cardClone.querySelector('#news_desc')

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    //  const date = new Date(article.publishedAt).toLocalString("en-US",{
    //      timezone: "Asia/Jakarta"
    //  });

    newsSource.innerHTML = `${article.source.name}`;
    cardClone.firstElementChild.addEventListener('click' , ()=>{
        window.open(article.url,"_blank")
    })
}

 let curSelectedNav = null;
function onNavItemClick(id){ 
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');

}

const searchButton = document.getElementById('search_button');
const searchText = document.getElementById('news_input');

searchButton.addEventListener('click',()=>{
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
    
})


















