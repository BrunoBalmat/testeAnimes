import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './hamburger.css';

export default function HamburgerMenu() {

    const [isOpen, setIsOpen] = useState(false);
    const [listar, setListar] = useState([]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        axios.get(`https://kitsu.io/api/edge/categories?page%5Blimit%5D=40&sort=-total_media_count`)
            .then(function (response) {
                setListar(response.data.data);
            })
            .catch(function (error) {
                console.error("Erro ao buscar", error);
            });
    }, []);
    console.log(listar, 'lista');

    return (
        <div>
            <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <div className={`menu ${isOpen ? 'open' : ''}`}>
                <h2>CATEGORIAS</h2>
                <div>
                    {listar?.map(categoria => {
                        return (
                            <div key={categoria.id} className='categories'>
                                {categoria?.attributes?.title}
                            </div>
                        )
                    })};
                </div>
            </div>
        </div>
    );
}
