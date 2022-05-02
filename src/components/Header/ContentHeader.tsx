import {ChangeEvent, FC} from "react";
import {Link} from "react-router-dom";
import {Logo} from "../SVG/SVG";
import {Search} from "../ui/Input/Search";
import {ProfileHeader} from "./ProfileHeader";
import {Button} from "../ui/Button/Button";
import styled from "styled-components";
import {IUser} from "../../api/auth/authDto";
import {AboutForumAndRules} from "./AboutForumAndRules";
import {useTranslation} from "react-i18next";
import {Language} from "../Language/Language";

interface IProps {
    user: IUser | null;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    openRulesFn: () => void;
}

export const ContentHeader: FC<IProps> = ({user, onChange, openRulesFn}) => {
    const {t} = useTranslation();
    return (
        <Container>
            <FlexRight>
                <Link to='/'><Logo/></Link>
                <Language/>
                <AboutForumAndRules openRules={openRulesFn}/>
            </FlexRight>
            <Item>
                <Search onChange={onChange}/>
                {user ? <ProfileHeader name={user?.userName} img={user?.avatarUrl}/> :
                    <LinkStyle to='/login'><Button widthCustom={150}>{t('auth.signIn_btn')}</Button></LinkStyle>}
            </Item>
        </Container>
    )
}


const LinkStyle = styled(Link)`
  max-width: 150px;
  width: 100%;
`
const FlexRight = styled('div')`
  display: flex;
  align-items: center;
  gap: 40px;
  flex-grow: 1;
  @media ${({theme}) => theme.media._980} {
    gap: 5px;
    font-size: 13px;
  }
`

const Item = styled('div')`
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: right;
  flex-grow: 2
`

const Container = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  max-width: 1444px;
  width: 100%;
  margin: 0 16px;
  @media ${({theme}) => theme.media._768} {
    display: none;
  }
`

