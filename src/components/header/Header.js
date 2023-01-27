import React, { useCallback, useEffect, useState } from 'react';
import styles from './Header.module.css';
const Header = () => {
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const API_KEY = process.env.REACT_APP_GEOLOCATION_API_KEY;
  console.log(API_KEY);
  // https://geo.ipify.org/api/v2/country,city?apiKey=at_RPNQ7bUVGh3DiTSrAiP54h8YjrfR6&ipAddress=8.8.8.8
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${input}`;
  const fetchMapImg = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);
  useEffect(() => {
    fetchMapImg();
  }, []);
  const handleChange = () => {
    if (input == null) return;
    const foundIp = fetchMapImg(input);
    setItems(foundIp);
    setInput('');
  };
  return (
    <header className={styles['header__title'] + ' ' + styles['header__flex']}>
      <h3>IP Address Tracker</h3>

      <div className={styles['search__bar']}>
        <input
          type="text"
          placeholder="Search for any IP address or domain"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleChange} className={styles.btn}>
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
            <path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className={styles['report__box']}>
        {loading && (
          <div className={styles['report__spacing']}>
            <div className={styles['report']}>
              <h4>IP Address</h4>
              <p>-</p>
            </div>
            <div className={styles['report']}>
              <h4>Location</h4>
              <p>-</p>
            </div>
            <div className={styles['report']}>
              <h4>Timezone</h4>
              <p>-</p>
            </div>
            <div className={styles['report']}>
              <h4>Isp</h4>
              <p>-</p>
            </div>
          </div>
        )}
        {!loading && (
          <div className={styles['report__spacing']}>
            <div className={styles['report']}>
              <h4>IP Address</h4>
              <p>{items.ip}</p>
            </div>
            <div className={styles['report']}>
              <h4>Location</h4>
              <p>{`${items.location.city}, ${items.location.country}`}</p>
            </div>
            <div className={styles['report']}>
              <h4>Timezone</h4>
              <p>{`UTC - ${items.location.timezone.slice(1)}`}</p>
            </div>
            <div className={styles['report']}>
              <h4>Isp</h4>
              <p>{items.isp}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
