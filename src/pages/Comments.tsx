import {FC, useEffect} from "react";
import {ArrowBackIcon} from "../components/SVG/SVG";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getCommentsIdThunk} from "../modules/comments/commentsAction";
import {Comment} from "../components/Comments/Comment";
import {useAppSelector} from "../core/redux/reduxType";
import {LOADING_STATUS} from "../modules/types";
import {Spinner} from "../components/Spinner/Spinner";
import {Notification} from "../components/Notification/Notification";
import {AddComment} from "../components/Comments/AddComment";
import {useTranslation} from "react-i18next";


export const Comments: FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const {id} = useParams();
    const dispatch = useDispatch()
    const {postComments, status, error} = useAppSelector(state => state.comments)

    useEffect(() => {
        if (!id) return;
        dispatch(getCommentsIdThunk(id))
    }, [])

    return (
        <div>
            <Notification error={error}/>
            <ArrowBack onClick={() => navigate(-1)}><ArrowBackIcon/>{t('back')}</ArrowBack>

            <AllComments>{t('add_comment')}</AllComments>
            <Wrapper>
                <Container>
                    <AddComment postId={id as string}/>
                    {status === LOADING_STATUS.LOADING && <Spinner/>}
                    {status === LOADING_STATUS.EMPTY && <NoComment>Нет комментарий</NoComment>}
                    {postComments &&
                        <FlexComment>{postComments.map(({comment, id}) => <Comment key={id} date={comment.date}
                                                                                user={comment.user}
                                                                                text={comment.text}/>)}</FlexComment>}
                </Container>
            </Wrapper>

        </div>
    )
}


const FlexComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const NoComment = styled.div`
  text-align: center;
  border-top: 1px solid ${({theme}) => theme.colors.lightGrey};
  padding: 30px 0;
`

const Container = styled.div`
  margin-top: 10px;
  padding: 20px;
  max-width: 1000px;
  width: 100%;
  border-radius: 10px;
  background: white;
  box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.1);

  & > form {
    margin: 0 auto 20px;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const ArrowBack = styled.div`
  margin: 20px 0 20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-size: 18px;
  gap: 15px;
`

const AllComments = styled('div')`
  border-top: 1px solid ${({theme}) => theme.colors.lightGrey};
  padding: 10px 0;
  font-size: 24px;
  font-weight: 700;
`
