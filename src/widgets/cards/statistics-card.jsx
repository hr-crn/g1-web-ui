import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function StatisticsCard({ color, icon, title, value, footer, onClick }) {
  const getCardTheme = (title) => {
    switch (title.toLowerCase()) {
      case 'total section':
        return {
          gradient: 'from-orange-500 to-orange-600',
          bg: 'from-orange-50 to-orange-100',
          border: 'border-orange-200',
          emoji: '🏫'
        };
      case 'total student':
        return {
          gradient: 'from-blue-500 to-blue-600',
          bg: 'from-blue-50 to-blue-100',
          border: 'border-blue-200',
          emoji: '👥'
        };
      case 'total quizzes':
        return {
          gradient: 'from-purple-500 to-purple-600',
          bg: 'from-purple-50 to-purple-100',
          border: 'border-purple-200',
          emoji: '📝'
        };
      case 'total modules':
        return {
          gradient: 'from-green-500 to-green-600',
          bg: 'from-green-50 to-green-100',
          border: 'border-green-200',
          emoji: '📚'
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          bg: 'from-gray-50 to-gray-100',
          border: 'border-gray-200',
          emoji: '📊'
        };
    }
  };

  const theme = getCardTheme(title);

  return (
    <Card
      className={`
        border ${theme.border} shadow-lg hover:shadow-2xl
        transition-all duration-300 transform hover:-translate-y-2 hover:scale-105
        bg-gradient-to-br ${theme.bg} relative overflow-hidden
        cursor-pointer group
      `}
      onClick={onClick}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-10 -translate-x-10 group-hover:scale-150 transition-transform duration-500" />

      {/* Enhanced Icon Header */}
      <CardHeader
        variant="gradient"
        color={color}
        floated={false}
        shadow={false}
        className={`
          absolute grid h-16 w-16 place-items-center rounded-xl shadow-xl
          bg-gradient-to-br ${theme.gradient}
          group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
          border-2 border-white
        `}
      >
        <div className="flex items-center justify-center">
          {icon}
          <span className="ml-1 text-lg">{theme.emoji}</span>
        </div>
      </CardHeader>

      <CardBody className="p-6 text-right relative z-10">
        <Typography variant="small" className="font-semibold text-blue-gray-600 mb-2 group-hover:text-blue-gray-800 transition-colors duration-200">
          {title}
        </Typography>

        <Typography variant="h3" color="blue-gray" className="font-bold mb-2 group-hover:scale-110 transition-transform duration-200 origin-right">
          {value}
        </Typography>

        {/* Progress indicator */}
        <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
          <div className={`bg-gradient-to-r ${theme.gradient} h-1 rounded-full transition-all duration-1000 group-hover:w-full`} style={{width: '70%'}}></div>
        </div>
      </CardBody>

      {footer && (
        <CardFooter className="border-t border-white/50 p-4 bg-white/30 backdrop-blur-sm relative z-10">
          <Typography className="font-normal text-blue-gray-700">
            {footer.path ? (
              <Link
                to={footer.path}
                className={`
                  font-semibold ${footer.color} hover:underline cursor-pointer
                  flex items-center gap-2 group-hover:gap-3 transition-all duration-200
                  hover:scale-105 transform
                `}
              >
                <span className="flex items-center gap-2">
                  <strong className={footer.color}>{footer.value}</strong>
                  <span className="text-lg group-hover:translate-x-1 transition-transform duration-200">→</span>
                </span>
                &nbsp;{footer.label}
              </Link>
            ) : (
              <>
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </>
            )}
          </Typography>
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
