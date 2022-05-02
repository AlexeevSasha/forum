import {FC, useState, ComponentPropsWithoutRef, forwardRef, useCallback} from "react";
import styled from "styled-components";
import {CloseEyeIcon, EyeIcon} from "../../SVG/SVG";


interface IProps extends ComponentPropsWithoutRef<"input"> {
    label: string;
    type?: string;
    id: string;
    error?: string
}

export const Input = forwardRef<HTMLInputElement, IProps>(({label, type = 'text', id, error, ...atr}, ref) => {
    const [typeInput, setTypeInput] = useState<string>(type)
    const typeToggle = useCallback(() => setTypeInput(typeInput === 'password' ? 'text' : 'password'), [typeInput])

    return (
        <div>
            <LabelStyle htmlFor={id}>{label}</LabelStyle>
            <div style={{position: 'relative'}}>
                <InputStyle error={error} type={typeInput} id={id} {...atr} ref={ref}/>
                {type === 'password' ? <EyeStyle onClick={typeToggle}>{typeInput === 'password' ? <CloseEyeIcon/> :
                    <EyeIcon/>}</EyeStyle> : ''}
            </div>
            {error ? <Error>{error}</Error> : ''}
        </div>
    )
})

const EyeStyle = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`

const Error = styled.p`
  margin-top: 5px;
  color: ${({theme}) => theme.colors.red};
  font-size: 12px;
`

const LabelStyle = styled.label`
  color: ${({theme}) => theme.colors.grey};
  font-weight: 500;
  font-size: 14px;
  display: block;
  margin-bottom: 5px;
`

const InputStyle = styled.input<{ error?: string }>`
  background: ${({theme}) => theme.colors.lightestGrey1};
  border: 1px solid ${({theme, error}) => error ? theme.colors.red : theme.colors.lightestGrey1};
  max-width: 366px;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  padding: 0 35px 0 12px;
  color: ${({theme}) => theme.colors.darkGrey};
  transition: all .2s linear;

  &:hover {
    background-color: ${({theme}) => theme.colors.lightGrey};
    border: 1px solid ${({theme}) => theme.colors.lightestGrey};
  }

  &:disabled {
    pointer-events: none;
    color: ${({theme}) => theme.colors.lightestGrey};
  }
`