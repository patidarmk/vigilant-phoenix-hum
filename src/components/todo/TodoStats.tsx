import React from 'react';
import { Card } from '@/components/ui/card';

interface TodoStatsProps {
  total: number;
  completed: number;
  pending: number;
}

const TodoStats: React.FC<TodoStatsProps> = ({ total, completed, pending }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-gray-800">{total}</div>
        <div className="text-sm text-gray-600">Total</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-green-600">{completed}</div>
        <div className="text-sm text-gray-600">Completed</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-orange-600">{pending}</div>
        <div className="text-sm text-gray-600">Pending</div>
      </Card>
    </div>
  );
};

export default TodoStats;