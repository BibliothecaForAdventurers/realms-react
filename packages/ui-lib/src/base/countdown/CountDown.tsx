import React, { useEffect, useState } from 'react';

interface DateProps {
  date: string;
}

const useCountdown = (props: DateProps) => {
  const countDownDate = new Date(parseInt(props.date)).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: any) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

interface TimeDisplay {
  value: any;
  type: any;
  isDanger: any;
}

interface Counter {
  days: any;
  hours: any;
  minutes: any;
  seconds: any;
}

const DateTimeDisplay = (props: TimeDisplay) => {
  return (
    <div className={`mr-1 ${props.isDanger ? 'text-red-200' : 'countdown'}`}>
      <p>
        {props.value}
        <span className="text-gray-500">{props.type}</span>
      </p>
    </div>
  );
};

const ExpiredNotice = () => {
  return (
    <div className="w-full p-2 text-center uppercase bg-red-500 rounded animate-pulse">
      <p>Realm can be Attacked</p>
    </div>
  );
};

const ShowCounter = (props: Counter) => {
  return (
    <div className="flex text-3xl">
      {/* <DateTimeDisplay
        value={props.days}
        type={'D'}
        isDanger={props.days <= 3}
      /> */}

      <DateTimeDisplay value={props.hours} type={'H'} isDanger={true} />

      <DateTimeDisplay value={props.minutes} type={'M'} isDanger={true} />

      <DateTimeDisplay value={props.seconds} type={'S'} isDanger={true} />
    </div>
  );
};

export const CountdownTimer = (props: DateProps) => {
  const [days, hours, minutes, seconds] = useCountdown(props);
  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};
