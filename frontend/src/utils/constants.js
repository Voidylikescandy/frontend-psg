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

// Admin superuser credentials
export const ADMIN_USER = {
  username: 'admin',
  email: 'admin@testmail.com',
  password: 'admin123'
};

// Azure Translator API Configuration
export const AZURE_TRANSLATOR_API_KEY = process.env.REACT_APP_AZURE_TRANSLATOR_API_KEY || '';
export const AZURE_TRANSLATOR_REGION = process.env.REACT_APP_AZURE_TRANSLATOR_REGION || 'centralindia';

// API Keys for external services
export const SAPLING_API_KEY = process.env.REACT_APP_SAPLING_API_KEY || '';
export const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY || '';

// Indian Language Options for Translation
export const TRANSLATION_LANGUAGE_OPTIONS = [
  { value: 'hi', label: 'Hindi' },
  { value: 'bn', label: 'Bengali' },
  { value: 'te', label: 'Telugu' },
  { value: 'ta', label: 'Tamil' },
  { value: 'mr', label: 'Marathi' },
  { value: 'gu', label: 'Gujarati' },
  { value: 'kn', label: 'Kannada' },
  { value: 'ml', label: 'Malayalam' },
  { value: 'pa', label: 'Punjabi' },
  { value: 'or', label: 'Odia' },
];

// Political Party Options
export const POLITICAL_PARTY_OPTIONS = [
  { value: 'Aam Aadmi Party', label: 'Aam Aadmi Party' },
  { value: 'Bahujan Samaj Party', label: 'Bahujan Samaj Party' },
  { value: 'Bharatiya Janata Party', label: 'Bharatiya Janata Party' },
  { value: 'Telugu Desam Party', label: 'Telugu Desam Party' },
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
  ],
  'Telugu Desam Party': [
    { value: 'Shri N. Chandrababu Naidu', label: 'Shri N. Chandrababu Naidu' },
    { value: 'Yanamala Ramakrishna', label: 'Yanamala Ramakrishna' },
    
  ],
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
  
  'Shri Lal Krishna Advani': 'Former Deputy Prime Minister of India',
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

  'Shri N. Chandrababu Naidu': 'Chief Minister, Andhra Pradesh',
  'Yanamala Ramakrishna': 'Minister of Finance, Planning, Commercial Taxes and Legislative Affairs of the State, Andhra Pradesh',
};

