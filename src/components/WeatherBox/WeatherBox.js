import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from "../ErrorBox/ErrorBox";

const WeatherBox = props => {
  //utworzenie stanu lokalnego, zeby moc korzystac z danych w WeatherSummary
  const [weather, setWeather] = useState('');
  // utworzenie stanu lokalnego z pendig, zeby warunkowc wyswietlanie Loadera w zaleznosci od etapu na ktorym jest request
  const [pending, setPending] = useState(false);
	const [error, setError] = useState(false);

  const handleCityChange = useCallback((city) => {
    //ustawiamy pending na true w momencie gdy odbywa sie request do API
    setPending(true);
    
		setError(false);

		fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city.city}&appid=f05768e9f17b95556f7bdc4a6c54e4bd&units=metric`)
      .then((res) => {
			if (res.status === 200) {
				return res.json().then((data) => {
					//console.log(data);
					setWeather({
						city: data.name,
						temp: data.main.temp,
						icon: data.weather[0].icon,
						description: data.weather[0].main,
          });
          // ustawiamy pendign na false, gdy wyszukiwanie jest zakonczone
					setPending(false);
        });
        // gdy kod odpowiedzi z serwera bedzie inny niz 200 ustawiamy error na true i w return zwrocimy ErrorBox
			} else {
				setError(true);
			}
		});
	}, []);
  
  return (
		<section>
			<PickCity action={handleCityChange} />
			{weather && !error && <WeatherSummary {...weather} />}
			{pending && !error && <Loader />}
			{error && <ErrorBox />}
		</section>
	);
};

export default WeatherBox;
