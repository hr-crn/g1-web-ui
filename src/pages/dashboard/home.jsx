import React from "react";
import { StatisticsCard } from "@/widgets/cards";
import { homeCardsData, projectsData,} from "@/data";


export function Home() {
  return (
    <div className="min-h-screen"> 
      <div className="mt-12">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {homeCardsData.map(({ icon, title, footer, ...rest }) => (
            <StatisticsCard
              key={title}
              {...rest}
              title={title}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-white",
              })}
              footer={footer}
            />
          ))}
        </div>
      </div> 
    </div>
  );
}

export default Home;