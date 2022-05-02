import {forwardRef, ComponentPropsWithoutRef, ChangeEvent} from "react";
import styled from "styled-components";
import {DownloadIcon} from "../../SVG/SVG";
import {imgFile, videoFile, musicFile} from "../../../hooks/ValidationInputFile";

interface IProps extends ComponentPropsWithoutRef<"input"> {
    label?: string
    saveUrlImg: (str: string) => void;
    errorMsg?: (str: string) => void;
    noLogo?: boolean;
    id: string;
    type: 'image' | 'audio' | 'video'
}


const validateFile = {
    'image': imgFile,
    'audio': musicFile,
    'video': videoFile
}
export const InputFile = forwardRef<HTMLInputElement, IProps>(({
                                                                   label,
                                                                   saveUrlImg,
                                                                   noLogo,
                                                                   errorMsg,
                                                                   id,
                                                                   type,
                                                                   ...attr
                                                               }, ref) => {

    const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
        if (!file || file.length === 0) return;
        saveUrlImg('')
        errorMsg && errorMsg('')
        const result = await validateFile[type](file[0])
        if (result) {
            errorMsg && errorMsg(result)
        } else {
            const fileReader = new FileReader();
            fileReader.onloadend = function () {
                saveUrlImg(fileReader.result as string)
            }
            fileReader.readAsDataURL(file[0]);
        }
    }
    return (
        <div>
            <LabelStyle htmlFor={id}>{noLogo ? '' : <DownloadIcon/>} {label}</LabelStyle>
            <InputStyle type="file" {...attr} ref={ref} id={id}
                        onChange={handleChangeImage}/>
        </div>
    )
})


const LabelStyle = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: center;
  color: ${({theme}) => theme.colors.darkGrey};

  & > svg {
    margin-right: 5px;
    fill: ${({theme}) => theme.colors.darkGrey}
  }
`

const InputStyle = styled.input`
  display: none;
  outline: 0;
  opacity: 0;
  pointer-events: none;
  user-select: none
`