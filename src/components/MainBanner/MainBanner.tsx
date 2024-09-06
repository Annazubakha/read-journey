import Img1 from "../../assets/images/auth/mobile@1x.png"
import Img2 from "../../assets/images/auth/mobile@2x.png"
import Img3 from "../../assets/images/auth/desktop@1x.png"
import Img4 from "../../assets/images/auth/desktop@2x.png"

import s from "./MainBanner.module.css"


export const MainBanner = ():JSX.Element => {
  return (
    <div className={s.wrapper}><picture>
      <source
        media="(min-width: 768px)"
      srcSet={`${Img3} 1x, ${Img4} 2x`}
      type="image/png"
    />
    <img
      srcSet={`${Img1} 1x, ${Img2} 2x`}
      alt="Content photo"
     
    />
  </picture></div>
  )
}
