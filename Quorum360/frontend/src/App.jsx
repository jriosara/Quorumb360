import React from 'react'
import { Outlet } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
  faLinkedinIn,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';


library.add(faFacebookF, faInstagram, faXTwitter, faLinkedinIn, faYoutube);


function App() {

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
