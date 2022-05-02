import {FC, useCallback, useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {CrossIcon, ErrorIcon} from "../SVG/SVG";

interface IProps {
    error: string | undefined;
    callback?: () => void;
}

export const Notification: FC<IProps> = ({error, callback}) => {
    const [visible, setVisible] = useState<boolean>(false)

    const close = useCallback(() => {
        setVisible(false)
        callback && callback()
    }, [callback])

    useEffect(() => {
        if (error) setVisible(true)
    }, [error])
    if (!visible || !error) return null;
    return (
        <Wrapper>
            <Grid>
                <ErrorIcon/>
                <p>{error}</p>
            </Grid>
            <Cross onClick={close}><CrossIcon/></Cross>
        </Wrapper>
    )
}


const Grid = styled.div`
  display: grid;
  grid-template-columns: 50px calc(100% - 60px);
  align-items: center;
  gap: 10px;

  & > svg {
    width: 40px;
    height: 40px;
  }

  & > p {
    color: black;
    font-weight: 600;
  }

  @media ${({theme}) => theme.media._480} {
    grid-template-columns: 30px calc(100% - 40px);
    & > svg {
      width: 30px;
      height: 30px;
    }
  }
`

const animate = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0%);
    opacity: 1;
  }
`
const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FEA4A4;
  border: 1.5px solid #F00D0D;
  border-radius: 15px;
  color: white;
  box-shadow: 0 0 8px -2px rgba(34, 60, 80, 0.19);
  padding: 10px 10px;
  z-index: 300;
  font-size: 16px;
  right: 50px;
  top: 50px;
  animation: ${animate} 0.5s ease-out forwards;
  margin-left: 30px;
  @media ${({theme}) => theme.media._480} {
    right: 10px;
  }
`

const Cross = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background: white;
  }
`