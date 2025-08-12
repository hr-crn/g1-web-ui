import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export function ProfileInfoCard({ title, description, details, action }) {
  const getFieldIcon = (field) => {
    switch (field.toLowerCase()) {
      case 'full name': return '👤';
      case 'username': return '@';
      case 'email': return '📧';
      case 'password': return '🔒';
      default: return '📝';
    }
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <CardHeader
        color="transparent"
        shadow={false}
        floated={false}
        className="mx-0 mt-0 mb-6 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <Typography variant="small" color="white" className="font-bold">
              ℹ️
            </Typography>
          </div>
          <Typography variant="h6" color="blue-gray" className="font-bold">
            {title}
          </Typography>
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110 cursor-pointer">
          {action}
        </div>
      </CardHeader>
      <CardBody className="p-0">
        {description && (
          <Typography
            variant="small"
            className="font-normal text-blue-gray-500 mb-4"
          >
            {description}
          </Typography>
        )}
        {description && details ? (
          <hr className="my-6 border-blue-gray-100" />
        ) : null}
        {details && (
          <ul className="flex flex-col gap-4 p-0">
            {Object.keys(details).map((el, key) => (
              <li key={key} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-lg">{getFieldIcon(el)}</span>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold capitalize min-w-[100px]"
                  >
                    {el}:
                  </Typography>
                  {typeof details[el] === "string" ? (
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600 bg-white px-3 py-1 rounded-md border"
                    >
                      {details[el]}
                    </Typography>
                  ) : (
                    details[el]
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}

ProfileInfoCard.defaultProps = {
  action: null,
  description: null,
  details: {},
};

ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node,
  details: PropTypes.object,
};

ProfileInfoCard.displayName = "/src/widgets/cards/profile-info-card.jsx";

export default ProfileInfoCard;
