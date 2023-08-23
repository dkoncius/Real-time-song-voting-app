import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

import titleImage1 from '../assets/title images/1.png'
import titleImage2 from '../assets/title images/2.png'
import titleImage3 from '../assets/title images/3.png'
import titleImage4 from '../assets/title images/4.png'
import titleImage5 from '../assets/title images/5.png'

const Description = () => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const controls5 = useAnimation();
  const titleControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls1.start({ opacity: 1 });
      await controls2.start({ opacity: 1, transition: { delay: 0.005 } });
      await controls3.start({ opacity: 1, transition: { delay: 0.015  } });
      await controls4.start({ opacity: 1, transition: { delay: 0.025  } });
      await controls5.start({ opacity: 1, transition: { delay: 0.030 } });
      await titleControls.start({ opacity: 1, x: 20, transition: { delay: 0.005, duration: 1 } });
    };

    sequence();
  }, [controls1, controls2, controls3, controls4, controls5, titleControls]);

  return (
    <div>
      <section className='description-title'>
        <div className="images">
          <motion.img src={titleImage1} alt="" initial={{ opacity: 0 }} animate={controls1} />
          <motion.img src={titleImage2} alt="" initial={{ opacity: 0 }} animate={controls2} />
          <motion.img src={titleImage3} alt="" initial={{ opacity: 0 }} animate={controls3} />
          <motion.img src={titleImage4} alt="" initial={{ opacity: 0 }} animate={controls4} />
          <motion.img src={titleImage5} alt="" initial={{ opacity: 0 }} animate={controls5} />
        </div>
        <motion.h1 className='title' initial={{ opacity: 0, x: -20 }} animate={titleControls}>
          <span>Gražiausių</span>
          <br />
          Gabrielės Gvazdikaitės giesmių rinkimai
        </motion.h1>
      </section>
      <section className='description-text'>
        <div className="container">
          <p>2024 metų vasarą šiuolaikinės krikščioniškos muzikos dainininkė Gabrielė Gvazdikaitė ruošia malonų siurprizą savo klausytojams - tai gražiausių atlikėjos giesmių koncertai su orkestru ir Berklee muzikos koledžą baigusiu pianistu Domu Žeromsku. Nepraleiskite progos ir dalyvaukite balsavime, o radijo stoties XFM klausytojų laukia malonūs prizai!</p>

          <p>Balsuok už mėgstamiausias Gabrielės Gvazdikaitės giesmes ir rugsėjo 29 dieną radijo stoties XFM Pavakario eteryje sužinok kokias 7 koncertuose su orkestru skambėsiančias giesmes išrinks klausytojai, o kokius 5 kūrinius - Gabrielė ir jos komanda! </p>
        </div>
      </section>
    </div>
  )
}

export default Description;
