import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import NavNews from './components/NavNews';
import NewsContent from './components/NewsContent/NewsContent';
import apikey from "./data/config";
import Footer from './components/Footer/Footer';


function App() {

  const [category, setCategory] = useState("general");
  const [country, setCountry] = useState("TR");
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(20);
  
  

  const newsApi = async () => {
    try {
      const news = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apikey}&pageSize=${loadMore}&category=${category}`
        );
      //console.log(news.data.articles);
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    newsApi();
    window.scrollTo(0, 0);
  }, [newsResults, category, country]);

  useEffect(() => {
    newsApi();
  }, [loadMore])

  return (
    
    <div className="App" id="#home">
      <NavNews setCategory={setCategory} setCountry={setCountry} country = {country}/>
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
