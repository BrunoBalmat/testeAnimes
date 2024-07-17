import React from "react";
import './footer.css'

function Footer() {
  return (
    <footer>
      <div className="catImage">
        <img src="./gato.png" alt="gato" />
      </div>
      <h2>Ainda está procurando algo pra assistir? </h2>
      <h2 className="verde"> Confira o nosso acervo completo</h2>
      <a href="./list?todos=Todos" className="vertudo">          
          <p>VER TUDO</p>
      </a>
      <div className="rigths">
        <p>© 2023 FPR Animes - Todos os direitos reservados.</p>
        <img src="./icon logo animes branco 1.png" />        
      </div>      
    </footer>
  )
}


export default Footer;