import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  FlagIcon,
  MapIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import Typewriter from 'typewriter-effect';

import GithubIcon from '../components/Icon/GithubIcon';
import InstagramIcon from '../components/Icon/InstagramIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import heroImage from '../images/bgimg.jpg';
import projectimage from '../images/portfolio/black.jpg';
import cifar10image from '../images/portfolio/cifar10.jpg';
import riscvimage from '../images/portfolio/riscv.png'
import movieratingimage from '../images/portfolio/movierating.jpg';
import profilepic from '../images/profilepic.jpg';
import testimonialImage from '../images/testimonial.webp';
import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  PortfolioItem,
  SkillGroup,
  Social,
  TestimonialSection,
  TimelineItem,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Vaibhav Sahni',
  description: "Vaibhav Sahni's personal website",
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Stats: 'stats',
  Testimonials: 'testimonials',
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: heroImage,
  name: (
    <div>
      <p>I'm</p>
      
      <Typewriter
        options={{
          strings: ['Vaibhav Sahni', 'A Web Developer', 'A Computer Scientist', 'A Pianist', 'A Golfer'],
          autoStart: true,
          loop: true,
          //wrapperClassName: 'text-orange-500',
          cursorClassName: 'text-orange-500 animate-blink',
        
        }}
      />
    </div>
  ),
  description: (
    <>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I'm a student at <strong className="text-stone-100">IIITD</strong>, currently studying{' '}
        <strong className="text-stone-100">Computer Science Engineering.</strong>
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        In my free time, you can catch me playing the <strong className="text-stone-100">piano</strong>, or hitting the{' '}
        <strong className="text-stone-100">Golfing range</strong>
      </p>
    </>
  ),
  actions: [
    {
      href: '/assets/resume.pdf',
      text: 'Resume',
      primary: true,
      Icon: ArrowDownTrayIcon,
    },
    {
      href: `#${SectionId.Contact}`,
      text: 'Contact',
      primary: false,
    },
  ],
};

/**
 * About section
 */
export const aboutData: About = {
  profileImageSrc: profilepic,
  description: `I'm a freshman at IIITD, studying Computer Science Engineering. I enjoy living life to the fullest and trying new things.`,
  aboutItems: [
    {label: 'Location', text: 'Gurugram, Haryana', Icon: MapIcon},
    {label: 'Age', text: '18', Icon: CalendarIcon},
    {label: 'Nationality', text: 'Indian', Icon: FlagIcon},
    {label: 'Interests', text: 'Piano, Golf, Basketball, Formula 1', Icon: SparklesIcon},
    {label: 'Study', text: 'Indraprastha Institute of Information Technology, Delhi', Icon: AcademicCapIcon},
    {label: 'Employment', text: 'Student', Icon: BuildingOffice2Icon},
  ],
};

/**
 * Skills section: TODO: REMOVE LEVELS FORM THIS. RATHER JUST KEEP IT A SIMPLE LISTING WHERE I CAN VIEW ALL MY SKILLS. THE BAR IS 
 * SOMEHOW INDICATING I AM NOT GOOD AT CERTAIN THINGS WHICH IS NOT THE FEELING I WANT TO PUT ACROSS.
 */
export const skills: SkillGroup[] = [
  {
    name: 'Spoken languages',
    skills: [
      {
        name: 'English',
        level: 10,
      },
      {
        name: 'Hindi',
        level: 10,
      },
      {
        name: 'Sanskrit',
        level: 3,
      },
    ],
  },
  {
    name: 'Programming Languages',
    skills: [
      {
        name: 'Python',
        level: 10,
      },
      {
        name: 'Java',
        level: 8,
      },
      {
        name: 'C++',
        level: 7,
      },
      {
        name: 'Javascript',
        level: 5,
      },
    ],
  },
  {
    name: 'Web development',
    skills: [
      {
        name: 'React',
        level: 7,
      },
      {
        name: 'Node.js',
        level: 7,
      },
      {
        name: 'FastAPI',
        level: 7,
      },
      {
        name: 'Django',
        level: 5,
      },
    ],
  },
  {
    name: 'Data Science',
    skills: [
      {
        name: 'SQL',
        level: 10,
      },
      {
        name: 'Pandas',
        level: 7,
      },
      {
        name: 'Numpy',
        level: 6,
      },
    ],
  },
];