// Candidate to Bio mapping
export const CANDIDATE_BIO_MAPPING = {
  // AAP Candidates
  'Arvind Kejriwal': `Arvind Kejriwal, the National Convenor of AAP, assumed the role of Chief Minister of Delhi for the third time on 16th February 2020, following his initial swearing-in on December 28, 2013. When he became the 2nd youngest Chief Minister of Delhi. His impressive electoral victory in 2013, defeating the three-term Chief Minister Sheila Dikshit in the New Delhi constituency by a substantial margin of over 22,000 votes, marked the beginning of his impactful political journey. Under the leadership of Arvind Kejriwal, AAP has won multiple elections in the states of Punjab, Gujarat, and Goa. His developmental model is widely popular in the country for offering basic amenities to civilians free of cost like Free & 24-hour electricity, Free Water Supply, Free Pilgrimage for Elders, Free bus rides for women, and 1000 Rs/ Month to all women above 18 yrs of age.\n\nOn 21st March 2024, Kejriwal was arrested right before the 2024 Lok Sabha election by the ED to stop him from campaigning. He became the first ever sitting chief minister in India to be arrested. On 10th May, the Supreme Court ordered Kejriwal’s release on interim bail, on account of campaigning for the Lok Sabha election.\n\nBefore venturing into politics, Kejriwal established the NGO Parivartan, dedicated to addressing citizens’ grievances about the Public Distribution System (PDS), public works, social welfare schemes, income tax, and electricity. His commitment to public service led him to resign from the Income Tax Department in 2006. In the same year, he selflessly donated his Magsaysay award money to establish the Public Cause Research Foundation.\n\nWidely recognised as a social activist, political reformer, and former Joint Commissioner in the Income Tax Department, Kejriwal is renowned for his advocacy of the Right to Information and his unwavering dedication to the Jan Lokpal cause. His book ‘Swaraj,’ outlining his vision of local self-governance and administrative decentralization, stands testament to his ideological convictions. As an anti-corruption crusader, he played a pivotal role in leading former members of India Against Corruption towards alternative politics, leading to the Aam Aadmi Party being founded on October 2, 2012.\n\nKejriwal’s educational background includes graduating from IIT Kharagpur with a B.Tech in mechanical engineering in 1989. His journey continued with his selection for the Indian Revenue Service in 1993, shaping the trajectory of his impactful career in both activism and politics.`,
  'Atishi': `Atishi, one of the most prominent members of the Aam Aadmi Party and a valued member of the party’s Political Affairs Committee, currently serves as a Cabinet Minister in the Arvind Kejriwal-led Government of NCT of Delhi. She currently holds thirteen major portfolios in – Education, Higher Education, Technical Training and Education (TTE), Public Works Department (PWD), Power, Revenue, Planning, Finance, Services, Vigilance, Water, Public Relations, and Law, Justice, and Legislative Affairs. Additionally, she is also the Member of Legislative Assembly (MLA) from the Kalkaji Assembly Constituency, in south Delhi. \n\nAtishi received her Bachelor’s degree in History from St. Stephen’s College, University of Delhi, where she ranked 1st in her batch. She also holds postgraduate degrees in Education and History from the University of Oxford, where she was awarded the prestigious Rhodes Scholarship and Radhakrishnan-Chevening Scholarship.\n\nAtishi is a dedicated activist who chose the challenging path of politics to bring about lasting change. She spent seven years in a small village in Madhya Pradesh, engaging in organic farming and progressive education systems. She joined AAP in 2013 and played a crucial role in shaping the party’s policies. She was the advisor to Education Minister Manish Sisodia from July 2015 to April 2018, wherein she played a key role in improving the infrastructure of Delhi government schools, forming School Management Committees (SMCs) under the Right to Education Act, strengthening regulations to restrain private schools from hiking fees arbitrarily, and introducing the Happiness Curriculum.\n\nIn 2022, she addressed the United Nations General Assembly (UNGA) in New York, highlighting Delhi as a global model for urban governance. \n\nAtishi’s unwavering dedication to societal welfare, particularly in the field of education, showcases her passion for mass politics and policy expertise. She is admired for her composed demeanor during television debates and her political acumen and humor. She is a popular and dynamic leader, a fresh breath of air in Indian politics.`,
  'Dr. Sandeep Pathak': `Dr Sandeep Kumar Pathak currently serves as the General Secretary Organisation for Aam Aadmi Party, and as the Rajya Sabha MP from Punjab since April 2022. Born in Bataha village in Mungeli, Chhattisgarh, to agriculturist parents, his educational journey began in his village, extending to Bilaspur for further studies.\n\nDr. Pathak is widely known for his exceptional grasp of numbers and strong organisational hold. He has played a key role in the victory of AAP in the 2022 Punjab elections.\n\nAfter completing his masters in Chhattisgarh, Dr Pathak continued his education at the Indian Institute of Chemical Technology, Hyderabad, and the National Chemical Laboratory, Pune. His academic pursuits led him to the University of Cambridge, where he earned a PhD. in high-temperature superconducting materials.\n\nFollowing his doctoral studies, Dr Pathak engaged in post-doctoral research as a research associate at the University of Oxford and MIT. This diverse academic background, coupled with his roots in rural Chhattisgarh, adds depth to his role as a political representative, bringing a unique perspective to the Aam Aadmi Party.`,
  'Durgesh Pathak': `Durgesh Pathak, the youngest member of the Aam Aadmi Party’s Political Affairs Committee. A key figure in building grassroots support in Delhi before the 2015 Assembly election and in Punjab before the 2017 Assembly election. Durgesh has played several key responsibilities in the party including leading the 2022 Goa and Delhi MCD elections.\n\nHailing from Sikohara village near Gorakhpur, Durgesh arrived in New Delhi to prepare for the Civil Services Examination. His journey in politics began in 2011 as a volunteer for the Jan Lokpal Movement, and he played a significant role in establishing the party’s strong organisational foundation in Delhi.\n\nDuring the 2015 Delhi Assembly elections, Durgesh led the organisation and campaign in 35 constituencies, resulting in victories in 34 of them. Subsequently, he was deployed to Punjab, where the party secured an impressive 24% vote share and 20 seats in its debut election in the state.\n\nDurgesh holds a master’s degree from Allahabad University, Uttar Pradesh. His pragmatic approach and hands-on experience in organisational development showcase his commitment to the Aam Aadmi Party’s mission and vision.`,
  'Gopal Rai': `Gopal Rai currently serves as a Cabinet Minister for Rural Development, General Administration Department, Environment, Forest and Wildlife in the Delhi Government. He also serves as the Convener of the Aam Aadmi Party in Delhi.\n\nDuring his student days at Lucknow University, Rai actively participated in campaigns against corruption and crime on college campuses. His commitment led to a challenging incident where he was shot, resulting in partial paralysis. Undeterred, he continued his fight against injustice.\n\nIn his ministerial role, Rai fulfilled party promises, notably raising minimum wages in Delhi, a move hailed as historic. Addressing the plight of labourers, he increased minimum wages for unskilled, semi-skilled, and skilled workers, reflecting his dedication to social justice.\n\nAppointed as Delhi Convener in May 2017, Rai initiated organisational reforms within the state, contributing to the Aam Aadmi Party’s growth.\n\nGopal Rai holds a postgraduate degree in Sociology from Lucknow University. His journey encapsulates resilience and commitment to improving the lives of Delhi’s residents.`,
  'Imran Hussain': `Imran Hussain is the Minister of Food and Civil Supplies, Elections, He marked his electoral debut with a significant win in the 2015 Delhi Assembly elections, securing victory with a substantial margin of 33,877 votes. His commitment to spreading social and political awareness, especially in the Walled City, showcases his dedication to social justice for the underprivileged.\n\nHussain’s initiatives to address environmental issues in Delhi are commendable. He directed land-owning agencies to crack down on the open burning of garbage and leaves, increasing vigilance and prosecuting violators. Additionally, he implemented measures such as banning truck movements during peak hours, shutting down thermal plants, and mandating Euro VI standards for vehicular emissions from 2017.\n\nIn a letter to Union Environment Minister Anil Madhav Dave, Hussain emphasised the urgent need to convert existing wood-based crematoria into green crematoria to combat air pollution. He called for the formation of a technical committee to draft a standardised design for green crematoria, highlighting the significant contribution of cremation to air pollution.\n\nImran Hussain holds a Bachelor’s degree in Business Studies from Jamia Millia Islamia, Delhi.`,
  'Manish Sisodia': `Manish Sisodia, the Former Deputy Chief Minister of Delhi, stands as a key figure within the Aam Aadmi Party, contributing significantly as a member of the Political Affairs Committee. As the former Dy CM of Delhi, he had a diverse portfolio encompassing crucial responsibilities, including Education, Finance, Planning Land and Building, Vigilance Services, Women and Child Development, as well as Art, Culture, and Languages, among others, underscoring his pivotal role in shaping the multifaceted governance landscape. His role in the education revolution of Delhi was applauded by the New York Times.\n\nIn the 2015 elections, Sisodia emerged victorious, securing the Patparganj constituency in East Delhi with an impressive margin of 28,761 votes. Before he began his political journey, he carved his path as a journalist with Zee News and All India Radio. His active involvement in championing the Right to Information Act and foundational contributions to the Jan Lokpal Movement highlight his commitment to public welfare.\n\nA longstanding associate of Arvind Kejriwal, Sisodia played a crucial role in creating awareness for and organising Mohalla Sabhas in Delhi. As the Education Minister, he spearheaded a transformative period, witnessing a remarkable enhancement in the infrastructure and quality of education in Delhi government schools. As Finance Minister, Sisodia took a historic step by doubling the budgetary allocation to Education, which constitutes almost 25% of the state’s entire budget. This landmark decision paved the way for comprehensive reforms in public education, earning him recognition as one of the nation’s foremost education administrators and advocates.\n\nSisodia’s educational journey includes earning a diploma in journalism from Bharatiya Vidya Bhavan, a testament to his commitment to knowledge and communication. His dedication to public service and his impactful contributions to governance make him a respected and influential leader within the political landscape.`,
  'Narain Dass Gupta': `Narain Dass Gupta, a distinguished practicing chartered accountant and former president of the Institute of Chartered Accountants of India (ICAI), stands as a beacon of financial expertise and policy acumen. Widely regarded as India’s foremost authority on Goods and Services Tax (GST), Gupta’s reputation transcends party lines, earning praise from diverse quarters for his unparalleled knowledge.\n\nND Gupta has been the National Treasurer of the Aam Aadmi Party since 2017, playing a crucial role in ensuring the party adheres to the highest standards of bookkeeping and transparency. He has also been instrumental in helping fight the Income Tax Department’s onslaught on the party’s finances.\n\nHe was nominated for the 2nd term of Rajya Sabha from Delhi in 2024, ND Gupta made history as the first-ever Indian elected to the Board of the International Federation of Accountants, U.S.A—a federation encompassing 164 regulatory accounting bodies from 116 countries. His academic achievements, including a B.Com. (Honours) from Shri Ram College of Commerce, reflecting his dedication to excellence.\n\nRecognized as an outstanding professional, educator, social worker, and adept administrator, ND Gupta’s commitment to public service is exemplified by his election to the Rajya Sabha from Delhi in 2018. His journey, marked by distinctions in both academia and professional spheres, showcases a dedication to excellence that brings honor not only to himself but also to his alma mater.`,
  'Pankaj Gupta': `Pankaj Gupta holds the esteemed position of National Secretary and serves as an ex officio member of the Political Affairs Committee at AAP, further solidifying his pivotal role within the party’s leadership. He is also a member of the National Executive, serving his second term as the National Secretary—a testament to his enduring commitment.\n\nWith a diverse professional background, Gupta dedicated 25 years of his career to various software companies before making a profound shift to champion the cause of education for underprivileged children. His altruistic endeavors reflect a deep-seated commitment to social welfare.\n\nDuring the Jan Lokpal Movement, Gupta emerged as one of the key architects working diligently behind the scenes, contributing substantially to the movement’s success and impact.\n\nPankaj Gupta’s educational journey includes the successful completion of his electronics engineering degree from Motilal Nehru Regional Engineering College in Allahabad—a foundation that has undoubtedly enriched his multifaceted contributions to both technology and social causes.\n\nIn his role as National Secretary, Gupta continues to bring a wealth of experience and dedication to the Aam Aadmi Party, embodying the spirit of service and leadership that defines the party’s ethos.`,
  'Raghav Chadha': `Raghav Chadha currently serves as Rajya Sabha MP from Punjab, he is one of the youngest members of Rajya Sabha. and as a member of the PAC, he has played a key role in INDIA alliance coordination. Formerly the National Treasurer, he currently serves as the Punjab Co-Incharge of the party.\n\nChadha’s journey in politics is marked by a belief that he didn’t choose politics; politics chose him.\n\nRaghav is a Chartered Accountant with an undergraduate degree from the University of Delhi. His practical background and commitment to the Aam Aadmi Party’s vision showcase a dynamic approach to governance.`,
  'Rakhi Birla': `Rakhi Birla, a former journalist turned politician, is a member of the Aam Aadmi Party’s National Executive. In the 2013 Assembly election, she clinched victory in the Mangolpuri constituency, defeating INC’s Raj Kumar Chauhan, a four-time MLA, by a margin of around 10,500 votes.\n\nDuring AAP’s brief 49-day stint in the Delhi Assembly, Rakhi served as the Minister of Women and Children, Social Welfare, and Languages from December 28, 2013, to February 14, 2014. Notably, she became the youngest-ever cabinet minister in Delhi. Rakhi Birla is currently the youngest Deputy Speaker of the Delhi Legislative Assembly, showcasing her rising prominence in the AAP.\n\nShe graduated from Delhi University’s Shivaji College, pursued her Master’s in Mass Communication, and worked as a reporter for a private news channel before venturing into politics. Her journey reflects a seamless transition from working with the media to public service.`,
  'Sanjay Singh': `Sanjay Singh, currently serving as a Member of the Rajya Sabha from Delhi. Has played a pivotal figure in the Aam Aadmi Party and he brings a blend of social activism and political leadership. In the parliament and on the streets his speeches critical of the BJP and Central Govt are widely popular among people. After being falsely framed in the Delhi liquor policy case, he was arrested by the ED in Oct 2023. After 6 months of political persecution, he was granted bail by the Supreme Court. Since then Sanjay Singh a fiery speaker has been on a campaign trail for the AAP and INDIA block.\n\nBorn in Sultanpur, Uttar Pradesh, to educated parents, Singh’s journey started with a diploma in Mining Engineering from Orissa School of Mining Engineering in Keonjhar.\n\nFueled by a passion for social service, Singh founded ‘Sultanpur Samaj Sewa Sangathan’ in 1994, dedicating 16 years to advocating for the rights of the underprivileged, especially hawkers. His commitment extended to organisations like ‘Azad Sewa Samiti,’ later part of the National Hawkers’ Association.\n\nA key architect in the formation of the Aam Aadmi Party in 2012, Singh’s role dates back to his committee membership in Team Anna during the India Against Corruption movement. His advocacy also touched on environmental causes, notably the Clean Gomati River project.\n\nTaking charge of the Punjab state unit during the 2017 Assembly elections, Singh propelled AAP to become the largest opposition party, securing the Leader of the Opposition role. His impact extended to civic polls in Uttar Pradesh. Elected to the Rajya Sabha in 2018, Singh’s leadership resonates with the public’s desire for political change.\n\nSingh, a mechanical engineer, epitomizes AAP’s ethos—a platform for societal service amid discontent with traditional politics. His journey reflects a commitment to transforming the political landscape and serving the people.`,

  // BSP Candidates
  'Kumari Mayawati': `The Bahujan Samaj Party (BSP) has emerged as one of the main national political party of India under the stewardship of its National President Kumari Mayawati Ji a serene figure, born on January 15, 1956, is affectionately known as "Bahanji" (sister) by one and all her workers, supporters, well-wishers as well as officials. Bahanji served four-times as Chief Minister of Uttar Pradesh, which is the most populous state of the country having a population of about 241 million.\n\nApart from this electoral success, the most significant point is that the BSP is fast emerging as a political party with a difference. The Party president Behan Kumari Mayawati ji, identified as Iron lady and has emerged as a lady of new hope and aspirations to varied and a wide section of the society, particularly in the state of Uttar Pradesh, bordering at Lucknow and New Delhi, which most often guides the political destiny of the country.\n\nCommitted and fully devoted to the missionary cause and cherished goal of "Social Transformation & Economic Emancipation" particularly to the people belonging to "Bahujan Samaj" that comprises Backwards (Scheduled Castes, Scheduled Tribes and Other backward classes), Buddhists, Jains, Muslims, Sikhs, Christians, Parsis of religious minorities and poor people of downtrodden society of India including the high caste people, Bahan Kumari Mayawati Ji, a spinster by mission, is regarded in the Indian politics with respect, reverence and awe as she is the only politician in the India having a mass appeal and firm hold and command over her voters and also the charishma to get mass vote transferred to any individual and to any party, a rare thing, of course, in the contemporary Indian politics.\n\nThe march of "Elephant", the election symbol of the Party is on and the "Blue" flag of the BSP is flying high under the strong and towering leadership of Behan Kumari Mayawati ji, who is working assiduously with a missionary zeal to make them ruler of India to usher in the golden era of Ashoka, The Great.\n\nAs the trailblazing Chief Minister of Uttar Pradesh, Bahanji ushered in a new era characterized by exemplary law and order and administration. Her tenure witnessed a paradigm shift, as she fearlessly confronted systemic injustices and championed the cause of the marginalized with unparalleled vigor.\n\nBahan Kumari Mayawati Ji's journey is a testament to strength, resilience, and the unyielding pursuit of a more inclusive society. Through her visionary leadership and unwavering commitment to constitutional values, she has set a precedent for transformative governance and societal change.ns to varied and a wide section of the society, particularly in the state of Uttar Pradesh, bordering at Lucknow and New Delhi, which most often guides the political destiny of the country.`,
  'Shri Anand Kumar': `Shri Anand Kumar Ji born and raised in Uttar Pradesh on 14th August 1975, emerged as a dynamic party activist with a deep commitment, representing the interests of the oppressed and disadvantaged sections of society. He has been appointed as the National Vice President of the Bahujan Samaj Party (BSP), a significant political party in India known for its advocacy of social justice and empowerment of Bahujan Samaj under the leadership of our Party National President Bahan Kumari Mayawati Ji.\n\nOut of love and respect supporters and well-wishers of Shri Anand Kumar Ji called him as "Bhai Sahab".\n\nWith a background rooted in grassroots activism, Shri Anand Kumar Ji has dedicated his life to championing the cause of social equality and economic upliftment. His unwavering dedication to the principles of Bahujan ideology, which focuses on the welfare of the Bahujan Samaj, has earned him respect and admiration among both party members and supporters. One of Shri Anand Kumar's defining characteristics is his ability to bridge the gap between ideology and action. He firmly believes in the principles of Bahujan ideology, which advocate for the empowerment of Dalits, Adivasis, OBCs, and others. Under the leadership of our party National President Bahan Kumari Mayawati Ji, Shri Anand Kumar Ji has continued to champion the rights of these communities and push for policies that address their socio-economic needs. His approach has not only strengthened internal cohesion within the BSP but has also enhanced the party's outreach to the broader electorate.`,

  // BJP Candidates
  'Shri Lal Krishna Advani': `Through the years Shri L. K. Advani had served as the President of the Bharatiya Janata Party for the longest period since its inception in 1980. Capping a parliamentary career of nearly three decades, Shri L. K. Advani was, first, the Home Minister and, later, the Deputy Prime Minister in the cabinet of Shri Atal Bihari Vajpayee (1999-2004).\n\nShri L. K. Advani is widely regarded as an individual of great intellectual ability, strong principles, and unwavering support for the idea of a strong and prosperous India. As confirmed by Shri Atal Bihari Vajpayee, Shri L. K. Advani has 'never compromised on his core belief in nationalism, and yet has displayed flexibility in political responses whenever it was demanded by the situation'.\n\nShri L. K. Advani was born on November 8, 1927, and grew up in pre-Partition Sindh. As a student in St.Patrick's School, Karachi, his patriotic ideals inspired him to join the Rashtriya Swayamasevak Sangh (RSS) at the mere age of fourteen. He has dedicated his life to the service of the nation ever since.\n\nShri L. K. Advani's celebration of India's independence from the British in 1947 was sadly short lived as he became one of the millions to be torn from his homeland amidst the terror and bloodshed of the tragedy of India's partition. These events, however, did not turn him bitter or cynical but instead spurred him on in his desire to create a more secular India. With this goal in mind he journeyed to Rajasthan to continue his work as an RSS Pracharak.\n\nThrough the latter half of the 1980s and the 1990s, Shri L. K. Advani focused on the singular task of building the BJP into a national political force. The results of his efforts were underscored by the 1989 General Election. The Party bounced back from its 1984 tally of 2 to achieve an impressive 86 seats. The Party position moved up to 121 seats in 1992 and 161 in 1996; making the 1996 elections a watershed in Indian democracy. For the first time since independence, the Congress was dethroned from its preeminent position, and the BJP became the single largest party in the Lok Sabha.\n\nAn emotional individual with strong family ties, Shri L. K. Advani has said that 'nature dangles happiness and meaning before us all, insisting only that we choose between them, but I have had the good fortune of experiencing both, and in abundance'.\n\nToday, Shri L. K. Advani asks the people of India to make the right choice, in choosing a leader who has lived through the mistakes of India's past, and looks forward to ensuring that India becomes more united, stronger and stands taller with its Tomorrow brighter than its Today.`,
  'Shri Narendra Modi': `On 26th May 2014 Narendra Modi took oath as the Prime Minister of India, becoming the first ever PM to be born after India attained Independence. Dynamic, dedicated and determined, Narendra Modi reflects the aspiration and hope of over a billion Indians. Ever since he assumed office in May 2014, PM Modi has embarked on a journey of all-round and inclusive development where every Indian can realize their hopes and aspirations. He remains deeply inspired by the principle of 'Antyodaya', of serving the last person in the queue. Through innovative ideas and initiatives, the Government has ensured that the wheels of progress move at rapid pace and the fruits of development reach every citizen. Governance has become open, easier and transparent.`,
  'Shri Amit Shah': `Amitbhai Anilchandra Shah, the former President of the Bharatiya Janata Party and India’s Home Minister, was born on 22 October 1964 to a Gujarati couple Mrs. Kusum Ben and Mr. Anilchandra Shah living in Mumbai. Amitbhai Anilchandra Shah's grandfather was a wealthy merchant (Nagar Seth) in Mansa, a small princely state of Baroda State of Gaikwad. Till the age of 16, Amitbhai Anilchandra Shah lived in his native village Mansa in Gujarat. It is there where he received his primary education. The young Shah’s early education took place according to the 'Indian Value Tradition' under the supervision of prominent scholars of the Gaikwad State. He was taught Indian scriptures, historical texts, grammar and epics in his childhood. He continued to study Indian philosophy and texts even in the later years.\n\nAmitbhai Anilchandra Shah's family moved to Ahmedabad after the completion of his primary education. His mother had a deep influence in his life. She was an avid Gandhian and she inspired him to wear Khadi. In his youth, while during education, he read biographies of many patriots and was deeply influenced by their passion for the motherland. He has been greatly influenced by the writings of K.M. Munshi.`,
  'Shri Jagat Prakash Nadda': `Jagat Prakash Nadda is an Indian politician and the President of the Bharatiya Janta Party since June 2019. He is the former Union Minister of Health and Family and member of Rajya Sabha from Himachal Pradesh and Parliamentary Board Secretary of Bharatiya Janata Party. Earlier, he was a Minister in Himachal Pradesh Government.\n\nHe was born on 2 December 1960 in a Brahmin family to Dr. Narain Lall Nadda and Shrimati Krishna Nadda. He was educated at St. Xaviers School, Patna. Thereafter he did his B.A. from Patna College, Patna University and LL.B. from Himachal Pradesh University, Shimla. As a child, he represented Bihar State in the All India Junior Swimming Championship held at Delhi. On 11 December 1991, he married Dr. Mallika Nadda and now the couple have two sons. His mother-in-law is former Lok Sabha Member of Parliament, Smt. Jayshree Banerjee.\n\n1993-98, 1998-2003 and 2007-2012 Member, Himachal Pradesh Legislative Assembly (three terms) 1994-98 Leader, Bharatiya Janata Party Group, Himachal Pradesh Legislative Assembly 1998-2003 Cabinet Minister, Health and Family Welfare and Parliamentary Affairs, Government of Himachal Pradesh 2008-2010 Cabinet Minister, Forest, Environment, Science and Technology, Government of Himachal Pradesh April 2012 Elected to Rajya Sabha May 2012 onwards Member, Committee on Transport, Tourism and Culture Aug. 2012 onwards Member, Court of the University of Delhi Member, Committee on Health and Family Welfare May 2013 onwards Member, Committee of Privileges.`,
  'Shri Pema Khandu': '',
  'Shri Chowna Mein': '',
  'Shri Himanta Biswa Sarma': '',
  'Shri Samrat Choudhary': '',
  'Shri Vijay Kumar Sinha': '',
  'Shri Vishnu Deo Sai': '',
  'Shri Arun Sao': '',
  'Shri Vijay Sharma': '',
  'Smt. Rekha Gupta': '',
  'Shri Pramod Sawant': '',
  'Shri Bhupendra Patel': '',
  'Shri Nayab Singh Saini': '',
  'Dr. Mohan Yadav': '',
  'Shri Jagdish Devda': '',
  'Shri Rajendra Shukla': '',
  'Shri Devendra Fadnavis': '',
  'Shri Y Patton': '',
  'Shri Mohan Charan Majhi': '',
  'Smt. Pravati Parida': '',
  'Shri Kanak Vardhan Singh Deo': '',
  'Shri Bhajan Lal Sharma': '',
  'Smt. Diya Kumari': '',
  'Dr. Prem Chand Bairwa': '',
  'Dr. Manik Saha': '',
  'Shri Yogi Adityanath': '',
  'Shri Keshav Prasad Maurya': '',
  'Shri Brajesh Pathak': '',
  'Shri Pushkar Singh Dhami': '',

  'Shri N. Chandrababu Naidu': `Nara Chandrababu Naidu commonly known as CBN, is an Indian politician who is currently serving as the 13th Chief Minister of Andhra Pradesh. He holds the record of longest-serving Chief Minister in the political history of Telugu states. He is the national president of the Telugu Desam Party (TDP)\n\nDuring his two previous terms as Chief Minister, Naidu's public image was that of a visionary economic reformer and proponent of information technology–driven economic growth. His policies brought modernisation and significant investments, particularly in Hyderabad, where he directed the founding of HITEC City, Genome Valley, HITEX Exhibition and the Financial District. He also established the Hyderabad Multi-Modal Transport System (MMTS), which was inaugurated during his tenure to improve urban mobility. Additionally, he initiated major infrastructure projects such as the Hyderabad Outer Ring Road and laid the groundwork for the Rajiv Gandhi International Airport. He also had a role in national politics, first as the convener of the United Front in 1996. He supported the Bharatiya Janata Party (BJP)-led National Democratic Alliance (NDA) after the 1999 Lok Sabha elections, in which TDP won 29 seats, enhancing Naidu's reputation as a nationally prominent politician. In 2014, Naidu returned as Chief Minister, winning in the now-residuary (due to bifurcation) Andhra Pradesh.`,
  'Yanamala Ramakrishna': `Yanamala Ramakrishnudu is a senior politician from Andhra Pradesh. He was inducted into the Council of Ministers formed in 2014 under the leadership of Chandrababu Naidu. He was a member of the Legislative Council and remained the Leader of the Main Opposition (TDP) until the division of the Legislative Council of Samaikyandhra Pradesh.\n\nHe won all the elections as an MLA from the elections held after the formation of the TDP until the 2004 elections. He lost in 2009 and was elected as an MLC in 2013. He served as a minister and speaker when the Telugu Desam Party was in power, and as the PAC chairman when it was not in power.\n\nHe won the Tuni MLA seat in East Godavari district in 1983 and held the charge of the Law and Municipal Administration departments in NTR's first cabinet. He served as a minister between 1985-89, as the Chairman of the Public Accounts Committee from 1989-94, and as the Speaker of the Legislative Assembly from 1995-99.\n\nHe was the Speaker when Chandrababu took over as the Chief Minister after deposing NTR. He was the Finance Minister from 1999-2003. He again held the position of Chairman of the Public Accounts Committee between 2004-08.`,
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
  { value: 'other', label: 'Other Speech Type' },
];

