const fetcher = async (url) => {
  const res = await fetch(url, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return res.json();
};

export { fetcher };
