const Gallery = () => {
return (
    <div className="galeria">
        <div className="galeria-columna1">
        <h2>Galería de Aventuras</h2>
        <div className="galeria-button">
            <p>Ver galería</p>
            <img src="assets/images/arrow.png" alt="" />
        </div>
        <div>
            <img className="imagen-columna1" src="assets/images/021.jpg" alt="" />
            <img className="imagen-columna1" src="assets/images/021.jpg" alt="" />
        </div>
        </div>

        <div className="galeria-columna2">
        <img src="assets/images/021.jpg" alt="" />
        </div>
    </div>
    );
    };

    export default Gallery;


