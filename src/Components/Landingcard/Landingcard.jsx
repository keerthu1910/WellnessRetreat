import './style.scss';
import meditationimg from '../../assets/meditation.jpg'
export const Landingcard = () => {
    return(
        <div className='landingcard-container'>
            <div className='image-container'>
                <img src={meditationimg} alt='meditation-image' className='landingcard-image' id='landing-card-image'/>
            </div>
            <p className='title-text' id='title-text'>Discover Your Inner Peace</p>
            <p className='title-description' id='title-description'>Join us for a series of wellness retreats designed to help you find tranquility and rejuvenation.</p>
        </div>
    )
}