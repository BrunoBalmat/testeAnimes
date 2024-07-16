import { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import HamburgerMenu from "./components/hamburguer/Hamburger";
import { Tooltip, tooltipClasses } from "@mui/material"
import { styled } from '@mui/system';
import InputCustomized from './components/inputCustumized'
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import Footer from "./components/footer";

function List() {
    const [animeSearch, setAnimeSearch] = useState();
    const [animeCategorie, setAnimeCategorie] = useState();
    const [animeResponse, setAnimeResponse] = useState();
    const [animeList, setAnimeList] = useState([]);

    const RatingSpan = styled('span')({
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 6,
    });

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

    const params = new URLSearchParams(window.location.search);

    let urlparams = {};
    params.forEach((value, key) => {
        urlparams = Object.assign(urlparams, {
            [key]: value.toString()
        });
    });

    console.log(urlparams, "urlparams");

    useEffect(() => {
        setAnimeResponse(urlparams.search);
        setAnimeCategorie(urlparams.categories)
    }, [urlparams]);

    useEffect(() => {
        if (animeResponse) {
            axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${animeResponse}&page[limit]=20page[offset]=0`)
                .then(function (response) {
                    setAnimeList(response.data.data);
                })
                .catch(function (error) {
                    console.error("Erro ao buscar", error);
                });
        }
    }, [animeResponse]);

    useEffect(() => {
        if (animeCategorie) {
            axios.get(`https://kitsu.io/api/edge/anime?filter[categories]=${animeCategorie}&page[limit]=20page[offset]=0`)
                .then(function (response) {
                    setAnimeList(response.data.data);
                })
                .catch(function (error) {
                    console.error("Erro ao buscar", error);
                });
        }
    }, [animeCategorie]);

    const handleSearch = () => {
        window.location = `./list?search=${animeSearch}`;
    };

    return (
        <div className="List">
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
                <div className="listDisplay">
                    <div className="listTitle">
                        <div className="iconMovie">
                            <TheatersOutlinedIcon sx={{ fontSize: '2.5vw' }} />
                        </div>
                        <h2>{urlparams.search}{urlparams.categories}</h2>
                    </div>
                    <div className="imagesList">
                        {Array.isArray(animeList) && animeList.map((anime) => {
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
                                <div className="display5list">
                                    <a href={`./anime?id=${anime?.id}`}><CustomTooltip slotProps={{
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

                                    </CustomTooltip></a>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}

export default List;
