import {FC} from "react";
import {TextArea} from "../ui/TextArea/TextArea";
import {Button} from "../ui/Button/Button";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import styled from "styled-components";
import {addNewCommentsThunk} from "../../modules/comments/commentsAction";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../core/redux/reduxType";
import {IUser} from "../../api/auth/authDto";
import {useTranslation} from "react-i18next";

interface IProps {
    postId: string;
}

export const AddComment: FC<IProps> = ({postId}) => {
    const {t} = useTranslation();
    const {user} = useAppSelector(state => state.auth)
    const dispatch = useDispatch()
    const {handleSubmit, control, formState: {errors}} = useForm<{ title: string }>({
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<{ title: string }> = ({title}) => {
        if (!title) return;
        const data = {
            postId,
            comment: {
                text: title,
                date: String(new Date()),
                user: user as IUser
            }
        };
        dispatch(addNewCommentsThunk(data))
    };
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller control={control} name='title' rules={{
                maxLength: {
                    value: 200,
                    message: 'Комментарий должен быть не более 100 символов'
                }
            }}
                        render={({field: {onChange, value}}) => <TextArea maxWidth={600} maxWord={200}
                                                                          title={t('add_comment')}
                                                                          id='Добавить комментарий'
                                                                          onChangeValue={onChange}
                                                                          error={errors?.title?.message}
                                                                          value={value}
                        />}
            />
            <Flex><Button widthCustom={200}>{t('add_btn')}</Button></Flex>
        </Form>
    )
}

const Flex = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`

const Form = styled.form`
  max-width: 600px;
  justify-content: center;
`




