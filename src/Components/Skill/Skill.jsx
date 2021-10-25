import React, { Fragment, useEffect, useState } from 'react';
import './skill.scss';
import { skillData, category } from './skillData';
import { Icon } from '../Icon/Icon';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SkillDetail from './SkillDetail';
AOS.init();

const Skill = () => {
  // useState for filtering category
  const [filter, setFilter] = useState('technical');
  const [skillCategory, setSkillCategory] = useState([]);

  // useState for filtering icon
  const [skillDetailFilter, setSkillDetailFilter] = useState('html');
  const [skillDetail, setSkillDetail] = useState([]);

  // useEffect for filtering category
  useEffect(() => {
    const filtered = skillData.map((skill) => ({
      ...skill,
      filtered: skill.case.includes(filter),
    }));
    setSkillCategory(filtered);
  }, [filter]);

  // useEffect for filtering icon
  useEffect(() => {
    const filteredIcon = skillData.map((skill) => ({
      ...skill,
      filteredIcon: skill.icon.includes(skillDetailFilter),
    }));
    setSkillDetail(filteredIcon);
  }, [skillDetailFilter]);

  return (
    <div id="skills" className="skill">
      <div className="work-container__stars"></div>
      <div className="work-container__stars-two"></div>
      <div className="work-container__stars-three"></div>
      <div className="skill__title-container">
        <h1 data-aos="fade-up" className="skill__title">
          SKILL
          <span className="skill__title-letter">S</span>
        </h1>
        <hr data-aos="fade-down" className="skill__title-hr" />
      </div>
      <section className="skill__section-one">
        <section className="skill__wrapper">
          {category.map((skillCategory) => (
            <a
              href="/#"
              key={skillCategory.id}
              className={skillCategory.containerClassName}
              active={
                filter === skillCategory.active ? skillCategory.active : ''
              }
              onClick={(e) => {
                e.preventDefault();
                setFilter(skillCategory.active);
              }}
            >
              <img
                className={skillCategory.imageClassName}
                src={skillCategory.imgSrc}
                alt="Skill category icon"
              />
              <span className={skillCategory.spanClassNameActive}>
                {skillCategory.description}
              </span>
            </a>
          ))}
        </section>
        <section className="skill__icon-wrapper">
          {skillCategory.map((skill) =>
            skill.filtered ? (
              <Fragment key={skill.id}>
                <div
                  className="skill__icon-container"
                  onClick={(e) => {
                    e.preventDefault();
                    setSkillDetailFilter(skill.name);
                  }}
                >
                  <Icon name={skill.name} className={skill.iconClassName} />
                </div>
              </Fragment>
            ) : (
              ''
            )
          )}
        </section>
      </section>
      <section className="skill__section-two">
        <div className="skill__wrapper-two">
          <SkillDetail skillDetail={skillDetail} />
        </div>
      </section>
    </div>
  );
};

export default Skill;
