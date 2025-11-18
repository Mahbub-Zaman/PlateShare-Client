import React, { useEffect, useState } from "react";
import SkillCard from "../components/SkillCard";
import { Link } from 'react-router-dom';


const Cards = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("/Skills.json")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Popular Skills</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {skills.slice(0, 8).map((skill) => (
          <SkillCard key={skill.skillId} skill={skill} />
        ))}
      </div>
        <div className="flex justify-center mt-6">
            <Link to="/skills" className="btn btn-primary">
                See All Skills
            </Link>
        </div>
    </div>
  );
};

export default Cards;
