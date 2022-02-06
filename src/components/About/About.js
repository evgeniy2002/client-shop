import React from 'react'
import image from '../../assets/images/about/about.png'
import s from './About.module.css'

export default function About() {
  return (
    
    <section className={s.about}>
      
      <div className="container">
        
        <div className={s.about_body}>
          <div className={s.about_info}>
            <div className={s.about_title}>Немного о нашей деятельности</div>
            <div className={s.about_description}>
              <p>У нас вы найдете все, что нужно для каждого студента. Этот сайт позволит вам сэкономить кучу времени,
                так как весь товар вы сможете купить прямо в общежитие. Здесь вы сможете выбрать все, что вам
                необходимо, от различных продуктов, до предоставляемых услуг. Ну и, конечно же, вишенкой на торте
                является обширный выбор табачных изделий. </p>
            </div>
          </div>
          <div className={s.about_img}>
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}
