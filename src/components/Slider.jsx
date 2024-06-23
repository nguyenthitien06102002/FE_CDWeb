import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Container } from "react-bootstrap"
import SlideCard from "./SliderCard/SlideCard"
import { SliderData } from "../utils/products"
import bg from "../Images/baner.png";


const SliderHome = () => {
  const settings = {
    nav:false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }
  return (
    <section className='homeSlide' style={styles.imageContainer}>
    <div style={styles.overlay}></div>
    <Container>
      <Slider {...settings}>
        {SliderData.map((value, index) => {
          return (
            <SlideCard key={index} title={value.title} cover={value.cover} desc={value.desc} />
          )
        })}
      </Slider>
    </Container>
  </section>
  )
}
const styles = {
  imageContainer: {
    position: 'relative',
    backgroundImage: `url("${bg}")`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  }
  
}


export default SliderHome
