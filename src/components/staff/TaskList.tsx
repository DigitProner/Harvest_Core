import React from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
}

const tasks: Task[] = [
  {
    id: 'T1',
    title: 'Morning Cattle Check',
    description: 'Perform health check on dairy cattle in Barn A',
    assignee: 'John Smith',
    dueDate: '2024-03-20',
    priority: 'high',
    status: 'pending'
  },
  {
    id: 'T2',
    title: 'Vaccination Schedule',
    description: 'Update vaccination records for new livestock',
    assignee: 'Sarah Johnson',
    dueDate: '2024-03-21',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: 'T3',
    title: 'Feed Inventory',
    description: 'Check and update feed inventory levels',
    assignee: 'Mike Wilson',
    dueDate: '2024-03-19',
    priority: 'low',
    status: 'completed'
  }
];

const TaskList = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Active Tasks</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : task.priority === 'high' ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-blue-500" />
                  )}
                  <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                </div>
                <p className="mt-1 text-sm text-gray-500">{task.description}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="h-4 w-4" />
                {task.dueDate}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                task.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : task.status === 'in-progress'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {task.status}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Assigned to: {task.assignee}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;