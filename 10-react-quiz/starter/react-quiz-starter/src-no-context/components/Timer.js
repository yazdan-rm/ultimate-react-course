import {useEffect} from "react";

function Timer({dispatch, secondsRemaining}) {
  const hour = Math.floor(secondsRemaining / 3600);
  const min = Math.floor((secondsRemaining % 3600) / 60);
  const second = secondsRemaining % 60;

  useEffect(function () {
    const id = setInterval(function () {
      dispatch({type: 'tick'});
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch])

  return <div className={'timer'}>{hour < 10 && "0"}{hour}:{min < 10 && "0"}{min}:{second < 10 && "0"}{second}</div>
}

export default Timer;