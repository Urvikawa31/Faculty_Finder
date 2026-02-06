import { Faculty } from '../types';

export const mockFaculty: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    category: 'Regular',
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
    email: 'rajesh.kumar@university.edu',
    phone: '+91 79 3051 4000',
    address: 'Computer Science Department, Block A',
    education: ['PhD in Computer Science, MIT', 'M.Tech in AI, IIT Delhi', 'B.Tech in CSE, IIT Bombay'],
    biography: 'Dr. Rajesh Kumar is a distinguished professor specializing in artificial intelligence and machine learning. With over 15 years of research experience, he has published more than 50 papers in top-tier conferences.',
    researchInterests: ['Natural Language Processing', 'Deep Learning', 'Computer Vision', 'Machine Learning'],
    publications: [
      'Attention Mechanisms in Neural Networks (2023)',
      'Transformers for Text Classification (2022)',
      'Deep Learning for Image Recognition (2021)'
    ],
    teaching: ['Machine Learning', 'Deep Learning', 'Natural Language Processing']
  },
  {
    id: '2',
    name: 'Prof. Priya Sharma',
    category: 'Regular',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    email: 'priya.sharma@university.edu',
    phone: '+91 79 3051 4001',
    address: 'Computer Science Department, Block B',
    education: ['PhD in Data Science, Stanford', 'M.S. in Statistics, UC Berkeley', 'B.Tech in CSE, IIT Madras'],
    biography: 'Prof. Priya Sharma is a leading researcher in data science and analytics. Her work focuses on developing scalable algorithms for big data processing and analysis.',
    researchInterests: ['Data Mining', 'Big Data Analytics', 'Information Retrieval', 'Semantic Web'],
    publications: [
      'Scalable Data Mining Techniques (2023)',
      'Information Retrieval Systems (2022)',
      'Semantic Search and Ranking (2021)'
    ],
    teaching: ['Data Mining', 'Information Retrieval', 'Big Data Analytics']
  },
  {
    id: '3',
    name: 'Dr. Amit Patel',
    category: 'Adjunct',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    email: 'amit.patel@university.edu',
    phone: '+91 79 3051 4002',
    address: 'Computer Science Department, Block C',
    education: ['PhD in Robotics, Carnegie Mellon', 'M.Tech in Control Systems, IIT Kanpur'],
    biography: 'Dr. Amit Patel brings extensive industry experience in robotics and autonomous systems. He has worked with leading technology companies on cutting-edge projects.',
    researchInterests: ['Robotics', 'Computer Vision', 'Autonomous Systems', 'Sensor Networks'],
    publications: [
      'Vision-Based Navigation Systems (2023)',
      'Autonomous Robot Control (2022)'
    ],
    teaching: ['Robotics', 'Computer Vision', 'Embedded Systems']
  },
  {
    id: '4',
    name: 'Dr. Sneha Desai',
    category: 'Regular',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    email: 'sneha.desai@university.edu',
    phone: '+91 79 3051 4003',
    address: 'Computer Science Department, Block D',
    education: ['PhD in Cybersecurity, Oxford', 'M.Sc in Information Security, ETH Zurich'],
    biography: 'Dr. Sneha Desai is an expert in cybersecurity and cryptography. Her research focuses on developing secure systems and privacy-preserving technologies.',
    researchInterests: ['Cybersecurity', 'Cryptography', 'Network Security', 'Privacy Technologies'],
    publications: [
      'Privacy-Preserving Machine Learning (2023)',
      'Secure Multi-Party Computation (2022)',
      'Blockchain Security (2021)'
    ],
    teaching: ['Cybersecurity', 'Cryptography', 'Network Security']
  }
];

export const stats = {
  totalFaculty: 120,
  regularFaculty: 85,
  adjunctFaculty: 35,
  researchProfiles: 115
};
