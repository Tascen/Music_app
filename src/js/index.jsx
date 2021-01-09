import '@styles/gen.scss'
import React, { Suspense, lazy, useState } from 'react';
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import store from './redux/store'

import {load_album} from './redux/actions/loaders'
import {change_path} from './redux/actions/all'

import {Fallback_preloader, Preloader} from './сomponents/page_elements/preloaders';

const Page_musicList = React.lazy(() => import('./сomponents/pages/page_musicList'));

function randomNumber(min, max) {
  return Math.floor( Math.random() * (max - min) + min )
}



render(
  <App />,
  document.getElementById('root')
);

function App(props) {
  const [ready, change_ready] = useState(false);

  if (!ready) {
    (function load_random_album() {
      let id = randomNumber(101620000, 101625552);//for check use id: 101625552
      load_album(id).then(()=>{
        change_path({
          album: id,
        })
        change_ready(true)

      }).catch(code=>{
        load_random_album()
      })
    })()
  }

  return (
    <Provider store={store}>
      <Preloader is_hidden={ready}/>
      <Suspense fallback={<Fallback_preloader/>}>
        <Page_musicList />
      </Suspense>
    </Provider>
  )
}
