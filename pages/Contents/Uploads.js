import React  from 'react';
import { Upload, Button, Icon } from 'antd';
import {urls,Post} from '../../Tools/FetchHelper';

const fileList = [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  }, {
    uid: -2,
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  }];
  
  const props = {
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
    defaultFileList: [...fileList],
  };
  
  const props2 = {
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
    defaultFileList: [...fileList],
    className: 'upload-list-inline',
  };

class Uploads extends React.Component {
    constructor(prop) {
        super(prop);
    }
    
    render() {
        return (
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> upload
                        </Button>
                        </Upload>
                        <br />
                        <br />
                        <Upload {...props2}>
                        <Button>
                            <Icon type="upload" /> upload
                        </Button>
                    </Upload>
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

export default Uploads;