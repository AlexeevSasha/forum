import {FC} from "react";
import {AddPostForm} from "../components/AddPostForm/AddPostForm";

import {useAppSelector} from "../core/redux/reduxType";
import {ArrowBackIcon} from "../components/SVG/SVG";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";


export const EditPost: FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const {post} = useAppSelector(state => state.posts)
    return (
        <div style={{marginTop: 20}}>
            <ArrowBack onClick={() => navigate(-1)}><ArrowBackIcon/>{t('back')}</ArrowBack>
            <AddPostForm isEditFlag dataEdit={post || undefined}/>
        </div>
    )
}

const ArrowBack = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-size: 18px;
  gap: 15px;
`
