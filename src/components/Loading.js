import React from 'react';

const CX = 1118;
const CY = 56;
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
        width="144"
        height="166"
        viewBox="1044.5 -28.5 144 166"
      >
        <polygon fill="#FFFFFF" points="1046,14.5 1118,-27 1190,14.5 1190,97.5 1118,139 1046,97.5 "/>
        <line x1={getX(time)} y1={getY(time)} x2="1118" y2="56" stroke="#1A1A1A" strokeWidth="2" height="50"/>
        <line x1={getX(time, true)} y1={getY(time, true)} x2="1118" y2="56" stroke="#1A1A1A" strokeWidth="2" />
      </svg>
    );
  }
}

export default Loading;
