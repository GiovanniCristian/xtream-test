import { Layout, Typography, Button } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import './home.css'
import { ReactTyped } from 'react-typed';
import Lottie from 'lottie-react';
import Homepage from '../../assets/json/homepage.json'
import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaSpotify } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";

const { Title } = Typography;

const Home = () => {
  const phrases = [
    "Welcome To Our Site",
    "Feel free to discover all the recipes and enjoy your stay",
    "Dev by Giovanni Cristian Marrocco",
    "Hope you like it!"
  ]
  return (
    <Layout className='home-layout'>
      <Header className='header'>
        <Title level={2} style={{ margin: '0.6rem 0' }}>Welcome to the best recipe site in the world</Title>
      </Header>
      <Content className='home-content-top'>
        <Lottie animationData={Homepage} style={{ width: '25%' }} />
      </Content>
      <Content className='home-content-bottom'>
        <ReactTyped
          strings={phrases}
          typeSpeed={80}
          backSpeed={60}
          loop
          className='typed'
        />
        <Title level={5} style={{ margin: '1.3rem auto' }}>Since you're here, take a look to our pages</Title>
        <div className='home-pages-link'>
          <Button className='home-btn'><Link to="recipes" className='menu-link'>Recipes</Link></Button>
          <Button className='home-btn'><Link to="add" className='menu-link'>Add Recipes</Link></Button>
        </div>
      </Content>
      <Footer className='footer'>
        <div className='social'>
          <ul className='social-list'>
            <li className='social-item'><a href="https://www.linkedin.com/in/giovanni-cristian-marrocco" target='_blank'><FaLinkedin className='icon' /></a></li>
            <li className='social-item'><a href="https://www.instagram.com/darsena_music/" target='_blank'><FaInstagram className='icon' /></a></li>
            <li className='social-item'><a href="https://my-portfolio.craft.me/0TARlD187P2cD1" target='_blank'><FaEarthAmericas className='icon' /></a></li>
            <li className='social-item'><a href="https://open.spotify.com/intl-it/artist/1BeDagLSzc3lMXJm0NSKNV?si=cFzh_WlITAmB0BZSt1edYw" target='_blank'><FaSpotify className='icon' /></a></li>
          </ul>
        </div>
        <div className='copy'>
          ©{new Date().getUTCFullYear()} Created by <a href="https://www.giovannimarrocco.com" target='_blank' className='me'>Giovanni Cristian Marrocco</a>
        </div>
      </Footer>
    </Layout>
  )
}

export default Home