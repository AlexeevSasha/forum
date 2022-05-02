import {FC, useEffect} from "react";
import {ArrowBackIcon} from "../SVG/SVG";
import styled from "styled-components";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getPostIdThunk} from "../../modules/posts/postsAction";
import {useAppSelector} from "../../core/redux/reduxType";
import {LOADING_STATUS} from "../../modules/types";
import {Spinner} from "../Spinner/Spinner";
import {defaultAvatar} from "../../hooks/GeneratorAvatar";
import {useTranslation} from "react-i18next";


export const FullPost: FC = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const {post, status} = useAppSelector(state => state.posts)
    const {user} = useAppSelector(state => state.auth)

    useEffect(() => {
        if (!id) return
        dispatch(getPostIdThunk(id))
    }, [])
    return (
        <div>
            <ArrowBack onClick={() => navigate(-1)}><ArrowBackIcon/>{t('back')}</ArrowBack>
            {status === LOADING_STATUS.LOADING && <Spinner/>}
            {post && <> <Wrapper>
                <ContainerAvatar>
                    <Avatar>
                        <img src={post?.user.avatarUrl || defaultAvatar()} alt=""/>
                    </Avatar>
                    {post?.user.userName}
                    {post?.user.id === user?.id && <Link to={`edit`}><EditPost>{t('edit')}</EditPost></Link>}
                </ContainerAvatar>
                <div>
                    <Title>
                        <p>{post?.date && new Date(post.date).toLocaleDateString()}</p>
                        <h2>{post?.title}</h2>
                    </Title>
                    <Text>
                        {post?.text}
                    </Text>
                    {post?.media.img &&
                        <ImgStyle><img src={post?.media.img} alt={t('photograph')}/></ImgStyle>}
                </div>
            </Wrapper>
                <Comements>
                    <Link to='comments'><AddComment>{t('see_comments')}</AddComment></Link>
                </Comements>
            </>
            }
        </div>
    )
}


const EditPost = styled.button`
  cursor: pointer;
  color: ${({theme}) => theme.colors.grey};
  display: block;
  padding: 10px;
  margin: 10px auto;
  border: none;
  background: none;

  &:hover {
    background: ${({theme}) => theme.colors.lightestGrey1};
    border-radius: 10px;
  }
`

const Comements = styled.div`
  display: flex;
  justify-content: center;
  margin: 100px 0 25px;
  gap: 50px;
  @media ${({theme}) => theme.media._768} {
    margin: 40px 0 15px;
  }
`

const AddComment = styled.button`
  font-family: inherit;
  padding: 15px;
  cursor: pointer;
  color: ${({theme}) => theme.colors.purple};
  border: 1px solid ${({theme}) => theme.colors.purple};
  border-radius: 10px;
  font-weight: 600;
  background: transparent;
  transition: all .2s ease-out;

  &:hover {
    background: ${({theme}) => theme.colors.purple};
    color: white;
  }
`


const ImgStyle = styled.div`
  margin-top: 40px;
  max-width: 1000px;
  height: 400px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const Text = styled.div`
  margin-top: 25px;
`

const Title = styled.div`
  & > p {
    color: ${({theme}) => theme.colors.grey};
    margin-bottom: 10px;
  }
`

const ContainerAvatar = styled.div`
  border-right: 0.5px solid ${({theme}) => theme.colors.lightGrey};
  padding-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  @media ${({theme}) => theme.media._768} {
    display: grid;
    text-align: left;
    grid-template-columns: 80px 1fr 1fr;
    align-items: center;
    gap: 20px;
    border-right: none;
    border-bottom: 0.5px solid ${({theme}) => theme.colors.lightGrey};
    padding: 5px 0 15px;
    margin-bottom: 20px;
  }
`

const Avatar = styled.div`
  margin: 0 auto 10px;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media ${({theme}) => theme.media._768} {
    width: 80px;
    height: 80px;
    margin: 0;
  }
`

const Wrapper = styled.div`
  border-top: 1px solid ${({theme}) => theme.colors.lightGrey};
  padding-top: 30px;
  display: grid;
  grid-template-columns: 170px calc(100% - 190px);
  gap: 20px;
  @media ${({theme}) => theme.media._768} {
    display: block;
    padding-top: 10px;
  }
`

const ArrowBack = styled.div`
  margin: 20px 0 20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-size: 18px;
  gap: 15px;
`