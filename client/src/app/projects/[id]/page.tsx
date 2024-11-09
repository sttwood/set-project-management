"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

type ProjectProps = {
  params: Promise<{ id: string }>;
};

const ProjectHeader = dynamic(() => import('@/app/projects/ProjectHeader'), { ssr: false });
const BoardView = dynamic(() => import('@/app/projects/BoardView'), { ssr: false });
const ListView = dynamic(() => import('@/app/projects/ListView'), { ssr: false });
const TimelineView = dynamic(() => import('@/app/projects/TimelineView'), { ssr: false });
const TableView = dynamic(() => import('@/app/projects/TableView'), { ssr: false });

function Project({ params }: ProjectProps) {
  const [id, setId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    unwrapParams();
  }, [params]);

  if (!id) return <p>Loading...</p>;

  return (
    <div>
      {/* MODAL NEW TASK */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <TimelineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
}

export default Project;