// Speech Type Mapping - Additional context to be added for each speech type
export const SPEECH_TYPE_MAPPING = {
  'Initial Speech': '1.	The Engineering of Consent: Align the campaign\'s goals with the audience\'s desires and needs, ensuring that your objectives resonate deeply with their personal and collective aspirations.\n2.	Appealing to Subconscious Desires: Tap into deeper desires such as security, community, prosperity, and belonging to create a profound emotional bond.\n3.	Classical Conditioning: Pair positive stimuli (e.g., uplifting music, inspiring visuals) with your message to evoke positive emotional responses whenever your campaign is mentioned.\n4.	Mere Exposure Effect: Repeatedly expose the audience to key symbols, slogans, and messages to increase familiarity and favorability.\n5.	Congruent Attitudes: Ensure that your message aligns with the audience\'s existing values and beliefs to foster agreement and acceptance.\n6.	Norm of Reciprocity: Offer something of value, such as a commitment to specific policies or support for community initiatives, creating a sense of obligation for the audience to support you in return.\n7.	Affective Priming: Set an emotional tone that resonates with the audience\'s experiences, using language and stories that evoke empathy, hope, and motivation.\n8.	Similarity: Highlight shared values, experiences, and backgrounds between the speaker and the audience to build rapport and trust.\n9.	Authority Principle: Establish credibility by showcasing your expertise, experience, and endorsements from respected figures or organizations.\n10.	Social Proof: Highlight the number of supporters, testimonials, and endorsements to demonstrate widespread approval and encourage others to join.',
  
  'Visionary Speech': '1.	Vision and Innovation: Present a clear, inspiring vision of the future under your leadership. Make this vision aspirational yet achievable, emphasizing how it will improve the audience\'s lives. Use phrases like \"Imagine a future where...\" to open their minds to possibilities.\n2.	The Power of Symbols and Images: Use vivid imagery and symbols to make the vision tangible. Employ metaphors and symbols that resonate deeply with the audience\'s cultural or community identity. For example, \"Our future is a bright sunrise over our nation, bringing light to every corner of our land.\"\n3.	Conceptual Fluency: Present the vision in a way that feels familiar and easy to understand. Use simple, clear language to describe the future state, ensuring that it resonates with the audience\'s existing knowledge and experiences. \"Our future is one where opportunity is within reach for every citizen, where hard work and dedication are rewarded.\"\n4.	Mood Enhancement: Set a hopeful, optimistic tone to inspire confidence in the future. Use positive, uplifting language and emotional cues (like smiles or uplifting music) to create a sense of excitement and anticipation. \"The best is yet to come, and together, we will achieve greatness.\"\n5.	Intrinsic Motivation: Appeal to the audience\'s inner desires to contribute to something greater. Inspire them by linking the vision to their personal values and goals. \"Together, we can create a future where every child can dream big and every family can thrive.\"\n6.	Anchoring Effect: Anchor the vision as the standard by which all other plans are judged. Repeatedly reference the vision as the benchmark for success, making it the yardstick against which alternative proposals are measured. \"This is the future we deserve, and anything less falls short of our potential.\"\n7.	Framing and Issue Association: Frame the future in terms of the issues most important to the audience. Align your vision with the audience\'s top concerns, such as economic security, education, and healthcare. \"Our vision addresses the real challenges we face—building a stronger economy, improving education, and ensuring quality healthcare for all.\"\n8.	Processing Fluency: Ensure that the message is easy to process and remember. Use clear, concise statements that are easy to follow, and repeat key points to reinforce the message. \"A future of progress, prosperity, and peace—this is our promise.\"\n9.	Appealing to Subconscious Desires: Subtly invoke deep-seated desires such as security, belonging, and achievement, linking these desires to the realization of the vision. \"In this future, you will feel secure, valued, and proud of our shared accomplishments.\"\n10.	Authority Principle: Reinforce the credibility of your vision by referencing your experience, achievements, or endorsements from respected figures. \"With years of experience and the backing of trusted leaders, I am committed to turning this vision into reality.\"',
  
  'Momentum-Building Speech': '1.	Incumbency Schema: Highlight positive outcomes and achievements under your leadership. Use specific, relatable examples of progress to demonstrate your effectiveness. \"Under our leadership, unemployment has dropped by 20%, and over 100 new schools have been built, providing quality education for all.\"\n2.	Social Identity Schema: Reinforce the audience\'s identity as part of a resilient and unified community. Emphasize the shared values and collective achievements that define the community. \"We are a community that stands together in times of challenge and celebrates together in times of triumph.\"\n3.	Party Affiliation Schema: Strengthen the association with your party by linking it to integrity, progress, and positive change. Highlight how the party\'s values align with the audience\'s own beliefs. \"Our party has always stood for justice, equality, and progress—values that have guided our every action.\"\n4.	Authority Figures: Mention endorsements and support from respected figures within the community or industry. These endorsements lend credibility and reinforce trust. \"Respected leaders like [Name] have praised our work, recognizing the positive impact it has had on our community.\"\n5.	Repetition and Consistency: Reinforce key themes and messages throughout the speech to ensure they stick in the audience\'s mind. Repetition helps to solidify these ideas as the core of your leadership narrative. \"Consistency, progress, and integrity—these are the hallmarks of our leadership.\"\n6.	Facial Feedback Hypothesis: Encourage positive expressions and gestures, both from yourself and the audience, to reinforce the message emotionally. Smiles, nods, and applause can create a feedback loop of positivity. \"As we look to the future with confidence, I see the hope and determination in your faces—this is what drives us forward.\"\n7.	Heuristic Processing: Simplify complex ideas into easily digestible points. Use bullet points or short, impactful statements to break down achievements into manageable pieces. \"Three key areas of success: economic growth, educational improvement, and community safety.\"\n8.	Affective Primacy Hypothesis: Ensure that the emotional tone precedes and influences the logical content. Start with an emotionally resonant statement that sets the tone for the data and facts to follow. \"The hope we feel today is built on the foundation of our shared successes—tangible results that make a real difference.\"\n9.	Contrast Effect (Subtle): Introduce contrasts with the opposition without direct criticism. Use positive framing to highlight your successes and suggest that alternative approaches may not offer the same benefits. \"While others talk about change, we have delivered results—real progress that you can see and feel.\"\n10.	Metaphors and Analogies: Use metaphors to make achievements more relatable and memorable. \"Our economic recovery is like a well-tended garden—careful planning and hard work have yielded a bountiful harvest.\"',
  
  'Mid-Campaign Speech': `1.	Negative Schema: Introduce the failures and shortcomings of the opposition by presenting specific examples of their past actions or policies that have led to negative outcomes. "Under the opposition's leadership, we witnessed economic stagnation, rising unemployment, and a decline in public services."\n2.	Contrast Effect: Highlight the differences between your leadership and the opposition's failures. Use positive framing to showcase your achievements in stark contrast to the opposition's missteps. "While they failed to deliver on their promises, we have consistently brought growth, stability, and innovation to our community."\n3.	Cognitive Dissonance: Create discomfort by showing how the opposition's promises conflict with their past actions. Use specific examples to demonstrate the inconsistency between what they say and what they do. "They claim to support education, yet under their rule, school funding was cut by 30%—a contradiction that cannot be ignored."\n4.	Two-Sided Arguments: Acknowledge minor counterarguments to strengthen your position, making your message more credible and balanced. "While some may argue that they have experience, experience alone isn't enough if it leads to repeated failures and broken promises."\n5.	Processing Fluency: Make the arguments easy to understand and process by breaking them down into simple, clear points. Use concise language and avoid jargon to ensure the message is accessible to all. "Here's the bottom line: We've delivered on our promises. They haven't."\n6.	Embodied Cognition: Use physical gestures that convey confidence and decisiveness. Stand tall, use open hand gestures, and make direct eye contact to reinforce the strength of your message. "With a clear vision and steady hands, we have navigated challenges and delivered results."\n7.	Anchoring Effect: Anchor the audience's expectations around the successes of your leadership, making these successes the standard by which all others are judged. "Under our leadership, we've set a new standard for economic growth and community development—standards that the opposition has repeatedly failed to meet."\n8.	Social Identity Schema: Reinforce the idea that the audience, as supporters of your leadership, are part of a successful, forward-thinking group. Position the opposition as a threat to this identity. "We are a community that values progress and innovation—values that are at risk if we allow the opposition to take us backward."\n9.	Affective Priming: Set an emotional tone that emphasizes the potential risks of choosing the opposition, using language that evokes concern and vigilance. "The stakes are high, and the risks are real. We cannot afford to gamble our future on empty promises and failed leadership."\n10.	Loss Aversion: Highlight what could be lost if the opposition comes to power, appealing to the audience's desire to avoid loss. "All the progress we've made together—jobs, infrastructure, safety—could be undone if we make the wrong choice."\n11.	Framing and Issue Association: Frame the opposition's weaknesses around the issues most important to the audience, such as economic security, education, and healthcare. "Their lack of a coherent economic plan is a direct threat to the jobs and livelihoods of our citizens."`,
  
  'Persuasive Speech': `1.	Affective Priming: Use emotionally charged language and imagery to evoke strong emotions that align with the message. Start with a powerful story or visual that resonates with the audience’s experiences. "Think of the times when we stood together in the face of adversity—those moments defined our strength and unity."\n2.	Repetition and Consistency: Reinforce key messages from previous speeches to ensure they are deeply ingrained in the audience’s mind. Repeat central themes such as "unity," "progress," and "shared success" to build a consistent narrative. "We’ve talked about progress, we’ve worked for progress, and now, we must continue our journey of progress."\n3.	Foot-in-the-Door Technique (FITD): Gradually increase the level of commitment by asking for small actions first, followed by more significant ones. "You’ve already shown your support by attending these rallies—now, I ask you to take the next step and spread our message within your communities."\n4.	Mood Enhancement: Set a positive tone that motivates and inspires the audience, while emphasizing the seriousness of the decision at hand. Use uplifting music, visuals, and optimistic language. "Our future is bright, but it’s up to us to make it even brighter. Together, we can achieve the extraordinary."\n5.	Similarity: Emphasize shared values, experiences, and goals to increase likability and trust. Make the audience feel that you are one of them, with common concerns and aspirations. "Like you, I want a safe, prosperous community for our children—a place where dreams become reality."\n6.	Implicit Egotism: Link positive traits to the audience's identity, making them feel good about supporting your leadership. Compliment their wisdom, strength, and vision. "You, the people of this great community, are the backbone of our progress—your wisdom and hard work are what drive us forward."\n7.	Primacy and Recency Effect: Place the most important messages at the beginning and end of the speech for maximum retention. Start with a strong opening that captures attention, and close with a powerful call to action. "From the very beginning, we’ve been committed to progress. And today, I ask you to stand with me as we take the final steps towards a future we can all be proud of."\n8.	Social Proof: Highlight the support and commitment of others to create a bandwagon effect. Use testimonials, endorsements, or references to the growing movement behind your leadership. "Thousands of your neighbors have already joined us, and together, we are unstoppable."\n9.	Emotional Appeals (Pathos): Use emotionally charged stories and language to deepen the connection with the audience. Share personal anecdotes or stories that reflect the audience’s values and struggles. "I remember speaking with a local farmer who, despite facing countless challenges, never gave up hope—because he believed in the power of our community."\n10.	Call to Action: Make a clear and compelling call to action that encourages immediate engagement. "Now is the time to make your voice heard—let’s show the world what we can achieve when we stand united."`,
  
  'Pre-Final Speech': `1.	Anchoring Effect: Repeatedly emphasize the achievements and stability brought by your leadership. Make these the benchmark for all future decisions. "Under our leadership, we’ve built a foundation of stability, growth, and security—this is what’s at stake in this election."\n2.	Loss Aversion: Sharply highlight the dangers and potential losses if the opposition comes to power. Frame the election as a choice between preserving what has been achieved and risking everything. "Everything we’ve worked for—jobs, safety, prosperity—could be undone with one wrong choice."\n3.	Lowballing: Start with small requests, such as attending events or discussing the campaign with friends, and escalate to the critical ask of voting. This step-by-step approach increases commitment and eases the transition to more significant actions. "You’ve been with us every step of the way—now, I ask you to take one final step and cast your vote for progress."\n4.	Authority: Leverage endorsements from respected figures to reinforce your credibility and the validity of your message. "Endorsed by community leaders, business icons, and educators alike, our vision for the future is shared by those who know what it takes to succeed."\n5.	Normative Influence: Convey that the majority of the community is aligned with your leadership, creating a sense of social pressure to conform. "Join the thousands of neighbors who have already pledged their support—let’s keep our community strong and united."\n6.	Proximity Effect: Emphasize the immediacy of the election and the importance of acting now. Use language that conveys urgency and the limited time left to make a difference. "With the election just days away, the time to act is now—every vote counts in shaping our future."\n7.	Perception of the Message: Craft a message that resonates with the audience’s values and expectations. Ensure clarity and alignment with their concerns and aspirations. "We’ve heard your concerns, we’ve delivered on our promises, and now we must continue our journey together."\n8.	Congruent Attitudes: Align your message with the deeply held values of the audience to ensure a seamless connection between their beliefs and your call to action. "We all want the best for our families, our community, and our future—this is what our campaign stands for."`,
  
  'Final Speech': `1.	Primacy and Recency Effect: Begin and end the speech with powerful, memorable statements that capture the audience’s attention and reinforce the key message. Start with a bold statement of purpose and close with an emotionally charged call to action. "From the very first step, we’ve been united in our vision for a brighter future. Now, at this critical moment, we must act together to make that future a reality."
2.	Transparency and Responsible Communication: Reaffirm your commitment to honesty, integrity, and responsible governance. Position yourself as the trustworthy and transparent leader who the audience can rely on to uphold these values. "Throughout this journey, I have been open and honest with you—because I believe that true leadership is rooted in transparency and accountability."
3.	Ethical Considerations: Highlight the ethical differences between your leadership and that of the opposition, subtly positioning your candidacy as the moral choice. "In this election, the stakes are not just political—they are moral. We must choose the path of righteousness, fairness, and justice."
4.	Candidate Attributes Priming: Reinforce key attributes like strength, vision, determination, and empathy. Ensure that the audience associates these qualities with your leadership. "With unwavering determination, we’ve faced every challenge, and with a clear vision, we’ve built a future of hope and opportunity."
5.	Normative Influence: Create a sense that voting for your leadership is the expected and socially accepted behavior within the community. "Your neighbors, friends, and community leaders are all standing with us—because they know that this is the right choice for our shared future."
6.	Visual and Symbolic Priming: Use powerful visuals and symbols, such as the national flag, community emblems, or images of progress, to evoke pride, unity, and a sense of shared purpose. "This flag symbolizes our shared values and the future we are building together—let it remind us of what we stand for."
7.	Proximity Effect: Emphasize the closeness and importance of the election, creating a sense of immediacy and urgency. Use language that highlights how close the election is and the impact each vote will have. "The election is just days away—every vote will shape the direction of our community for years to come."
8.	Justification: Provide strong, logical reasons for supporting your leadership, ensuring that the decision to vote feels both emotionally and intellectually sound. "We’ve delivered on our promises—creating jobs, improving education, and ensuring safety. These are the reasons why your vote is so crucial."
9.	Social Pressure: Use social norms to encourage voting and participation, suggesting that not voting would be a deviation from what is expected within the community. "Everyone around you is committed to voting—this is our moment to come together and make our voices heard."
`,
  
  'Post-Election Speech': `1.	Positive Association: Reinforce the positive emotions associated with the victory, creating a lasting connection between the success and the feelings of pride and accomplishment. "This victory is a testament to our shared commitment, hard work, and unwavering belief in a brighter future. Together, we have achieved something extraordinary."
2.	Mere Exposure Effect: Continue exposing the audience to key symbols, messages, and visual elements that were central to the campaign, deepening their loyalty and emotional connection to the movement. "As we look at the symbols that brought us together—the flag, our community, our shared values—let’s remember what we’ve accomplished and what we will continue to achieve."
3.	Social Identity Priming: Reinforce the identity of supporters as integral members of a successful and impactful movement. Emphasize the collective achievements and the unique role each supporter played in the victory. "You are not just supporters—you are the heart and soul of this movement. Your dedication and passion have made this victory possible, and together, we will continue to make history."
4.	Affective Priming: Use emotionally positive language that celebrates the victory while also fostering feelings of pride, joy, and anticipation for the future. "Today, we celebrate not just a victory at the polls, but a victory for every family, every child, and every dream that we share. This is our moment to shine."
5.	Commitment: Encourage continued involvement in future efforts, framing it as a natural extension of the victory and a way to ensure ongoing progress. "This victory is just the beginning. Now, we must continue our work, hand in hand, to build on this success and create an even brighter future."
6.	Social Proof: Highlight the broad support and success of the campaign to create a sense of belonging and shared achievement among all supporters. "Look around—see the smiles, the joy, the unity. This is what happens when we come together as one community, one family, with one shared goal."
7.	Authority: Reiterate the legitimacy of your leadership, reinforcing the mandate given by the voters and the responsibility to lead with integrity and vision. "You have placed your trust in me, and I will lead with the same dedication and commitment that brought us this victory. Together, we will continue to move forward, stronger and more united than ever."
8.	Mood Enhancement: Set a celebratory tone while also focusing on the future work that needs to be done. This balances the celebration with a forward-looking message that maintains momentum. "Today, we celebrate—but tomorrow, we continue our journey. There is much to be done, and with your continued support, we will achieve even greater things."
`,
  
  'Community Engagement Speech': `1.	Social Identity Schema: Strengthen the identity of local communities as essential parts of the campaign by highlighting their unique contributions and how they fit into the larger movement. Emphasize the pride and value of being part of this collective effort. "You, the people of this community, are the heartbeat of our campaign—your hard work, your values, and your vision for the future are what make this movement unstoppable."
2.	Use of Surrogates and Endorsements: Leverage the influence of local leaders, community influencers, and respected figures who can endorse your leadership, thereby lending credibility and trust to your message. "I’m proud to stand with [Local Leader’s Name], a true champion of this community, who knows what it takes to bring real change. Together, we’re committed to making your voices heard."
3.	Similarity: Emphasize shared values, goals, and experiences between your leadership and the community to foster a sense of connection and trust. "Like you, I believe in the power of hard work, family, and community. These are the values that guide every decision we make and every policy we propose."
4.	Implicit Egotism: Subtly connect the positive traits of the campaign (e.g., progress, integrity, unity) with the identity of community members, making them feel personally invested in the campaign’s success. "Your commitment to progress, your dedication to integrity, and your unwavering unity are the very qualities that define this campaign."
5.	Unsolicited Favors: Offer small, meaningful gestures to communities (such as support for local initiatives or sponsorships) to build goodwill and create a sense of obligation to reciprocate by supporting your campaign. "We’re not just talking about change—we’re taking action. That’s why we’re supporting [local initiative] to ensure that this community continues to thrive."
6.	Incidental Similarity: Emphasize shared experiences, such as facing common challenges or celebrating local culture, to deepen the connection with the audience. "I know what it means to face tough times—just like you, I’ve faced challenges and come out stronger. Together, we can turn every challenge into an opportunity."
7.	Ingroup Favoritism: Encourage the idea that supporting your leadership is a way to strengthen and protect the community’s interests, promoting loyalty and a sense of belonging within the group. "When we stand together, we protect our community’s future—we ensure that our children inherit a place where they can grow and prosper."
8.	Heuristic Processing: Simplify complex policies and ideas into clear, relatable messages that resonate with the everyday experiences of community members. "Our plan is simple: better schools, safer streets, and more jobs. These are the basics that every community needs to thrive, and that’s what we’re focused on delivering."
9.	Norm of Reciprocity: Create an expectation that by supporting your leadership, the community will benefit, fostering a cycle of mutual support and loyalty. "When you support us, you’re supporting a brighter future for your family, your neighbors, and your entire community. Together, we’ll ensure that the benefits of our progress reach every household."
`,
  
  'Media Strategy Speech': `1.	The Importance of Mass Media: Leverage a variety of media platforms—television, radio, print, social media, and online news outlets—to reach a broad and diverse audience. Ensure that the campaign’s message is not only widespread but also tailored to fit the strengths of each medium. "We will use every tool at our disposal—from television screens to social media feeds—to ensure our message reaches every corner of the nation."
2.	Media Influence Schema: Understand the unique influence of each media channel and use it to shape public perception. Tailor your message to the format and audience of each platform to maximize impact. "Our story will be told through every available channel, ensuring that our vision for the future is the one that shapes public opinion."
3.	Primacy and Recency Effect: Ensure that media coverage of your campaign starts and ends with the most compelling, memorable points. This can be achieved by crafting press releases, interviews, and sound bites that emphasize key messages at the beginning and end. "We’ll make sure that the first thing people hear and the last thing they remember about our campaign are the reasons why we are the best choice for the future."
4.	Framing and Issue Association: Frame media stories to associate your leadership with positive outcomes and the opposition with risks or failures. This involves careful control of the narrative, ensuring that your achievements are highlighted while subtly pointing out the shortcomings of the opposition. "Through strategic storytelling, we will make it clear that our leadership brings progress and stability, while the opposition offers nothing but uncertainty and risk."
5.	Repetition and Consistency: Use media to continually broadcast key messages, ensuring they become ingrained in the public’s consciousness. Consistent messaging across all platforms will reinforce your campaign’s core themes. "Every headline, every broadcast, every tweet will echo the same clear message—our commitment to a brighter future is unwavering."
6.	Contrast Effect: Highlight the stark differences between your leadership and the opposition, using media to make these contrasts more apparent. This can involve direct comparisons, side-by-side analyses, and features that show the superiority of your policies and approach. "We will show, through clear and direct comparisons, that our leadership is the path to progress, while the alternatives lead only to division and decline."
7.	Normative Influence: Use media to create the perception that supporting your leadership is the societal norm. This can be done by highlighting endorsements, featuring stories of widespread support, and using language that suggests the majority is already behind you. "Through the voices of our supporters and the stories of our successes, we will make it clear that the people are with us—and that momentum is unstoppable."
8.	Availability Heuristic: Ensure that your successes and positive messages are frequently presented in the media, making them the most readily available information when people think of your campaign. This can involve constant updates on achievements, human interest stories that highlight your impact, and a steady stream of positive news. "We will ensure that every success, every step forward, is front and center in the public’s mind."
9.	Visual and Symbolic Priming: Use strong visual imagery and symbols in media appearances to reinforce your message and brand identity. This can include consistent use of campaign colors, logos, and motifs that become synonymous with your leadership. "Every image, every symbol associated with our campaign will tell the story of progress, unity, and hope."
`,
  
  'Crisis Management Speech': `1.	Ethical Considerations: Start by reaffirming your commitment to ethics and integrity, emphasizing that your leadership is grounded in these values. Address the controversy with honesty and clarity, showing that you prioritize doing what is right. "From the very beginning, our campaign has been built on the principles of honesty, integrity, and transparency. Today, I stand before you to reaffirm that commitment."
2.	Cognitive Dissonance: Address any dissonance that might arise from the controversy by providing clear, logical explanations or corrective actions. This helps to resolve any internal conflict the audience may feel and restores confidence in your leadership. "I understand that recent events may have caused some concerns. Let me take this opportunity to explain exactly what happened and how we are addressing it."
3.	Transparency and Responsible Communication: Clearly and openly communicate the facts of the situation, ensuring that the audience feels informed and respected. Provide a detailed account of the issue, your response, and the steps being taken to prevent future occurrences. "In the spirit of transparency, I want to share with you all the details of this situation, so that you can judge for yourself our commitment to responsible leadership."
4.	Facial Feedback Hypothesis: During the speech, maintain calm and positive body language to convey confidence and control. This not only reassures the audience but also reinforces the message that you are handling the situation with composure and effectiveness. "As I address this issue, you will see that we are calm, prepared, and in control—because that’s how we handle challenges."
5.	Two-Sided Arguments: Acknowledge the controversy or challenge openly, but provide a balanced perspective that emphasizes your commitment to resolving the issue. Address any valid concerns while also highlighting the positive steps being taken. "Yes, this situation has brought challenges, but it has also given us an opportunity to show our resilience and our unwavering commitment to doing what is right."
6.	Loss Aversion: Emphasize the potential risks of allowing the controversy to distract from the campaign’s goals, highlighting the importance of staying focused on the bigger picture. This helps to keep the audience engaged with the primary objectives of the campaign. "We cannot let this momentary challenge derail the progress we’ve made together. The stakes are too high, and the risks too great, to lose focus now."
7.	Justification: Provide strong, compelling reasons for your actions or decisions in response to the crisis, reinforcing your leadership’s integrity. This can include detailing the rationale behind your response and how it aligns with your values and goals. "The decisions we’ve made in response to this issue were guided by our core values—honesty, fairness, and a commitment to the greater good."
8.	Perception of the Candidate: Use the opportunity to reinforce your image as a strong, ethical leader who can handle challenges with grace and effectiveness. Highlight your ability to navigate crises while maintaining the trust and support of your followers. "In times of challenge, true leadership is defined by how we respond. I assure you that my commitment to leading with integrity and strength remains unwavering."
9.	Classical Conditioning: Pair your response with positive, reassuring imagery or messages to create a sense of stability and reliability. This could include visual elements, such as standing in front of a national symbol, or using reassuring language that evokes feelings of security and trust. "As I speak to you today, I stand before our nation’s flag—a symbol of our shared values and the stability that we will continue to uphold."
`,
  
  'Value Reinforcement Speech': `1.	Value-Based Priming: Start by repeatedly emphasizing the core values that define your leadership, such as integrity, progress, unity, and resilience. Make sure these values are highlighted throughout the speech to ensure they resonate with the audience. "Integrity, progress, unity, and resilience—these are not just words; they are the foundation of everything we stand for."
2.	Social Identity Priming: Reinforce the audience’s identity as part of a community that shares and upholds these values. Emphasize the collective strength and shared purpose that comes from being aligned with these principles. "As a community, we are united by these values. Together, we embody the spirit of resilience and progress that will carry us forward."
3.	Congruent Attitudes: Align your speech with the audience’s pre-existing values and beliefs to foster agreement and support. Use language that reflects their thoughts, feelings, and aspirations, making it easier for them to connect with the message. "I know that these values resonate deeply with each of you because they reflect who we are as a people—honest, hardworking, and committed to a brighter future."
4.	Affective Primacy Hypothesis: Lead with emotionally charged statements that resonate with the audience’s values, setting the tone for the entire speech. Start with a powerful message that taps into their emotions and sets the stage for the values you will discuss. "When we talk about integrity, we’re talking about the trust that binds us together—the trust that allows us to build a better tomorrow."
5.	Similarity: Emphasize shared values between your leadership and the audience to increase trust and connection. Highlight how your leadership is a reflection of the community’s core beliefs, making it easier for them to see you as one of their own. "Just like you, I believe in the power of unity and the importance of standing strong in the face of adversity. These are the values that guide every decision I make."
6.	Implicit Egotism: Link positive traits associated with the campaign’s values to the audience’s self-identity, making them more likely to support your leadership. Frame these values in a way that makes the audience feel proud to be associated with them. "The values we uphold—integrity, unity, progress—are not just part of our campaign; they are a reflection of who you are as individuals and as a community."
7.	Mere Exposure Effect: Repeatedly expose the audience to these values throughout the speech and the campaign. The more they hear about these values, the more they will identify with them and see them as essential components of the campaign’s success. "Over the course of this campaign, we’ve talked a lot about what we stand for—integrity, unity, progress—and today, I want to reaffirm that these values will always be at the heart of our movement."
8.	Classical Conditioning: Associate these values with positive outcomes, creating a strong emotional connection to the campaign. Whenever you mention a value, pair it with a success story or a positive vision of the future to strengthen the emotional impact. "When we talk about progress, we’re not just talking about economic growth—we’re talking about creating opportunities for every family, every child, and every community."
9.	Processing Fluency: Present the values in a simple, clear, and consistent manner to make them easy to understand and remember. Avoid complex language or overly abstract concepts; instead, focus on making the values tangible and relatable. "Our values are simple: honesty, hard work, and a commitment to each other. These are the principles that have always guided us, and they will continue to do so in the future."
`,
  
  'Grassroots Mobilization Speech': `1.	Foot-in-the-Door Technique (FITD): Begin with small, easily achievable requests to engage the community, such as attending a local campaign event or sharing campaign materials. Gradually build up to larger commitments, like organizing neighborhood meetings or leading volunteer groups. "Start by simply joining us at our next event—every presence counts. From there, consider leading your neighbors in a conversation about the future we’re building together."
2.	Social Proof: Highlight examples of community members who have already taken action, showcasing their contributions to the campaign. This creates a sense of momentum and suggests that participation is the norm within the community. "Look at [Name], who organized a local rally just last week, or [Community Group], who have been canvassing door-to-door. Their actions show the power of community in action."
3.	Commitment: Encourage community members to make public commitments to support the campaign, such as signing pledges or participating in events. Public commitments increase the likelihood that individuals will follow through on their promises. "I ask you today to make a commitment—not just in your heart, but out loud, with your family, your friends, your neighbors. Let’s pledge to stand together and take action."
4.	Use of Surrogates and Endorsements: Empower local leaders to endorse the campaign and mobilize their networks. When respected figures within the community voice their support, it lends credibility to the campaign and encourages others to join. "We are fortunate to have the support of leaders like [Local Leader], who has been a tireless advocate for our shared values. Their endorsement means a lot, and their involvement will help guide us to victory."
5.	Social Pressure: Create a sense of social obligation to participate in the campaign by suggesting that it’s the community’s responsibility to ensure its success. Frame participation as not just a personal choice, but a communal duty. "This is our moment, our responsibility. We owe it to each other, and to future generations, to take action now. It’s up to us to make sure our community’s voice is heard loud and clear."
6.	Ingroup Favoritism: Emphasize the importance of the community working together to protect and promote its interests. Highlight the idea that active participation in the campaign is a way to safeguard the community’s future and well-being. "We are stronger together, and when we work as one, there’s nothing we can’t achieve. This campaign is about us—about protecting our interests and building the future we all deserve."
7.	Mood Enhancement: Create an atmosphere of excitement and enthusiasm around grassroots actions. Use positive, energizing language to make participation feel rewarding and impactful. "There’s an incredible energy in our community right now—an excitement that’s building with every action we take. Let’s harness that energy and make it a force for change."
8.	Incidental Similarity: Foster connections between community members based on shared experiences or interests. Encourage collaboration by pointing out commonalities and shared goals. "Whether you’re a parent, a small business owner, or a student, we all share the same hopes for our community. Let’s come together and make those hopes a reality."
9.	Proximity Effect: Emphasize the importance of local action and how immediate participation can have a significant impact on the campaign’s success. Stress that the campaign’s success starts with local, grassroots efforts. "The change we want starts right here, in our own neighborhoods. Your actions today can have a ripple effect that spreads throughout our entire community."
`,
  
  'Vision Reiteration Speech': `1.	Vision and Innovation: Begin by clearly articulating the long-term goals and vision of the campaign, emphasizing how these goals will create meaningful change for both the audience and the nation. Highlight the innovative aspects of this vision to make it feel forward-looking and dynamic. "Our vision is not just about today; it’s about laying the foundation for the future—where innovation drives growth, and every citizen thrives."
2.	Anchoring Effect: Re-anchor the audience’s expectations around this vision, making it the benchmark for all future decisions and actions. This helps ensure that the vision remains central in the audience’s minds as they evaluate progress. "Let this vision be the compass that guides us. Every decision, every step forward, must align with this shared goal of a brighter future."
3.	Primacy and Recency Effect: Emphasize the most important aspects of the vision at the beginning and end of the speech to ensure these ideas are retained. Start and conclude with powerful statements that encapsulate the vision’s significance. "From the start, our mission has been clear: to build a future full of opportunity and progress. As we near the campaign’s climax, let us reaffirm that this vision remains our guiding star."
4.	Arousal (Interest and Motivation): Use motivational and inspiring language to reignite enthusiasm and remind the audience why they are part of this movement. Create a sense of urgency and excitement about the future that keeps the audience engaged. "We stand on the brink of an extraordinary transformation. Your passion, your energy, is what will drive this vision forward, turning dreams into reality."
5.	Mood Enhancement: Set a positive, optimistic tone throughout the speech, reinforcing the uplifting aspects of the long-term goals. Ensure the audience feels hopeful and confident about the direction of the campaign. "The path ahead is filled with promise. Together, we will turn this promise into a tangible reality, one step at a time, with every victory we achieve."
6.	Congruent Attitudes: Ensure that the vision aligns with the audience’s values, making it easier for them to embrace and support it. Speak to their deeply held beliefs and aspirations, reinforcing the idea that the vision reflects their own ideals. "This vision is not just ours; it’s yours. It reflects the values we all hold dear—integrity, hard work, and a shared commitment to a better tomorrow."
7.	Framing and Issue Association: Frame the long-term goals in relation to the most pressing issues that concern the audience. Connect the vision to their immediate needs and challenges, making it feel both relevant and necessary. "In these challenging times, our vision provides the solutions we need. It addresses the economic uncertainties, the need for social justice, and the drive for sustainable growth."
8.	Justification: Offer strong, logical reasons for why these long-term goals are the best path forward, reinforcing their validity and necessity. Show how these goals address current challenges and lead to a better future. "This vision is grounded in practicality and necessity. It is the answer to the challenges we face today, and the blueprint for a future of prosperity and justice."
9.	Classical Conditioning: Associate the long-term goals with positive imagery and successful outcomes. Use emotionally resonant visuals and stories to deepen the audience’s emotional connection to the vision, making it feel both attainable and desirable. "Picture a future where every child has the chance to succeed, where our communities thrive, and our nation stands strong. This is the future we are working towards—together."
`,
  
  'Post-Campaign Speech': `1.	Social Identity Priming: Begin by reinforcing the audience’s identity as part of a successful movement that has already achieved significant victories but still has more to accomplish. This primes the audience to see themselves as integral to ongoing progress. "Together, we’ve accomplished something truly remarkable—but our journey doesn’t end here. As part of this movement, you are not just witnesses to history; you are its makers."
2.	Commitment: Encourage the audience to stay engaged and committed by suggesting specific ways they can continue to contribute. Offer concrete actions they can take to maintain their involvement in governance, community initiatives, or continued activism. "Now, I ask you to take the next step—whether it’s volunteering in your community, supporting local initiatives, or simply staying informed and active. Your continued commitment is vital to our success."
3.	Mere Exposure Effect: Maintain loyalty and support by continuing to expose the audience to key symbols, messages, and leaders. Repeated exposure to these elements will keep the movement’s core values and goals fresh in their minds. "You’ll continue to see our symbols, hear our messages, and feel the presence of our leaders, reminding us all of what we’ve achieved together and what we can still accomplish."
4.	Social Proof: Highlight the campaign’s success and the widespread support it received. Use this to reinforce the idea that the movement is strong, growing, and has the backing of a broad base of supporters. "Our movement has garnered overwhelming support from every corner of our nation, showing that we are not alone—our strength lies in our numbers and our shared vision."
5.	Mood Enhancement: Set a positive, forward-looking tone that emphasizes the progress made and the opportunities ahead. Ensure the audience feels hopeful and excited about the future. "The momentum we’ve built is unstoppable. The future is bright, and together, we will continue to move forward, seizing every opportunity that comes our way."
6.	Congruent Attitudes: Align the post-campaign message with the values and beliefs that were reinforced throughout the campaign. This ensures a smooth transition from campaign mode to the next phase, whether it be governance or sustained activism. "The values that guided us through this campaign—integrity, justice, and progress—will continue to guide us as we take the next steps together."
7.	Use of Surrogates and Endorsements: Empower local leaders and influencers to keep supporting the movement and mobilize others. Their ongoing involvement will help maintain momentum and expand the movement’s reach. "I’m grateful for the continued support of our local leaders and influencers, whose dedication and passion will keep this movement strong and vibrant."
8.	Processing Fluency: Present the next steps and future goals in a clear, simple manner, making it easy for the audience to understand and engage with them. Simplifying complex ideas will make it easier for the audience to stay involved and motivated. "Our next steps are clear and straightforward: stay informed, stay active, and stay united. Together, we will achieve even greater things."
9.	Authority: Reiterate the legitimacy and authority of the leadership, reinforcing the mandate given by the electorate. This reassures the audience that their efforts have led to a credible and respected leadership that will continue to work on their behalf. "Your voices have been heard, and the leadership you have chosen is ready to serve with the strength and resolve that this mandate demands."
`,
  
  'other': '' // No additional context for custom speech types
};

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

