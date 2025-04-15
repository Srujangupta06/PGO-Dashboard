import TableBodyRow from "./TableBodyRow";

const TableBody = ({bodyData}) => {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {bodyData.map((room, index) => (
        <TableBodyRow key={room.roomNumber} roomInfo={room} index={index + 1} />
      ))}
    </tbody>
  );
};

export default TableBody;
