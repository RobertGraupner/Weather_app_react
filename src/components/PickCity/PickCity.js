import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import styles from './PickCity.module.scss';

import { useState } from 'react';

// jako parametr przekazano referencję do funkcji action
const PickCity = ({action}) => {
  const [city, setCity] = useState('');
//po kliknieciu search uruchamiamy funkcje action z argumentem o wartosci inputa
  const handleSubmit = e => {
    e.preventDefault();
    action({ city });
    setCity('');
  }

  return (
    <form className={styles.pickCityForm} onSubmit={handleSubmit}> 
      <label>
        <TextInput placeholder="Enter city name...." value={city} onChange={e => setCity(e.target.value)} />
      </label>
      <Button>Search</Button>
    </form>
  );
};

export default PickCity;