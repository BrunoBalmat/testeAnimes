import { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import HamburgerMenu from "./components/hamburguer/Hamburger";
import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from '@mui/system';
import InputCustomized from './components/inputCustumized';
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import Footer from "./components/footer";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function List() {
    const [animeSearch, setAnimeSearch] = useState();
    const [animeCategorie, setAnimeCategorie] = useState();
    const [animeResponse, setAnimeResponse] = useState();
    const [animeList, setAnimeList] = useState([]);
    const [paginationLinks, setPaginationLinks] = useState({});
    const [todos, setTodos] = useState();
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        setAnimeResponse(urlparams.search);
        setAnimeCategorie(urlparams.categories);
        setTodos(urlparams.todos);
    }, [urlparams]);

    useEffect(() => {
        if (todos) {
            setLoading(true);
            axios.get(`https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=20&page[offset]=0`)
                .then(function (response) {
                    setAnimeList(response.data.data);
                    setPaginationLinks(response.data.links);
                })
                .catch(function (error) {
                    console.error("Erro ao buscar", error);
                })
                .finally(() => setLoading(false));
        }
    }, [todos]);

    useEffect(() => {
        if (animeResponse) {
            setLoading(true);
            axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${animeResponse}&page[limit]=20&page[offset]=20`)
                .then(function (response) {
                    setAnimeList(response.data.data);
                    setPaginationLinks(response.data.links);
                })
                .catch(function (error) {
                    console.error("Erro ao buscar", error);
                })
                .finally(() => setLoading(false));
        }
    }, [animeResponse]);

    useEffect(() => {
        if (animeCategorie) {
            setLoading(true);
            axios.get(`https://kitsu.io/api/edge/anime?filter[categories]=${animeCategorie}&page[limit]=20&page[offset]=20`)
                .then(function (response) {
                    setAnimeList(response.data.data);
                    setPaginationLinks(response.data.links);
                })
                .catch(function (error) {
                    console.error("Erro ao buscar", error);
                })
                .finally(() => setLoading(false));
        }
    }, [animeCategorie]);

    const handleSearch = () => {
        if (animeSearch) {
            window.location = `./list?search=${animeSearch}`;
        }
    };

    const fetchPage = (url) => {
        setLoading(true);
        axios.get(url)
            .then(function (response) {
                setAnimeList(response.data.data);
                setPaginationLinks(response.data.links);
            })
            .catch(function (error) {
                console.error("Erro ao buscar", error);
            })
            .finally(() => setLoading(false));
    };

    const nextOffset = paginationLinks.next ? new URLSearchParams(paginationLinks.next.split('?')[1]).get('page[offset]') : null;
    const lastOffset = paginationLinks.last ? new URLSearchParams(paginationLinks.last.split('?')[1]).get('page[offset]') : null;

    const shouldHidePrev = nextOffset !== null && parseInt(nextOffset, 10) < (todos ? 21 : 41);
    const shouldHideNavigation = lastOffset !== null && parseInt(lastOffset, 10) < 20;

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
                    {loading ? (
                        <div className="loadingContainer">
                            <img src="./one-piece-z-studios.gif" />
                        </div>
                    ) : (
                        <>
                            <div className="listTitle">
                                <div className="iconMovie">
                                    <TheatersOutlinedIcon className="movieIcon"/>
                                </div>
                                <h2>{urlparams.todos}{urlparams.search}{urlparams.categories}</h2>
                            </div>
                            <div className="imagesList">
                                {Array.isArray(animeList) && animeList?.map((anime) => {
                                    const content = (
                                        <div className="tooltipContent">
                                            <h2 className="title">{anime?.attributes?.titles?.en_jp}</h2>
                                            <h3 className="rating" style={{ color: 'rgba(22, 160, 133, 1)' }}>{anime?.attributes?.averageRating}  % </h3>
                                            <h4 className="popularity"><i className="fa-solid fa-heart" style={{ color: 'rgba(255, 69, 69, 1)' }} /> #{anime?.attributes?.popularityRank} Mais popular</h4>
                                            <h4 className="ratingrank"><i className="fa-solid fa-star" style={{ color: 'rgba(255, 225, 69, 1)' }} /> #{anime?.attributes?.ratingRank} Melhor Classificado</h4>
                                            <div className="descriptionContainer">
                                                <RatingSpan className="description">{anime?.attributes?.description}</RatingSpan>
                                            </div>
                                        </div>
                                    );
                                    return (
                                        <div className="display5list" key={anime.id}>
                                            <a href={`./anime?id=${anime?.id}`}>
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
                                                    <img src={anime?.attributes?.posterImage?.small} alt="anime" />
                                                </CustomTooltip>
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
                <div className="pagination">
                    {paginationLinks.prev && (
                        <div className="paginationLinks" onClick={() => fetchPage(paginationLinks.prev)} style={{ cursor: 'pointer', visibility: (shouldHidePrev || shouldHideNavigation) ? 'hidden' : 'visible' }}>
                            <ArrowBackRoundedIcon />
                        </div>
                    )}
                    {paginationLinks.next && (
                        <div className="paginationLinks" onClick={() => fetchPage(paginationLinks.next)} style={{ cursor: 'pointer', visibility: shouldHideNavigation ? 'hidden' : 'visible' }}>
                            <ArrowForwardRoundedIcon />
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default List;
