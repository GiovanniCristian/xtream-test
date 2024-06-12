import { Layout, Typography } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import './home.css'
import { ReactTyped } from 'react-typed';

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
      <ReactTyped
            strings={phrases}
            typeSpeed={80}
            backSpeed={60}
            loop
            className='typed'
          />
      </Header>
      <Content className='home'>
        <div>
          {/* Carousel */}
        </div>
      </Content>
      <Footer className='footer'>
        ©{new Date().getUTCFullYear()} Created by Giovanni Cristian Marrocco
      </Footer>
    </Layout>
  )
}

export default Home