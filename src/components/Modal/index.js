import React from "react";
import "./modal.css";

export default function Modal({ animeData, openTrailer, setOpenTrailer }) {
    if (openTrailer) {
        return (
            <div className="containerTrailer" onClick={() => { setOpenTrailer('') }} >
                <div className="janela">
                    <div className='modal-pai'>
                        <iframe
                            style={{
                                width: '80vw',
                                height: '45vw',
                                maxWidth: '960px',
                                maxHeight: '540px',
                                border: 'none'
                            }}
                            src={`https://www.youtube.com/embed/${animeData?.attributes?.youtubeVideoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
