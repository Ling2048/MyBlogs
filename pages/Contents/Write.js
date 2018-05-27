import React  from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { Button, Input, Icon, message } from 'antd';
import {urls,Post} from '../../Tools/FetchHelper';

class Write extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            loading: false,
            userName: '',
            SMDEText: "",
        };
    }

    SMDEOnChange = value => {
        this.setState({
            SMDEText: value
        });
    };
    // state = {
    //     loading: false,
    // }

    enterLoading = () => {
        //console.log(this.userNameInput.props.value);
        //console.log(this.state.SMDEText);
        //return;
        var bodys = {
            Title: this.userNameInput.props.value,
            Contents: this.state.SMDEText
        }
        this.setState({ loading: true });
        Post(urls.blogs,bodys,(res)=>{
            if (res.state == -1)
                message.error(res.content);
            else
                message.success(res.content);
            this.setState({ loading: false });
        });
    }

    emitEmpty = () => {
        this.userNameInput.focus();
        this.setState({ userName: '' });
    }
    onChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
    }
    
    render() {
        const { userName } = this.state;
        const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        return (
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Input
                    placeholder="标题"
                    prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={suffix}
                    value={userName}
                    onChange={this.onChangeUserName}
                    ref={node => this.userNameInput = node}
                />
                <SimpleMDE
                    ref={smde => this.SMDE = smde}
                    value={this.state.SMDEText}
                    onChange={this.SMDEOnChange}
                />
                <div>
                    <Button style={{width: "100px"}} type="primary" loading={this.state.loading} onClick={this.enterLoading}>
                        发布
                    </Button>
                </div>
                <style jsx>{`
                .anticon-close-circle {
                    cursor: pointer;
                    color: #ccc;
                    transition: color 0.3s;
                    font-size: 12px;
                }
                .anticon-close-circle:hover {
                    color: #999;
                }
                .anticon-close-circle:active {
                    color: #666;
                }
                `}</style>
            </div>
        );
    }
}

export default Write;

{/* <button onClick={()=>{
    // 通过fetch获取百度的错误提示页面
    fetch('http://127.0.0.1:19458/api/values',{
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        credentials: 'include'
    }) // 返回一个Promise对象
    .then((res)=>{
        return res.json()// res.text()是一个Promise对象
    })
    .then((res)=>{
        console.log(res) // res是最终的结果
    })
}}>测试api</button> */}