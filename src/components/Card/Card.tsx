import React from 'react'
import "../../styles/card.css"

type CardProps = {
  weather: {
    city: string,
    country: string,
    temperature: number,
    description: string,
    icon: string
  },
  isFetching: boolean
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Card(props: CardProps) {
  const { icon, temperature, description, city, country } = props.weather ?? {};

  if (!temperature) return null;

  let src = `http://openweathermap.org/img/w/${icon}.png`;

  if (!props.isFetching)
    return (
      <div className="card">
        <div className="inner space-y-4">
          <p className="paragraph flex">
            <img src="/pin.svg" alt="logo" className="h-6 w-6 inline-block mr-2 text-white"/>
            <h2>{ city } { country }</h2>
          </p>
          <p className="h2">{days[new Date().getDay()]}</p>
          <p className="paragraph">{(new Date().toDateString()).slice(3)}</p>
          <img className="icon" src={src} alt=""></img>
          <p className="h1">{temperature}&#8451;</p>
          <p className="h3">{description}</p>
        </div>
      </div>
    )
  else return (
    <div className="card">
      <div className="inner flex items-center justify-center min-w-[201px] min-h-[248px] md:min-w-[233px] md:min-h-[288px]">
        <img width={100} height={100} className="loading" src="/loading.gif" alt=""/>
      </div>
    </div>
  )
};
