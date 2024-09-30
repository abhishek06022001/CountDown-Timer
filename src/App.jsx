import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

function App() {
  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(false);
  const [reset, setReset] = useState(false);
  const [seconds, setSeconds] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [myinterval, setMyinterval] = useState(null);
  const [time, setTime] = useState(0);
  // could have also made an object here but for the ease havent :) 
  useEffect(() => {
    if (time < 0) {
      alert("Countdown Finished");
      setTime(0);
      setHours(''); setMinutes(''), setSeconds(''); clearInterval(myinterval); setMyinterval(null); setStart(false); setPause(false); setReset(false);
    }
  }, [time])

  useEffect(() => {
    let h = hours, m = minutes, s = seconds;
    if (h === '') {
      h = 0;
    }
    if (m === '') {
      m = 0;
    }
    if (s === '') {
      s = 0;
    }
    let time = (h*3600) + (m*60) + (s);
    console.log("time is", time, h , m , s);
    
    setTime(time);
    if (start) {
      let id = setInterval(() => {
        time = time - 1;
        let h = Math.floor(time / 3600);
        let m = Math.floor((time - h * 3600) / 60);
        let s = ((time - h * 3600 - m * 60));
        setTime(time);
        setHours(h); setMinutes(m), setSeconds(s);
      }, 1000);
      setMyinterval(id);
    } else if (pause) {
      clearInterval(myinterval); setMyinterval(null); setStart(false); setReset(false);
    } else if (reset) {
      setHours(''); setMinutes(''), setSeconds(''); clearInterval(myinterval); setMyinterval(null); setStart(false); setPause(false);
    }
  }, [start, pause, reset])
  return (
    <>
      <div className='font-semibold text-4xl' >CountDown Timer</div>
      <div className='pl-6' >
        <input type="text" name="hour" id="hour" value={hours} onChange={(e) => setHours(e.target.value)}
          placeholder='HH'
          className=' border-black border-2 w-10' />
        <span className='m-3 font-semibold  text-2xl'>:</span>
        <input type="text" name="minute" id="minute" value={minutes} onChange={(e) => setMinutes(e.target.value)}
          placeholder='MM'
          className=' border-black border-2 w-10' />
        <span className='m-3 font-semibold  text-2xl'>:</span>
        <input type="text" name="second" id="second" value={seconds} onChange={(e) => setSeconds(e.target.value)}
          placeholder='SS'
          className=' border-black border-2 w-10' />
        {!start ?
          <button className='bg-slate-800 pt-1 pb-1 pl-2 pr-2 ml-2  text-white '
            onClick={() => { setPause(false), setStart(true), setReset(false) }}
          >start</button>
          :
          <>
            <button className='bg-slate-800 pt-1 pb-1 pl-2 pr-2 ml-2  text-white '
              onClick={() => { setPause(true), setStart(false), setReset(false) }}
            >Pause</button>
            <button className='bg-slate-800 pt-1 pb-1 pl-2 pr-2 ml-2  text-white '
              onClick={() => { setPause(false), setStart(false), setReset(true) }}
            >Reset</button>
          </>
        }
      </div>
    </>
  )
}

export default App