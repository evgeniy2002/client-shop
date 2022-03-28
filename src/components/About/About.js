import React from 'react'
import image from '../../assets/images/about/about.png'
import s from './About.module.css'

export default function About() {
  return (

    <section className={s.about}>

      <div className="container">

        <div className={s.about_body}>
          <div className={s.about_info}>
            <div className={s.about_title}><span>Немного о наc</span></div>
            <div className={s.about_description}>
              <p>Все прелести современного мира удивительны и всякий человек ждёт, когда же и на «его улице будет праздник».
                Идея этой платформы зародилась буквально в шуточной манере, но, как можете заметить, все это переросло в нечто более материальное, чем просто мысль.
                Над всем, что вы видите, работала совсем небольшая команда амбициозных и по истине прекрасных людей, которые просто хотели к каждому приблизить точку комфорта. Мы попытались собрать воедино все то, что действительно будет полезно для приятного проведения времени, ассортимент, со временем, будет улучшаться, чтобы удовлетворить каждого.
                Мы будем очень рады и надеемся, что вам придётся по душе эта задумка. </p>
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
