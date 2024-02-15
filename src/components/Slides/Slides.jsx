import { register } from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Swiper, SwiperSlide } from 'swiper/react'
import './Slides.css'

register()

export default function Slides(){

    const slidesData = [
        {
            id: '0',
            title: 'Crie um projeto',
            img: 'https://i.imgur.com/xEWx0Ly.jpg'
        },
        {
            id: '1',
            title: 'Convide seus colegas',
            img: 'https://i.imgur.com/YjuZ7XW.jpg'
        },
        {
            id: '2',
            title: 'Crie e atribua tarefas',
            img: 'https://i.imgur.com/7nPMFSl.jpg'
        },
        {
            id: '3',
            title: 'Integre sua equipe com publicações',
            img: 'https://i.imgur.com/rq4oRml.jpg'
        },
        {
            id: '4',
            title: 'Troque mensagens com membros do seu time',
            img: 'https://i.imgur.com/sGt8LzL.jpg'
        }
    ]

    return (
        <div className='slidesContainerDiv'>
            <Swiper
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay
                style={{
                    "--swiper-pagination-color": "#1B998B",
                    "--swiper-navigation-color": "#1B998B"
                }}
            >
                {slidesData.map((slide) => (
                    <SwiperSlide>
                        <div key={slide.id} className='flex column alignCenter justifyCenter wrap gap'>
                            <h2 style={{textAlign: 'center'}}>{slide.title}</h2>
                            <img className='slideImg' src={slide.img} alt={slide.title} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}