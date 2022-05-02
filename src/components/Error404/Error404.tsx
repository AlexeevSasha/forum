import React, {FC} from "react";
import {Link} from "react-router-dom";
import error404 from '../../assets/svg/404.svg';
import styled from "styled-components";


export const Error404: FC = () => {
    return (
        <ErrorWrapper>
            <ErrorContentWrapper>
                <ErrorTitle>Страница не найдена</ErrorTitle>
                <ErrorText>Извините, что-то пошло не так</ErrorText>
                <Link to='/'><ErrorGoBack>вернуться на главную</ErrorGoBack></Link>
                <ErrorImg>
                    <img src={error404}/>
                </ErrorImg>
            </ErrorContentWrapper>
        </ErrorWrapper>
    )
}

const ErrorWrapper = styled.div`
  background-color: white;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ErrorContentWrapper = styled.div`
  width: 100%;
  margin: 0 45px;
  text-align: center;
`
const ErrorImg = styled.div`
  max-width: 800px;
  margin: 50px auto;

  & > img {
    height: 100%;
    width: 100%;
  }
`
const ErrorTitle = styled.h3`
  font-weight: 800;
  font-size: 36px;
  line-height: 49px;
  margin-top: 40px;
  color: ${({theme}) => theme.colors.purple};
  @media ${({theme}) => theme.media._768} {
    font-size: 24px;
    line-height: 24px;
  }
`
const ErrorText = styled.p`
  color: ${({theme}) => theme.colors.grey};
  font-size: 24px;
  font-weight: 400;
  margin-top: 24px;
  @media ${({theme}) => theme.media._768} {
    font-size: 15px;
    margin-top: 16px;
  }
`
const ErrorGoBack = styled.h4`
  color: ${({theme}) => theme.colors.purple};
  margin-top: 16px;
  font-weight: normal;
  font-size: 12px;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`