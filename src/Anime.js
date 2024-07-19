import { useState, useEffect } from "react";
import "./Animes.css";
import axios from "axios";
import HamburgerMenu from "./components/hamburguer/Hamburger";
import InputCustomized from './components/inputCustumized'
import Footer from "./components/footer";
import YouTubeIcon from '@mui/icons-material/YouTube';
import Modal from "./components/Modal";




function Anime() {
  const [animeSearch, setAnimeSearch] = useState();
  const [animeResponse, setAnimeResponse] = useState();
  const [animeData, setAnimeData] = useState();
  const [openTrailer, setOpenTrailer] = useState();

  useEffect(() => { }, []);

  const handleSearch = () => {
    if (animeSearch) {
      window.location = `./list?search=${animeSearch}`;
    }
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
        backgroundSize: '101%',
      }}>

      <div className="sideBar">
        <HamburgerMenu />
      </div>
      <div className="content">
        <header className="pages-header">
          <a className="linkhomePages" href="/">
            <img src="/logo.png" alt="logo" />
          </a>
          <InputCustomized onChange={(e) => setAnimeSearch(e.target.value)} onSearch={handleSearch} />
        </header>
        <div className="animePage">
          <div className="animeImage">
            <img src={animeData?.attributes?.posterImage?.small} alt="Anime Cover" />
            <button onClick={() => setOpenTrailer("aberto")}><YouTubeIcon sx={{ fontSize: '4vw', color: 'white' }} /> VER TRAILER</button>
            <h3 className="rating" style={{ color: 'rgba(22, 160, 133, 1)' }}>Aprovado por <strong>{animeData?.attributes?.averageRating}%</strong> <br />da Comunidade </h3>
            <h3 className="popularity"><i class="fa-solid fa-heart" style={{ color: 'rgba(255, 69, 69, 1)' }} /> #{animeData?.attributes?.popularityRank} Mais popular</h3>
            <h3 className="ratingrank"><i class="fa-solid fa-star" style={{ color: 'rgba(255, 225, 69, 1)' }} /> #{animeData?.attributes?.ratingRank} Melhor Classificado</h3>
          </div>
          <p className="animeDescription">
            <h2>{animeData?.attributes?.titles?.en_jp}</h2>
            <p>{animeData?.attributes?.description}</p>
          </p>
        </div>
        <Modal openTrailer={openTrailer} animeData={animeData} setOpenTrailer={setOpenTrailer} />
        <Footer />
      </div>
    </div>
  );
}

export default Anime;
