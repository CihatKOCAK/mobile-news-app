import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import NavNews from './components/NavNews';
import NewsContent from './components/NewsContent/NewsContent';
import apikey from "./data/config";
import Footer from './components/Footer/Footer';


function App() {

  const [category, setCategory] = useState("general");
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(20);


  const newsApi = async () => {
    try {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      //us -> america  de -> almanya  ru -> rusya tr -> tr
      const news = await axios.get(
        `https://${proxyUrl}newsapi.org/v2/top-headlines?country=tr&apiKey=${apikey}&category=${category}&pageSize=${loadMore}`
        );
      //console.log(news.data.articles);
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(newsArray);
  useEffect(() => {
    newsApi();
    // eslint-disable-next-line
  }, [newsResults, category, loadMore]);

  return (
    <div className="App">
      <NavNews setCategory={setCategory} />
      <NewsContent
        loadMore={loadMore}
        setLoadMore={setLoadMore}
        newsArray={newsArray}
        newsResults={newsResults} />
      <Footer />
    </div>
  );
}

export default App;
