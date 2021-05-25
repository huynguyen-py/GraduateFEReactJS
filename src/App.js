/* eslint-disable */
import './App.css';
import MainNav from './components/mainNavbar';
import MainLeftPanel from './components/PanelLeft';
import PanelCenter from './components/PanelCenter';
import MainRightPanel from './components/PanelRight';
import PanelDiagnosis from './components/PanelDiagnosis';
import PanelReport from './components/PanelReport';
import InfoUserSite from './components/PanelInfo'
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import 'animate.css'

function App() {
  const [isDiagnosis, setDiagnosis] = useState(0)
  const [isLeftAction, setLeftAction] = useState(0)
  const [cookie] = useCookies(['access_token']);
  const [isLogin, setLogin] = useState(true)
  function handlePageChangeToDiagnosis(newValue) {
    setDiagnosis(newValue);
    setLeftAction(0);
  }
  function handlePageChangeFromLeftPanel(newValue) {
    console.log(newValue);
    setLeftAction(newValue);
  }

  let history = useHistory()

  useEffect(() => {

    if (cookie['access_token']) {
      setLogin(false);
    }

  }, [])


  return (
    <div className="App">
      <MainNav isDiagnosis={isDiagnosis} onDiagnosisChange={handlePageChangeToDiagnosis} />
      {isLogin ?
        <div className="parent-required-login"><div className="required-login"><h1 className="animate__animated animate__flash animate__infinite	animate__delay-5 ">Please login to access page,&nbsp; <a href='/login-register'>click here!</a></h1></div></div>
        :
        <div className="main-body row">
          <MainLeftPanel isListYourArticle={isLeftAction} onListChange={handlePageChangeFromLeftPanel} />
          {(() => {
            if (isLeftAction === 0) {
              if (isDiagnosis === 1) {
                return (
                  <PanelDiagnosis method='post' />
                )
              } else if (isDiagnosis === 0) {
                return (
                  <PanelCenter isListYourArticle={isLeftAction} />
                )
              } else {
                return (
                  <InfoUserSite />
                )
              }
            } else {
              if (isLeftAction === -2) {
                return (
                  <PanelReport />
                )
              } else {
                return (
                  <PanelCenter isListYourArticle={isLeftAction} />
                )
              }
            }


          })()}
          <MainRightPanel />
        </div>
      }
    </div>

  );
}

export default App;
