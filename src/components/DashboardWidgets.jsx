import React from 'react';
import { Card, CardBody, Typography, Progress } from '@material-tailwind/react';
import { 
  ClockIcon, 
  CalendarDaysIcon, 
  AcademicCapIcon,
  ChartBarIcon,
  TrophyIcon,
  FireIcon
} from '@heroicons/react/24/outline';

export const RecentActivityWidget = () => {
  const activities = [
    { 
      action: "New student enrolled", 
      student: "John Doe", 
      section: "Santos",
      time: "2 minutes ago",
      icon: "👤",
      color: "text-blue-600"
    },
    { 
      action: "Quiz completed", 
      student: "Jane Smith", 
      section: "Taurus",
      time: "15 minutes ago",
      icon: "📝",
      color: "text-purple-600"
    },
    { 
      action: "Module progress updated", 
      student: "Mike Johnson", 
      section: "Ugarte",
      time: "1 hour ago",
      icon: "📚",
      color: "text-green-600"
    },
    { 
      action: "Section created", 
      student: "Teacher", 
      section: "New Section",
      time: "2 hours ago",
      icon: "🏫",
      color: "text-orange-600"
    }
  ];

  return (
    <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardBody className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <ClockIcon className="h-5 w-5 text-white" />
          </div>
          <Typography variant="h6" color="blue-gray" className="font-bold">
            Recent Activity
          </Typography>
        </div>
        
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="text-2xl">{activity.icon}</div>
              <div className="flex-1">
                <Typography variant="small" color="blue-gray" className="font-semibold">
                  {activity.action}
                </Typography>
                <Typography variant="small" className={`${activity.color} font-medium`}>
                  {activity.student} • {activity.section}
                </Typography>
              </div>
              <Typography variant="small" color="gray" className="text-xs">
                {activity.time}
              </Typography>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export const ProgressOverviewWidget = () => {
  const progressData = [
    { label: "Course Completion", value: 78, color: "bg-green-500" },
    { label: "Quiz Average", value: 85, color: "bg-purple-500" },
    { label: "Student Engagement", value: 92, color: "bg-blue-500" },
    { label: "Module Progress", value: 67, color: "bg-orange-500" }
  ];

  return (
    <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardBody className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <ChartBarIcon className="h-5 w-5 text-white" />
          </div>
          <Typography variant="h6" color="blue-gray" className="font-bold">
            Progress Overview
          </Typography>
        </div>
        
        <div className="space-y-4">
          {progressData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <Typography variant="small" color="blue-gray" className="font-medium">
                  {item.label}
                </Typography>
                <Typography variant="small" color="blue-gray" className="font-bold">
                  {item.value}%
                </Typography>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${item.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export const UpcomingTasksWidget = () => {
  const tasks = [
    { 
      task: "Grade Quiz: Human Anatomy", 
      dueDate: "Today, 3:00 PM",
      priority: "high",
      icon: "📝"
    },
    { 
      task: "Update Module: Solar System", 
      dueDate: "Tomorrow, 10:00 AM",
      priority: "medium",
      icon: "📚"
    },
    { 
      task: "Review Student Progress", 
      dueDate: "Friday, 2:00 PM",
      priority: "low",
      icon: "📊"
    },
    { 
      task: "Prepare Section Meeting", 
      dueDate: "Next Week",
      priority: "medium",
      icon: "🏫"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardBody className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
            <CalendarDaysIcon className="h-5 w-5 text-white" />
          </div>
          <Typography variant="h6" color="blue-gray" className="font-bold">
            Upcoming Tasks
          </Typography>
        </div>
        
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="text-xl">{task.icon}</div>
              <div className="flex-1">
                <Typography variant="small" color="blue-gray" className="font-semibold">
                  {task.task}
                </Typography>
                <Typography variant="small" color="gray" className="text-xs">
                  {task.dueDate}
                </Typography>
              </div>
              <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export const AchievementsWidget = () => {
  const achievements = [
    { title: "Perfect Attendance", description: "All students present this week", icon: "🎯", earned: true },
    { title: "Quiz Master", description: "100% quiz completion rate", icon: "🏆", earned: true },
    { title: "Engagement Champion", description: "High student participation", icon: "🔥", earned: false },
    { title: "Module Expert", description: "All modules updated", icon: "⭐", earned: false }
  ];

  return (
    <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardBody className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
            <TrophyIcon className="h-5 w-5 text-white" />
          </div>
          <Typography variant="h6" color="blue-gray" className="font-bold">
            Achievements
          </Typography>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                achievement.earned 
                  ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300 shadow-md' 
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="text-center">
                <div className={`text-2xl mb-2 ${achievement.earned ? 'animate-pulse' : ''}`}>
                  {achievement.icon}
                </div>
                <Typography variant="small" color="blue-gray" className="font-semibold text-xs">
                  {achievement.title}
                </Typography>
                <Typography variant="small" color="gray" className="text-xs mt-1">
                  {achievement.description}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default { RecentActivityWidget, ProgressOverviewWidget, UpcomingTasksWidget, AchievementsWidget };
