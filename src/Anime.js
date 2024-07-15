import { useState, useEffect } from "react";
import "./Animes.css";
import axios from "axios";
import HamburgerMenu from "./components/hamburguer/Hamburger";
import InputCustomized from './components/inputCustumized'
import Footer from "./components/footer";





function Anime() {
  const [animeSearch, setAnimeSearch] = useState();
  const [animeResponse, setAnimeResponse] = useState();
  const [animeData, setAnimeData] = useState();

  useEffect(() => {}, []);

  const handleSearch = () => {
    window.location = `./list?search=${animeSearch}`;    
  };


  const params = new URLSearchParams(window.location.search);
    
    let urlparams = {};
    params.forEach((value, key) => {
        urlparams = Object.assign(urlparams, {
            [key]: value.toString()
        });
    });

    useEffect(() => {
        setAnimeResponse(urlparams.id);
    }, [urlparams]);

    useEffect(() => {
        if (animeResponse) {
            axios.get(`https://kitsu.io/api/edge/anime/${animeResponse}`)
                .then(function (response) {
                    setAnimeData(response.data.data);
                })
                .catch(function (error) {
                    console.error("Erro ao buscar", error);
                });
        }
    }, [animeResponse]);



  console.log(animeData, `resposta`);

  return (
    <div className="Anime"
    style={{ 
      backgroundImage: `url(${animeData?.attributes?.coverImage?.large})`, 
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
      backgroundSize: '101%'
    }}>
      
      <div className="sideBar">
        <HamburgerMenu />
      </div>
      <div className="content">
        <header className="pages-header">
          <a className="linkhome" href="/">
            <img src="/logo.png" alt="logo" />
          </a>
          <InputCustomized onChange={(e) => setAnimeSearch(e.target.value)} onSearch={handleSearch} />
        </header>
        <div className="animePage">
            <img src={animeData?.attributes?.posterImage?.small} alt="Anime Cover"></img>
            <h2>{animeData?.attributes?.titles?.en_jp}</h2>
            <h3>{animeData?.attributes?.description}</h3>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default Anime;
