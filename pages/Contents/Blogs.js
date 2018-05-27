import { List, Avatar, Icon, Button, Spin, Modal, Input, message } from 'antd';
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
//import MarkdownIt from 'markdown-it';
import {urls, Get, Delete, Put} from '../../Tools/FetchHelper';
//var hljs = require('highlight.js');
import SimpleMDE from 'react-simplemde-editor';
import React  from 'react';
const listData = [];

// for (let i = 0; i < 23; i++) {
//     listData.push({
//         href: 'http://ant.design',
//         title: `ant design part ${i}`,
//         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//         description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//         content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//     });
//     }

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
class Blogs extends React.Component {
    constructor(prop){
        super(prop);
        this.state = {
            total: 0,
            SMDEText: "",
            update: false,
            loading: true,
            modal2Visible: false,
            userName: '',
            loadingModalSub: false
        };
    }

    GetBlogs(){
        this.setState({loading: true});
        listData.splice(0,listData.length);
        // var md = new MarkdownIt({
        //     highlight: function (str, lang) {
        //         if (lang && hljs.getLanguage(lang)) {
        //           try {
        //             return '<pre class="hljs"><code>' +
        //                    hljs.highlight(lang, str, true).value +
        //                    '</code></pre>';
        //           } catch (__) {}
        //         }
            
        //         return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        //       }
        // });
        Get(urls.blogs,(res)=>{
            for (let i = 0; i < res.length; i++) {
                listData.push({
                    id: res[i].id,
                    title: res[i].title,
                    content: this.SMDE.simplemde.options.previewRender(res[i].contents),
                    sourceContent: res[i].contents,
                    height: "10em",
                    icon: "down",
                    icontext: "展开"
                });
            }
            this.setState({total: listData.length, loading: false});
        });
    }

    componentDidMount(){
        this.GetBlogs();
    }

    componentWillReceiveProps(){
        this.GetBlogs();
    }

    SMDEOnChange = value => {
        this.setState({
            SMDEText: value
        });
    };

    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }

    onChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
    }
    emitEmpty = () => {
        this.userNameInput.focus();
        this.setState({ userName: '' });
    }
    

    handleOk = () => {
        var bodys = {
            Title: this.userNameInput.props.value,
            Contents: this.state.SMDEText
        }
        this.setState({ loadingModalSub: true });
        Put(this.editID, urls.blogs,bodys,(res)=>{
            if (res.state == -1){
                message.error(res.content);
                this.setState({ loadingModalSub: false});
            }
            else{
                message.success(res.content);
                //本地更新不走服务端
                listData.every((value,index)=>{
                    if (value.id == this.editID){
                        listData[index].title = bodys.Title;
                        listData[index].content = this.SMDE.simplemde.options.previewRender(bodys.Contents);
                        listData[index].sourceContent = bodys.Contents;
                        //listData.splice(index,1);
                        return false;
                    }
                    return true;
                });
                this.setState({ loadingModalSub: false, modal2Visible: false });
            }
        });
    }
    handleCancel = () => {
        this.setState({ modal2Visible: false });
    }

    showDeleteConfirm = (id) => {
        var _this = this;
        confirm({
            title: '确定删除？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                Delete(urls.blogs, id, (res) => {
                    if (res.state == -1){
                        message.error(res.content);
                        return;
                    }
                    //本地删除不走服务端
                    listData.every((value,index)=>{
                        if (value.id == id){
                            listData.splice(index,1);
                            return false;
                        }
                        return true;
                    });
                    _this.setState({total: _this.state.total - 1});
                });
                //console.log('OK');
            },
            onCancel() {
                //console.log('Cancel');
            },
        });
    }

    render () {
        const { userName, loadingModalSub } = this.state;
        const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        return <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                    size: "small",
                    total: this.state.total
                }}
                dataSource={listData}
                loading={this.state.loading}
                footer={<div><b>一个没什么用的Blogs</b></div>}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={
                            [
                                <a onClick={()=>{
                                    this.editID = item.id;
                                    this.setState({userName: item.title, SMDEText: item.sourceContent});
                                    this.setModal2Visible(true);
                                }}><IconText type="edit" text="编辑" /></a>,
                                <a onClick={()=>{
                                    this.showDeleteConfirm(item.id);
                                }}><IconText type="delete" text="删除" /></a>,
                                <a onClick={(a)=>{
                                    if (item.height !== ""){
                                        item.height = "";
                                        item.icon = "up";
                                        item.icontext = "收回";
                                    }
                                    else{
                                        item.height = "10em";
                                        item.icon = "down";
                                        item.icontext = "展开";
                                    }
                                    this.setState({update: this.state.update});
                                }}><IconText type={item.icon} text={item.icontext} /></a>
                            ]
                        }
                        // extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        <div className="blogs-contents" style={{height: item.height, overflow: "hidden"}} dangerouslySetInnerHTML={{ __html: item.content}}  />  
                        {/* {item.content} */}
                    </List.Item>
                )}
            />
            <Modal
                title="编辑"
                style= {{ top: 20 }}
                wrapClassName="vertical-center-modal"
                visible={this.state.modal2Visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width="80%"
                destroyOnClose={true}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>取消</Button>,
                    <Button key="submit" type="primary" loading={loadingModalSub} onClick={this.handleOk}>
                        更新
                    </Button>,
                ]}
            >
                <Input
                    placeholder="标题"
                    prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={suffix}
                    value={userName}
                    onChange={this.onChangeUserName}
                    ref={node => this.userNameInput = node}
                />
                <SimpleMDE
                    id="BlogEdit1"
                    ref={smde => this.SMDE1 = smde}
                    value={this.state.SMDEText}
                    onChange={this.SMDEOnChange}
                />
            </Modal>
            <div style={{display: "none"}}>
                <SimpleMDE
                    id="BlogEdit"
                    ref={smde => this.SMDE = smde}
                    value=""
                />
            </div>
        </div>;
    }
}

export default Blogs;