/**
 * Portfolio section: Quite elegant if i must say, can be seamlessly increased or decreased at will.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Movie Review System',
    description:
      'DBMS based project to watch movie trailers and leave movie reviews using PyQt5, mysql and data scraping',
    url: 'https://github.com/vaibhav-sahni/Movie-review-system',
    image: movieratingimage,
  },
  {
    title: 'Image classification on CIFAR-10 dataset',
    description: 'Created a CNN to classify images in the CIFAR-10 dataset using keras.',
    url: 'https://github.com/vaibhav-sahni/CIFAR-10-image-classification-using-CNN',
    image: cifar10image,
  },
  {
    title: 'RISC-V Assembler and Simulator',
    description: 'Created an assembler and simulator for the RISCV ISA',
    url: 'https://github.com/vaibhav-sahni',
    image: riscvimage,
  },
  {
    title: 'Coming soon',
    description: 'Making a new project...',
    url: 'https://github.com/vaibhav-sahni',
    image: projectimage,
  },
  {
    title: 'Coming soon',
    description: 'Making a new project...',
    url: 'https://github.com/vaibhav-sahni',
    image: projectimage,
  },
  {
    title: 'Coming soon',
    description: 'Making a new project...',
    url: 'https://github.com/vaibhav-sahni',
    image: projectimage,
  },
  {
    title: 'Coming soon',
    description: 'Making a new project...',
    url: 'https://github.com/vaibhav-sahni',
    image: projectimage,
  },
  {
    title: 'Coming soon',
    description: 'Making a new project...',
    url: 'https://github.com/vaibhav-sahni',
    image: projectimage,
  },
];

/**
 * Resume section -- TODO: Maybe implemement a timeline type scale where I can see the order of my employments/associations in chronological order
 * Lookup on bootstrap, or, additionally can implement accordion as a table type.
 */
export const education: TimelineItem[] = [
  {
    date: '2009-2022',
    location: 'Scottish High International School',
    title: 'Pre nursery - 10th',
    content: <p></p>,
  },
  {
    date: '2022-2024',
    location: 'Delhi Public School RK Puram',
    title: '11th-12th',
    content: <p></p>,
  },
  {
    date: '2024-present',
    location: 'Indraprastha Institute of Technology, Delhi',
    title: 'B.Tech in CSE',
    content: <p></p>,
  },
];
/*
export const experience: TimelineItem[] = [
  {
    date: 'March 2010 - Present',
    location: 'Awesome Development Company',
    title: 'Senior UX Engineer',
    content: (
      <p>
        Describe work, special projects, notable achievements, what technologies you have been working with, and
        anything else that would be useful for an employer to know.
      </p>
    ),
  },
  {
    date: 'March 2007 - February 2010',
    location: 'Garage Startup Studio',
    title: 'Junior bug fixer',
    content: (
      <p>
        Describe work, special projects, notable achievements, what technologies you have been working with, and
        anything else that would be useful for an employer to know.
      </p>
    ),
  },
];

*/
/**
 * Testimonial section
 */
export const testimonial: TestimonialSection = {
  imageSrc: testimonialImage,
  testimonials: [
    {
      name: '',
      text: '',
      image: '',
    },
    {
      name: '',
      text: '',
      image: '',
    },
    {
      name: '',
      text: '',
      image: '',
    },
  ],
};

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  description: 'Feel free to connect or contact me for any CS related work. These are my handles.',
  items: [
    {
      type: ContactType.Email,
      text: 'sahnidlf@gmail.com',
      href: 'mailto:sahnidlf@gmail.com',
    },
    {
      type: ContactType.Location,
      text: 'Gurugram, Haryana, India',
      href: 'https://www.google.ca/maps/place/Gurugram,+Haryana/@28.4229575,76.9897491,11z/data=!3m1!4b1!4m6!3m5!1s0x390d19d582e38859:0x2cf5fe8e5c64b1e!8m2!3d28.4594965!4d77.0266383!16zL20vMDNmeW1n?entry=ttu&g_ep=EgoyMDI1MDEwMi4wIKXMDSoASAFQAw%3D%3D',
    },
    {
      type: ContactType.Instagram,
      text: '@vaibhavsahni._',
      href: 'https://www.instagram.com/vaibhavsahni._/',
    },
    {
      type: ContactType.Github,
      text: 'vaibhav-sahni',
      href: 'https://github.com/vaibhav-sahni',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  {label: 'Github', Icon: GithubIcon, href: 'https://github.com/vaibhav-sahni'},
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/vaibhav-sahni-2107b0299/'},
  {label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/vaibhavsahni._/'},
];
