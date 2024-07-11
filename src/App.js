import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import HamburgerMenu from "./components/hamburguer/Hamburger";
import Slider from "./components/slider/Slider";
import { Tooltip, tooltipClasses } from "@mui/material"
import { styled } from '@mui/system';

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(38, 38, 38, 1)',
    maxWidth: '13vw',
    maxHeigth: '300px',
    borderRadios: 50,
    padding: 24,
    borderRadius: '10px',
  },
}));

const RatingSpan = styled('span')({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 6,
});

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
          <h2><i class="fa-regular fa-star" />Animes Mais Populares</h2>
          <div className="imagensPopulares">
            {populares?.map((anime) => {
              const content = (
                <div className="tooltipContent">
                  <h2 className="title">{anime?.attributes?.titles?.en_jp}</h2>
                  <h3 className="rating" style={{ color: 'rgba(22, 160, 133, 1)' }}>{anime?.attributes?.averageRating}  % </h3>
                  <h4 className="popularity"><i class="fa-solid fa-heart" style={{ color: 'rgba(255, 69, 69, 1)' }} /> #{anime?.attributes?.popularityRank} Mais popular</h4>
                  <h4 className="ratingrank"><i class="fa-solid fa-star" style={{ color: 'rgba(255, 225, 69, 1)' }} /> #{anime?.attributes?.ratingRank} Melhor Classificado</h4>
                  <div className="descriptionContainer">
                    <RatingSpan className="description">{anime?.attributes?.description}</RatingSpan>
                  </div>
                </div>
              );
              return (
                <div className="display5animes">
                  <CustomTooltip slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: [0, 4],
                          },
                        },
                      ],
                    },
                  }} title={content} placement="bottom" arrow enterDelay={1000} leaveDelay={100}>
                    <img
                      src={anime?.attributes?.posterImage?.small}
                      alt="anime"
                    />
                  </CustomTooltip>
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
              {avaliados?.map((anime) => {
                const content = (
                  <div className="tooltipContent">
                    <h2 className="title">{anime?.attributes?.titles?.en_jp}</h2>
                    <h2 className="rating" style={{ color: 'rgba(22, 160, 133, 1)' }}>{anime?.attributes?.averageRating}%</h2>
                    <h3 className="popularity"><i class="fa-solid fa-heart" style={{ color: 'rgba(255, 69, 69, 1)' }} />#{anime?.attributes?.popularityRank} Mais popular</h3>
                    <h3 className="ratingrank"><i class="fa-solid fa-star" style={{ color: 'rgba(255, 225, 69, 1)' }} />#{anime?.attributes?.ratingRank}Melhor Classificado</h3>
                    <RatingSpan className="description">{anime?.attributes?.description}</RatingSpan>
                  </div>
                );
                return (
                  <div className="display5animes">
                    <CustomTooltip slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: 'offset',
                            options: {
                              offset: [0, 4],
                            },
                          },
                        ],
                      },
                    }} title={content} placement="bottom" arrow>
                      <img
                        src={anime?.attributes?.posterImage?.small}
                        alt="anime"
                      />
                    </CustomTooltip>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <footer>
          <div className="catImage">
            <img src="./gato.png" alt="gato" />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
