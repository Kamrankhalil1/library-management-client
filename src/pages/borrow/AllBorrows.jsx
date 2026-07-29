import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import borrowService from "../../services/borrowService";

function AllBorrows() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBorrows = async () => {
    try {
      setLoading(true);

      const response =
        await borrowService.getAllBorrows();

      setBorrows(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load borrow records"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrows();
  }, []);

  if (loading) {
    return (
      <h2 className="text-center text-xl font-semibold">
        Loading borrow records...
      </h2>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        All Borrow Records
      </h1>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-slate-200">
            <tr>
              <th className="px-4 py-3 text-left">
                Member
              </th>

              <th className="px-4 py-3 text-left">
                Email
              </th>

              <th className="px-4 py-3 text-left">
                Book
              </th>

              <th className="px-4 py-3 text-left">
                Borrow Date
              </th>

              <th className="px-4 py-3 text-left">
                Due Date
              </th>

              <th className="px-4 py-3 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {borrows.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="py-8 text-center"
                >
                  No borrow records found.
                </td>
              </tr>
            ) : (
              borrows.map((borrow) => (
                <tr
                  key={borrow._id}
                  className="border-b"
                >
                  <td className="px-4 py-3">
                    {borrow.user?.name}
                  </td>

                  <td className="px-4 py-3">
                    {borrow.user?.email}
                  </td>

                  <td className="px-4 py-3">
                    {borrow.book?.title}
                  </td>

                  <td className="px-4 py-3">
                    {new Date(
                      borrow.borrowDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    {new Date(
                      borrow.dueDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    {borrow.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllBorrows;