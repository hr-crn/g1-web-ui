import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Switch,
  Button,
} from "@material-tailwind/react";
import { projectsData } from "@/data";
import { useParams, useNavigate } from "react-router-dom";

export function LockModule() {
  const { sectionSlug } = useParams();
  const navigate = useNavigate();
  const [sectionName, setSectionName] = useState("");
  const [moduleStates, setModuleStates] = useState({});

  // Helper function to convert slug back to section name
  const slugToSectionName = (slug) => {
    return slug.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Helper function to convert section name to slug
  const sectionNameToSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  useEffect(() => {
    // Load section data from localStorage to verify section exists
    const savedSections = JSON.parse(localStorage.getItem('sections') || '[]');
    const potentialSectionName = slugToSectionName(sectionSlug);

    // Find the section by matching slug or exact name
    const section = savedSections.find(s =>
      sectionNameToSlug(s.sectionName) === sectionSlug ||
      s.sectionName.toLowerCase() === potentialSectionName.toLowerCase()
    );

    if (section) {
      setSectionName(section.sectionName);

      // Load module states for this section from localStorage
      const savedModuleStates = JSON.parse(localStorage.getItem(`moduleStates_${section.sectionName}`) || '{}');

      // Initialize module states if not exists
      const initialStates = {};
      projectsData.forEach(project => {
        initialStates[project.title] = savedModuleStates[project.title] !== undefined
          ? savedModuleStates[project.title]
          : project.isEnabled;
      });

      setModuleStates(initialStates);
    } else {
      alert("Section not found!");
      navigate('/dashboard/section');
    }
  }, [sectionSlug, navigate]);

  const handleModuleToggle = (moduleTitle) => {
    const newStates = {
      ...moduleStates,
      [moduleTitle]: !moduleStates[moduleTitle]
    };

    setModuleStates(newStates);

    // Save to localStorage
    localStorage.setItem(`moduleStates_${sectionName}`, JSON.stringify(newStates));
  };
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
        
          
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Modules - {sectionName} Section
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  Science and Technology Modules Available:
                </Typography>
              </div>
              <Button
                variant="outlined"
                color="blue-gray"
                onClick={() => navigate('/dashboard/section')}
                className="hover:bg-blue-gray-50"
              >
                Back to Sections
              </Button>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {projectsData.map(
                ({ img, title, description, tag, isEnabled }) => (
                  <Card key={title} color="transparent" shadow={false}>
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                    >
                      <img
                        src={img}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody className="py-0 px-1">
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {tag}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mt-1 mb-2"
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {description}
                      </Typography>
                    </CardBody>
                    <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                      <Switch
                        key={title}
                        id={`${title}_${sectionName}`}
                        label={moduleStates[title] ? "Unlocked" : "Locked"}
                        checked={moduleStates[title] || false}
                        onChange={() => handleModuleToggle(title)}
                        labelProps={{
                          className: "text-sm font-normal text-blue-gray-500",
                        }}
                      />
                      <Typography
                        variant="small"
                        color={moduleStates[title] ? "green" : "red"}
                        className="font-medium"
                      >
                        {moduleStates[title] ? "Available" : "Restricted"}
                      </Typography>
                    </CardFooter>
                  </Card>
                )
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default LockModule;