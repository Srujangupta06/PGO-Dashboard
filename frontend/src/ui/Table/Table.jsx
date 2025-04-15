import TableHeading from "./TableHeading";
import TableBody from "./TableBody";

const Table = ({headingList,bodyData}) => {
    return (
        <div className="w-[75%] overflow-x-auto rounded-xl border border-gray-200 shadow-md mx-auto">
        <table className="min-w-[700px] w-full divide-y divide-gray-200 text-sm">
          <TableHeading headingList={headingList}/>
          <TableBody bodyData={bodyData}/>
        </table>
      </div>
    );
  };

export default Table;
