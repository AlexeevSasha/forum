import {Input} from "../ui/Input/Input";
import {Button} from "../ui/Button/Button";
import styled from "styled-components";
import {useForm, SubmitHandler} from "react-hook-form";
import {useDispatch} from "react-redux";
import {registerThunk} from "../../modules/auth/authAction";
import {InputFile} from "../ui/Input/InputFile";
import {useState} from "react";
import {useTranslation} from "react-i18next";


interface ISignUp {
    userName: string,
    login: string,
    password: string,
    confirmPassword: string
}

export const SignUpForm = () => {
    const {t} = useTranslation();
    const [urlImg, setUrlImg] = useState('')
    const dispatch = useDispatch()
    const {register, handleSubmit, watch, formState: {errors}} = useForm<ISignUp>();
    const passwordCurrent = watch("password", "");
    const onSubmit: SubmitHandler<ISignUp> = (data) => {
        const {login, userName, password} = data;
        dispatch(registerThunk({login, userName, password, avatarUrl: urlImg || null}))
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input label={t('auth.your_name')} id={t('auth.your_name')} {...register("userName", {
                required: 'Имя обязательно'
            })} error={errors.userName?.message}/>
            <Input label={t('auth.login')} id={t('auth.login')} {...register("login", {
                required: 'Логин обязательно'
            })} error={errors.login?.message}/>
            <Input type='password' label={t('auth.password')} id={t('auth.password')} {...register("password", {
                required: 'Пароль обязателен',
                minLength: {
                    value: 3,
                    message: 'Не меньше 3 символов'
                }
            })} error={errors.password?.message}/>
            <Input type='password' label={t('auth.repeat_password')} id={t('auth.repeat_password')} {...register('confirmPassword',
                {
                    required: 'Повторите пароль',
                    validate: value => value === passwordCurrent || "Пароли не совпадают"
                })} error={errors.confirmPassword?.message}/>
            <Flex>
                <InputFile type='image' id={t('auth.load_avatar')} label={t('auth.load_avatar')} saveUrlImg={setUrlImg}/>
                {urlImg ? <Avatar><img src={urlImg} alt=""/> </Avatar> : ''}
            </Flex>
            <Button>{t('auth.signUp_btn')}</Button>
        </Form>
    )
}


const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
`

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 50%;
  
  @media ${({theme}) => theme.media._480} {
    width: 40px;
    height: 40px;
  }

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Form = styled('form')`
  max-width: 360px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px
`