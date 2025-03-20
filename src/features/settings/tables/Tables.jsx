import React, { useEffect } from 'react';
import {
  useCreateTableMutation,
  useDeleteTableMutation,
  useGetTablesQuery,
} from '../../../services/apiTables';
import Button from '../../../Components/UI/Button';
import { toast } from 'react-toastify';
import Spinner from '../../../Components/UI/Spinner';

const Tables = () => {
  const { data: tables, isLoading, error } = useGetTablesQuery();
  const [
    createTable,
    {
      isLoading: isCreating,
      isSuccess: isCreated,
      reset: resetCreate,
      error: createError,
    },
  ] = useCreateTableMutation();

  const [
    deleteTable,
    {
      isLoading: isDeleting,
      isSuccess: isDeleted,
      reset: resetDelete,
      error: deleteError,
    },
  ] = useDeleteTableMutation();

  useEffect(() => {
    if (isCreated) {
      toast.success('Table created successfully', { autoClose: 5000 });
      resetCreate();
    }
    if (isDeleted) {
      toast.success('Table deleted successfully', { autoClose: 5000 });
      resetDelete();
    }
  }, [isCreated, isDeleted]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError?.message, { autoClose: 6000 });
      resetDelete?.();
      resetCreate?.();
    }
    if (createError) {
      toast.error(createError?.message, { autoClose: 6000 });
      resetCreate?.();
      resetDelete?.();
    }
  }, [deleteError, createError, resetCreate, resetDelete]);

  return (
    <section className="flex flex-col gap-8 py-10">
      <div className="flex-between flex-wrap gap-3 border-b-2 border-primary-100 pb-5">
        <h1 className="text-[2rem] font-[600]">Manage Tables</h1>
      </div>
      {isLoading ? (
        <div className="mx-auto mt-10">
          <Spinner />
        </div>
      ) : (
        <>
          <ul className="flex flex-wrap gap-4">
            {tables?.map(table => (
              <li
                key={table._id}
                className={`rounded-md p-6 text-lg shadow-md ${table.isReserved ? 'bg-red-400' : 'bg-green-400'}`}
              >
                T{table.number}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex gap-6">
            {tables?.length > 0 && (
              <Button
                className="w-full bg-red-400 text-red-50"
                onClick={() => deleteTable(tables.at(-1)?._id)}
                isLoading={isDeleting}
                disabled={isDeleting || isCreating}
              >
                Delete Table
              </Button>
            )}
            <Button
              variant="dark"
              className="w-full"
              onClick={createTable}
              disabled={isCreating || isDeleting}
              isLoading={isCreating}
            >
              Create Table
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default Tables;
