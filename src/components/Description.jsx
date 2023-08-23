import React from 'react'
import titleImage1 from '../assets/title images/1.png'
import titleImage2 from '../assets/title images/2.png'
import titleImage3 from '../assets/title images/3.png'
import titleImage4 from '../assets/title images/4.png'
import titleImage5 from '../assets/title images/5.png'

const Description = () => {
  return (
    <div>
        <section className='description-title'>
            <div className="images">
              <img src={titleImage1} alt="" />
              <img src={titleImage2} alt="" />
              <img src={titleImage3} alt="" />
              <img src={titleImage4} alt="" />
              <img src={titleImage5} alt="" />
            </div>
            <h1 className='title'>
              <span>Gražiausių</span>
              <br />
               Gabrielės Gvazdikaitės giesmių rinkimai
            </h1>
        </section>

        <section className='description-text'>
          <div className="container">
            <p>Balsuok už mėgstamiausias Gabrielės Gvazdikaitės giesmes ir rugpjūčio 31 dieną radijo stoties XFM Pavakario eteryje sužinok kokias 7 koncertuose su orkestru skambėsiančias giesmes išrinks klausytojai, o kokius 5 kūrinius - Gabrielė ir jos komanda! </p>
          </div>
        </section>
        
    </div>
  )
}

export default Description;