// Add this along with other exported constants
export const PERSUASION_TECHNIQUE_OPTIONS = [
  {
    value: 'Sustain Their Compliance',
    label: 'Sustain Their Compliance',
    explanation: 'This technique focuses on maintaining the audience\'s existing support by reinforcing decisions they\'ve already made that align with your campaign. It builds on psychological consistency where people prefer to remain consistent with prior commitments.'
  },
  {
    value: 'Drive Their Momentum',
    label: 'Drive Their Momentum',
    explanation: 'This approach creates a sense of movement and progress toward a larger goal, encouraging listeners to continue supporting your cause as part of an ongoing journey. It leverages the psychological tendency to complete what we\'ve started.'
  },
  {
    value: 'Optimize Your Message',
    label: 'Optimize Your Message',
    explanation: 'This technique involves crafting your message to maximize appeal by framing issues in terms of values that resonate most strongly with your audience. It uses psychological framing effects to present information in the most persuasive way.'
  },
  {
    value: 'Habituate Your Message',
    label: 'Habituate Your Message',
    explanation: 'This approach involves strategic repetition of key messages in varied formats to build familiarity and trust. It leverages the mere exposure effect where people develop preferences for things they encounter repeatedly.'
  },
  {
    value: 'Trigger Social Pressure',
    label: 'Trigger Social Pressure',
    explanation: 'This technique utilizes social proof by highlighting community support and creating the impression that others like the audience are already on board. It leverages our natural tendency to look to others for behavioral guidance.'
  },
  {
    value: 'Elicit Congruent Attitudes',
    label: 'Elicit Congruent Attitudes',
    explanation: 'This approach involves guiding the audience to generate their own arguments in favor of your position, creating stronger and more lasting persuasive effects. It builds on self-persuasion where internally generated arguments are more convincing than external ones.'
  }
]; 