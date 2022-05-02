import styled from "styled-components";
import {Link} from "react-router-dom";

export const LinkStyle = styled(Link)`
  color: ${({theme}) => theme.colors.purple};
  margin-left: 10px;
  &:hover {
    text-decoration: underline;
  }
`

export const Text = styled.div`
    margin: 20px 0 40px;
  @media ${({theme}) => theme.media._480} {
    font-size: 12px;
  }
`

export const Title = styled.h2`
  color: ${({theme}) => theme.colors.darkGrey};
  margin: 20px 0;
  @media ${({theme}) => theme.media._480} {
    font-size: 20px;
  }
`

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  max-width: 700px;
  width: 100%;
  border-radius: 20px;
  margin: 24px;
  padding: 16px;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const Back = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 13px;
  cursor: pointer;
  @media ${({theme}) => theme.media._480} {
    font-size: 10px;
    right: 20px;
  }
`

export const Absolute = styled.div`
  position: absolute;
  top: 45%;
  bottom: 0;
  left: 0;
  right: 0;
`

