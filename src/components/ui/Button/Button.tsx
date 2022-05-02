import {FC, ButtonHTMLAttributes} from "react";
import styled from "styled-components";


interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: string ;
    widthCustom?: number
}

export const Button : FC<IProps> = ({children, widthCustom, ...attr}) => {
    return (
        <ButtonStyle widthCustom={widthCustom}  {...attr} >{children}</ButtonStyle>
    )
}

const ButtonStyle = styled.button<{widthCustom?: number}>`
    background: ${({theme}) => theme.colors.purple};
  border-radius: 20px;
  height: 40px;
  border: none;
  color: white;
  max-width: ${({widthCustom}) => widthCustom ? `${widthCustom}px` : 'none'};
  width: 100%;
  padding: 10px 30px;
  cursor: pointer;
  transition: all .2s linear;
  
  &:hover {
    background: #41389F;
  }

  &:active {
    background: #6159B4;
    transform: translateY(2px);
  };

  &:disabled {
    color: ${({ theme }) => theme.colors.lightGrey};
    background: ${({ theme }) => theme.colors.lightestGrey1};
    cursor: default;
  };
`