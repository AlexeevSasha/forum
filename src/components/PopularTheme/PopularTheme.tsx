import {FC, useEffect} from "react";
import styled from "styled-components";
import {FireIcon} from "../SVG/SVG";
import {OnePost} from "./OnePost";
import {useAppSelector} from "../../core/redux/reduxType";
import {useDispatch} from "react-redux";
import {getSortPostThunk} from "../../modules/posts/postsAction";
import {useTranslation} from "react-i18next";


export const PopularTheme: FC = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const {popularPosts} = useAppSelector(state => state.posts)
    useEffect(() => {
        dispatch(getSortPostThunk())
    }, [dispatch])
    if (!popularPosts) return null;
    return (
        <Container>
            <FlexIcon>
                <FireIcon/>
                <h3>{t('popular_theme')}</h3>
            </FlexIcon>
            {popularPosts.map(post => <OnePost
                key={post.id}
                name={post.user.userName}
                title={post.title}
                date={post.date}
                view={post.views}
                id={post.id}
            />)}
        </Container>

    )
}

const FlexIcon = styled('div')`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  gap: 5px;
  padding: 15px 15px 0;
  margin-bottom: 10px;
  @media ${({theme}) => theme.media._1440} {
    & > h3 {
      font-size: 18px;
    }
  }
`
const Container = styled('div')`
  width: 400px;
  background-color: white;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding-bottom: 10px;

  @media ${({theme}) => theme.media._1440} {
    width: 300px;
  }
`