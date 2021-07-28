import React, {useState} from 'react';
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import {Form} from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Loading from './Loading'

const Div = styled.div`
    display:flex;    
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 1300px) {
        flex-direction: column;
        width:100%;
    }
`
const VideoBox = styled.div`
    border: 3px solid #DCDCDC;
    background: white;
    padding:3%;
    float: flex;
    justify-content: center;
    height:480px;
    @media only screen and (min-width: 1300px) {
        width:850px;
        margin:50px 15px 40px 0;
    }
    @media only screen and (max-width: 1300px) {   
        width: 90%;
        margin:30px 0 0 0;
    }
`
const UploadedVideo = styled(ReactPlayer)`
    padding-top: 5%;
    margin: 0 auto;
    @media only screen and (max-width: 700px) {
        padding-top: -5%;
        ${({controls}) => controls ? `
        width: 90% !important;
        height: 80% !important;`
        : `width: 100% !important;
        height: 200px !important;`} 
    }
`
const BtnBox = styled.div`
    border: 3px solid #DCDCDC;
    background: white;
    padding:3%;
    float: flex;
    @media only screen and (min-width: 1300px) {
        width:325px;
        height:480px;
        margin:50px 0 40px 15px;
    }
    @media only screen and (max-width: 1300px) {
        width: 60%;
        margin: 2% 0 10px 0;
    }
`

const Button = styled.button`
    width: 300px;
    height: 60px;
    font-size: 1em;
    margin: 0 0 15px 0;
    border-radius: 15px;
    text-align: center;
    font-family: 'NanumSquare', sans-serif;
    &:hover{
        background: var(--button-hover-bg-color, #404040);
    }
    @media only screen and (max-width: 550px) {
        width: 100%;
        height:50px;
    }
`
const SelectBtn = styled(Button)`
    color: gray;
    background: white;
    border: 3px solid lightgray;

    // text-decoration-line: none;
`
const UploadBtn = styled(Button)`
    color: white;
    background-color: #D0D0D0;
    border: 3px solid #D0D0D0;

`

const VideoUpload = () => {
    const [uploadedurl, setUploadedurl] = useState(null)        //video url
    const [controlState, setControlState] = useState(false)     //video control
    const [name,setName] = useState(null)                       //video file name
    const [loading,setLoading] = useState(false)                // Loading Component state
    const [llink,setLlink] = useState('/')                      //routing link
    const onDrop = (files) => {
        setLoading(true)
        let formData = new FormData()
        const config = {
            headers: { 'Content-Type': 'multipart/form-data'}
        }
        formData.append('file', files[0])
        // axios.post('/fileUpload', formData, config)                      // ec2
        axios.post('http://localhost:5000/fileUpload', formData, config)    // local
        .then((response) => {
            setLoading(false)
            setUploadedurl(URL.createObjectURL(files[0]))
            setControlState(true)
            console.log(response.data);
            const tempname = JSON.stringify(response.data,['name'],0)
            const tempname2 = JSON.parse(tempname).name
            setName(tempname2)
            setLlink('/result')
        }).catch(err=>{setLoading(true);})
    }

    return (
        <Div>
            <VideoBox>
                <div className="title">Video</div>
                <UploadedVideo url={uploadedurl} controls={controlState}></UploadedVideo>
                {loading ? <Loading/> : <p></p>}
            </VideoBox>
            <BtnBox>
                <div className="title">Upload</div>
                <div className="button">
                <Form onSubmit>
                    <Dropzone
                        accept='video/*'
                        onDrop={onDrop}
                        multiple={false}    // 한번에 파일을 2개 이상 올릴건지
                        maxSize={100000000}    // 최대 사이즈 
                        >
                    {({getRootProps, getInputProps}) => (
                    <SelectBtn {...getRootProps()}>파일 선택<input {...getInputProps()} /></SelectBtn >)}
                    </Dropzone>
                <Link to = {{pathname: llink, aboutProps: {name}}}><UploadBtn>인물 태깅</UploadBtn></Link>
                </Form> 
                </div>
            </BtnBox>
        </Div>    
    )
}

export default VideoUpload;
