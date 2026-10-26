export const createShortUrl = async (link,customAlias,tags) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/urls/submit`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ link: link ,customAlias:customAlias,tags:tags}),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const getMyUrls = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/urls/getMyUrls`,
    {
      method: "get",
      credentials: "include",
    },
  );
  const data = await response.json();
  return data;
};
export const getTodaysClicks=async ()=>{
    const response=await fetch(`${import.meta.env.VITE_API_URL}/urls/getTodaysClicks`,{
    method:'get',
    credentials:'include'
  });
  const data=await response.json();
  return data.count;
}
export const deleteUrl = async (shortCode) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/urls/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ shortCode }),
  });
  const data = await response.json();
  return data;
};

export const handleDeleteUrl = async (shortCode, setMyUrls) => {
  const data = await deleteUrl(shortCode);
  if (setMyUrls) {
    setMyUrls((prev) => prev.filter((url) => url.shortCode !== shortCode));
  }
  return data;
};

