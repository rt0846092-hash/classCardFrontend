// ══════════════════════════════════════════════════════════
//  ClassCard — vocabulary.js
//  4 sections, 50 words each
//  Format: { id, word, meaning (Korean), example (English) }
// ══════════════════════════════════════════════════════════



// ══════════════════════════════════════════════════════════
//  ClassCard — vocabulary.js
//  4 main sections with 11 total sub-blocks
// ══════════════════════════════════════════════════════════

export const SECTIONS = [
  // ══════════════════════════════════════════════════════════
  // MAIN SECTION 1: Aunae Market (3 sub-blocks, 58 words total)
  // ══════════════════════════════════════════════════════════
  {
    id: 'aunae',
    label: '🏪 Aunae Market',
    color: '#34d399',
    description: 'Aunae Market & Maebong Church (58 words)',
    subBlocks: [
      {
        id: 'aunae_block1',
        title: '[No.1] Aunae Market',
        description: '기초 시장 단어',
        wordCount: 22,
        words: [
          { id: 'aunae_001', word: 'best', meaning: '최고의, 가장 좋은', example: 'This is the best market in town.' },
          { id: 'aunae_002', word: 'market', meaning: '시장', example: 'We go to the market every weekend.' },
          { id: 'aunae_003', word: 'every 5 days', meaning: '5일 마다', example: 'The market opens every 5 days.' },
          { id: 'aunae_004', word: 'town', meaning: '마을', example: 'Our town is small but beautiful.' },
          { id: 'aunae_005', word: 'fun', meaning: '즐거움, 재미', example: 'Shopping with friends is fun.' },
          { id: 'aunae_006', word: 'laughter', meaning: '웃음', example: 'Her laughter makes everyone happy.' },
          { id: 'aunae_007', word: 'fill', meaning: '채우다, 가득 채우다', example: 'We fill our baskets with fresh food.' },
          { id: 'aunae_008', word: 'sing', meaning: '노래하다', example: 'People sing together at the market.' },
          { id: 'aunae_009', word: 'dance', meaning: '춤추다', example: 'The children dance to the music.' },
          { id: 'aunae_010', word: 'happy', meaning: '행복한, 기쁜', example: 'I feel happy when I see my family.' },
          { id: 'aunae_011', word: 'sell', meaning: '팔다', example: 'Farmers sell fresh vegetables here.' },
          { id: 'aunae_012', word: 'buy', meaning: '사다', example: 'I want to buy some apples.' },
          { id: 'aunae_013', word: 'rice', meaning: '쌀', example: 'Rice is the main food in Korea.' },
          { id: 'aunae_014', word: 'grow', meaning: '자라다', example: 'The plants grow quickly in spring.' },
          { id: 'aunae_015', word: 'grew', meaning: '자랐다', example: 'She grew up in a small village.' },
          { id: 'aunae_016', word: 'strong', meaning: '힘센', example: 'He is strong enough to carry the bag.' },
          { id: 'aunae_017', word: 'family', meaning: '가족', example: 'My family supports me always.' },
          { id: 'aunae_018', word: 'bright', meaning: '밝은', example: 'The future looks bright for us.' },
          { id: 'aunae_019', word: 'dream', meaning: '꿈', example: 'Everyone has a dream.' },
          { id: 'aunae_020', word: 'next', meaning: '다음, 옆', example: 'I will see you next week.' },
          { id: 'aunae_021', word: 'heart', meaning: '마음, 심장', example: 'Follow your heart.' },
          { id: 'aunae_022', word: 'news', meaning: '소식', example: 'I have good news to share.' },
        ],
      },
      {
        id: 'aunae_block2',
        title: '[Scene 1] Aunae Market',
        description: '시장에서의 대화',
        wordCount: 17,
        words: [
          { id: 'aunae_023', word: 'can', meaning: '~할 수 있다', example: 'You can do anything you want.' },
          { id: 'aunae_024', word: 'mom', meaning: '엄마', example: 'My mom cooks delicious food.' },
          { id: 'aunae_025', word: 'have', meaning: '가지다, 먹다', example: 'We have lunch together.' },
          { id: 'aunae_026', word: 'money', meaning: '돈', example: 'Save your money for the future.' },
          { id: 'aunae_027', word: 'police', meaning: '경찰', example: 'The police help keep us safe.' },
          { id: 'aunae_028', word: 'girl', meaning: '소녀, 여자아이', example: 'The girl is waiting for her mom.' },
          { id: 'aunae_029', word: 'about', meaning: '~에 관한', example: 'Tell me about your day.' },
          { id: 'aunae_030', word: 'gone', meaning: '사라진, 없어진', example: 'My keys are gone.' },
          { id: 'aunae_031', word: 'lie', meaning: '거짓말하다', example: 'It is wrong to lie.' },
          { id: 'aunae_032', word: 'child', meaning: '어린아이', example: 'Every child deserves love.' },
          { id: 'aunae_033', word: 'because of', meaning: '~때문에', example: 'We stayed home because of the rain.' },
          { id: 'aunae_034', word: 'may', meaning: '~할지도 모른다', example: 'I may go to the party later.' },
          { id: 'aunae_035', word: 'hear', meaning: '듣다', example: 'Can you hear the music?' },
          { id: 'aunae_036', word: 'check', meaning: '확인하다, 점검하다', example: 'Please check your answers.' },
          { id: 'aunae_037', word: 'move', meaning: '움직이다, 이사하다', example: 'We will move to Seoul next month.' },
          { id: 'aunae_038', word: 'trust', meaning: '믿다, 신뢰하다', example: 'Trust yourself and your abilities.' },
          { id: 'aunae_039', word: 'police station', meaning: '경찰서', example: 'The thief was taken to the police station.' },
        ],
      },
      {
        id: 'aunae_block3',
        title: '[Scene 2] Maebong Church',
        description: '교회에서의 대화',
        wordCount: 19,
        words: [
          { id: 'aunae_040', word: 'father', meaning: '아버지', example: 'My father works hard every day.' },
          { id: 'aunae_041', word: 'sigh', meaning: '한숨, 한숨 쉬다', example: 'He let out a deep sigh.' },
          { id: 'aunae_042', word: 'take', meaning: '시간이 걸리다', example: 'The trip will take two hours.' },
          { id: 'aunae_043', word: 'since', meaning: '~한 이래로', example: 'I have been happy since I met you.' },
          { id: 'aunae_044', word: 'pray', meaning: '기도하다', example: 'We pray for peace every night.' },
          { id: 'aunae_045', word: 'make money', meaning: '돈벌다', example: 'He works hard to make money.' },
          { id: 'aunae_046', word: 'say', meaning: '말하다', example: 'Please say that again.' },
          { id: 'aunae_047', word: 'said', meaning: '말했다', example: 'She said she would come.' },
          { id: 'aunae_048', word: 'good', meaning: '좋은', example: 'You did a good job.' },
          { id: 'aunae_049', word: 'place', meaning: '장소', example: 'This is a beautiful place.' },
          { id: 'aunae_050', word: 'Japan', meaning: '일본', example: 'She traveled to Japan last year.' },
          { id: 'aunae_051', word: 'anymore', meaning: '더 이상~아닌', example: 'I do not live there anymore.' },
          { id: 'aunae_052', word: 'lied', meaning: '거짓말했다', example: 'He lied to his parents.' },
          { id: 'aunae_053', word: 'us', meaning: '우리에게, 우리를', example: 'Please join us for dinner.' },
          { id: 'aunae_054', word: 'pay', meaning: '월급', example: 'I get paid every Friday.' },
          { id: 'aunae_055', word: 'already', meaning: '이미, 벌써', example: 'We have already finished.' },
          { id: 'aunae_056', word: 'enough', meaning: '충분한', example: 'Do you have enough money?' },
          { id: 'aunae_057', word: 'promise', meaning: '약속하다', example: 'I promise to be there.' },
          { id: 'aunae_058', word: 'disobey', meaning: '불복종하다', example: 'Do not disobey the rules.' },
          { id: 'aunae_059', word: 'lie', meaning: '거짓말하다', example: 'Do not lie to your parents.' },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // MAIN SECTION 2: Great Imperial Japan (3 sub-blocks, 52 words)
  // ══════════════════════════════════════════════════════════
  {
    id: 'imperial',
    label: '🏯 Great Imperial Japan',
    color: '#f59e0b',
    description: 'Great Imperial Japan & Scenes (52 words)',
    subBlocks: [
      {
        id: 'imp_block1',
        title: '[No. 2] Great Imperial Japan',
        description: '일본 제국 시대 단어',
        wordCount: 20,
        words: [
          { id: 'imp_001', word: 'hope', meaning: '희망', example: 'We always have hope for a better tomorrow.' },
          { id: 'imp_002', word: 'now', meaning: '이제, 지금', example: 'Now is the time to act.' },
          { id: 'imp_003', word: 'from', meaning: '~로 부터', example: 'I got a letter from my friend.' },
          { id: 'imp_004', word: 'bare', meaning: '벌거벗은, 아무것도 없는', example: 'The room was bare without furniture.' },
          { id: 'imp_005', word: 'brown', meaning: '갈색, 갈색의', example: 'She has brown hair.' },
          { id: 'imp_006', word: 'young', meaning: '어린, 젊은', example: 'Young people have so much energy.' },
          { id: 'imp_007', word: 'spring', meaning: '봄', example: 'Flowers bloom in spring.' },
          { id: 'imp_008', word: 'field', meaning: '들판', example: 'The field is full of green grass.' },
          { id: 'imp_009', word: 'dream of', meaning: '~를 꿈꾸다', example: 'I dream of becoming a doctor.' },
          { id: 'imp_010', word: 'rest', meaning: '휴식, 쉬다', example: 'Take a rest after work.' },
          { id: 'imp_011', word: 'work', meaning: '일하다, 일', example: 'Hard work leads to success.' },
          { id: 'imp_012', word: 'time', meaning: '시간', example: 'Time passes quickly.' },
          { id: 'imp_013', word: 'remember', meaning: '기억하다', example: 'I remember our first meeting.' },
          { id: 'imp_014', word: 'hold on', meaning: '버티다', example: 'Hold on, help is coming.' },
          { id: 'imp_015', word: 'more', meaning: '더, 더 많이', example: 'I need more time to decide.' },
          { id: 'imp_016', word: 'dawn', meaning: '새벽', example: 'We woke up at dawn.' },
          { id: 'imp_017', word: 'empire', meaning: '제국', example: 'The Roman Empire was powerful.' },
          { id: 'imp_018', word: 'fade', meaning: '희미해지다', example: 'The memory will never fade.' },
          { id: 'imp_019', word: 'forget', meaning: '잊다', example: 'Never forget where you came from.' },
          { id: 'imp_020', word: 'again', meaning: '다시', example: 'Let us try again.' },
        ],
      },
      {
        id: 'imp_block2',
        title: '[Scene 3] Ewha School',
        description: '이화 학교 관련 단어',
        wordCount: 15,
        words: [
          { id: 'imp_021', word: 'meet', meaning: '만나다', example: 'Let us meet at the cafe.' },
          { id: 'imp_022', word: 'of course', meaning: '물론', example: 'Of course I will help you.' },
          { id: 'imp_023', word: 'fear', meaning: '두려움, 두려워하다', example: 'Do not let fear control you.' },
          { id: 'imp_024', word: 'closure', meaning: '폐쇄', example: 'The factory faced closure.' },
          { id: 'imp_025', word: 'expel', meaning: '쫓아내다', example: 'The school may expel bad students.' },
          { id: 'imp_026', word: 'unfair', meaning: '부당한, 불공정한', example: 'That decision was so unfair.' },
          { id: 'imp_027', word: 'suppress', meaning: '억압하다', example: 'Do not suppress your feelings.' },
          { id: 'imp_028', word: 'Christianity', meaning: '기독교', example: 'Christianity spread across Europe.' },
          { id: 'imp_029', word: 'justice', meaning: '정의', example: 'We fight for justice for all.' },
          { id: 'imp_030', word: 'fight', meaning: '싸우다, 투쟁하다', example: 'We must fight for our rights.' },
          { id: 'imp_031', word: 'God', meaning: '신, 하나님', example: 'Many people believe in God.' },
          { id: 'imp_032', word: 'want to', meaning: '~하고 싶다', example: 'I want to learn new things.' },
          { id: 'imp_033', word: 'close', meaning: '닫다, 폐쇄하다, 가까운', example: 'Please close the door.' },
          { id: 'imp_034', word: 'truth', meaning: '진실', example: 'Always speak the truth.' },
          { id: 'imp_035', word: 'faith', meaning: '믿음, 신념', example: 'Have faith in yourself.' },
        ],
      },
      {
        id: 'imp_block3',
        title: '[Scene 4] Maebong Church',
        description: '매봉 교회 관련 단어',
        wordCount: 17,
        words: [
          { id: 'imp_036', word: 'make it', meaning: '(모임에)오다, 성공하다, 해내다', example: 'I knew you would make it.' },
          { id: 'imp_037', word: 'happen', meaning: '일어나다, 발생하다', example: 'Good things happen every day.' },
          { id: 'imp_038', word: 'others', meaning: '다른 사람들', example: 'Help others whenever you can.' },
          { id: 'imp_039', word: 'alive', meaning: '살아있는', example: 'Stay alive and keep fighting.' },
          { id: 'imp_040', word: 'dead', meaning: '죽은, 죽어있는', example: 'The flowers are dead.' },
          { id: 'imp_041', word: 'keep A from Bing', meaning: 'A가 B하지 못하게 하다', example: 'Fear keeps us from trying.' },
          { id: 'imp_042', word: 'impossible', meaning: '불가능한', example: 'Nothing is impossible.' },
          { id: 'imp_043', word: 'cruelty', meaning: '잔인함', example: 'We must stop cruelty to animals.' },
          { id: 'imp_044', word: 'worse', meaning: '더 나쁜', example: 'Things can get worse before they get better.' },
          { id: 'imp_045', word: 'weak', meaning: '약한', example: 'Even the weak can be brave.' },
          { id: 'imp_046', word: 'shut down', meaning: '닫다, 폐쇄하다', example: 'The store had to shut down.' },
          { id: 'imp_047', word: 'create', meaning: '만들다, 창조하다', example: 'Artists create beautiful things.' },
          { id: 'imp_048', word: 'leave', meaning: '남기다, 떠나다', example: 'Do not leave me alone.' },
          { id: 'imp_049', word: 'mighty', meaning: '힘센, 강력한', example: 'The mighty oak tree fell.' },
          { id: 'imp_050', word: 'believe', meaning: '믿다', example: 'I believe in you.' },
          { id: 'imp_051', word: 'entrust', meaning: '위임하다, 맡기다', example: 'I entrust you with this secret.' },
          { id: 'imp_052', word: 'raise', meaning: '들어올리다, 기르다', example: 'They raise chickens on the farm.' },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // MAIN SECTION 3: Let us shout together (1 sub-block, 13 words)
  // ══════════════════════════════════════════════════════════
  {
    id: 'shout',
    label: '📢 Let us shout together',
    color: '#a78bfa',
    description: 'Let us shout together (13 words)',
    subBlocks: [
      {
        id: 'shout_block1',
        title: '[No.3] Let us shout together',
        description: '함께 외치는 독립 운동 단어',
        wordCount: 13,
        words: [
          { id: 'shout_001', word: 'March', meaning: '3월', example: 'March is the third month of the year.' },
          { id: 'shout_002', word: 'wave', meaning: '파도, 물결', example: 'The wave crashed on the shore.' },
          { id: 'shout_003', word: 'loud', meaning: '시끄러운, 소리가 큰', example: 'The music is too loud.' },
          { id: 'shout_004', word: 'voice', meaning: '목소리', example: 'Use your voice to speak up.' },
          { id: 'shout_005', word: 'proclaim', meaning: '선포하다', example: 'They proclaimed their independence.' },
          { id: 'shout_006', word: 'free', meaning: '자유로운', example: 'Everyone wants to be free.' },
          { id: 'shout_007', word: 'shout', meaning: '소리치다', example: 'Shout if you need help.' },
          { id: 'shout_008', word: 'change', meaning: '바꾸다, 변화', example: 'You can change the world.' },
          { id: 'shout_009', word: 'small', meaning: '작은', example: 'Small actions can make big changes.' },
          { id: 'shout_010', word: 'stronger', meaning: '더 강한, 더 힘센', example: 'Together, we are stronger.' },
          { id: 'shout_011', word: 'alone', meaning: '혼자, 홀로', example: 'Do not walk alone at night.' },
          { id: 'shout_012', word: 'watch', meaning: '보다, 손목시계', example: 'Watch carefully what happens.' },
          { id: 'shout_013', word: 'rise', meaning: '오르다, 뜨다, 상승하다', example: 'The sun will rise tomorrow.' },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // MAIN SECTION 4: Taegukgi & Independence (4 sub-blocks, 66 words)
  // ══════════════════════════════════════════════════════════
  {
    id: 'taegukgi',
    label: '🇰🇷 Taegukgi & Independence',
    color: '#6366f1',
    description: 'Taegukgi & Independence Movement (66 words)',
    subBlocks: [
      {
        id: 'tg_block1',
        title: '[Scene 5] + [No. 4] Taegukgi',
        description: '태극기 관련 단어',
        wordCount: 17,
        words: [
          { id: 'tg_001', word: 'draw', meaning: '그리다', example: 'Children love to draw pictures.' },
          { id: 'tg_002', word: 'today', meaning: '오늘', example: 'Today is a special day.' },
          { id: 'tg_003', word: 'when', meaning: '~할 때', example: 'Call me when you arrive.' },
          { id: 'tg_004', word: 'allow', meaning: '허락하다', example: 'Please allow me to explain.' },
          { id: 'tg_005', word: 'flag', meaning: '깃발', example: 'The flag represents our nation.' },
          { id: 'tg_006', word: 'harmony', meaning: '조화', example: 'We live in harmony with nature.' },
          { id: 'tg_007', word: 'mystery', meaning: '수수께끼, 미스터리', example: 'It is a mystery to me.' },
          { id: 'tg_008', word: 'trigrams', meaning: '삼괘(선3개)', example: 'The Korean flag has four trigrams.' },
          { id: 'tg_009', word: 'sky', meaning: '하늘', example: 'The sky is blue today.' },
          { id: 'tg_010', word: 'earth', meaning: '지구, 땅', example: 'We must protect the earth.' },
          { id: 'tg_011', word: 'fire', meaning: '불, 화재', example: 'Fire can be dangerous.' },
          { id: 'tg_012', word: 'symbol', meaning: '상징', example: 'The dove is a symbol of peace.' },
          { id: 'tg_013', word: 'holy', meaning: '거룩한, 성스러운', example: 'This is a holy place.' },
          { id: 'tg_014', word: 'proud', meaning: '자랑스러운', example: 'I am proud of my country.' },
          { id: 'tg_015', word: 'spirit', meaning: '영, 영혼', example: 'Keep the fighting spirit alive.' },
          { id: 'tg_016', word: 'beautiful', meaning: '아름다운', example: 'Our flag is beautiful.' },
          { id: 'tg_017', word: 'brave', meaning: '용감한', example: 'Brave people stand up for what is right.' },
        ],
      },
      {
        id: 'tg_block2',
        title: '[Scene 6] The Independence Movement',
        description: '독립 운동 관련 단어',
        wordCount: 15,
        words: [
          { id: 'tg_018', word: 'why', meaning: '왜', example: 'Why did you do that?' },
          { id: 'tg_019', word: 'signal', meaning: '신호', example: 'Wait for the signal to start.' },
          { id: 'tg_020', word: 'mountain', meaning: '산', example: 'We climbed the mountain.' },
          { id: 'tg_021', word: 'pound', meaning: '세게 두드리다, 쿵쾅거리다', example: 'Someone is pounding on the door.' },
          { id: 'tg_022', word: 'everything', meaning: '모든 것', example: 'Everything will be okay.' },
          { id: 'tg_023', word: 'worry', meaning: '걱정하다, 걱정', example: 'Do not worry about small things.' },
          { id: 'tg_024', word: 'bring', meaning: '가져오다, 데려오다', example: 'Please bring your book.' },
          { id: 'tg_025', word: 'arrest', meaning: '체포하다', example: 'The police will arrest him.' },
          { id: 'tg_026', word: 'must', meaning: '반드시 ~해야한다', example: 'You must study hard.' },
          { id: 'tg_027', word: 'Japanese', meaning: '일본인', example: 'She is Japanese.' },
          { id: 'tg_028', word: 'get caught', meaning: '잡히다', example: 'Do not get caught cheating.' },
          { id: 'tg_029', word: 'disaster', meaning: '재앙, 재난', example: 'The earthquake was a disaster.' },
          { id: 'tg_030', word: 'terrible', meaning: '끔찍한', example: 'The weather is terrible today.' },
          { id: 'tg_031', word: 'release', meaning: '풀어주다, 석방하다', example: 'They released the prisoners.' },
          { id: 'tg_032', word: 'imprison', meaning: '투옥하다, 감옥에 가두다', example: 'They may imprison him for years.' },
        ],
      },
      {
        id: 'tg_block3',
        title: '[No. 5] Flames on Mae-bong Mountain',
        description: '매봉산의 불꽃',
        wordCount: 15,
        words: [
          { id: 'tg_033', word: 'last night', meaning: '어제 밤', example: 'I could not sleep last night.' },
          { id: 'tg_034', word: 'hill', meaning: '언덕, 봉우리', example: 'We walked up the hill.' },
          { id: 'tg_035', word: 'burn', meaning: '타다, 태우다', example: 'The fire burned brightly.' },
          { id: 'tg_036', word: 'bright', meaning: '밝은', example: 'The stars are bright tonight.' },
          { id: 'tg_037', word: 'brave', meaning: '용감한', example: 'She was very brave during the crisis.' },
          { id: 'tg_038', word: 'when', meaning: '언제', example: 'When will you arrive?' },
          { id: 'tg_039', word: 'even if', meaning: '비록 ~일지라도', example: 'I will go even if it rains.' },
          { id: 'tg_040', word: 'tear', meaning: '눈물', example: 'A tear rolled down her cheek.' },
          { id: 'tg_041', word: 'parents', meaning: '부모님', example: 'My parents support my dreams.' },
          { id: 'tg_042', word: 'empty', meaning: '빈, 공허한', example: 'The room felt empty without him.' },
          { id: 'tg_043', word: 'gun', meaning: '총', example: 'Soldiers carry guns.' },
          { id: 'tg_044', word: 'flame', meaning: '불꽃, 화염', example: 'The flame flickered in the wind.' },
          { id: 'tg_045', word: 'chest', meaning: '가슴, 흉부', example: 'He felt pain in his chest.' },
          { id: 'tg_046', word: 'April', meaning: '4월', example: 'April is known for spring showers.' },
          { id: 'tg_047', word: 'stand', meaning: '일어서다', example: 'Please stand for the national anthem.' },
        ],
      },
      {
        id: 'tg_block4',
        title: '[Scene 7] + [No. 6] When the Day Comes',
        description: '그날이 오면',
        wordCount: 19,
        words: [
          { id: 'tg_048', word: 'kill', meaning: '죽이다', example: 'Do not kill innocent people.' },
          { id: 'tg_049', word: 'heard', meaning: '들었다', example: 'I heard a strange noise.' },
          { id: 'tg_050', word: 'imagine', meaning: '상상하다', example: 'Imagine a world with peace.' },
          { id: 'tg_051', word: 'prison', meaning: '감옥', example: 'He spent years in prison.' },
          { id: 'tg_052', word: 'deacon', meaning: '집사', example: 'The deacon helped at the church.' },
          { id: 'tg_053', word: 'Independence', meaning: '독립', example: 'Korea celebrates Independence Day.' },
          { id: 'tg_054', word: 'silent', meaning: '조용한, 침묵하는', example: 'Please be silent in the library.' },
          { id: 'tg_055', word: 'tiny', meaning: '아주 작은', example: 'A tiny seed grew into a big tree.' },
          { id: 'tg_056', word: 'barley', meaning: '보리', example: 'Barley is used to make beer.' },
          { id: 'tg_057', word: 'bitter', meaning: '쓴', example: 'The medicine tasted bitter.' },
          { id: 'tg_058', word: 'watchful', meaning: '주의깊에 지켜보는, 경계하는', example: 'Keep a watchful eye on the children.' },
          { id: 'tg_059', word: 'harsh', meaning: '혹독한, 가혹한', example: 'Winter can be very harsh.' },
          { id: 'tg_060', word: 'beam', meaning: '빛줄기, 광선', example: 'A beam of light shone through.' },
          { id: 'tg_061', word: 'pray', meaning: '기도하다', example: 'We pray for those in need.' },
          { id: 'tg_062', word: 'courage', meaning: '용기', example: 'It takes courage to speak the truth.' },
          { id: 'tg_063', word: 'sight', meaning: '시야, 광경', example: 'The sunset was a beautiful sight.' },
          { id: 'tg_064', word: 'painful', meaning: '고통스러운, 아픈', example: 'Losing a friend is painful.' },
          { id: 'tg_065', word: 'sorrow', meaning: '깊은 슬픔', example: 'The whole nation felt sorrow.' },
          { id: 'tg_066', word: 'freedom', meaning: '자유', example: 'Freedom is worth fighting for.' },
        ],
      },
    ],
  },
];

// Helper: get all words for a section (flatten sub-blocks)
export const getWordsBySection = (sectionId) => {
  const section = SECTIONS.find(s => s.id === sectionId);
  if (!section) return [];
  return section.subBlocks.flatMap(block => block.words);
};

// Helper: get words for a specific sub-block
export const getWordsBySubBlock = (sectionId, subBlockId) => {
  const section = SECTIONS.find(s => s.id === sectionId);
  if (!section) return [];
  const block = section.subBlocks.find(b => b.id === subBlockId);
  return block ? block.words : [];
};

// Helper: get section meta
export const getSectionById = (sectionId) => SECTIONS.find(s => s.id === sectionId);

// Helper: get sub-block meta
export const getSubBlockById = (sectionId, subBlockId) => {
  const section = SECTIONS.find(s => s.id === sectionId);
  if (!section) return null;
  return section.subBlocks.find(b => b.id === subBlockId);
};