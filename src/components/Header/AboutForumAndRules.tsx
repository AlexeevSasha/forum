import {FC} from "react";
import myPdf from "../../assets/files/about-author.pdf";
import styled from "styled-components";
import {useTranslation} from "react-i18next";


interface IProps {
    openRules: () => void;
}

export const AboutForumAndRules: FC<IProps> = ({openRules}) => {
    const {t} = useTranslation();
    return (
        <>
            <ButtonStyle onClick={openRules}>{t('forum_rules')}</ButtonStyle>
            <LinkA href={myPdf} download='About_Me.pdf'><ButtonStyle>{t('about_author')}</ButtonStyle></LinkA>
        </>
    )
}

const LinkA = styled.a`
  color: inherit;
`
const ButtonStyle = styled.div`
  background: none;
  border: none;
  cursor: pointer;
  padding: 15px;

  &:hover {
    color: ${({theme}) => theme.colors.purple};
    background: #E8E7F4;
    border-radius: 10px;
  }
`