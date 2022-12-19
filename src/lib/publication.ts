import { useContext, useState } from 'react'
import { gql } from '@apollo/client'
import { splitSignature } from 'ethers/lib/utils';

import { ContractContext } from '@context/contract';
import { client } from './request'
import { PublicationsQueryRequest, Profile } from '@generated/types'

export interface MetadataProps {
  content: string;
  description: string;
  type: "question" | "answer";
  tags?: string[];
  author: Profile;
}

export const getMetadata = ({content, description, type, tags, author}: MetadataProps) => {
  return {
    appId: 'Pendora',
    version: '2.0.0',
    mainContentFocus: "TEXT_ONLY",
    metadata_id: Math.random().toString(),
    description: description,
    locale: 'en-US',
    content: content,
    external_url: null,
    image: null,
    imageMimeType: null,
    name: `${author.name}'s ${type}`,
    attributes: [{
      trait_type: 'type',
      value: type,
    }],
    tags: tags,
  }
}

export const PublicationsDocument = gql`
  query Publications($request: PublicationsQueryRequest!) {
    publications(request: $request) {
      items {
        __typename 
        ... on Post {
          ...PostFields
        }
      }
    }
  }
  fragment PostFields on Post {
    id
    metadata {
      ...MetadataOutputFields
    }
  }
  fragment MetadataOutputFields on MetadataOutput {
    content
  }
`

export const getPublications = async (request: PublicationsQueryRequest) => {
  const result = await client.query({
    query: PublicationsDocument,
    variables: {
      request,
    },
  });
  return result.data.publications;
}

export const usePostWithSig = () => {
  const { lensHub } = useContext(ContractContext)
  const [txLoading, setTxLoading] = useState(false)
  
  const postWithSig = async (signature: string, data: any) => {
    if (lensHub) {
      console.log('create post: signature', signature);
      setTxLoading(true)
      var { typedData } = data.createPostTypedData
      const { v, r, s } = splitSignature(signature);
      const tx = await lensHub.postWithSig({
        profileId: typedData.value.profileId,
        contentURI: typedData.value.contentURI,
        collectModule: typedData.value.collectModule,
        collectModuleInitData: typedData.value.collectModuleInitData,
        referenceModule: typedData.value.referenceModule,
        referenceModuleInitData: typedData.value.referenceModuleInitData,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      });
      console.log('create post:', tx);
      setTxLoading(false)
    } else {
      console.error('LensHub contract not found');
    }
  }

  return {
    postWithSig,
    txLoading,
  }
    
}