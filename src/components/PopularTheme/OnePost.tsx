import {FC, useMemo} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

interface IProps {
    title: string;
    name: string;
    date: string;
    view: number;
    id: string
}

export const OnePost: FC<IProps> = ({title, view, date, name, id}) => {
    const newDate = useMemo(() => new Date(date).toLocaleDateString(), [date]);
    return (
        <PostContainer>
            <LinkStyle to={`post/${id}`}>
                <FlexName>
                    <Name>{name}<span> · {newDate}</span></Name>
                    <View>Просмотры: <span>{view}</span></View>
                </FlexName>
                <Title>{title}</Title>
            </LinkStyle>
        </PostContainer>
    )
}

const LinkStyle = styled(Link)`
  color: inherit;
`

const PostContainer = styled.div`
  cursor: pointer;
  padding: 10px 15px;
  border-bottom: 1px solid #F8F8F8;

  &:hover {
    background-color: #F8F8F8;
  }
`

const Title = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  @media ${({theme}) => theme.media._1440} {
    font-size: 15px;
  }
`

const FlexName = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  @media ${({theme}) => theme.media._1440} {
    margin-bottom: 10px;
  }
`

const Name = styled.p`
  font-size: 14px;

  & > span {
    color: #C1C1C1;
  }

  @media ${({theme}) => theme.media._1440} {
    font-size: 12px;
  }
`
const View = styled.p`
  font-size: 14px;
  color: #C1C1C1;

  & > span {
    font-weight: 600;
    color: ${({theme}) => theme.colors.darkGrey};
  }

  @media ${({theme}) => theme.media._1440} {
    font-size: 12px;
  }
`