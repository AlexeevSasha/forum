import {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {NavMenu} from "./NavMenu";
import {ContentHeader} from "./ContentHeader";
import {MobileHeader} from "./MobileHeader";
import {useDispatch} from "react-redux";
import {getAllPostsThunk} from "../../modules/posts/postsAction";
import {useAppSelector} from "../../core/redux/reduxType";
import {RulesForum} from "../RulesForum/RulesForum";



export const Header: FC = () => {
    const dispatch = useDispatch()
    const [openRules, setOpenRules] = useState(false);
    const toggleRulesForm = useCallback(() => setOpenRules(!openRules), [openRules])
    const [openMenu, setOpenMenu] = useState(false);
    const toggleOpenMenu = useCallback(() => setOpenMenu(!openMenu), [openMenu])
    const [nameSearch, setNameSearch] = useState('')
    const handlerNameChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        setNameSearch(e.target.value);
    }, []);
    const {user} = useAppSelector(state => state.auth)
    useEffect(() => {
        dispatch(getAllPostsThunk(nameSearch))
    }, [nameSearch, dispatch])
    return (
        <>
            <Wrapper>
                <ContentHeader user={user || null} onChange={handlerNameChange} openRulesFn={toggleRulesForm}/>
                <MobileHeader onChange={handlerNameChange} toggle={toggleOpenMenu}/>
            </Wrapper>
            <NavMenu user={user || null} open={openMenu} closeMenu={toggleOpenMenu} openRulesFn={toggleRulesForm}/>
            <RulesForum visible={openRules} closeModal={toggleRulesForm}/>
        </>
    )
}

const Wrapper = styled('div')`
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: white;
  height: 80px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  @media ${({theme}) => theme.media._768} {
    height: 60px;
  }
`