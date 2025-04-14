// Candidate Profile Constants
export const EXPERTISE_OPTIONS = [
  { value: 'Education', label: 'Education' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Economy', label: 'Economy' },
  { value: 'Environment', label: 'Environment' },
  { value: 'National Security', label: 'National Security' },
  { value: 'Foreign Policy', label: 'Foreign Policy' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Social Justice', label: 'Social Justice' },
  { value: 'Infrastructure', label: 'Infrastructure' },
  { value: 'Housing', label: 'Housing' },
  { value: 'Agriculture', label: 'Agriculture' },
  { value: 'Energy', label: 'Energy' },
];

// Political Party Options
export const POLITICAL_PARTY_OPTIONS = [
  { value: 'Aam Aadmi Party', label: 'Aam Aadmi Party' },
  { value: 'Bahujan Samaj Party', label: 'Bahujan Samaj Party' },
  { value: 'Bharatiya Janata Party', label: 'Bharatiya Janata Party' },
  { value: 'other', label: 'Other Party' },
];

// Candidate Options by Party
export const CANDIDATES_BY_PARTY = {
  'Aam Aadmi Party': [
    { value: 'Arvind Kejriwal', label: 'Arvind Kejriwal' },
    { value: 'Atishi', label: 'Atishi' },
    { value: 'Dr. Sandeep Pathak', label: 'Dr. Sandeep Pathak' },
    { value: 'Durgesh Pathak', label: 'Durgesh Pathak' },
    { value: 'Gopal Rai', label: 'Gopal Rai' },
    { value: 'Imran Hussain', label: 'Imran Hussain' },
    { value: 'Manish Sisodia', label: 'Manish Sisodia' },
    { value: 'Narain Dass Gupta', label: 'Narain Dass Gupta' },
    { value: 'Pankaj Gupta', label: 'Pankaj Gupta' },
    { value: 'Raghav Chadha', label: 'Raghav Chadha' },
    { value: 'Rakhi Birla', label: 'Rakhi Birla' },
    { value: 'Sanjay Singh', label: 'Sanjay Singh' },
  ],
  'Bahujan Samaj Party': [
    { value: 'Kumari Mayawati', label: 'Kumari Mayawati' },
    { value: 'Shri Anand Kumar', label: 'Shri Anand Kumar' },
  ],
  'Bharatiya Janata Party': [
    { value: 'Shri Lal Krishna Advani', label: 'Shri Lal Krishna Advani' },
    { value: 'Shri Narendra Modi', label: 'Shri Narendra Modi' },
    { value: 'Shri Amit Shah', label: 'Shri Amit Shah' },
    { value: 'Shri Jagat Prakash Nadda', label: 'Shri Jagat Prakash Nadda' },
    { value: 'Shri Pema Khandu', label: 'Shri Pema Khandu' },
    { value: 'Shri Chowna Mein', label: 'Shri Chowna Mein' },
    { value: 'Shri Himanta Biswa Sarma', label: 'Shri Himanta Biswa Sarma' },
    { value: 'Shri Samrat Choudhary', label: 'Shri Samrat Choudhary' },
    { value: 'Shri Vijay Kumar Sinha', label: 'Shri Vijay Kumar Sinha' },
    { value: 'Shri Vishnu Deo Sai', label: 'Shri Vishnu Deo Sai' },
    { value: 'Shri Arun Sao', label: 'Shri Arun Sao' },
    { value: 'Shri Vijay Sharma', label: 'Shri Vijay Sharma' },
    { value: 'Smt. Rekha Gupta', label: 'Smt. Rekha Gupta' },
    { value: 'Shri Pramod Sawant', label: 'Shri Pramod Sawant' },
    { value: 'Shri Bhupendra Patel', label: 'Shri Bhupendra Patel' },
    { value: 'Shri Nayab Singh Saini', label: 'Shri Nayab Singh Saini' },
    { value: 'Dr. Mohan Yadav', label: 'Dr. Mohan Yadav' },
    { value: 'Shri Jagdish Devda', label: 'Shri Jagdish Devda' },
    { value: 'Shri Rajendra Shukla', label: 'Shri Rajendra Shukla' },
    { value: 'Shri Devendra Fadnavis', label: 'Shri Devendra Fadnavis' },
    { value: 'Shri Y Patton', label: 'Shri Y Patton' },
    { value: 'Shri Mohan Charan Majhi', label: 'Shri Mohan Charan Majhi' },
    { value: 'Smt. Pravati Parida', label: 'Smt. Pravati Parida' },
    { value: 'Shri Kanak Vardhan Singh Deo', label: 'Shri Kanak Vardhan Singh Deo' },
    { value: 'Shri Bhajan Lal Sharma', label: 'Shri Bhajan Lal Sharma' },
    { value: 'Smt. Diya Kumari', label: 'Smt. Diya Kumari' },
    { value: 'Dr. Prem Chand Bairwa', label: 'Dr. Prem Chand Bairwa' },
    { value: 'Dr. Manik Saha', label: 'Dr. Manik Saha' },
    { value: 'Shri Yogi Adityanath', label: 'Shri Yogi Adityanath' },
    { value: 'Shri Keshav Prasad Maurya', label: 'Shri Keshav Prasad Maurya' },
    { value: 'Shri Brajesh Pathak', label: 'Shri Brajesh Pathak' },
    { value: 'Shri Pushkar Singh Dhami', label: 'Shri Pushkar Singh Dhami' },
  ]
};

// Candidate to Office mapping
export const CANDIDATE_OFFICE_MAPPING = {
  'Arvind Kejriwal': 'National Convenor, AAP',
  'Atishi': 'Chief Minister, Delhi',
  'Dr. Sandeep Pathak': 'National Organisation Secretary',
  'Durgesh Pathak': 'Member of Delhi Legislative Assembly',
  'Gopal Rai': 'Cabinet Minister, Delhi',
  'Imran Hussain': 'Cabinet Minister, Delhi',
  'Manish Sisodia': 'Former Deputy Chief Minister, Delhi',
  'Narain Dass Gupta': 'National Treasurer',
  'Pankaj Gupta': 'National Secretary',
  'Raghav Chadha': 'Member of Parliament, Rajya Sabha',
  'Rakhi Birla': 'Dy. Speaker of Delhi Assembly',
  'Sanjay Singh': 'Member of Parliament, Rajya Sabha',
  
  'Kumari Mayawati': 'Party President',
  'Shri Anand Kumar': 'Vice President',
  
  'Shri Lal Krishna Advani': 'Deputy Prime Minister of India',
  'Shri Narendra Modi': 'Prime Minister of India',
  'Shri Amit Shah': 'National President (2014-2017, 2017-2020)',
  'Shri Jagat Prakash Nadda': 'National President',
  'Shri Pema Khandu': 'Chief Minister, Arunachal Pradesh',
  'Shri Chowna Mein': 'Deputy Chief Minister, Arunachal Pradesh',
  'Shri Himanta Biswa Sarma': 'Chief Minister, Assam',
  'Shri Samrat Choudhary': 'Deputy Chief Minister, Bihar',
  'Shri Vijay Kumar Sinha': 'Deputy Chief Minister, Bihar',
  'Shri Vishnu Deo Sai': 'Chief Minister, Chhattisgarh',
  'Shri Arun Sao': 'Deputy Chief Minister, Chhattisgarh',
  'Shri Vijay Sharma': 'Deputy Chief Minister, Chhattisgarh',
  'Smt. Rekha Gupta': 'Chief Minister, Delhi',
  'Shri Pramod Sawant': 'Chief Minister, Goa',
  'Shri Bhupendra Patel': 'Chief Minister, Gujarat',
  'Shri Nayab Singh Saini': 'Chief Minister, Haryana',
  'Dr. Mohan Yadav': 'Chief Minister, Madhya Pradesh',
  'Shri Jagdish Devda': 'Deputy Chief Minister, Madhya Pradesh',
  'Shri Rajendra Shukla': 'Deputy Chief Minister, Madhya Pradesh',
  'Shri Devendra Fadnavis': 'Chief Minister, Maharashtra',
  'Shri Y Patton': 'Deputy Chief Minister, Nagaland',
  'Shri Mohan Charan Majhi': 'Chief Minister, Odisha',
  'Smt. Pravati Parida': 'Deputy Chief Minister, Odisha',
  'Shri Kanak Vardhan Singh Deo': 'Deputy Chief Minister, Odisha',
  'Shri Bhajan Lal Sharma': 'Chief Minister, Rajasthan',
  'Smt. Diya Kumari': 'Deputy Chief Minister, Rajasthan',
  'Dr. Prem Chand Bairwa': 'Deputy Chief Minister, Rajasthan',
  'Dr. Manik Saha': 'Chief Minister, Tripura',
  'Shri Yogi Adityanath': 'Chief Minister, Uttar Pradesh',
  'Shri Keshav Prasad Maurya': 'Deputy Chief Minister, Uttar Pradesh',
  'Shri Brajesh Pathak': 'Deputy Chief Minister, Uttar Pradesh',
  'Shri Pushkar Singh Dhami': 'Chief Minister, Uttarakhand',
};

export const EDUCATION_LEVEL_OPTIONS = [
  { value: 'Primary Education', label: 'Primary Education' },
  { value: 'High School', label: 'High School' },
  { value: 'Undergraduate', label: 'Undergraduate' },
  { value: 'Graduate (Master\'s)', label: 'Graduate (Master\'s)' },
  { value: 'Post-Graduate (PhD)', label: 'Post-Graduate (PhD)' },
  { value: 'Professional Degree', label: 'Professional Degree' },
  { value: 'Mixed Education Levels', label: 'Mixed Education Levels' },
];

export const POLITICAL_AFFILIATION_OPTIONS = [
  { value: 'Leftist', label: 'Leftist' },
  { value: 'Center-Left', label: 'Center-Left' },
  { value: 'Centrist', label: 'Centrist' },
  { value: 'Center-Right', label: 'Center-Right' },
  { value: 'Rightist', label: 'Rightist' },
  { value: 'Mixed/Various', label: 'Mixed/Various' },
];

export const AFFILIATION_STRENGTH_OPTIONS = [
  { value: 'Strong', label: 'Strong' },
  { value: 'Moderate', label: 'Moderate' },
  { value: 'Weak', label: 'Weak' },
];

// Speech Parameters Constants
export const SPEECH_TYPE_OPTIONS = [
  { value: 'Initial Speech', label: 'Initial Speech' },
  { value: 'Visionary Speech', label: 'Visionary Speech' },
  { value: 'Momentum-Building Speech', label: 'Momentum-Building Speech' },
  { value: 'Mid-Campaign Speech', label: 'Mid-Campaign Speech' },
  { value: 'Persuasive Speech', label: 'Persuasive Speech' },
  { value: 'Pre-Final Speech', label: 'Pre-Final Speech' },
  { value: 'Final Speech', label: 'Final Speech' },
  { value: 'Post-Election Speech', label: 'Post-Election Speech' },
  { value: 'Community Engagement Speech', label: 'Community Engagement Speech' },
  { value: 'Media Strategy Speech', label: 'Media Strategy Speech' },
  { value: 'Crisis Management Speech', label: 'Crisis Management Speech' },
  { value: 'Value Reinforcement Speech', label: 'Value Reinforcement Speech' },
  { value: 'Grassroots Mobilization Speech', label: 'Grassroots Mobilization Speech' },
  { value: 'Vision Reiteration Speech', label: 'Vision Reiteration Speech' },
  { value: 'Post-Campaign Speech', label: 'Post-Campaign Speech' },
];

export const CAMPAIGN_STAGE_OPTIONS = [
  { value: 'Early Campaign', label: 'Early Campaign' },
  { value: 'Mid-Campaign', label: 'Mid-Campaign' },
  { value: 'Final Days', label: 'Final Days' },
  { value: 'Election Day', label: 'Election Day' },
  { value: 'Post-Election', label: 'Post-Election' },
];

export const CALL_TO_ACTION_OPTIONS = [
  { value: 'Vote', label: 'Vote' },
  { value: 'Donate', label: 'Donate' },
  { value: 'Volunteer', label: 'Volunteer' },
  { value: 'Spread the Message', label: 'Spread the Message' },
  { value: 'Attend Event', label: 'Attend Event' },
  { value: 'Contact Official', label: 'Contact Official' },
  { value: 'Register to Vote', label: 'Register to Vote' },
  { value: 'Join Movement', label: 'Join Movement' },
  { value: 'Sign Petition', label: 'Sign Petition' },
  { value: 'Multiple Actions', label: 'Multiple Actions' },
];

export const SPEECH_TONE_OPTIONS = [
  { value: 'Hopeful', label: 'Hopeful' },
  { value: 'Serious', label: 'Serious' },
  { value: 'Urgent', label: 'Urgent' },
  { value: 'Celebratory', label: 'Celebratory' },
  { value: 'Inspirational', label: 'Inspirational' },
  { value: 'Combative', label: 'Combative' },
  { value: 'Conciliatory', label: 'Conciliatory' },
  { value: 'Patriotic', label: 'Patriotic' },
  { value: 'Empathetic', label: 'Empathetic' },
  { value: 'Confident', label: 'Confident' },
];

export const FORMALITY_OPTIONS = [
  { value: 'Formal', label: 'Formal' },
  { value: 'Semi-Formal', label: 'Semi-Formal' },
  { value: 'Conversational', label: 'Conversational' },
  { value: 'Informal', label: 'Informal' },
];

export const RHETORICAL_DEVICES_OPTIONS = [
  { value: 'Anaphora', label: 'Anaphora (repetition at beginning of sentences)' },
  { value: 'Metaphor', label: 'Metaphor (symbolic comparisons)' },
  { value: 'Antithesis', label: 'Antithesis (contrasting ideas)' },
  { value: 'Rhetorical Question', label: 'Rhetorical Question' },
  { value: 'Alliteration', label: 'Alliteration (repeated consonant sounds)' },
  { value: 'Parallelism', label: 'Parallelism (repeated grammatical structures)' },
  { value: 'Tricolon', label: 'Tricolon (series of three)' },
  { value: 'Personification', label: 'Personification' },
  { value: 'Hyperbole', label: 'Hyperbole (exaggeration)' },
  { value: 'Climax', label: 'Climax (ascending importance)' },
];

export const PRIMARY_OBJECTIVE_MAP = {
  'Initial Speech': 'Build a strong foundation of trust and connection with the audience. Establish the narrative and frame the overall campaign message.',
  'Visionary Speech': 'Inspire the audience with a compelling vision of the future. Strengthen the emotional connection established in the first speech.',
  'Momentum-Building Speech': 'Strengthen the narrative by emphasizing achievements and leadership qualities. Introduce contrasts with the opposition without direct criticism.',
  'Mid-Campaign Speech': 'Introduce clear contrasts with the opposition. Build a narrative around the dangers and risks of choosing the opposition.',
  'Persuasive Speech': 'Deepen the emotional connection with the audience. Reinforce the narrative and prepare the audience for the final call to action.',
  'Pre-Final Speech': 'Solidify the campaign\'s message and create a sense of urgency. Make the risks of choosing the opposition feel immediate and real.',
  'Final Speech': '',
  'Post-Election Speech': '',
  'Community Engagement Speech': '',
  'Media Strategy Speech': '',
  'Crisis Management Speech': '',
  'Value Reinforcement Speech': '',
  'Grassroots Mobilization Speech': '',
  'Vision Reiteration Speech': '',
  'Post-Campaign Speech': '',
};

// Data Visualization Constants
export const VISUALIZATION_OPTIONS = [
  { value: 'bar', label: 'Bar Chart' },
  { value: 'line', label: 'Line Graph' },
  { value: 'pie', label: 'Pie Chart' },
  { value: 'doughnut', label: 'Doughnut Chart' },
  { value: 'polarArea', label: 'Polar Area Chart' },
];

// Test Speech Data
export const TEST_SPEECH = {
  "speech": "Namaskaram, Warangal! Mee andariki na hrudayapoorvaka vandanalu!\nMy dear brothers and sisters of this historic city of Warangal, today, I stand before you in this ancient land of the Kakatiyas, where every stone tells a story of greatness. Just as the magnificent Warangal Fort has stood the test of time, the spirit of this region remains unbroken and strong. When I look at Warangal, I see not just a city with a glorious past, but a center with unlimited potential for the future. The same hands that created the intricate carvings of the Thousand Pillar Temple can now weave the fabric of a new India. The same soil that nurtured the Kakatiya dynasty can now nurture a new generation of entrepreneurs, farmers, and innovators.\nFor over a decade as Prime Minister and before that as Chief Minister of Gujarat, I have worked with a single vision: \"Sabka Saath, Sabka Vikas, Sabka Vishwas\" - Together with all, Development for all, Trust of all. This is not just a slogan; it is our sacred commitment to every citizen of India, including each one of you in Warangal.\nThe weavers of Warangal are known across the world for their artistic brilliance. Your handlooms tell stories that words cannot express. But I understand the challenges you face. That is why our government has initiated special programs to modernize the textile industry while preserving your unique traditional skills. We will establish a Textile Park here in Warangal that will connect your extraordinary craftsmanship directly to global markets. Just as threads come together to create beautiful fabric, we must weave together tradition and technology to create prosperity.\nFor our farmers who toil in the fields of Telangana, we have doubled the budget for agriculture. Our PM-KISAN scheme ensures direct financial support, and we are working to improve irrigation facilities across the region. The fertile lands of Telangana deserve the best support, and we are committed to providing it.\nYoung friends, I understand your aspirations. You want quality education and meaningful employment. That is why we are expanding educational institutions in Telangana. We will establish a new center of excellence in Warangal focused on emerging technologies, ensuring that the youth of this region are at the forefront of India's technological revolution. The ancient fort of Warangal attracts visitors from across the country. But we want the world to witness its splendor. We will develop a comprehensive heritage tourism circuit connecting Warangal Fort, Ramappa Temple, and other historical sites. This will not only preserve your cultural heritage but also create thousands of jobs in the tourism sector.\nI remember when I was young, I traveled across our great nation, visiting places like Warangal. I was struck by the richness of our heritage and the warmth of our people. Those journeys shaped my vision for India—a vision where every region preserves its unique identity while moving forward on the path of development. This is not just a political commitment; it is personal for me.\nBrothers and sisters, infrastructure is the backbone of development. We are investing in expanding road networks, improving railway connectivity, and enhancing digital infrastructure. Soon, Warangal will be connected to major economic centers through high-speed corridors, opening new avenues for growth and prosperity. I know there are challenges. The competition from mass-produced textiles threatens your traditional crafts. Water scarcity affects your agriculture. Limited industrial development has restricted job opportunities. But for every challenge, we have a solution. Our government will provide special incentives for handloom products, implement water conservation projects, and establish skill development centers to create employment opportunities.\nSome people ask why the BJP should be trusted in Telangana. I ask them to look at our track record. Wherever we have been given the opportunity to serve, we have delivered development without discrimination. Our only religion is \"India First,\" our only holy book is the Constitution of India, and our only focus is the welfare of 1.4 billion Indians.\nFriends, I ask you this: Can a nation progress if some regions are left behind? Can we claim to be developed if cities like Warangal do not realize their full potential? The answer is clear. The journey of India's development cannot be complete without the development of Telangana, and the development of Telangana cannot be complete without the transformation of historic cities like Warangal.\nToday, I ask for your support not just for the BJP but for a vision that sees Warangal as a model city that perfectly blends its rich heritage with modern development. A city where tradition and technology walk hand in hand. A city that honors its past while embracing the future.\nLet us work together to build a Warangal where our heritage sites become world-class tourist destinations, our weavers receive the recognition and rewards they deserve, our farmers prosper with modern agricultural practices, our youth find quality education and employment opportunities, and our infrastructure supports rapid economic growth. This is not just a dream; it is a roadmap that we will follow with unwavering determination. With your support, we will transform Warangal into a shining example of development that respects tradition.\nI invite each one of you to become ambassadors of change. Speak to your friends, your families, your communities about the vision we share for Warangal and Telangana. Together, we can build a future that makes every resident of this great city proud.\nWarangal ki jai! Telangana ki jai! Bharat Mata ki jai!\nThank you, and may the blessings of the Kakatiyas be with you all.",
  "key_themes": [
    "Economic and infrastructural development of Warangal",
    "Preservation of cultural heritage and tourism promotion",
    "Support for farmers and the agricultural sector",
    "Empowerment of youth through education and employment opportunities",
    "Advancement of Warangal's textile industry and artisans"
  ],
  "sentiment": {
    "category": "Inspirational",
    "explanation": "The speech conveys a strong sense of pride, optimism, and forward-looking vision. It highlights historical greatness while emphasizing future growth, development, and opportunities. The language is uplifting, aiming to motivate and unite the people toward a collective vision of progress."
  }
}; 