export const createShortUrl = async (link) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/urls/submit`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ link: link }),
  });
  const data = await response.json();
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
export const handleDeleteUrl = async (shortCode, setMyUrls) => {
  alert("Delete Url");
  const response = await fetch(`${import.meta.env.VITE_API_URL}/urls/delete`, {
    method: "Post",
    headers: { "Content-Type": "Application/JSON" },
    credentials: "include",
    body: JSON.stringify({ shortCode: shortCode }),
  });
  const data = await response.json();
  setMyUrls((prev) => prev.filter((url) => url.shortCode != shortCode));
  alert(data.message);
};

