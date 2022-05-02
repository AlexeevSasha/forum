import {FC, memo, useCallback} from "react";
import styled from "styled-components";
import {defaultAvatar} from "../../hooks/GeneratorAvatar";
import {OutPutIcon, SettingIcon} from "../SVG/SVG";
import {Link} from "react-router-dom";
import {IUser} from "../../api/auth/authDto";
import {AboutForumAndRules} from "./AboutForumAndRules";
import {signOut} from "../../modules/auth/authSlice";
import {useDispatch} from "react-redux";
import {Button} from "../ui/Button/Button";
import {useTranslation} from "react-i18next";
import {Language} from "../Language/Language";


interface IProps {
    user: IUser | null;
    open: boolean;
    closeMenu: () => void;
    openRulesFn: () => void;
}

export const NavMenu: FC<IProps> = memo(({user, open, closeMenu, openRulesFn}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const outPut = useCallback(() => {
        dispatch(signOut())
        closeMenu()
    }, [closeMenu])
    return (
        <>
            <Wrapper open={open}>
                {user ? <>
                    <Profile>
                        <img src={user?.avatarUrl || defaultAvatar()} alt=""/>
                        <span>{user?.userName || 'Гость'}</span>
                    </Profile>
                    <ul style={{padding: 0}}>
                        <LinkStyle to={`profile/${'alex'}`}><LIStyle
                            onClick={closeMenu}><SettingIcon/>{t('setting.setting')}</LIStyle>
                        </LinkStyle>
                        <LIStyle onClick={outPut}><OutPutIcon/>{t('auth.signOut_btn')}</LIStyle>

                    </ul>
                </> : <LinkStyle to='/login'><Button>{t('auth.signIn_btn')}</Button></LinkStyle>}

                <Flex>
                    <AboutForumAndRules openRules={openRulesFn}/>
                    <div style={{marginTop: 10, paddingBottom: 10}}><Language/></div>
                </Flex>
            </Wrapper>
            <BlackDiv active={open} onClick={closeMenu}/>
        </>
    )
})


const Flex = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${({theme}) => theme.colors.lightestGrey};
  background: ${({theme}) => theme.colors.lightestGrey};
  border-radius: 10px;
`

const LinkStyle = styled(Link)`
  color: inherit;

  & > button {
    margin-top: 50px;
  }
`

const LIStyle = styled.li`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: start;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background: ${({theme}) => theme.colors.lightestGrey};
  }

  & > svg {
    margin-right: 10px;
  }
`

const Profile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-bottom: 16px;
  margin: 24px 0;

  &::before {
    position: absolute;
    content: '';
    width: calc(100% + 20px);
    left: -10px;
    bottom: 0;
    height: 1px;
    background-color: ${({theme}) => theme.colors.lightGrey};
  }

  & > img {
    width: 60px;
    height: 60px;
  }

  & > span {
    color: ${({theme}) => theme.colors.darkGrey};
    margin-left: 12px;
    font-weight: 600;
  }
`


const Wrapper = styled.div<{ open: boolean }>`
  display: none;
  position: fixed;
  z-index: 2;
  top: 60px;
  left: 0;
  background: white;
  width: 60%;
  height: 100%;
  padding: 0 10px;
  transition: all .3s linear;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transform: translateX(${({open}) => open ? 0 : '-100%'});
  @media ${({theme}) => theme.media._768} {
    display: block;
  }
`


const BlackDiv = styled.div<{ active: boolean }>`
  display: none;
  z-index: 1;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.5s ease;
  ${({active}) =>
          active &&
          `
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `};
  @media ${({theme}) => theme.media._768} {
    display: block;
  }
`






