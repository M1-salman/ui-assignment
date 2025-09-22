'use client';

import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
} from '@xyflow/react';
import { useState, useCallback, useMemo, useEffect } from 'react';
import '@xyflow/react/dist/style.css';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

interface FormData {
  name: string;
  description: string;
  tag: string;
  notificationType: string;
}

interface ReceiptFormData {
  customerPool: string;
  audienceType: 'cohort' | 'target audience' | 'payload based' | '';
}

interface ConditionFormData {
  conditionName: string;
  dataProperty: string;
  operator: string;
  value: string;
}

interface ActionProps {
  formData: FormData;
  receiptForms: ReceiptFormData[];
  conditionForms: ConditionFormData[];
}

// Custom Nodes
const CustomNode = ({ data }: { data: any }) => (
  <div className="flex flex-col justify-center items-center gap-y-1 min-w-52 min-h-14 border-l-2 border-[#BBBBBB] rounded bg-[#FFFFFF] p-2">
    <div className="flex items-center text-xs font-medium truncate" title={data.name}>
      <ElectricBoltIcon fontSize="small" className="mr-1" />
      {data.name || 'Untitled'}
    </div>
    <div className="text-xs line-clamp-2 break-words" title={data.description}>
      {data.description || 'No description'}
    </div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

const ReceiptNode = ({ data }: { data: any }) => (
  <div className="flex flex-col justify-center items-center gap-y-1 min-w-52 min-h-14 border-l-2 border-[#BBBBBB] rounded bg-[#FFFFFF] p-2">
    <div className="flex items-center text-xs font-medium truncate" title={data.customerPool}>
      <MailOutlineIcon fontSize="small" className="mr-1" />
      Receipts
    </div>
    <div className="text-xs text-center" title={data.audienceType}>
      You are using <span className="text-[#389F7F]">{data.audienceType}</span> from{' '}
      <span className="text-[#389F7F]">{data.customerPool || 'No Audience'}</span> pool.
    </div>
    <Handle type="source" position={Position.Bottom} />
    <Handle type="target" position={Position.Top} />
  </div>
);

const ConditionNode = ({ data }: { data: any }) => {
  const operatorSymbol =
    data.operator === 'Is equal to'
      ? '=='
      : data.operator === 'Not equal to'
        ? '!='
        : data.operator; // fallback for other operators

  return (
    <div className="flex flex-col justify-center items-center gap-y-1 min-w-52 min-h-14 border-l-2 border-[#BBBBBB] rounded bg-[#FFFFFF] p-2 relative">
      <div className="flex items-center text-xs font-medium truncate" title={data.conditionName}>
        <AccountTreeIcon fontSize="small" className="mr-1" />
        Condition
      </div>
      <div className="text-xs text-center">
        if {data.dataProperty} {operatorSymbol} {data.value}
      </div>

      <Handle type="source" position={Position.Bottom} id="truePath" style={{ left: '30%' }} />
      <Handle type="source" position={Position.Bottom} id="falsePath" style={{ left: '70%' }} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

// Node types
const nodeTypes = {
  customNode: CustomNode,
  receiptNode: ReceiptNode,
  conditionNode: ConditionNode,
};

const Action = ({ formData, receiptForms, conditionForms }: ActionProps) => {
  const initialNodes = useMemo<Node[]>(() => {
    const baseNode: Node[] = [
      {
        id: 'n1',
        position: { x: 50, y: 20 },
        data: formData as unknown as Record<string, unknown>,
        type: 'customNode',
      },
    ];

    const receiptNodes: Node[] = receiptForms.map((r, index) => ({
      id: `r${index + 1}`,
      position: { x: 50, y: 120 + index * 100 },
      data: r as unknown as Record<string, unknown>,
      type: 'receiptNode',
    }));

    const conditionNodes: Node[] = conditionForms.map((c, index) => ({
      id: `c${index + 1}`,
      position: { x: 350, y: 120 + index * 100 }, // place conditions on right
      data: c as unknown as Record<string, unknown>,
      type: 'conditionNode',
    }));

    return [...baseNode, ...receiptNodes, ...conditionNodes];
  }, [formData, receiptForms, conditionForms]);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((ns) => applyNodeChanges(changes, ns)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((es) => applyEdgeChanges(changes, es)),
    []
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((es) => addEdge(connection, es)),
    []
  );

  return (
    <div className="w-full h-full bg-[#DEDEDE]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Action;
