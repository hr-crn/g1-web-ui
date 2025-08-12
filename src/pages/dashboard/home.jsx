import React, { useState, useEffect } from "react";
import { StatisticsCard } from "@/widgets/cards";
import { homeCardsData } from "@/data";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import FloatingActionButton from "@/components/FloatingActionButton";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl mb-8 shadow-2xl">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32" />

        <div className="relative px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="h2" color="white" className="font-bold mb-2">
                {greeting}, Teacher! 👋
              </Typography>
              <Typography variant="h6" color="white" className="opacity-90 mb-4">
                Welcome to your Learning Management Dashboard
              </Typography>
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <Typography variant="small" color="white">
                    {formatDate(currentTime)}
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <span>🕐</span>
                  <Typography variant="small" color="white" className="font-mono">
                    {formatTime(currentTime)}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Quick Stats Preview */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <Typography variant="h4" color="white" className="font-bold">
                  4
                </Typography>
                <Typography variant="small" color="white" className="opacity-80">
                  Active Sections
                </Typography>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <Typography variant="h4" color="white" className="font-bold">
                  69
                </Typography>
                <Typography variant="small" color="white" className="opacity-80">
                  Total Students
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics Cards */}
      <div className="mb-12">
        <Typography variant="h4" color="blue-gray" className="mb-6 font-bold flex items-center gap-3">
          <ChartBarIcon className="h-8 w-8 text-indigo-600" />
          Dashboard Overview
        </Typography>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {homeCardsData.map(({ icon, title, footer, ...rest }) => {
            // Define navigation paths for each card
            const getNavigationPath = (title) => {
              switch (title.toLowerCase()) {
                case 'total section': return '/dashboard/section';
                case 'total student': return '/dashboard/students';
                case 'total quizzes': return '/dashboard/quiz';
                case 'total modules': return '/dashboard/modules';
                default: return '/dashboard';
              }
            };

            return (
              <StatisticsCard
                key={title}
                {...rest}
                title={title}
                icon={icon ? React.createElement(icon, {
                  className: "w-6 h-6 text-white",
                }) : null}
                footer={footer}
                onClick={() => navigate(getNavigationPath(title))}
              />
            );
          })}
        </div>
      </div>



      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}

export default Home;