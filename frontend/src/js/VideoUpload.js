import React, {useState} from 'react';
// 깔아야 할 것? 확인해보기!!
import styled from 'styled-components';
import { Link } from "react-router-dom";
import {Form} from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import ReactPlayer from 'react-player';

const SelectBtn = styled.button`
    width: 48%;
    height: 50%;
    margin : 2%;
    color: white;
    font-size: 3em;
    background-color: black;
    border: 0px;
    border-radius: 15px;
    text-align: center;
    text-decoration-line: none;
    font-family: 'Do Hyeon';
    box-shadow: 1px 4px 0 rgb(0,0,0,0.5);

    &:hover{
        background: var(--button-hover-bg-color, #404040);
    }

    &:active {
        box-shadow: 1px 1px 0 rgb(0,0,0,0.5);
        position: relative;
        top:2px;
    }
`
const UploadBtn = styled.button`
    width: 120%;
    height: 50%;
    margin : 2%;
    color: white;
    font-size: 3em ;
    background-color: black;
    border: 0px;
    border-radius: 15px;
    text-align: center;
    font-family: 'Do Hyeon';
    box-shadow: 1px 4px 0 rgb(0,0,0,0.5);

    &:hover{
        background: var(--button-hover-bg-color, #404040);
    }

    &:active {
        box-shadow: 1px 1px 0 rgb(0,0,0,0.5);
        position: relative;
        top:2px;
    }
`
const Box = styled.div`
    width:100%;
    height:50%;
    border: 0px;
    display:flex;
    align-items:center;
    justify-content:flex-start;
`


function VideoUploadPage() {
    const [uploadedurl, setUploadedurl] = useState(null);
    const onDrop = (files) => {
        let formData = new FormData()
        
        const config = {
            header: { 'content-type': 'multipart/form-data'}
        }
        formData.append('file', files[0])
        axios.post('http://localhost:5000', formData, config)
        .then((response) => {
            setUploadedurl(URL.createObjectURL(files[0]))
        })
    }

    return (
        <div>
            <Form  onSubmit>
                <ReactPlayer url={uploadedurl} controls="true"></ReactPlayer>
                <div>
                <Box>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}    // 한번에 파일을 2개 이상 올릴건지
                        maxSize={100000000}    // 최대 사이즈 
                    >
                    {({getRootProps, getInputProps}) => (
                        <SelectBtn {...getRootProps()}>
                        파일 선택
                        <input {...getInputProps()}/>
                        </SelectBtn >
                    )}
                    </Dropzone>
                    <Link to="/result"> 
                        <UploadBtn >동영상 업로드</UploadBtn>
                    </Link>
                </Box>
                </div>
            </Form>
        </div>
    )
}

export default VideoUploadPage;
