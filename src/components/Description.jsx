import React from 'react'
import titleImage from '../assets/title2.jpg'

const Description = () => {
  return (
    <div>
        <section className='description-title'>
          <div className="left">
            <h1>Gražiausių Gabrielės Gvazdikaitės giesmių rinkimai</h1>
          </div>
         
          <div className="clip-path">
            <img src={titleImage} alt="Gabriele Gvazdikaite" />
          </div>
         
        </section>

        <section className='description-text'>
          <div className="container">
            <h2>Apie</h2>
            <p>2024 metų vasarą šiuolaikinės krikščioniškos muzikos dainininkė Gabrielė Gvazdikaitė ruošia malonų siurprizą savo klausytojams - tai gražiausių atlikėjos giesmių koncertai su orkestru ir Berklee muzikos koledžą baigusiu pianistu Domu Žeromsku.</p>

            <p>Kokie Gabrielės kūriniai skambės šiuose išskirtiniuose koncertuose - gali nuspręsti ir tu! Balsuok už mėgstamiausias Gabrielės Gvazdikaitės giesmes ir rugpjūčio 31 dieną radijo stoties XFM Pavakario eteryje sužinok kokias 7 koncertuose su orkestru skambėsiančias giesmes išrinks klausytojai, o kokius 5 kūrinius - Gabrielė ir jos komanda!</p>

            <p>Nepraleiskite progos ir dalyvaukite balsavime, o radijo stoties XFM klausytojų laukia malonūs prizai!</p>
          </div>
        </section>
        
    </div>
  )
}

export default Description;