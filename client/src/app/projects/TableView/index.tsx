"use client";

import React from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useAppSelector } from '@/app/redux';
import { useGetTasksQuery } from '@/state/api';
import { Task as TaskType } from '@/state/types';

import Header from '@/components/Header';
import { formatDate } from '@/lib/utils/dateFormat';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils/dataGrid';

type TableViewProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const StatusTag = ({ status }: { status: TaskType['status'] }) => {
  return (<span
    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${status === 'To Do'
      ? 'bg-blue-100 text-blue-800'
      : status === 'Work In Progress'
        ? 'bg-green-100 text-green-800'
        : status === 'Under Review'
          ? 'bg-yellow-100 text-yellow-800'
          : status === 'Completed'
            ? 'bg-gray-100 text-gray-800'
            : ''
      }`}
  >
    {status}
  </span>
  );
}

const PriorityTag = ({ priority }: { priority: TaskType['priority'] }) => {
  return (<div
    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${priority === 'Urgent'
      ? 'bg-red-100 text-red-800'
      : priority === 'High'
        ? 'bg-yellow-100 text-yellow-800'
        : priority === 'Medium'
          ? 'bg-green-100 text-green-800'
          : priority === 'Low'
            ? 'bg-blue-100 text-blue-800'
            : ''
      }`}
  >
    {priority}
  </div>
  );
}

const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Title',
    width: 100,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => StatusTag({ status: params.value }),
  },
  {
    field: 'priority',
    headerName: 'Priority',
    width: 75,
    renderCell: (params) => PriorityTag({ priority: params.value }),
  },
  {
    field: 'tags',
    headerName: 'Tags',
    width: 130,
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    width: 130,
    renderCell: (params) => formatDate(params.value),
  },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    width: 130,
    renderCell: (params) => formatDate(params.value),
  },
  {
    field: 'author',
    headerName: 'Author',
    width: 150,
    renderCell: (params) => params.value.username || 'Unknown',
  },
  {
    field: 'assignee',
    headerName: 'Assignee',
    width: 150,
    renderCell: (params) => params.value.username || 'Unassigned',
  },
]

function TableView({
  id,
  setIsModalNewTaskOpen,
}: TableViewProps) {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className='h-[540px] w-full px-4 pb-8 xl:px-6'>
      <div className='pt-5'>
        <Header name='Table' isSmallText />

        <DataGrid
          rows={tasks || []}
          columns={columns}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
}

export default TableView;