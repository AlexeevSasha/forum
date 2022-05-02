import {FC, useEffect, useRef, useState, ChangeEvent, useMemo, useCallback, memo} from "react";
import styled from "styled-components";


interface IProps {
    fontW?: boolean;
    maxWidth: number;
    title?: string;
    maxWord?: number;
    id: string;
    onChangeValue: (str: string) => void;
    error?: string;
    value: string
}

export const TextArea: FC<IProps> = memo(({
                                              fontW,
                                              maxWidth,
                                              title,
                                              maxWord,
                                              id,
                                              onChangeValue,
                                              error,
                                              value = ''
                                          }) => {
    const maxWorlds = useMemo(() => maxWord ? maxWord : 100, [maxWord])
    const myRef = useRef<HTMLTextAreaElement | null>(null);
    const textAreaChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        onChangeValue(event.target.value);
    }, [])

    useEffect(() => {
        if (myRef && myRef.current) {
            myRef.current.style.height = "0px";
            const scrollHeight = myRef.current.scrollHeight;
            myRef.current.style.height = scrollHeight + "px";
        }
    }, [value])
    return (
        <div style={{width: '100%', maxWidth: `${maxWidth}px`, position: 'relative'}}>
            {title && <Title htmlFor={id}>{title}</Title>}
            <TextStyle id={id} fontW={fontW} widthCustom={maxWidth} error={error} ref={myRef}
                       value={value.replace(/\(%!XXX1!%|\^xxXxx\^|!@#TTT\(\*&\)/gi, () => '*****')}
                       onChange={textAreaChange}/>
            {value && <CountWord error={error}>{maxWorlds - value.length}</CountWord>}
            {error && <Error>{error}</Error>}
        </div>
    )
})

const Error = styled.p`
  margin-top: 5px;
  color: ${({theme}) => theme.colors.red};
  font-size: 12px;
`

const CountWord = styled.p<{ error?: string }>`
  position: absolute;
  top: 0;
  right: 0;
  color: ${({theme, error}) => error ? 'red' : theme.colors.lightGrey};
  font-weight: ${({error}) => error ? 600 : 400};
`

const Title = styled.label`
  font-size: 18px;
  font-weight: 600;
`

const TextStyle = styled.textarea<{ fontW?: boolean, widthCustom: number, error?: string }>`
  margin-top: 5px;
  font-family: inherit;
  border: 1px solid ${({theme, error}) => error ? 'red' : theme.colors.lightGrey};
  background: ${({error}) => error ? '#FFE6E6' : 'transparent'};
  border-radius: 5px;
  font-weight: ${({fontW}) => fontW ? 700 : 500};
  font-size: ${({fontW}) => fontW ? '26px' : '16px'};
  max-width: ${({widthCustom}) => `${widthCustom}px`};
  width: 100%;
  overflow: hidden;
  resize: none;
  padding: 10px;
`

