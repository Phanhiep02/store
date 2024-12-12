import TableItem from "./TableItem";

export default function TableList() {
  return (
    <>
      <div>
        <table className="min-w-full border-solid border-black">
          <thead>
            <tr>
              <th className="border border-gray-500 px-4 text-primary py-2 w-1/12">
                STT
              </th>
              <th className="border border-gray-500 px-4 py-2 text-primary">
                Name
              </th>
              <th className="border border-gray-500 px-4 py-2 text-primary">
                Email
              </th>
              <th className="border border-gray-500 px-4 py-2 text-primary">
                Status
              </th>
              <th className="border border-gray-500 px-4 py-2 w-1/12 text-primary">
                Edit
              </th>
              <th className="border border-gray-500 px-4 py-2 w-1/12 text-primary">
                Delete
              </th>
            </tr>
          </thead>
          {/* table Item */}
          <TableItem></TableItem>
        </table>
      </div>
    </>
  );
}
