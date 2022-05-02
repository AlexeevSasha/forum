import {FC, useCallback, useState} from "react";
import {CrossIcon} from "../SVG/SVG";
import styled from "styled-components";


interface IProps {
    type: 'image' | 'audio' | 'video';
    src: string;
    callback?: () => void;
}


const mediaTag = {
    'image': (src: string) => <img src={src}/>,
    'audio': (src: string) => <audio src={src} controls/>,
    'video': (src: string) => <video src={src} controls/>,
}


export const MediaPreview: FC<IProps> = ({type, src, callback}) => {
    const [visible, setVisible] = useState(true)
    const close = useCallback(() => {
        setVisible(false)
        callback && callback()
    }, [callback])
    if (!visible) return null;
    return (
        <Wrapper>
            {mediaTag[type](src)}
            <Cross onClick={close}><CrossIcon/></Cross>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 200px;
  height: 200px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  & > audio {
    width: 200px;
  }

  & > video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media ${({theme}) => theme.media._480} {

  }
`

const Cross = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  top: 0;
  right: 0;

  & > svg {

  }

  &:hover {
    background: ${({theme}) => theme.colors.lightestGrey1};
  }
`