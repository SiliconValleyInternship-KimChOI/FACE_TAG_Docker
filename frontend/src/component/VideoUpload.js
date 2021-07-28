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
        width:800px;
        margin:50px 15px 40px 0;
    }
    @media only screen and (max-width: 1300px) {   
        width: 90%;
        margin:30px 0 0 0;
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
        color:white;
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
const Loadingzone=styled.div`
width: 100%;
text-align: center;
position:fixed;
top:50%; left:45%; 
`



const VideoUpload = () => {
    const [uploadedurl, setUploadedurl] = useState(null)        //video url
    const [controlState, setControlState] = useState(false)     //video control
    const [name,setName] = useState(null)                       //video file name
    const [loading,setLoading] = useState(false)                // Loading Component state
    const [llink,setLlink] = useState('/')                      //routing link
    const [color, setColor] = useState("#F8F8F8");
    const [playerborder, setPlayerborder] = useState(7);
    const onDrop = (files) => {
        setColor("white")
        setLoading(true)
        setPlayerborder(0)
        let formData = new FormData()
        const config = {
            headers: { 'Content-Type': 'multipart/form-data'}
        }
        formData.append('file', files[0])
        axios.post('http://localhost:5000/fileUpload', formData, config)
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
                <Dropzone
                accept='video/*'
                onDrop={onDrop}
                multiple={false}    // 한번에 파일을 2개 이상 올릴건지
                maxSize={100000000}    // 최대 사이즈 
                noClick="true"
                onDragEnter={()=>setColor("#F0F0F0")}                
                > 
                    {({getRootProps, getInputProps}) => (
                        <section className="zone">
                        <div {...getRootProps()} className="zone">
                            <input {...getInputProps()} />
                            <Player color={color} playerborder={playerborder}>
                                <ReactPlayer height='100%' width='100%' url={uploadedurl} controls={controlState}/>
                            </Player>                      
                        </div>
                        </section>
                    )}
                </Dropzone>
                <Loadingzone>
                 {loading ? <Loading/> : <p></p>}
                </Loadingzone> 
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
                <Link to = {{pathname: llink, aboutProps: {name}}}><UploadBtn>파일 업로드</UploadBtn></Link>
                </Form> 
                </div>
            </BtnBox>
        </Div>
    );
}

const Player = styled.div`
  background: ${props => props.color};
  border: 1px dashed lightgray;
  border-width:${props => props.playerborder};
  width: 100%;
  height:90%;
`
  

export default VideoUpload;