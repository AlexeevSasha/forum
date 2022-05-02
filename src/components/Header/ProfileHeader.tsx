import {FC, memo, useCallback, useRef, useState} from "react";
import styled from "styled-components";
import {OutPutIcon, SettingIcon} from "../SVG/SVG";
import {useDispatch} from "react-redux";
import {signOut} from "../../modules/auth/authSlice";
import useOutsideClick from "../../hooks/useOutsideClose";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";


interface IProps {
    name: string;
    img: string | null;
}


export const ProfileHeader: FC<IProps> = memo(({name, img}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const sortRef = useRef(null)
    useOutsideClick(sortRef, () => {
        setVisible(false)
    });
    const toggle = useCallback(() => setVisible(!visible), [visible])
    const outPut = useCallback(() => dispatch(signOut()), [])

    return (
        <Wrapper ref={sortRef}>
            <p>{name}</p>
            <Avatar onClick={toggle}>
                <img src={img || ''} alt=""/>
            </Avatar>
            <Modal open={visible}>
                <ul>
                    <LinkStyle to={`profile/${name}`}><LIStyle
                        onClick={() => setVisible(false)}><SettingIcon/>{t('setting.setting')}</LIStyle></LinkStyle>
                    <LIStyle onClick={outPut}><OutPutIcon/>{t('auth.signOut_btn')}</LIStyle>
                </ul>
            </Modal>
        </Wrapper>
    )
})

const LinkStyle = styled(Link)`
  color: inherit;
`

const LIStyle = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  cursor: pointer;
  padding: 10px 30px 10px 15px;
  border-bottom: 1px solid #B3AFD7;

  &:hover {
    background: ${({theme}) => theme.colors.lightestGrey};
  }

  & > svg {
    margin-right: 10px;
  }
`

const Modal = styled.div<{ open: boolean }>`
  z-index: 150;
  display: ${({open}) => open ? 'block' : 'none'};
  position: absolute;
  max-width: 200px;
  width: 100%;
  top: 70px;
  border-radius: 10px;
  background: #EAE8FA;
  box-shadow: 0 0 9px 0 rgba(34, 60, 80, 0.1);

  & > ul {
    padding: 0;
  }

`

const Wrapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 20px;

  & > p {
    font-weight: 600;
    font-size: 20px;
  }

  & > svg {
    cursor: pointer;
  }
`


const Avatar = styled.div`
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 50%;
  cursor: pointer;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
