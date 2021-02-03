import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

// 컴포넌트
// 페이지 스위칭
import SwithMap from "./SwitchPage";
// 모델
import CharacterModel from "../models/CharacterModel";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Field = (props) => {
  // URL 아이디값
  let { id } = useParams();
  let history = useHistory();
  // 캐릭터 데이터
  const [charData, setCharData] = React.useState(null);
  // 필드 데이터
  const [fieldData, setFieldData] = React.useState(null);
  // 에러
  const [error, setError] = React.useState(null);
  // 로딩
  const [loading, setLoading] = React.useState(false);
  // 계정 정보
  const account = props.params;

  // 캐릭터와 필드정보 취득
  CharacterModel({id, account, setCharData, setFieldData, setError, setLoading});

  // 전학수속으로 이동
  const handleOnTransfer = () => {
    history.push("/transfer/register/" + id);
  };

  // 전학수속 체크
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (charData != null && charData.success === false) {
        handleOnTransfer(id);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="home-list">
      { error != null ? <Alert severity="error">{error.msg}</Alert> : "" }
      { loading != null && loading === true ? <CircularProgress disableShrink className="progress" /> : "" }
      {
        charData != null && charData.success === true ?
          <SwithMap>
          {{
            charData: charData,
            fieldData: fieldData,
            setCharData: setCharData,
            setFieldData: setFieldData,
            setError: setError,
            setLoading: setLoading
          }}
          </SwithMap>
        : ""
      }
    </div>
  );
}

export default Field;