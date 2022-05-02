import {Input} from "../ui/Input/Input";
import {Button} from "../ui/Button/Button";
import styled from "styled-components";
import {SubmitHandler, useForm} from "react-hook-form";
import {loginThunk} from "../../modules/auth/authAction";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";


interface ISignIn {
    login: string,
    password: string,
}

export const SignInForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm<ISignIn>();
    const onSubmit: SubmitHandler<ISignIn> = (data) => {
        dispatch(loginThunk(data))
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input label={t('auth.login')} id={t('auth.login')} {...register("login", {
                required: 'Логин обязателен'
            })} error={errors.login?.message}/>
            <Input type='password' label={t('auth.password')} id={t('auth.password')} {...register("password", {
                required: 'Пароль обязателен',
                minLength: {
                    value: 3,
                    message: 'Не меньше 3 символов'
                }
            })} error={errors.password?.message}/>
            <Button>{t('auth.signIn_btn')}</Button>
        </Form>
    )
}


const Form = styled.form`
  max-width: 360px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px
`