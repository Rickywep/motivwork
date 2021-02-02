import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Feed from './Feed';

export default function Feeds({ token }) {
  const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    const queryApi = async () => {
      try {
        await axios
          .get('http://localhost:4000/api/feedbacks', {
            headers: { 'x-auth-token': token },
          })
          .then((res) => {
            setFeeds(res.data.feedbacks);
          });
      } catch (error) {
        console.log('~ error', error.response);
      }
    };
    queryApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {feeds.map((feed) => (
        <Feed key={feed._id} feed={feed} />
      ))}
    </div>
  );
}
