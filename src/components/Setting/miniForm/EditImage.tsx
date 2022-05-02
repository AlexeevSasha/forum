import {FC, useCallback, useState} from "react";
import {Button} from "../../ui/Button/Button";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {profileUpdateThunk} from "../../../modules/auth/authAction";
import {InputFile} from "../../ui/Input/InputFile";
import {AvatarArr} from "../../../hooks/GeneratorAvatar";
import {Notification} from "../../Notification/Notification";
import {useTranslation} from "react-i18next";


interface IProps {
    id: string
}

export const EditImages: FC<IProps> = ({id}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);
    const toggle = useCallback(() => setVisible(!visible), [visible])
    const [img, setImg] = useState('')

    const HandlerSend = (url: string) => {
        const data = {avatarUrl: url}
        dispatch(profileUpdateThunk({id, data}))
    }


    return (
        <div>
            <Title onClick={toggle}>{t('setting.change_photo_user')}</Title>
            <Avatar visible={visible}>
                <InputFile saveUrlImg={setImg} id={t('setting.upload_photo')} type='image'
                           label={t('setting.upload_photo')} errorMsg={setError}/>
                {
                    img && <WrapperImg>
                        <img src={img} alt="Что-то не так"/>
                        <Button onClick={() => HandlerSend(img)} widthCustom={150}>{t('send')}</Button>
                    </WrapperImg>
                }
                <p>{t('setting.choose_from_existing')}</p>
                <Grid>
                    {AvatarArr.map(avatar => <img src={avatar.url} key={avatar.id} alt='avatar'
                                                  onClick={() => HandlerSend(avatar.url)}/>)}
                </Grid>
            </Avatar>
            <Notification error={error}/>
        </div>
    )
}


const WrapperImg = styled.div`
  display: flex;
  flex-direction: column;

  & > img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin: 15px 0;
  }
`

const Title = styled.h3`
  display: inline-block;
  cursor: pointer;
  color: #707070;
  margin-bottom: 15px;
`

const Grid = styled.div`
  border: 1px solid ${({theme}) => theme.colors.lightGrey};
  padding: 15px;
  margin-top: 5px;
  max-width: 500px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;

  & > img {
    cursor: pointer;
    width: 100px;
    @media ${({theme}) => theme.media._768} {
      width: 60px;
    }

    &:hover {
      border-radius: 50%;
      border: 1px solid ${({theme}) => theme.colors.lightGrey};
      box-shadow: 0 0 5px 5px rgba(34, 60, 80, 0.2);
    }
  }
;

  @media ${({theme}) => theme.media._768} {
    grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  }
`

const Avatar = styled.div<{ visible: boolean }>`
  display: ${({visible}) => visible ? 'block' : 'none'};
  margin-top: 10px;

  & > p {
    margin-top: 15px;
    color: ${({theme}) => theme.colors.grey};
    font-size: 14px;
  }
`
