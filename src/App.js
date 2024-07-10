import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import HamburgerMenu from "./components/hamburguer/Hamburger";
import Slider from "./components/slider/Slider";
import { Tooltip, IconButton } from "@mui/material"

function App() {
  const [populares, setPopulares] = useState();
  const [avaliados, setAvaliados] = useState();

  useEffect(() => {
    Promise.all([
      axios.get(
        `https://kitsu.io/api/edge/anime?page%5Blimit%5D=5&sort=-average_rating`
      ),
      axios.get(
        `https://kitsu.io/api/edge/anime?page%5Blimit%5D=5&sort=-user_count`
      ),
    ])
      .then(function (responses) {
        const response1 = responses[0];
        const response2 = responses[1];

        setPopulares(response2.data.data);
        setAvaliados(response1.data.data);
      })
      .catch(function (errors) {
        console.error("Erro ao buscar", errors);
      });
  }, []);
  console.log(populares);
  console.log(avaliados, 'avaliados');

  return (
    <div className="App">
      <div className="sideBar">
        <HamburgerMenu />
      </div>
      <div className="content">
        <header className="App-header">
          <a className="linkhome" href="/">
            <img src="/logo.png" alt="logo" />
          </a>
          <input placeholder="Buscar" />
        </header>
        <div className="displayPopulares">
          <h2><i class="fa-regular fa-star" /><i class="fa-solid fa-heart"></i>Animes Mais Populares</h2>
          <div className="imagensPopulares">
            {populares?.map((personagem) => {
              const title = `
                ${personagem?.attributes?.titles?.en_jp} 
                ${personagem?.attributes?.averageRating} 
                #${personagem?.attributes?.popularityRank} Mais popular
              `;
              return (
                <div className="display5animes">
                  <Tooltip title={title} placement="bottom" arrow>
                    <img
                      src={personagem?.attributes?.posterImage?.small}
                      alt="anime"
                    />
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </div>
        <div className="sliderDisplay">
          <Slider />
          <div className="displayPopulares">
            <h2><i class="fa-regular fa-thumbs-up"></i>Animes Mais Bem Classificados</h2>
            <div className="imagensPopulares">
              {avaliados?.map((avaliados) => {
                return (
                  <div className="display5animes">
                    <Tooltip title={avaliados?.attributes?.titles?.en_jp} placement="bottom" arrow>
                      <img
                        src={avaliados?.attributes?.posterImage?.small}
                        alt="anime"
                      />
                    </Tooltip>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <footer>
          <div className="catImage">
            <img src="./gato.png" />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
