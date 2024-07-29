const searchHandler = (allData, searchValue) => {
  if (!searchValue) return allData;

  const filterData = allData.filter((item) =>
    item.options?.title.includes(searchValue)
  );
  return filterData;
};

const categoryHandler = (allData, categoryValue) => {
  if (categoryValue === "all") return allData;

  const filterData = allData.filter((item) => item.category === categoryValue);
  return filterData;
};

const createFilteringObject = (data) => {
  let filteredData = { ...data };

  if (data.search === "") {
    const { search, ...other } = filteredData;

    filteredData = other;
  }

  if (data.category === "all") {
    const { category, ...other } = filteredData;

    filteredData = other;
  }

  return filteredData;
};

export { searchHandler, categoryHandler, createFilteringObject };
