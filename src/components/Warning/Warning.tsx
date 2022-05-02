import {FC, useCallback, useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {useAppSelector} from "../../core/redux/reduxType";
import {useTranslation} from "react-i18next";


const local = localStorage.getItem('warning');

export const Warning: FC = () => {
    const {t} = useTranslation();
    const { user } = useAppSelector(state => state.auth)
    const [open, setOpen] = useState<boolean | null>(true)

    const close = useCallback(() => {
        setOpen(false)
        localStorage.setItem('warning', String(Date.now() + (24 * 3600 * 1000)));
    }, [])

    useEffect(() => {
        if (local === null)  {
            setOpen(true)
            return;
        }
        if (Date.now() >= +local || user) {
            localStorage.removeItem('warning')
        }
    }, [local, user])

    if (open === null || user) return null;
    return (
        <Notification visible={open} onClick={close}>
            <p><b>{t('warning.text')}</b></p>
            <p>{t('warning.title')}</p>
        </Notification>
    )
}

const animate = keyframes`
  0% {
    transform: translateX(150%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
`
const back = keyframes`
  0% {
    transform: translateX(0%);
    opacity: 1;
  }
  100% {
    transform: translateX(150%);
    opacity: 0;
  }
`

const Notification = styled.div<{ visible?: boolean }>`
  position: fixed;
  bottom: 50px;
  right: 50px;
  text-align: center;
  background: #FF7E7E;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 11px 0px rgba(124, 0, 20, 0.3);
  animation: ${({visible}) => visible ? animate : back} 0.5s ease-out forwards;
 
  & > p {
    margin-top: 10px;
  }
  @media ${({theme}) => theme.media._768} {
    margin-left: 20px;
    right: 20px;
  }
`