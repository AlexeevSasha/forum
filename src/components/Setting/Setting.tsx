import {FC, useCallback} from "react";
import styled from "styled-components";
import {EditLogin} from "./miniForm/EditLogin";
import {EditPassword} from "./miniForm/EditPassword";
import {useAppSelector} from "../../core/redux/reduxType";
import {IUser} from "../../api/auth/authDto";
import {Notification} from "../Notification/Notification";
import {useDispatch} from "react-redux";
import {removeError} from "../../modules/auth/authSlice";
import {EditImages} from "./miniForm/EditImage";
import {useTranslation} from "react-i18next";



export const Setting: FC = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const  clearError = useCallback(() => dispatch(removeError()), [])
    const {user, error} = useAppSelector(state => state.auth)
    const {id} = user as IUser;
    return (
        <Wrapper>
            <AllPosts>{t('setting.setting')}</AllPosts>
            <Flex>
                <EditLogin id={id}/>
                <EditPassword id={id}/>
                <EditImages id={id}/>
            </Flex>
            <Notification error={error} callback={clearError}/>
        </Wrapper>
    )
}

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const Wrapper = styled.div`
  padding-top: 10px;
`

const AllPosts = styled.div`
  padding: 20px 0;
  font-size: 24px;
  font-weight: 700;
`
