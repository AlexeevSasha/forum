import {FC, memo, useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {TextArea} from "../ui/TextArea/TextArea";
import {Button} from "../ui/Button/Button";
import {InputFile} from "../ui/Input/InputFile";
import {Notification} from "../Notification/Notification";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import {MediaPreview} from "../MediaPreview/MediaPreview";
import {useDispatch} from "react-redux";
import {addNewPostThunk, editPostThunk} from "../../modules/posts/postsAction";
import {newPost} from "../../hooks/addNewPost";
import {useNavigate} from "react-router-dom";
import {IPostsResponse} from "../../api/posts/postsDto";
import {useTranslation} from "react-i18next";


interface IAddPost {
    title: string;
    text: string;
}

interface IProps {
    dataEdit?: IPostsResponse;
    isEditFlag?: boolean
}

export const AddPostForm: FC<IProps> = memo(({dataEdit, isEditFlag}) => {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {handleSubmit, control, reset, formState: {errors}} = useForm<IAddPost>({
        mode: 'onChange',
    });
    const [errorMedia, setErrorMedia] = useState('')
    const [img, setImg] = useState('');
    const [audio, setMusic] = useState('');
    const [video, setVideo] = useState('');

    const handlerImg = useCallback(() => setImg(''), [])
    const handlerMusic = useCallback(() => setMusic(''), [])
    const handlerVideo = useCallback(() => setVideo(''), [])

    const onSubmit: SubmitHandler<IAddPost> = (data) => {
        const {text, title} = data;
        if (isEditFlag && dataEdit) {
            const arg = {
                id: dataEdit.id,
                data: {
                    date: String(new Date()),
                    text,title,
                    media: {
                        img,
                        audio,
                        video,
                    },
                },
                cb: () => navigate(-1)
            }
            dispatch(editPostThunk({...arg}))
        } else {
            const result = newPost({ text,title,img,audio,video});
            dispatch(addNewPostThunk({data: result, cb: () => navigate('/')}))
        }
    };

    useEffect(() => {
        if (!dataEdit) return;
        dataEdit.media.img && setImg(dataEdit.media.img)
        dataEdit.media.audio && setMusic(dataEdit.media.audio)
        dataEdit.media.video && setVideo(dataEdit.media.video)
        reset({title: dataEdit.title, text: dataEdit.text});
    }, [dataEdit]);


    return (
        <Wrapper>
            <Notification error={errorMedia}/>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Controller control={control} name='title' rules={{
                    required: 'Заголовок обязателен', maxLength: {
                        value: 100,
                        message: 'Заголовок должен быть не более 100 символов'
                    }
                }}
                            render={({ field: {onChange, value}}) => <TextArea fontW maxWidth={600}
                                                                                     title={t('header_addPost')}
                                                                                     id={t('header_addPost')}
                                                                                     value={value}
                                                                                     onChangeValue={onChange}
                                                                                     error={errors?.title?.message}
                            />}
                />
                <Controller control={control} name='text' rules={{
                    required: 'Поле обезательно', maxLength: {
                        value: 1000,
                        message: 'Заголовок должен быть не более 1000 символов'
                    }
                }}
                            render={({field: {onChange, value}}) => <TextArea maxWidth={600} title={t('enter_text')}
                                                                              id={t('enter_text')}
                                                                              maxWord={1000}
                                                                              value={value}
                                                                              onChangeValue={onChange}
                                                                              error={errors?.text?.message}
                            />}
                />
                <Media>
                    <p>{t('download_media')}</p>
                    <Flex>
                        <InputFile type='image' saveUrlImg={setImg} errorMsg={setErrorMedia} label={t('photograph')}
                                   id={t('photograph')} noLogo/>
                        <InputFile type='audio' saveUrlImg={setMusic} errorMsg={setErrorMedia} label={t('music')}
                                   id={t('music')} noLogo/>
                        <InputFile type='video' saveUrlImg={setVideo} errorMsg={setErrorMedia} label={t('video')} id={t('video')}
                                   noLogo/>
                    </Flex>
                </Media>
                {(img || audio || video) && <FlexPreview>
                    {img && <MediaPreview type='image' src={img} callback={handlerImg}/>}
                    {audio && <MediaPreview type='audio' src={audio} callback={handlerMusic}/>}
                    {video && <MediaPreview type='video' src={video} callback={handlerVideo}/>}
                </FlexPreview>}
                <Button widthCustom={300}>{isEditFlag ? t('edit_post') : t('create_post')}</Button>
            </Form>
        </Wrapper>
    )
})


const Media = styled.div`
  max-width: 600px;
  width: 100%;

  & > p {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 5px;
  }

`

const Flex = styled.div`
  border: 1px solid ${({theme}) => theme.colors.lightGrey};
  padding: 20px 15px;
  gap: 10px;
  display: flex;
  justify-content: space-around;
  @media ${({theme}) => theme.media._480} {
    & > div {
      font-size: 13px;
    }
  }
`
const FlexPreview = styled(Flex)`
  @media ${({theme}) => theme.media._480} {
    flex-direction: column;
    padding: 10px;
  }
`

const Form = styled.form`
  background: white;
  border-radius: 15px;
  max-width: 1000px;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`