export const getIPFSLink = (hash: string): string => {
  const infuraIPFS = 'https://ipfs.infura.io/ipfs/';

  return hash
    .replace(/^Qm[1-9A-Za-z]{44}/gm, `${infuraIPFS}${hash}`)
    .replace('https://ipfs.io/ipfs/', infuraIPFS)
    .replace('ipfs://', infuraIPFS);
};

export const getUploadToIPFSLink = async (content: object) => {
  const res = await fetch('/api/ipfs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })
  try {
    const data = await res.json()
    console.log('data', data)
    return data.url
  } catch(e) {
    console.log(e)
  }
}