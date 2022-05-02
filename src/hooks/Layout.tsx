import {FC} from "react";
import {Outlet} from "react-router-dom";
import {Header} from "../components/Header/Header";
import styled from "styled-components";
import {Warning} from "../components/Warning/Warning";

export const Layout: FC = () => {
    return (
        <>
            <Header/>
            <Wrapper>
                    <Outlet/>
            </Wrapper>
            <Warning/>
        </>
    )
}

const Wrapper = styled('div')`
  padding: 80px 16px 0 ;
  margin: 0 auto;
  max-width: 1460px;
  width: 100%;
  @media ${({theme}) => theme.media._768} {
    padding: 60px 16px 0 ;
  }
`
