import {FC, memo} from 'react';

import {education, SectionId, skills} from '../../../data/data';
import Section from '../../Layout/Section';
import ResumeSection from './ResumeSection';
import {SkillBadge} from './Skills';
import TimelineItem from './TimelineItem';

const Resume: FC = memo(() => {
  return (
    <Section className="bg-neutral-100 dark:bg-neutral-900" sectionId={SectionId.Resume}>
      <div className="flex flex-col divide-y-2 divide-neutral-300 dark:divide-neutral-800">
        <ResumeSection title="Education">
          {education.map((item, index) => (
            <TimelineItem item={item} key={`${item.title}-${index}`} />
          ))}
        </ResumeSection>

        <ResumeSection title="Skills">
          <p className="pb-8">Some of my technical skills. Click a badge for details (if available).</p>
          <div className="w-full">
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 items-center justify-center py-4">
              {skills
                .flatMap(group => group.skills)
                .filter(skill => !/spoken/i.test(skill.name))
                .map((skill, index) => (
                  <div key={`${skill.name}-${index}`} className="flex justify-center">
                    <SkillBadge skill={skill} />
                  </div>
                ))}
            </div>
          </div>
        </ResumeSection>
      </div>
    </Section>
  );
});

Resume.displayName = 'Resume';
export default Resume;
