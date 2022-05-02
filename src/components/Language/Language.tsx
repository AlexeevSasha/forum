import {FC, useCallback, useRef, useState} from "react";
import i18n from "i18next";
import styled from "styled-components";
import {ENIcon, LanguageIcon, RUIcon} from "../SVG/SVG";
import useOutsideClick from "../../hooks/useOutsideClose";


export const Language: FC = () => {
    const [open, setOpen] = useState(false);
    const toggle = useCallback(() => setOpen(!open), [open]);
    const languageRU = useCallback(() => i18n.changeLanguage("ru"), [])
    const languageEN = useCallback(() => i18n.changeLanguage("en"), [])
    const sortRef = useRef(null);
    useOutsideClick(sortRef, () => {
        setOpen(false)
    });
    return (
        <Wrapper ref={sortRef}>
            <SVG  open={open} onClick={toggle}><LanguageIcon/></SVG>
            <Btn open={open}>
                <button onClick={languageRU}>
                    <RUIcon/>
                    RU
                </button>
                <button onClick={languageEN}>
                    <ENIcon/>
                    EN
                </button>
            </Btn>
        </Wrapper>
    )
}


const Btn = styled.div<{ open: boolean }>`
  box-shadow: 0 0 8px 0 rgba(34, 60, 80, 0.2);
  display: ${({open}) => open ? 'flex' : 'none'};
  gap: 20px;
  position: absolute;
  top: 40px;
  background: white;
  padding: 10px;

  & > button {
    color: ${({theme}) => theme.colors.grey};
    border: 1px solid ${({theme}) => theme.colors.lightGrey};
    cursor: pointer;
    background: ${({theme}) => theme.colors.lightestGrey1};

    & > svg {
      width: 50px;
      height: 40px;
      border-radius: 5px;
    }
  }
`

const SVG = styled.div<{ open: boolean }>`
  & > svg {
    width: 30px;
    fill: ${({theme, open}) => open ? theme.colors.darkGrey : '#B0AFAF'};
    cursor: pointer;
  }
`

const Wrapper = styled.div`
  position: relative;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`