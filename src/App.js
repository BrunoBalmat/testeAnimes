import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import HamburgerMenu from "./components/hamburguer/Hamburger";
import Slider from "./components/slider/Slider";

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

        setPopulares(response1.data.data);
        setAvaliados(response2.data.data);
      })
      .catch(function (errors) {
        console.error("Erro ao buscar", errors);
      });
  }, []);

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
          <h2>Animes Mais Populares</h2>
          <div className="imagensPopulares">
            {populares?.map((personagem) => {
              return (
                <div className="display5animes">
                  <img
                    src={personagem?.attributes?.posterImage?.small}
                    alt="anime"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <Slider />
          <div className="displayPopulares">
            <h2>Animes Mais Avaliados</h2>
            <div className="imagensPopulares">
              {avaliados?.map((avaliados) => {
                return (
                  <div className="display5animes">
                    <img
                      src={avaliados?.attributes?.posterImage?.small}
                      alt="anime"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <footer>
          <img className="footerImage" src="./rodape.png" />
        </footer>
      </div>
    </div>
  );
}

export default App;
