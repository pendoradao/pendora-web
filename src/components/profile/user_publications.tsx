import { useState, useEffect } from 'react';
import { getPublications } from '@lib/publication';
import { Profile, Post, PublicationTypes } from '@generated/types';

interface UserPublicationProps {
  profile: Profile;
}

const UserPublication = ({profile}: UserPublicationProps) => {
  const [publications, setPublications] = useState<Post[]>([]);
  useEffect(() => {
    if (profile.id) {
      getPublications({
        profileId: profile.id,
        limit: 10,
        publicationTypes: [PublicationTypes.Post]
      }).then((data) => {
        console.log(data.items);
        setPublications(data.items);
      });
    }
  }, [profile])
  return (
    <div>
      {
        publications.map(pub => (
          <div key={pub.id} className='shadow p-10 rounded mb-8'>
            <p>{pub.metadata.content}</p>
          </div>
        ))
      }
    </div>
  )
}

export default UserPublication;