import Head from '../components/head'
import stylesheet from '../styles/index.less'
import Link from 'next/link';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

import Blogs from './Contents/Blogs';
import Write from './Contents/Write';

class Index extends React.Component {
  constructor (prop) {
    super(prop);
    this.state = {pageIndex: 0}
  }
  render () {

    let page = {};
    switch (this.state.pageIndex){
      case 0: 
        page = <Blogs />;
      break;
      case 1:
        page = <Write />;
      break;
    }

    return <Layout>
      <Head title="MyBlogs" />
      {/* <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header> */}
      <Content>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Layout hasSider={true}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            defaultCollapsed={true}
            onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
          >
            <div className="logo">
              <a className="name" href="https://github.com/Ling2048" >
                github
              </a>
              {/* <p className="name">L2048</p> */}
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" onClick={()=>{
                  this.setState({pageIndex: 0});
                }}>
                <Icon type="book" />
                <span className="nav-text" >Blog</span>
              </Menu.Item>
              <Menu.Item key="2" onClick={()=>{
                  this.setState({pageIndex: 1});
                }}>
                <Icon type="book" />
                <span className="nav-text" >Write</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: '24px 16px 0' }}>
              {page}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              {/* Ant Design ©2016 Created by Ant UED */}
            </Footer>
          </Layout>
        </Layout>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2016 Created by Ant UED
      </Footer> */}

      <style jsx>{`
      .logo {
        height: 32px;
        background: rgba(255,255,255,.2);
        margin: 16px;
        text-align: center;
        color: white;
      }
      .name {
        line-height: 32px;
      }
      `}</style>
      <style jsx global>{ stylesheet }</style>
    </Layout>;
  }
} 

export default Index;

// export default () => (
  
// )