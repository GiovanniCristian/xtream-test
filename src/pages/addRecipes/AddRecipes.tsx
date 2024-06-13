import { Layout, Typography } from 'antd'
import { Header, Content } from 'antd/es/layout/layout'
import './addRecipes.css'

const { Title } = Typography;

const AddRecipes = () => {
  return (
    <Layout className='add-layout'>
    <Header className='add-header'>
      <Title level={2} style={{margin: 0}} className='add-title'>Aggiungi Ricetta</Title>
    </Header>
    <Content className='add'>
      <div>
        Ciao
      </div>
    </Content>
  </Layout>
  )
}

export default AddRecipes