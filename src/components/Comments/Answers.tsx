import {FC} from "react";
import styled from "styled-components";


export const AnswersComments: FC = () => {
    return (
        <Flex>
            <Avatar><img src="https://www.imgonline.com.ua/examples/bee-on-daisy.jpg" alt='Аватар'/></Avatar>
            <div>
                <Title>DreamiNae <span> · 1 месяц назад</span></Title>
                <p>Да я втащу тебе псина</p>
                <Answers>Ответить</Answers>
            </div>
        </Flex>
    )
}



const Answers = styled.div`
  display: inline-block;
  margin-top: 10px;
  cursor: pointer;
  color: ${({theme}) => theme.colors.grey};
`

const Title = styled.div`
    font-weight: 600;
    margin-bottom: 10px;
  & > span {
    color: ${({theme}) => theme.colors.grey};
    font-weight: 400;
    font-size: 14px;
  }
`


const Flex = styled.div`
  margin-top: 10px;
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
`