// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import './App.css';
import Router from './router/Router';
import publicRoutes from './router/routes/publicRoutes'
import { getRoutes } from './router/routes';
import { get_user_info } from './store/Reducers/authReducer';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useTranslation } from 'react-i18next';




function App() {
  //  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {token} = useSelector(state=>state.auth)
  const [allRoutes, setAllRoutes] = useState([...publicRoutes])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries:['places']
  })

 useEffect(()=>{
    const routes =getRoutes()
    setAllRoutes([...allRoutes, routes])
 }, [])
  useEffect(()=>{
    if(token){
      dispatch(get_user_info())
    }
  },[token])
  return <Router allRoutes={allRoutes}/>
}

export default App;
