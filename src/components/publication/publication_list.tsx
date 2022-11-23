import { useState, useEffect } from 'react'

import SinglePublication  from './single_publication';
import { Post } from '@types';

interface PublicationListProps {
  type: string;
}

export const PublicationList = (publicationListProps: PublicationListProps) => {
  const {type } = publicationListProps;
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/feed?type=' + type)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {
        data ? data?.map((post: Post) => <SinglePublication key={post.answerId} {...post} />) : null
      }
    </div>
  );
};