import {FC, memo, useMemo} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {defaultAvatar} from "../../hooks/GeneratorAvatar";


interface IProps {
    avatarUrl: string;
    title: string;
    name: string;
    date: string;
    answers: number;
    view: number;
    id: string;
}

export const Post: FC<IProps> = memo(({avatarUrl, answers, name, date, title, view, id}) => {
    const newDate = useMemo(() => new Date(date).toLocaleDateString(), [date]);
    return (
        <Wrapper to={`post/${id}`}>
            <Grid>
                <Avatar>
                    <img src={avatarUrl || defaultAvatar()} alt=""/>
                </Avatar>
                <Container>
                    <h3>{title}</h3>
                    <p>{name}<span> · {newDate}</span></p>
                </Container>
            </Grid>
            <Answers>
                <p>Ответы: <span>{answers}</span></p>
                <p> Просмотры: <span>{view}</span></p>
            </Answers>
        </Wrapper>
    )
})

const Grid = styled.div`
  display: grid;
  grid-template-columns: 70px calc(100% - 80px);
  align-items: center;
  gap: 10px;
  @media ${({theme}) => theme.media._768} {
    grid-template-columns: 60px calc(100% - 70px);
  }
`

const Answers = styled.div`
  font-size: 14px;

  & > p {
    text-align: right;
    color: #C1C1C1;

    & > span {
      font-size: 16px;
      color: ${({theme}) => theme.colors.grey};
    }
  }

  @media ${({theme}) => theme.media._768} {
    display: none;
  }
`

const Container = styled.div`
  & > h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 2px;
  }

  & > p {
    font-size: 14px;

    & > span {
      color: #C1C1C1;
    }
  }

  @media ${({theme}) => theme.media._768} {
    & > h3 {
      font-size: 16px;
    }

    & > p {
      font-size: 12px;
    }
  }
`

const Wrapper = styled(Link)`
  color: inherit;
  cursor: pointer;
  display: grid;
  grid-template-columns: 73% 22%;
  gap: 5%;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  border-radius: 10px;
  background: #EEEEEE;
  border: 1px solid #EEEEEE;

  &:hover {
    background: none;
    border: 1px solid #EEEEEE;
  }

  @media ${({theme}) => theme.media._768} {
    grid-template-columns: 100%;
    padding: 10px 10px;
  }
`

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 50%;
  @media ${({theme}) => theme.media._768} {
    width: 50px;
    height: 50px;
  }

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`