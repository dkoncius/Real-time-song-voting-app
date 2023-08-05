import React from 'react'

export const Footer = () => {
  return (
    <footer>
        <div className="container">
            <a className='copy' href="https://www.gabrielegvazdikaite.lt/" target='_blank'>2023 © Gabrielė Gvazdikaitė</a>
            <div className="social">

                <a href="https://www.facebook.com/GabrieleIrGrupe" target='_blank'>
                    <i className="fa-brands fa-facebook"></i>
                </a>
                
                <a href="https://open.spotify.com/artist/7ELi3uyapJifMkzTDE3owW" target='_blank'>
                    <i className="fa-brands fa-spotify"></i>
                </a>

                <a href="https://www.youtube.com/channel/UCl5cJtLYAFYPZayS9_V2MjQ" target='_blank'>
                    <i className="fa-brands fa-youtube"></i>
                </a>

            </div>
        </div>
    </footer>
  )
}
