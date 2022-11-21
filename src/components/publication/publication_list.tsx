import { useState, useEffect } from 'react'

import SinglePublication  from './single_publication';
import { Post } from '@types';

export const PublicationList = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/feed')
      .then((res) => res.json())
      .then((data) => {
        setData(data.data)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {data && data.map((post: Post) => <SinglePublication {...post} />)}
    </div>
  );
};