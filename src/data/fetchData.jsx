const fetchData = async ({ link, setData }) => {
  try {
    const res = await fetch(link);
    if (!res.ok) throw new Error("Failed to fetch data!");
    const jsonData = await res.json();
    setData(jsonData);
  } catch (error) {
    console.log("Error fetching data:" & error);
  }
};

export default fetchData;
