import {SignUpForm} from "../../components/Auth/SignUpForm";
import {Wrapper, Container, Title, Text, LinkStyle, Absolute} from './styles'
import {Logo} from "../../components/SVG/SVG";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../core/redux/reduxType";
import {useCallback, useEffect} from "react";
import {LOADING_STATUS} from "../../modules/types";
import {Spinner} from "../../components/Spinner/Spinner";
import {Notification} from "../../components/Notification/Notification";
import {useDispatch} from "react-redux";
import {removeError} from "../../modules/auth/authSlice";
import {useTranslation} from "react-i18next";


export const SingUp = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const  clearError = useCallback(() => dispatch(removeError()),[])
    const navigate = useNavigate();
    const { status, user, error } = useAppSelector(state => state.auth)
    useEffect(() => {
        if (user) navigate('/', { replace: true })
    }, [user])
    return (
        <Wrapper>
            <Notification error={error} callback={clearError}/>
            <Container>
                <div style={{marginTop: 15}}><Logo/></div>
                <Title>{t('auth.create_an_account')}</Title>
                <SignUpForm/>
                <Text>{t('auth.already_have_an_account')}<LinkStyle to='/login'>{t('auth.signIn_btn')}</LinkStyle></Text>
            </Container>
            {status ===  LOADING_STATUS.LOADING ?  <Absolute><Spinner/></Absolute> : ''}
        </Wrapper>
    )
}

