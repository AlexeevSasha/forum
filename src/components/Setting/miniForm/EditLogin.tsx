import {FC, useCallback, useState} from "react";
import {Input} from "../../ui/Input/Input";
import {Button} from "../../ui/Button/Button";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {SubmitHandler, useForm} from "react-hook-form";
import {ILogin} from "../../../api/auth/authDto";
import {profileUpdateThunk} from "../../../modules/auth/authAction";
import {useTranslation} from "react-i18next";


interface IProps {
    id: string
}

export const EditLogin: FC<IProps> = ({id}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const [success, setSuccess] = useState(false);
    const [visible, setVisible] = useState(false);
    const toggle = useCallback(() => setVisible(!visible), [visible])
    const {register, handleSubmit, formState: {errors}} = useForm<ILogin>();
    const onSubmit: SubmitHandler<ILogin> = (data) => {
        dispatch(profileUpdateThunk({id, data, cb: () => setSuccess(true)}))
    };

    return (
        <div>
            <Title onClick={toggle}>{t('setting.change_login')}</Title>
            <Container visible={visible} onSubmit={handleSubmit(onSubmit)}>
                <Input label={t('setting.new_login')} id={t('setting.new_login')} {...register("login", {
                    required: 'Логин обязателен',
                    minLength: {
                        value: 3,
                        message: 'Не меньше 3 символов'
                    }
                })} error={errors.login?.message}/>
                <Flex>
                    <Button widthCustom={150}>{t('send')}</Button>
                    {success && <div>{t('setting.success_login')}!</div>}
                </Flex>
            </Container>
        </div>
    )
}

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  & > div {
    color: green;
    font-weight: bold;
  }
`

const Title = styled.h3`
  display: inline-block;
  cursor: pointer;
  color: #707070;
`

const Container = styled.form<{ visible: boolean }>`
  display: ${({visible}) => visible ? 'flex' : 'none'};
  margin-top: 10px;
  flex-direction: column;
  gap: 15px;

  & > button {
    text-align: center;
  }
`

