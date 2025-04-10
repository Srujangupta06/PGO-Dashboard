const TableHeading = ({headingList}) => {
  
  return (
    <thead className="bg-gray-100 sticky top-0 z-10">
      <tr>
        {headingList.map((heading) => (
          <th
            key={heading}
            className="px-4 md:px-6 py-3 text-left font-semibold text-gray-700 tracking-wide whitespace-nowrap"
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeading;
