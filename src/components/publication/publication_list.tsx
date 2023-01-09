import { useState, useEffect } from 'react'

import { SinglePublication }  from './single_publication';
import { Post, PublicationTypes, useExploreFeedQuery, PublicationSortCriteria } from '@generated/types';

interface PublicationListProps {
  type: string;
}

export const PublicationList = (publicationListProps: PublicationListProps) => {
  const {type } = publicationListProps;
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)

  const { data: feedData, loading, error } = useExploreFeedQuery({
    variables: {
      request: {
        publicationTypes: [PublicationTypes.Post],
        sortCriteria: PublicationSortCriteria.Latest,
        limit: 10
      }
    },
  });

  useEffect(() => {
    if (feedData?.explorePublications.items) {
      // console.log(feedData)
      setData(feedData?.explorePublications?.items)
    }
  }, [feedData])

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {
        data ? data?.map((post: Post) => <SinglePublication key={post.id} question={post} showQuestion={true} clickAble={true}/>) : null
      }
    </div>
  );
};