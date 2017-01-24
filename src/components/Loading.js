import React from 'react';

const CX = 68;
const CY = 68;
const MINUTE_RADIUS = 50;
const HOUR_RADIUS = 50;

const getRad = (degrees) => {
  const adjust = Math.PI / 2;
  return (degrees * Math.PI / 180) - adjust;
};

const getX = (time, isHour) => {
  const degrees = isHour ? (90 + (time / 60) * 30) : time * 6;
  return CX + (isHour ? HOUR_RADIUS : MINUTE_RADIUS) * Math.cos(getRad(degrees));
};

const getY = (time, isHour) => {
  const degrees = isHour ? (90 + (time / 60) * 30) : time * 6;
  return CY + (isHour ? HOUR_RADIUS : MINUTE_RADIUS) * Math.sin(getRad(degrees));
};

class Loading extends React.Component {

  state = {
    time: 0
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      const {time} = this.state;
      this.setState({ time: (time + 1) % 60 });
    }, 30);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const {time} = this.state;

    return (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="136"
        height="136"
        viewBox="0 0 136 136"
      >
        <circle fill="#FFFFFF" cx="68" cy="68" r="68" />
        <line x1={getX(time)} y1={getY(time)} x2="68" y2="68" stroke="#1A1A1A" strokeWidth="2" height="50"/>
        <line x1={getX(time, true)} y1={getY(time, true)} x2="68" y2="68" stroke="#1A1A1A" strokeWidth="2" />
      </svg>
    );
  }
}

export default Loading;
