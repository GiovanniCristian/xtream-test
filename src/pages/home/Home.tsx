import { Layout, Typography, Button } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import './home.css'
import { ReactTyped } from 'react-typed';
import Lottie from 'lottie-react';
import Homepage from '../../assets/json/homepage.json'
import { Link } from 'react-router-dom';

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
        <Lottie animationData={Homepage} style={{ width: '30%' }} />
      </Content>
      <Content className='home-content-bottom'>
        <ReactTyped
          strings={phrases}
          typeSpeed={80}
          backSpeed={60}
          loop
          className='typed'
        />
        <Title level={5} style={{margin: '1.3rem auto'}}>Since you're here, take a look to our pages</Title>
        <div className='home-pages-link'>
          <Button className='home-btn'><Link to="recipes" className='menu-link'>Recipes</Link></Button>
          <Button className='home-btn'><Link to="add" className='menu-link'>Add Recipes</Link></Button>
        </div>
      </Content>
      <Footer className='footer'>
        ©{new Date().getUTCFullYear()} Created by Giovanni Cristian Marrocco
      </Footer>
    </Layout>
  )
}

export default Home