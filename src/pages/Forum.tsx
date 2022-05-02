import {FC, useEffect} from "react";
import {PopularTheme} from "../components/PopularTheme/PopularTheme";
import {Post} from "../components/Post/Post";
import styled from "styled-components";
import {getAllPostsThunk} from "../modules/posts/postsAction";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../core/redux/reduxType";
import {Spinner} from "../components/Spinner/Spinner";
import {Notification} from "../components/Notification/Notification";
import {Button} from "../components/ui/Button/Button";
import {LOADING_STATUS} from "../modules/types";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";


export const Forum: FC = () => {
    const dispatch = useDispatch()
    const {t} = useTranslation();
    const {user} = useAppSelector(state => state.auth)
    const {posts, status, error} = useAppSelector(state => state.posts);
    useEffect(() => {
        dispatch(getAllPostsThunk())
    }, [dispatch])
    return (
        <div style={{position: 'relative'}}>

            <Notification error={error}/>
            <Sticky><PopularTheme/></Sticky>
            <Grid>
                <Flex>
                    <AllPosts>{t('all_posts')}</AllPosts>
                    {user ? <LinkStyle to='addPost'><Button>{t('add_btn')}</Button></LinkStyle> : ""}
                </Flex>
                {status === LOADING_STATUS.LOADING && <Spinner/>}
                {posts && posts.map(post => <Post avatarUrl={post.user.avatarUrl}
                                                  name={post.user.userName}
                                                  date={post.date}
                                                  answers={post.answers}
                                                  view={post.views}
                                                  title={post.title}
                                                  id={post.id}
                                                  key={post.id}
                />)}
            </Grid>
        </div>

    )
}

const LinkStyle = styled(Link)`
  max-width: 200px;
  width: 100%;
  @media ${({theme}) => theme.media._480} {
    max-width: 120px;
  }
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AllPosts = styled.div`
  padding: 20px 0;
  font-size: 24px;
  font-weight: 700;
  @media ${({theme}) => theme.media._768} {
    padding: 10px 0;
  }
  @media ${({theme}) => theme.media._480} {
    font-size: 20px;
  }
`

const Sticky = styled.div`
  padding-top: 10px;
  position: sticky;
  top: 90px;
  float: right;
  @media ${({theme}) => theme.media._980} {
    display: none;
  }
`


const Grid = styled.div`
  padding: 10px 40px 0 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media ${({theme}) => theme.media._980} {
    padding: 10px 0;
  }
`

