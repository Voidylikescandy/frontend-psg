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