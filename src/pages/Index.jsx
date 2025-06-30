import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion"; // Import useSpring

const Index = () => {
  const images = [
    { src: "assets/images/021.jpg", label: "Bosque Privado" },
    { src: "assets/images/021.jpg", label: "Montaña" },
    { src: "assets/images/021.jpg", label: "Río" },
    { src: "assets/images/021.jpg", label: "Cascada" },
    { src: "assets/images/021.jpg", label: "Sendero" },
    { src: "assets/images/021.jpg", label: "Sendero" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [visualActiveIndex, setVisualActiveIndex] = useState(0);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const radius = 360;
  const angleStep = 360 / images.length;
  const maxVisibleCards = images.length;
  const DRAG_SENSITIVITY = 300;

  // Use useSpring for dragX to get a smoother animation when it snaps back to 0
  const dragX = useSpring(0, { stiffness: 300, damping: 30 }); // Adjust stiffness/damping for desired snap
  const offsetIndex = isDragging ? -dragX.get() / DRAG_SENSITIVITY : 0;

  const getPosition = (index) => {
    const virtualIndex = activeIndex + offsetIndex;
    const relativeIndex = ((index - virtualIndex + images.length) % images.length + images.length) % images.length;
    const angle = -90 + angleStep * relativeIndex;
    const baseY = radius * Math.sin((angle * Math.PI) / 180);
  
    const normalizedAngle = (angle + 360) % 360;
    const isRightSide = normalizedAngle >= 300 || normalizedAngle <= 60;
    const isLeftSide = normalizedAngle >= 120 && normalizedAngle <= 240;
  
    // Aumentar verticalBoost para que las cartas laterales suban más (menor y)
    const verticalBoost = (isRightSide || isLeftSide) ? 240 : 100; // Antes era 150, ahora 200 para subir más
  
    const globalOffsetY = 40;
    const y = baseY - globalOffsetY - verticalBoost;
  
    const x = radius * Math.cos((angle * Math.PI) / 180);
  
    return { x, y, angle, relativeIndex };
  };
  

  const getCardRotation = (relativeIndex) => {
    const maxRotation = 100;
    if (relativeIndex === 0) return 0;
    let dist = relativeIndex;
    if (dist > images.length / 2) dist = dist - images.length;
    const normalizedDist = Math.max(-2, Math.min(2, dist));
    return (normalizedDist / 2) * maxRotation;
  };

  const handlePan = (event, info) => {
    dragX.set(info.offset.x);
    setIsDragging(true);
  };

  const handlePanEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      setWheelRotation((prev) => prev + angleStep);
    } else if (info.offset.x < -threshold) {
      setActiveIndex((prev) => (prev + 1) % images.length);
      setWheelRotation((prev) => prev - angleStep);
    }
    // Instead of directly setting dragX to 0, let the useSpring animate it back
    dragX.set(0); 
    setIsDragging(false);

    setVisualActiveIndex(activeIndex);
  };

  return (
    <div>
      <div className="container1">
        <div className="main-container">
          <div className="active-info">
            <h2>
              Recorrido dentro de <br /> nuestro bosque <br /> privado.
              <span> {activeIndex + 1}</span>
            </h2>
            <h3 className="logo">SUPER QUADS</h3>
          </div>

          <div className="wheel-zone">
            <motion.div
              className="wheel-wrapper"
              onPan={handlePan}
              onPanEnd={handlePanEnd}
            >
              {isReady &&
                images.map((image, index) => {
                  const { x, y, angle, relativeIndex } = getPosition(index);
                  const isCurrentActive = index === activeIndex; // Changed to activeIndex for direct state
                  
                  const maxSide = Math.floor(maxVisibleCards / 2);
                  const isVisible =
                    relativeIndex <= maxSide ||
                    relativeIndex >= images.length - maxSide;
                  const cardRotation = getCardRotation(relativeIndex);
                  // extraY will now be controlled by the `scale` animation and the position itself
                  const scaleValue = isCurrentActive ? 2.2 : 1; 

                  return (
                    <motion.div
                      key={index} // Use index as key, visualActiveIndex causes re-renders
                      className={`card ${isCurrentActive ? "active" : ""}`}
                      initial={false}
                      animate={{
                        x: x, // Animate x and y directly for smoother transitions
                        y: y,
                        rotate: cardRotation,
                        scale: scaleValue,
                        opacity: isVisible ? 1 : 0,
                        zIndex: isCurrentActive ? 9 : 1, // Keep zIndex for layering
                        filter: isCurrentActive ? "brightness(1)" : "brightness(0.3)",
                      }}
                      transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 300,
                        // Apply transition to all animated properties for consistency
                        x: { duration: isDragging ? 0 : 0.5, ease: "easeInOut" },
                        y: { duration: isDragging ? 0 : 0.5, ease: "easeInOut" },
                        rotate: { duration: isDragging ? 0 : 0.5, ease: "easeInOut" },
                        scale: { duration: isDragging ? 0 : 0.9, ease: "easeInOut" },
                        opacity: { duration: 0.3, ease: "easeInOut" }, // Faster opacity transition
                        zIndex: { delay: isDragging ? 0 : 0.2 }, // Delay zIndex change slightly
                        filter: { duration: 0.3, ease: "easeInOut" },
                      }}
                      style={{
                        pointerEvents: isVisible ? "auto" : "none",
                        touchAction: isVisible ? "auto" : "none",
                      }}
                    >
                      <img draggable={false} src={image.src} alt={image.label} />
                      <p>{image.label}</p>
                    </motion.div>
                  );
                })}

              <motion.img
                src="assets/images/Llanta.png"
                alt="Llanta"
                className="wheel"
                initial={false}
                animate={{
                  rotate: wheelRotation - offsetIndex * angleStep,
                }}
                transition={{
                  rotate: { duration: 0.5, ease: "easeInOut" }, // Keep wheel rotation smooth
                }}
                onAnimationComplete={() => setVisualActiveIndex(activeIndex)}
                draggable={false}
              />
            </motion.div>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default Index;