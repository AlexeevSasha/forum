import {SignInForm} from "../../components/Auth/SignInForm";
import {Wrapper, Container, Title, Text, LinkStyle, Back, Absolute} from './styles'
import {Logo} from "../../components/SVG/SVG";
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect} from "react";
import {useAppSelector} from "../../core/redux/reduxType";
import {Spinner} from "../../components/Spinner/Spinner";
import {LOADING_STATUS} from "../../modules/types";
import {Notification} from "../../components/Notification/Notification";
import {useDispatch} from "react-redux";
import {removeError} from "../../modules/auth/authSlice";
import {useTranslation} from "react-i18next";


export const SingIn = () => {
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
                <Back onClick={() => navigate('/')}>{t('auth.to_home')}</Back>
                <div style={{marginTop: 15}}><Logo/></div>
                <Title>{t('auth.signIn_in_account')}</Title>
                <SignInForm/>
                <Text>{t('auth.no_account')}<LinkStyle to='/registration'>{t('auth.signUp_btn')}</LinkStyle></Text>
            </Container>
            {status ===  LOADING_STATUS.LOADING ?  <Absolute><Spinner/></Absolute> : ''}
        </Wrapper>
    )
}







