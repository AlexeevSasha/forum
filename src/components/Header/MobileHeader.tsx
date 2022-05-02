import {ChangeEvent, FC} from "react";
import {Logo, MenuIcon} from "../SVG/SVG";
import {Search} from "../ui/Input/Search";
import {Link} from "react-router-dom";
import styled from "styled-components";

interface IProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    toggle: () => void;
}

export const MobileHeader: FC<IProps> = ({onChange, toggle}) => {
    return (
        <Container>
            <MenuBtn onClick={toggle}><MenuIcon/></MenuBtn>
            <Flex>
                <Search onChange={onChange}/>
                <Link to='/'><Logo/></Link>
            </Flex>
        </Container>
    )
}


const Flex = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  & > a > svg {
    margin-top: 2px;
    width: 30px;
    height: 40px;
  }
`

const MenuBtn = styled.button`
  position: relative;
  border-radius: 50%;
  padding: 0;
  border: none;
  cursor: pointer;
  background: transparent;
  transition: all .3s linear;

  &:hover {
    &:before {
      content: '';
      z-index: -1;
      position: absolute;
      height: 50px;
      width: 50px;
      top: -10px;
      left: -8px;
      border-radius: 50%;
      background: ${({theme}) => theme.colors.lightestGrey};
    }
  }
`

const Container = styled('div')`
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  max-width: 768px;
  width: 100%;
  margin: 0 10px;
  display: none;
  @media ${({theme}) => theme.media._768} {
    display: flex;
  }
`
