import {FC} from "react";
import styled from "styled-components";
import {useTranslation} from "react-i18next";


interface IProps {
    visible: boolean
    closeModal: () => void;
}

export const RulesForum: FC<IProps> = ({visible, closeModal}) => {
    const {t} = useTranslation();
    return (
        <>
            <Modal active={visible}>
                <h3>{t('rules.title')}</h3>
                <Item>
                    <h5>{t('rules.communion')}</h5>
                    <ul>
                        <li>
                            1.&nbsp; {t('rules._1')}
                            <World>
                                <span>(%!XXX1!%</span>
                                <span>^xxXxx^</span>
                                <span>!@#TTT(*&)</span>
                            </World>
                            <RedDiv>{t('rules._1_1')}</RedDiv>
                        </li>
                        <li>
                            2.&nbsp; {t('rules._2')} &nbsp;
                            <span
                                style={{color: '#F00D0D'}}>{t('rules._2_2')}</span>
                        </li>
                        <li>
                            3.&nbsp; {t('rules._3')}
                        </li>
                    </ul>
                </Item>
                <Item>
                    <h5>{t('rules.content')}</h5>
                    <ul>
                        <li>
                            1.&nbsp; {t('rules._4')}
                        </li>
                        <li>
                            2.&nbsp; {t('rules._5')}
                        </li>
                    </ul>
                </Item>
                <Footer>{t('rules.footer')}</Footer>
            </Modal>
            <ModalBg active={visible} onClick={closeModal}></ModalBg>
        </>
    )
}


const Item = styled.div`
  & > h5 {
    font-size: 16px;
    @media ${({theme}) => theme.media._768} {
      font-size: 14px;
      margin: 0;
      padding: 10px;
    }
  }

  & > ul {
    margin: 0;
  }

  & > ul > li {
    padding: 10px;
    @media ${({theme}) => theme.media._768} {
      font-size: 12px;
      padding: 5px;
    }
  }
`

const Modal = styled.div<{ active: boolean }>`
  position: fixed;
  max-width: 1000px;
  width: 95%;
  z-index: 200;
  padding: 15px 10px 0;
  border: 1px solid ${({theme}) => theme.colors.darkGrey};
  top: 30px;
  left: 50%;
  transform: translateY(${({active}) => active ? '0' : '-110%'}) translateX(-50%);
  background: white;
  border-radius: 20px;
  box-shadow: 0 0 8px 0 rgba(34, 60, 80, 0.2);
  transition: .7s ease-out;

  & > h3 {
    text-align: center;
    padding: 10px 0 20px;
    font-size: 20px;
    border-bottom: 1px solid ${({theme}) => theme.colors.lightGrey};
    @media ${({theme}) => theme.media._768} {
      font-size: 16px;
      padding: 10px 0 15px;
    }
  }
`;

const ModalBg = styled.div<{ active: boolean }>`
  z-index: 199;
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
  `}
`;

const World = styled.div`
  margin: 5px 0;
  display: flex;
  gap: 50px;
  justify-content: center;
  padding: 10px;
  background: #FEA4A4;
  border: 1px solid #F00D0D;
  border-radius: 10px;
  font-weight: bold;
  @media ${({theme}) => theme.media._768} {
    gap: 20px;
    font-size: 12px;
  }
`
const RedDiv = styled.div`
  text-align: center;
  color: #F00D0D;
  font-weight: 600;
`
const Footer = styled.div`
  margin-top: 10px;
  text-align: center;
  padding: 20px;
  color: #000;
  font-weight: bold;
  border-top: 1px solid ${({theme}) => theme.colors.lightGrey};
  @media ${({theme}) => theme.media._768} {
    font-size: 14px;
    padding: 10px;
  }
`
