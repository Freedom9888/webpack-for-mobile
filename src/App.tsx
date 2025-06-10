import React, { useEffect } from 'react';
// import styles from './index.module.css'
// import styles1 from './style.module.scss'
import Countdown from './components/CountDown';
import {parseFutureTimeToTimestamp} from './utils/utils'
// import './style.css'
// console.log('styles.center',styles)
const App: React.FC = () => {



  useEffect(()=>{
    let p 
    new Promise((resolve,reject)=>{
      console.log('1')
      p = resolve
    }).then(()=>{
      console.log('2')
    });
    new Promise((resolve,reject)=>{
     resolve('')
    }).then(()=>{
      console.log('3')
    });
    setTimeout(()=>{
      console.log('4')
    },0)
    p(8)
    console.log('5')
  },[])
  const testpPromise = ()=>{
     let p 
    new Promise((resolve,reject)=>{
      console.log('1')
      p = resolve
    }).then(()=>{
      console.log('2')
    });
    new Promise((resolve,reject)=>{
     resolve('')
    }).then(()=>{
      console.log('3')
    });
    setTimeout(()=>{
      console.log('4')
    },0)
    p(8)
    console.log('5')
  }
  return <div className='app'>988Hello, React!
  <div 
  // className={styles.name}
  >
      center
  </div>
  <div 
  // className={styles1.center}
   onClick={()=>{
    testpPromise()
  }}>
      center1
  </div>
  <div>
    <Countdown endTime={parseFutureTimeToTimestamp('2025-06-10 13:00:00')}/>
  </div>
  </div>;

};

export default App;
