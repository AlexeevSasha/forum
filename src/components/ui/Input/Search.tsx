import {FC, InputHTMLAttributes, ChangeEvent} from "react";
import styled from "styled-components";
import {SearchIcon} from "../../SVG/SVG";
import {useTranslation} from "react-i18next";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Search: FC<Props> = ({onChange, ...attr}) => {
    const {t} = useTranslation();
    return (
        <SearchWrapper>
            <InputStyle
                type="search"
                placeholder={t('search')}
                onChange={onChange}
                {...attr}
            />
            <IconStyle> <SearchIcon/></IconStyle>
        </SearchWrapper>
    );
};


const SearchWrapper = styled.div`
  position: relative;
  max-width: 365px;
  width: 100%;
`
const InputStyle = styled.input`
  background: ${({theme}) => theme.colors.lightestGrey};
  border: none;
  max-width: 366px;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  padding: 0 35px 0 12px;
  color: ${({theme}) => theme.colors.darkGrey};
  transition: all .2s linear;
`

const IconStyle = styled.button`
  border: none;
  background: transparent;
  position: absolute;
  right: 10px;
  height: 16px;
  top: 50%;
  cursor: pointer;
  transform: translateY(-50%);
`

