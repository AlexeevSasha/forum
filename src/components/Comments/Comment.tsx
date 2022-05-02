import {FC} from "react";
import styled from "styled-components";
import {IUser} from "../../api/auth/authDto";
import {defaultAvatar} from "../../hooks/GeneratorAvatar";


interface IProps {
    user: IUser;
    text: string;
    date: string
}


export const Comment: FC<IProps> = ({user, text, date}) => {
    return (
        <Flex>
            <Avatar><img src={user.avatarUrl || defaultAvatar()}/></Avatar>
            <div>
                <Title>{user.userName} <span> · 1 месяц назад</span></Title>
                <Text>{text}</Text>
            </div>
        </Flex>
    )
}


const Text = styled.p`
  @media ${({theme}) => theme.media._480} {
    font-size: 14px;
  }
`

const Title = styled.div`
  font-weight: 600;
  margin-bottom: 10px;

  & > span {
    color: ${({theme}) => theme.colors.grey};
    font-weight: 400;
    font-size: 14px;
  }

  @media ${({theme}) => theme.media._480} {
    font-size: 14px;
    & > span {
      font-size: 10px;
    }
  }
`


const Flex = styled.div`
  border: 1px solid ${({theme}) => theme.colors.lightestGrey1};
  border-radius: 5px;
  padding: 10px;
  display: grid;
  grid-template-columns: 60px calc(100% - 70px);
  gap: 10px;

`
const Avatar = styled.div`
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 50%;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media ${({theme}) => theme.media._480} {
    width: 50px;
    height: 50px;
  }
`