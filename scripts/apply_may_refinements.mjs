/**
 * 365 Days With Jesus — Month 5 (May, Days 121–151) Refinement & Production Script
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(path.join(__dirname, ".."));
const devotionalsPath = path.join(projectRoot, "src/lib/content/devotionals.ts");

const MAY_ENTRIES = [
  {
    day_number: 121,
    month_number: 5,
    day_of_month: 1,
    weekly_subtheme: "The Soil of Patience and Longsuffering",
    title: "Walking by the Spirit",
    scripture_primary_reference: "Galatians 5:16",
    scripture_primary_text: "But I say, walk by the Spirit, and you won’t fulfill the lust of the flesh.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "As May opens before us, the earth bursts forth in vibrant green, reminding us that life does not generate itself through frantic effort; it emerges from healthy roots nourished in rich soil. In our spiritual lives, we often exhaust ourselves trying to produce holy behavior through sheer willpower. We resolve to be more patient, less irritable, and more disciplined, only to collapse in failure by noon. The Apostle Paul reveals the only true remedy: 'walk by the Spirit, and you won’t fulfill the lust of the flesh.' Notice the posture: walking. Walking is not a panicked sprint or a dramatic leap; it is a steady, rhythmic step-by-step dependence. Walking by the Spirit means acknowledging His presence as you make morning coffee, answer difficult emails, attend to daily tasks, or drive through heavy traffic. It means consulting Him before you react, surrendering your irritation before it curdles into bitterness, and allowing His supernatural life to animate your ordinary moments. When you yield your heart to the Spirit's gentle cadence, the harsh demands of the flesh lose their magnetic pull. You are free to flourish.",
    reflection_questions: [
      "In what specific part of your daily routine do you tend to rely on willpower instead of the Holy Spirit?",
      "How does viewing spiritual life as a 'walk' rather than a 'sprint' relieve your anxiety today?",
      "What does it look like for you to pause and consult the Holy Spirit before responding to an irritation today?"
    ],
    guided_prayer: "Holy Spirit, gentle Counselor and divine Breath of Life, I surrender my self-reliance into Your hands today. Forgive me for trying to manufacture holy fruit through human grit and strained willpower. Teach me to walk step by step with You in every room of my day. When impatience threatens to overwhelm my reactions, quiet my spirit with Your presence and let Your sweet fruit blossom in my life. Amen.",
    daily_intention: "I will walk in step with the Holy Spirit today, taking time to pause before I react.",
    practical_action: "Before entering your busiest task today, sit silently for two minutes and pray: 'Holy Spirit, lead my steps.'",
    evening_reflection_prompt: "Did you sense the Holy Spirit helping you pause and choose grace during a moment of strain today?"
  },
  {
    day_number: 122,
    month_number: 5,
    day_of_month: 2,
    weekly_subtheme: "The Soil of Patience and Longsuffering",
    title: "The Patience of the Farmer",
    scripture_primary_reference: "James 5:7-8",
    scripture_primary_text: "Be patient therefore, brothers, until the coming of the Lord. Behold, the farmer waits for the precious fruit of the earth, being patient over it, until it receives the early and late rain. You also be patient. Establish your hearts, for the coming of the Lord is at hand.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "We live in a culture intoxicated with instant gratification. We demand high-speed internet, overnight deliveries, and instant solutions to lifelong struggles. Yet God almost always works on the timetable of an agrarian farmer. A farmer cannot shout at the soil to force seed to sprout overnight; he cannot manufacture the early and late rains. The farmer must prepare the furrow, bury the seed in dark earth, and wait with steadfast trust through cold nights and unpredictable seasons. James urges us to adopt this holy patience: 'Establish your hearts, for the coming of the Lord is at hand.' Establishing your heart means staking deep roots into God's character when circumstances seem stagnant. You may be praying for a loved one who has wandered, waiting for physical healing, navigating a career transition, or longing for emotional peace after deep sorrow. The silence of God is never the absence of God. Beneath the quiet surface of your waiting, divine roots are expanding and holy fruit is maturing. Do not dig up today what you planted in prayer yesterday. Trust the master farmer.",
    reflection_questions: [
      "What prayer or life circumstance requires the patient endurance of a farmer in your life right now?",
      "How does human impatience cause you to doubt the unseen work God is doing beneath the surface?",
      "What does 'establishing your heart' look like practically when you feel tempted to give up waiting?"
    ],
    guided_prayer: "Faithful Gardener and Vinedresser, teach my hurried soul the sacred patience of the farmer. When I see no visible progress in the seeds I have sown with tears, remind me that You are faithfully sending the early and late rain in Your perfect timing. Establish my heart in unshakeable trust. Deliver me from anxious striving and help me rest in Your sovereignty while You cultivate the harvest. In Jesus' name, Amen.",
    daily_intention: "I will wait with quiet confidence today, knowing that God is tending every seed sown in faith.",
    practical_action: "Identify one area where you are tempted to rush God's timing, and consciously surrender the calendar to Him today.",
    evening_reflection_prompt: "How did remembering the farmer's patience help you handle an unexpected delay with calm trust today?"
  },
  {
    day_number: 123,
    month_number: 5,
    day_of_month: 3,
    weekly_subtheme: "The Soil of Patience and Longsuffering",
    title: "Strengthened for Joyful Endurance",
    scripture_primary_reference: "Colossians 1:11",
    scripture_primary_text: "strengthened with all power, according to the might of his glory, for all endurance and perseverance with joy;",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "When Scripture speaks of Christian endurance, it does not mean gritting your teeth, clenching your jaw, and dragging yourself through life with grim resignation. Paul’s magnificent prayer in Colossians 1 unites two words that human logic rarely pairs: 'endurance' and 'joy.' Paul prays that we would be 'strengthened with all power, according to the might of his glory, for all endurance and perseverance with joy.' Notice that this endurance is not fueled by human grit, personality strength, or positive thinking. It is supplied directly from 'the might of His glory.' Supernatural endurance allows a woman to face prolonged responsibilities, health challenges, relational friction, or financial strain without surrendering her song. Biblical joy is not the absence of tears; it is the presence of an unshakable Savior who walks beside you through the valley. When your soul is tethered to Christ, you can endure the stormiest winds because your foundation cannot be shaken. You are not merely surviving today; by His glorious might, you are being sustained with deep, quiet, defiant joy. Let His strength carry you through whatever feels heavy.",
    reflection_questions: [
      "Where in your life right now are you tempted to rely on grim resignation rather than Christ's joyful endurance?",
      "How does knowing that God's glorious might is the power source for your endurance encourage you?",
      "What is one simple way you can celebrate the presence of Christ in the middle of a difficult duty today?"
    ],
    guided_prayer: "Almighty God, my strength is small, but Your power is limitless. Forgive me for trying to push through exhausting duties on my own frail energy. Strengthen my inner being today with all power according to the might of Your glory. Infuse my perseverance with authentic, Christ-given joy. Keep my heart resilient, my spirit gracious, and my eyes fixed on Jesus, who sustains my life. In His name, Amen.",
    daily_intention: "I am strengthened with divine power today, enduring every duty with quiet, resilient joy.",
    practical_action: "When your energy dips or a task feels burdensome today, pause and pray: 'Lord, strengthen me with Your glorious might.'",
    evening_reflection_prompt: "Did relying on Christ's power bring a sense of joyful endurance to a demanding duty today?"
  },
  {
    day_number: 124,
    month_number: 5,
    day_of_month: 4,
    weekly_subtheme: "The Soil of Patience and Longsuffering",
    title: "Clothed in Compassionate Patience",
    scripture_primary_reference: "Colossians 3:12-13",
    scripture_primary_text: "Put on therefore, as God’s chosen ones, holy and beloved, a heart of compassion, kindness, lowliness, humility, and perseverance; bearing with one another, and forgiving each other, if any man has a complaint against any; even as Christ forgave you, so you also do.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "Every morning, before stepping into the world, we deliberately choose the clothes we wear. We consider the weather, the tasks ahead, and what will keep us comfortable and protected. Paul uses this intimate daily ritual to teach us how to dress our souls. As women who are chosen, holy, and dearly loved by God, we are invited to 'put on... a heart of compassion, kindness, lowliness, humility, and perseverance; bearing with one another.' The Greek concept of bearing with one another speaks of making room for another person's human quirks, faults, and frailties. In friendships, workplaces, and communities, people will bump against our sensitivities. Bearing with others does not mean tolerating abuse or accepting exploitation; healthy boundaries remain holy and wise. Rather, it means extending gracious patience in ordinary friction instead of reaching for the sharp armor of sarcasm or cold withdrawal. Because Jesus has borne with your innumerable weaknesses and covered you with unearned mercy, you are empowered to clothe your soul in His patience, extending grace to imperfect people while resting securely in His love.",
    reflection_questions: [
      "Who in your daily circle tests your patience most, and how can you actively 'bear with' them with healthy grace today?",
      "How does meditating on how much Christ has forgiven you soften your reactions toward difficult people?",
      "What spiritual garment—compassion, kindness, humility, or patience—do you need to intentionally put on this morning?"
    ],
    guided_prayer: "Lord Jesus, You have clothed my soul in the clean robe of Your righteousness and borne with my weaknesses with unending mercy. Forgive me for reaching for anger, irritation, or cold silence when others fail me. Today, I intentionally put on Your heart of compassion, kindness, and longsuffering. Help me make gracious allowances for the flaws of those I encounter today while walking in holy wisdom. In Your holy name, Amen.",
    daily_intention: "I am clothed today in Christ's compassion, making gracious space for the imperfections of others.",
    practical_action: "When someone interrupts or irritates you today, whisper a quick blessing over them instead of reacting defensively.",
    evening_reflection_prompt: "How did clothing your heart in patience change the tone of your workplace or home environment today?"
  },
  {
    day_number: 125,
    month_number: 5,
    day_of_month: 5,
    weekly_subtheme: "The Soil of Patience and Longsuffering",
    title: "Slow to Anger, Abounding in Love",
    scripture_primary_reference: "Psalm 103:8",
    scripture_primary_text: "Yahweh is merciful and forgiving, slow to anger, and abundant in loving kindness.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "Throughout the Hebrew Scriptures, when God reveals His own character, He returns again and again to this foundational declaration: He is 'slow to anger, and abundant in loving kindness.' In the original Hebrew, the phrase translated 'slow to anger' (erek 'appayim) describes immense patience and longsuffering—a holy restraint that holds back wrath through deep reservoirs of steadfast covenant love. God’s justice is never a volatile outburst; His mercy is patient, deliberate, and vast. If God were quick-tempered, none of us would survive a single day. Yet how often do we operate with short fuses? When stress mounts, a delayed schedule, a careless remark, or an inconvenient interruption can trigger an immediate flare of resentment. But as women indwelt by the Holy Spirit, we are called to reflect our Father's patient character. We are invited to pause, release reactive hostility, and allow God's grace to govern our speech. When irritation rises in your heart today, remember how many thousands of times God has been patient with your stumbling steps. Let His abundant lovingkindness widen your capacity to extend mercy.",
    reflection_questions: [
      "What triggers your shortest temper or quickest flare of irritability during typical daily routines?",
      "How does contemplating God's longsuffering patience reshape your understanding of His character?",
      "What practical step can help you take a spiritual pause before responding in anger today?"
    ],
    guided_prayer: "Yahweh, my Compassionate Father, how I thank You that You are slow to anger and abounding in lovingkindness toward me. You know my frame; You remember that I am dust, yet You treat me with tender mercy. Cleanse my heart of quick irritation and volatile reactions. When pressure mounts today, give me the grace to pause, remember Your patience, and respond with Christ-like gentleness. Amen.",
    daily_intention: "I will reflect my Heavenly Father's heart today by being slow to anger and quick to show mercy.",
    practical_action: "The next time you feel tempted to snap in frustration today, pause for three seconds and silently pray: 'Yahweh is slow to anger.'",
    evening_reflection_prompt: "Did choosing to pause with grace prevent an unnecessary conflict or harsh word today?"
  },
  {
    day_number: 126,
    month_number: 5,
    day_of_month: 6,
    weekly_subtheme: "The Soil of Patience and Longsuffering",
    title: "The Goodness of Quiet Waiting",
    scripture_primary_reference: "Lamentations 3:25-26",
    scripture_primary_text: "Yahweh is good to those who wait for him, to the soul that seeks him. It is good that a man should hope and quietly wait for the salvation of Yahweh.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "Jeremiah penned these luminous words amidst the ruins of Jerusalem, in a season of national exile and profound personal grief. Yet even amidst deep sorrow, the prophet anchored his soul to an unchanging truth: 'Yahweh is good to those who wait for him... It is good that a man should hope and quietly wait for the salvation of Yahweh.' In biblical Hebrew, waiting on the Lord (qavah) is not passive resignation or hopeless inactivity. It denotes hopeful anticipation, confident expectation, and anchoring one's fragile heart in God's covenant promises. Notice that Jeremiah emphasizes 'quiet' waiting. Anxiety talks incessantly; fear plots, manipulates, and exhausts itself seeking control. But faith has the courage to be quiet in the presence of God. You do not need to fight every battle yourself. You do not need to resolve every complex dilemma before sunset. Rest your weary mind. God is good to the soul that seeks Him, and His faithful redemption will arrive on time. Settle your heart in His enduring goodness today.",
    reflection_questions: [
      "What situation in your life is causing loud internal panic rather than quiet trust right now?",
      "How does biblical waiting on God reframe your perspective during prolonged delays?",
      "What would it look like for your soul to practice quietness before the Lord today?"
    ],
    guided_prayer: "Sovereign Lord, my soul is often loud with worry, trying to orchestrate solutions and solve tomorrow's problems today. Forgive my restlessness. I anchor my faith in Jeremiah's truth: You are good to those who wait for You. Bind my fragile heart to Your eternal strength. Quiet my anxious thoughts with the assurance of Your salvation, and teach me to rest in Your presence. In Jesus' name, Amen.",
    daily_intention: "I will cultivate a quiet, hopeful heart today, trusting that Yahweh is good to those who wait for Him.",
    practical_action: "Spend five minutes in complete, unhurried silence today, offering no requests, only resting in God's goodness.",
    evening_reflection_prompt: "How did practicing quiet waiting calm your internal mental chatter throughout today?"
  },
  {
    day_number: 127,
    month_number: 5,
    day_of_month: 7,
    weekly_subtheme: "The Soil of Patience and Longsuffering",
    title: "Established in Gracious Patience",
    scripture_primary_reference: "James 5:10-11",
    scripture_primary_text: "Take, brothers, for an example of suffering, and of perseverance, the prophets who spoke in the name of the Lord. Behold, we call them blessed who endured. You have heard of the perseverance of Job, and have seen the Lord in the outcome, and how the Lord is full of compassion and mercy.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "When we read the great stories of faith—Job, Elijah, Jeremiah, and the prophets—we often remember the triumphant conclusions while overlooking the long, heavy seasons of pain they carried. Job sat in ashes, misunderstood by his closest companions and grieving acute loss. Yet James reminds us: 'You have heard of the perseverance of Job, and have seen the Lord in the outcome, and how the Lord is full of compassion and mercy.' The word 'outcome' in Greek (telos) points to the ultimate purpose and finished design of God. During the agonizing middle chapters of Job's ordeal, the situation looked completely unresolved. Had Job judged God solely by the middle of the trial, he might have concluded that God had abandoned him. But the final revelation demonstrated the true character of the Lord: full of compassion, steadfast in mercy, and faithful to sustain His servants. You and I are living in the middle chapters of our stories today. Do not judge God's heart by the unfinished tapestry of your present hardship. He remains full of tender mercy.",
    reflection_questions: [
      "What 'middle chapter' of your life feels painful, confusing, or unresolved right now?",
      "How does the biblical example of the prophets help you persevere through prolonged delays?",
      "How can meditating on God's ultimate compassion comfort your heart in the middle of a trial today?"
    ],
    guided_prayer: "Compassionate Lord, thank You for the faithful witnesses who have walked the road of perseverance before me. When the middle chapters of my life feel confusing, painful, and unresolved, remind me that You have not written the final sentence. Strengthen my resolve to endure with dignity and faith. Open my eyes to see that You are full of mercy and tender compassion. In Jesus' name, Amen.",
    daily_intention: "I will trust God in the middle chapters of my life, knowing His heart is full of compassion.",
    practical_action: "Write down one unresolved trial on an index card, write 'God is full of mercy' across it, and leave it on your desk.",
    evening_reflection_prompt: "Did remembering that God is writing the whole story bring comfort to your spirit today?"
  },
  {
    day_number: 128,
    month_number: 5,
    day_of_month: 8,
    weekly_subtheme: "The Sweetness of Kindness and Goodness",
    title: "Tenderhearted Kindness",
    scripture_primary_reference: "Ephesians 4:32",
    scripture_primary_text: "And be kind to one another, tenderhearted, forgiving each other, just as God also in Christ forgave you.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "The world often mistakes kindness for weakness, assuming that gentleness is simply the refuge of those who lack the courage to stand firm. Yet biblical kindness is one of the most potent, courageous forces in the universe. Paul urges the believers in Ephesus to 'be kind to one another, tenderhearted, forgiving each other, just as God also in Christ forgave you.' The Greek word for 'tenderhearted' (eusplanchnos) points to deep compassion—an inner empathy that refuses to become calloused by life's disappointments. Throughout life, we encounter countless opportunities to grow hard. We have faced broken promises, personal disappointments, and careless words. The natural human defense is to build stone walls around our hearts and treat others with cool detachment. But Christ calls us to holy vulnerability paired with divine wisdom. Tenderheartedness does not mean people-pleasing or the absence of healthy boundaries; it is the quiet strength of a soul so secure in God's love that it refuses to grow bitter. When you extend kindness, you reflect the very heart of the Father who embraced you in your brokenness.",
    reflection_questions: [
      "In what relationship or encounter are you tempted to build a protective wall rather than remaining tenderhearted?",
      "How does Christ's lavish forgiveness toward you empower you to release minor grievances today?",
      "What small act of tenderhearted kindness can you offer to someone in your sphere of influence today?"
    ],
    guided_prayer: "Lord Jesus, You touched the outcast and wept with the brokenhearted, never hardening Your tender heart against human frailty. Melt every trace of cynicism, coldness, or resentment that has crept into my soul. Clothe me today in Your tenderhearted kindness. Give me the holy courage to forgive freely, just as God in Christ has forgiven me, bringing Your sweet warmth into every interaction. Amen.",
    daily_intention: "I choose a tender heart today, extending the same unearned kindness Christ has poured into my life.",
    practical_action: "Perform one quiet, unexpected act of kindness for someone today without expecting any acknowledgment or return.",
    evening_reflection_prompt: "Did you feel the warmth of Christ's peace in your heart when you chose kindness over frustration today?"
  },
  {
    day_number: 129,
    month_number: 5,
    day_of_month: 9,
    weekly_subtheme: "The Sweetness of Kindness and Goodness",
    title: "Bound Around Your Neck",
    scripture_primary_reference: "Proverbs 3:3-4",
    scripture_primary_text: "Don’t let kindness and truth forsake you. Bind them around your neck. Write them on the tablet of your heart. So you will find favor and good repute in the sight of God and man.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "In the ancient world, people wore precious signet rings or royal seals bound on cords around their necks, resting directly over their chests. These seals represented their identity, authority, and most valued treasure. King Solomon instructs us to wear two virtues in that exact sacred place: 'Don’t let kindness and truth forsake you. Bind them around your neck. Write them on the tablet of your heart.' Notice the divine harmony: kindness and truth must never be separated. Truth without kindness becomes cruel, self-righteous, and crushing; kindness without truth becomes sentimental compromise and flattery. But when holy truth is delivered through the warm hands of kindness, it has the power to heal broken souls and guide wandering feet. Writing them on the tablet of your heart means letting the Holy Spirit etch these virtues so deeply into your character that they become your instinctive reaction under pressure. In a culture dominated by harsh online criticism and cynical commentary, a woman crowned with kindness and grounded in truth shines like a beacon of celestial grace. Bind them close today.",
    reflection_questions: [
      "Where do you find it most challenging to hold truth and kindness together without sacrificing either?",
      "How does speaking truth without kindness damage your witness and hurt the people you care about?",
      "What would it look like to write God's kindness and truth on the tablet of your heart this morning?"
    ],
    guided_prayer: "Wise Counselor, forgive me for the times I have spoken truth harshly or compromised truth out of people-pleasing fear. Teach me to hold both in perfect harmony, just as Jesus did, full of grace and truth. Bind Your lovingkindness around my neck and engrave Your truth upon my heart, that my words and actions may bring honor to Your holy name. In Christ, Amen.",
    daily_intention: "I will wear kindness and truth as my daily crown, speaking grace seasoned with holy wisdom.",
    practical_action: "Before sending a message or speaking a sensitive opinion today, ask yourself: 'Is this both completely true and genuinely kind?'",
    evening_reflection_prompt: "Did pairing kindness with truth help bring clarity and peace to a conversation you had today?"
  },
  {
    day_number: 130,
    month_number: 5,
    day_of_month: 10,
    weekly_subtheme: "The Sweetness of Kindness and Goodness",
    title: "The Kindness and Love of God",
    scripture_primary_reference: "Titus 3:4-5",
    scripture_primary_text: "But when the kindness of God our Savior and his love toward mankind appeared, not by works of righteousness which we did ourselves, but according to his mercy, he saved us through the washing of regeneration and renewing by the Holy Spirit,",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "Paul’s letter to Titus paints a magnificent portrait of the Gospel in just a few breathtaking lines. When human history was darkened by rebellion, selfishness, and confusion, God did not send a thunderbolt of cosmic destruction; instead, 'the kindness of God our Savior and his love toward mankind appeared.' Salvation did not arrive because we finally cleaned up our lives, climbed a moral ladder, or offered sufficient good deeds to appease a distant deity. We were rescued entirely 'according to His mercy, through the washing of regeneration and renewing by the Holy Spirit.' The Greek word for kindness here is philanthropia—the warm, affectionate love of God for humanity. Think of what this means for your daily walk. God does not relate to you as an impatient supervisor waiting for you to fail; He relates to you through the prism of infinite, tender kindness. You are washed clean. You are continually being renewed by His Spirit. When you stumble, His mercy runs to meet you. Living in the reality of this divine kindness eliminates the frantic need to prove your worth to anyone.",
    reflection_questions: [
      "How does resting in the reality that salvation is based on God's mercy rather than your performance relieve your anxiety?",
      "Do you tend to view God as an impatient taskmaster or as a Savior overflowing with kindness toward you?",
      "How can you reflect God's 'philanthropia'—His affectionate love—to an unlovely or difficult person today?"
    ],
    guided_prayer: "God our Savior, how breathtaking is Your kindness and mercy toward my soul! Thank You that You did not wait for me to become righteous before You rescued me. You washed me clean by Your grace and renewed me through Your Holy Spirit. Root my identity in Your unconditional kindness today, freeing me from performance anxiety so that I may love others freely. In Jesus' name, Amen.",
    daily_intention: "I am rescued by mercy and renewed by the Holy Spirit; I will rest securely in God's kindness today.",
    practical_action: "Whenever self-condemnation whispers in your ear today, repeat Titus 3:5: 'According to His mercy He saved me.'",
    evening_reflection_prompt: "Did resting in God's unconditional kindness give you freedom from performance anxiety today?"
  },
  {
    day_number: 131,
    month_number: 5,
    day_of_month: 11,
    weekly_subtheme: "The Sweetness of Kindness and Goodness",
    title: "Words That Impart Grace",
    scripture_primary_reference: "Ephesians 4:29",
    scripture_primary_text: "Let no corrupt speech proceed out of your mouth, but only what is good for building up as the need may be, that it may give grace to those who hear.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "The words that leave our lips carry immense spiritual power. Solomon observed that death and life are in the power of the tongue, and Paul echoes this profound reality when he writes: 'Let no corrupt speech proceed out of your mouth, but only what is good for building up as the need may be, that it may give grace to those who hear.' The Greek word for 'corrupt' (sapros) was used in ancient contexts to describe rotten fruit, spoiled fish, or decaying timber—things that spread foul odors wherever they were placed. Paul contrasts corrupt speech with words that 'give grace to those who hear.' Think about that extraordinary calling: your ordinary voice has been consecrated by God to dispense grace. Every conversation you have today—with a friend, a neighbor, a cashier, or a colleague—is an opportunity to offer genuine encouragement. You can either deposit life and dignity into another person's spirit, or you can drain their energy with cynicism, complaint, and criticism. Consecrate your tongue to Christ this morning. Choose words that build up, heal, and breathe hope.",
    reflection_questions: [
      "What kinds of speech (complaining, venting, sarcasm, criticism) are most likely to spoil your conversations?",
      "Who in your daily circle is in need of hearing an uplifting word of grace from you today?",
      "How can pausing for two seconds before speaking transform the emotional atmosphere of your relationships or workplace?"
    ],
    guided_prayer: "Lord of Grace, forgive me for the careless, critical, or complaining words that have crossed my lips. Cleanse my heart, for out of the abundance of the heart the mouth speaks. Consecrate my tongue today to be an instrument of grace. May every word I speak build others up, impart hope, and honor the name of Jesus Christ. In His name, Amen.",
    daily_intention: "I will use my voice to dispense grace today, speaking only what builds others up in love.",
    practical_action: "Identify one person who seems discouraged today and send them a thoughtful, specific text of heartfelt affirmation.",
    evening_reflection_prompt: "Did choosing uplifting words bring life and peace to your conversations throughout the day?"
  },
  {
    day_number: 132,
    month_number: 5,
    day_of_month: 12,
    weekly_subtheme: "The Sweetness of Kindness and Goodness",
    title: "Overcoming Evil with Good",
    scripture_primary_reference: "Romans 12:21",
    scripture_primary_text: "Don’t be overcome by evil, but overcome evil with good.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "When someone treats us unfairly, insults our character, or acts with hostility, human nature screams for retaliation. We want to retaliate with equivalent sharpness, withhold our affection, or nurse private resentment. But the Apostle Paul issues a radical, counter-cultural command: 'Don’t be overcome by evil, but overcome evil with good.' Notice the spiritual insight: when you retaliate against evil with evil, you have already allowed darkness to dictate the condition of your own soul. You have been 'overcome by evil.' Overcoming evil with good does not mean passivity, enabling destructive behavior, or staying in harmful situations; healthy, protective boundaries remain essential. Rather, it means refusing to let another person's malice infect your spirit with bitterness. Returning a blessing for an insult, praying for those who oppose you, and maintaining calm, dignified courtesy breaks the destructive cycle. You do not conquer a dark room by shouting at the shadows; you conquer darkness by lighting a candle. Today, do not let the sour attitudes or rude behavior of others pull you into cynicism. Overcome evil through the power of Christ's goodness.",
    reflection_questions: [
      "When someone acts rudely or unfairly toward you, what is your instinctive first emotional impulse?",
      "How does returning good for evil protect your own soul from becoming infected by bitterness?",
      "What specific act of blessing or prayer can you offer today for someone who has been difficult toward you?"
    ],
    guided_prayer: "Victorious Lord, You stood before Your accusers in quiet dignity and prayed for those who nailed You to the cross. Deliver me from the petty desire to retaliate or protect my ego. When I face rudeness, unfair criticism, or hostility today, protect my heart from resentment. Empower me by Your Holy Spirit to overcome evil with good, reflecting Your triumphant love in every circumstance. Amen.",
    daily_intention: "I will not let darkness dictate my spirit; I choose to overcome evil with the unconquerable goodness of Christ.",
    practical_action: "Pray a genuine, specific prayer of blessing today for someone whose attitude or behavior has frustrated you recently.",
    evening_reflection_prompt: "Did responding with calm goodness protect your internal peace when someone tested your patience today?"
  },
  {
    day_number: 133,
    month_number: 5,
    day_of_month: 13,
    weekly_subtheme: "The Sweetness of Kindness and Goodness",
    title: "Unseen Acts of Goodness",
    scripture_primary_reference: "Matthew 6:3-4",
    scripture_primary_text: "But when you give merciful gifts, don’t let your left hand know what your right hand does, so that your merciful gifts may be in secret, and your Father who sees in secret will reward you openly.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "We inhabit a culture that constantly celebrates visibility and performance. People broadcast their good deeds, showcase their charitable acts, and share their spiritual routines in search of digital applause and fleeting validation. But Jesus calls His followers to an entirely different kingdom economy: 'when you give merciful gifts, don’t let your left hand know what your right hand does, so that your merciful gifts may be in secret.' True Christian goodness does not require an audience; it finds its highest joy in the unseen presence of the Father. Much of faithful Christian living is composed of quiet, unapplauded service: praying through tears for a struggling friend, quietly meeting a need without announcement, or listening patiently to someone who feels alone. The world may never notice your quiet faithfulness, but heaven never misses a single detail. Your Heavenly Father sees every secret kindness, every whispered intercession, and every quiet sacrifice. His approval is all your soul will ever need. Live for the audience of One today, delighting in hidden goodness.",
    reflection_questions: [
      "How does the subtle craving for human recognition or appreciation creep into your daily acts of service?",
      "What secret act of goodness or quiet generosity can you perform today purely for God's eyes?",
      "How does knowing that your Father sees in secret bring comfort when your daily efforts feel unnoticed?"
    ],
    guided_prayer: "Father Who Sees in Secret, deliver me from the subtle vanity of seeking human approval and applause. Teach me the pure joy of quiet, hidden service. Consecrate my hands to perform acts of goodness that only You behold. Thank You that no cup of cold water given in Your name is ever forgotten. May my life be a sweet, unseen fragrance of love offered directly unto You. In Jesus' name, Amen.",
    daily_intention: "I will live for the audience of One today, delighting in hidden faithfulness and quiet goodness.",
    practical_action: "Do one kind deed today—leave an encouraging note, pay for someone's coffee, or clean a shared space—without telling a soul.",
    evening_reflection_prompt: "How did practicing secret goodness bring deep, quiet satisfaction to your walk with God today?"
  },
  {
    day_number: 134,
    month_number: 5,
    day_of_month: 14,
    weekly_subtheme: "The Sweetness of Kindness and Goodness",
    title: "Goodness Overflowing",
    scripture_primary_reference: "Psalm 23:6",
    scripture_primary_text: "Surely goodness and loving kindness shall follow me all the days of my life; and I will dwell in Yahweh’s house forever.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "David concludes his most beloved psalm with an exclamation of supreme, triumphant confidence: 'Surely goodness and loving kindness shall follow me all the days of my life; and I will dwell in Yahweh’s house forever.' In the original Hebrew, the word translated 'follow' (radaph) is an active, intense verb that means to pursue, track down, or chase with unwavering determination. David is not imagining God’s goodness casually strolling behind him at a leisurely distance; he is declaring that God’s covenant goodness and unfailing mercy are actively pursuing him every single day. Even in the darkest valleys, even when adversaries or trials surround you, God’s goodness is relentlessly pursuing His people. If you are in Christ, goodness and mercy are your divine companions. They accompanied you in your youth, they guard your steps in mature years, and they will walk you safely across the threshold of eternity. When anxiety whispers that disaster, illness, or abandonment is waiting around the corner, answer back with David's holy conviction: goodness and mercy are pursuing you today. You can rest secure in the Shepherd's fold.",
    reflection_questions: [
      "When you contemplate your future, do you expect disaster to chase you, or God's relentless goodness?",
      "How does the Hebrew imagery of goodness 'pursuing' you reframe your sense of divine protection?",
      "In what specific way have you seen God's goodness track you down during a difficult season of your life?"
    ],
    guided_prayer: "Good Shepherd, I praise You for Your relentless, pursuing love. Forgive me for listening to fear's lie that trouble and sorrow will have the final word in my story. I anchor my soul in Your eternal promise: goodness and lovingkindness shall pursue me all the days of my life. Help me walk with my head held high today, resting in Your unfailing protection forever. Amen.",
    daily_intention: "I walk forward with confidence today, knowing God's goodness and mercy are actively pursuing my steps.",
    practical_action: "Look back over the past few years and write down three specific moments where God's mercy tracked you down.",
    evening_reflection_prompt: "Did you sense the peaceful assurance of being pursued by God's goodness throughout your day?"
  },
  {
    day_number: 135,
    month_number: 5,
    day_of_month: 15,
    weekly_subtheme: "Gentleness as Holy Strength",
    title: "A Soft Answer Turns Away Wrath",
    scripture_primary_reference: "Proverbs 15:1",
    scripture_primary_text: "A gentle answer turns away wrath, but a harsh word stirs up anger.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "When conflict erupts in a workplace, community, or relationship, human nature instinctively defaults to matching fire with fire. If someone raises their voice, we want to raise ours; if someone uses a cutting tone, we reach for sarcasm to defend our wounded pride. But King Solomon offers a masterclass in divine wisdom: 'A gentle answer turns away wrath, but a harsh word stirs up anger.' In the ancient Hebrew, the word for 'gentle' (rak) denotes something tender, soft, and pliable, while 'harsh' ('etseb) implies pain, wounding, and labor. Gentleness is not weakness, passivity, or surrender; gentleness is tremendous strength held under divine control. Just as a soft pillow absorbs the kinetic force of a falling stone without shattering, a gentle answer absorbs explosive human anger and dissipates its hostility. It takes no spiritual maturity to retaliate with sharp insults or surrender to raw frustration; human nature defaults to self-defense. But it takes extraordinary, supernatural strength to look into the eyes of an agitated person, breathe in the Holy Spirit, and respond with steady, calm tenderness. You have the power to de-escalate tension today through Christ.",
    reflection_questions: [
      "In what recurring conversation or relationship do you find yourself most tempted to respond with harshness?",
      "How does viewing gentleness as 'strength under control' challenge the world's definition of power?",
      "What specific soft phrase can you prepare today to replace a sharp, defensive retort?"
    ],
    guided_prayer: "Prince of Peace, forgive me for the times I have added fuel to fires of conflict with my defensive, sharp tongue. Teach me the supernatural power of a gentle answer. When tensions rise and harsh words fly around me, fill my spirit with Your divine poise. Give me grace to absorb hostility with quiet tenderness and turn away anger, bringing Christ's calming presence into every difficult conversation. Amen.",
    daily_intention: "I will wield gentleness as holy strength today, answering harshness with calm and gracious words.",
    practical_action: "When someone speaks to you in a tense or frustrated tone today, deliberately lower your vocal volume and answer with gentleness.",
    evening_reflection_prompt: "Did lowering your voice and speaking softly help diffuse a tense moment in your day?"
  },
  {
    day_number: 136,
    month_number: 5,
    day_of_month: 16,
    weekly_subtheme: "Gentleness as Holy Strength",
    title: "Gentle and Lowly in Heart",
    scripture_primary_reference: "Matthew 11:29",
    scripture_primary_text: "Take my yoke upon you, and learn from me, for I am gentle and humble in heart; and you will find rest for your souls.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "In all the four Gospels, amidst all the miracles, sermons, and confrontations, there is only one place where Jesus pulls back the veil and describes the internal disposition of His own heart. He does not say, 'I am brilliant and demanding,' or 'I am austere and unyielding.' He says: 'I am gentle and humble in heart; and you will find rest for your souls.' The King who holds galaxies in His hands, who spoke light into existence and conquered death, defines His inner essence as gentle and lowly. Think of how radically this contrasts with the harsh taskmasters of this world—the relentless demands, chaotic schedules, and unforgiving inner critics that dictate daily life. Jesus is not waiting to scold you when you stumble. He does not roll His eyes when you come to Him weary and burdened for the hundredth time. His posture toward your fragile humanity is one of infinite gentleness. When you come into His presence, you do not need to perform, pose, or pretend you have everything together. You can simply exhale. In His gentle presence, your soul discovers its true resting place.",
    reflection_questions: [
      "How does knowing that Jesus describes His own heart as 'gentle and lowly' reshape your approach to prayer?",
      "What harsh, demanding expectation have you been placing on yourself that Jesus never asked you to carry?",
      "How can resting in the gentle heart of Christ help you extend gentleness to someone who irritates you today?"
    ],
    guided_prayer: "Gentle Savior, I come to You weary and burdened by the exhausting demands of self-reliance and perfectionism. How I thank You that Your heart toward me is gentle, lowly, and full of grace. Deliver me from the fear that You are impatient with my stumbling steps. Teach me to take Your light yoke upon my shoulders and discover the sweet, unforced rest that only Your gentle love can give. Amen.",
    daily_intention: "I will rest in the gentle heart of Jesus today, laying down the heavy burden of performance.",
    practical_action: "Spend five quiet minutes sitting with Jesus, telling Him honestly where you feel weak, and receiving His gentle acceptance.",
    evening_reflection_prompt: "Did resting in the gentleness of Jesus quiet your soul during moments of fatigue today?"
  },
  {
    day_number: 137,
    month_number: 5,
    day_of_month: 17,
    weekly_subtheme: "Gentleness as Holy Strength",
    title: "The Imperishable Beauty of a Gentle Spirit",
    scripture_primary_reference: "1 Peter 3:4",
    scripture_primary_text: "in the hidden person of the heart, in the incorruptible adornment of a gentle and quiet spirit, which is in the sight of God very precious.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "Modern culture spends billions of dollars convincing women that their worth is bound to outward youth, flawless appearance, and curated aesthetics. Yet physical youth fades and earthly fashions deteriorate. The Apostle Peter directs our attention to an enduring realm of elegance: 'the hidden person of the heart, in the incorruptible adornment of a gentle and quiet spirit, which is in the sight of God very precious.' Notice the word 'incorruptible.' A gentle spirit does not diminish with age; it grows more radiant as it is cultivated in God. Crucially, a quiet spirit is never a mandate for silence in the face of injustice, passivity, or tolerating abuse. Scripture never asks a woman to accept mistreatment. Rather, it describes a soul that is fundamentally tranquil because it is anchored in God—an inner poise that does not panic when storms rage, does not lose its grounding when plans unravel, and does not need to manipulate people to feel secure. In the sight of Almighty God, this quiet spiritual dignity is of immense, priceless value. Cultivate this unfading treasure in Christ today.",
    reflection_questions: [
      "How does Peter's definition of 'incorruptible beauty' liberate you from the world's pressure to maintain outward perfection?",
      "How do you distinguish biblical gentleness and quiet dignity from passive silence or tolerating mistreatment?",
      "In what circumstance today can you choose internal tranquility over reactive panic?"
    ],
    guided_prayer: "Heavenly Father, forgive me for how easily I am influenced by the world's obsession with fleeting outward metrics. Teach me to cherish what You treasure. Adorn the hidden person of my heart with the unfading beauty of a gentle and quiet spirit. Root my security so deeply in Your sovereign care that my soul remains calm, gracious, and wise, regardless of the chaos around me. In Jesus' name, Amen.",
    daily_intention: "I will invest in eternal elegance today by cultivating a gentle, quiet, and God-anchored spirit.",
    practical_action: "Before looking in the mirror to check your outward appearance today, take a moment to offer your inner heart to God.",
    evening_reflection_prompt: "Did resting in God's approval bring tranquility to your inner thoughts today?"
  },
  {
    day_number: 138,
    month_number: 5,
    day_of_month: 18,
    weekly_subtheme: "Gentleness as Holy Strength",
    title: "A Tongue That Heals",
    scripture_primary_reference: "Proverbs 15:4",
    scripture_primary_text: "A gentle tongue is a tree of life, but deceit in it crushes the spirit.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "A single sentence can alter the entire course of an afternoon, a relationship, or a human life. We can all recall words spoken over us decades ago—words of cutting criticism that wounded our spirit, or words of gentle affirmation that breathed life into our dormant dreams. King Solomon captures this staggering power with vivid imagery: 'A gentle tongue is a tree of life, but deceit in it crushes the spirit.' The Hebrew phrase translated 'gentle tongue' (marpe' lashon) literally denotes 'a healing tongue' or 'a tongue that brings medicine.' Think of your speech as a conduit of grace. With your words, you can apply soothing ointment to someone’s raw grief, administer hope to an anxious heart, and speak dignity to someone who feels completely invisible. Conversely, a deceitful, perverse, or cutting tongue crushes the human spirit, suffocating joy and creating lingering emotional wounds. In friendships, workplaces, and community interactions, our words set the tone for our environments. When you speak with holy gentleness today, you plant shade-giving trees of life in the parched soil of other people's hearts.",
    reflection_questions: [
      "Who in your circle is carrying a crushed or weary spirit that needs the medicine of healing words today?",
      "Can you recall a time when someone's gentle words acted as a 'tree of life' in your own difficult season?",
      "What intentional encouragement can you speak to a colleague, neighbor, or friend before the sun sets?"
    ],
    guided_prayer: "Lord of All Comfort, You heal the brokenhearted and bind up their painful wounds. I surrender my voice to You today. Forbid that any word from my lips should crush, wound, or discourage another human soul. Make my tongue a tree of life, dispensing the sweet medicine of Christ's grace, truth, and affirmation to everyone I encounter. Let my words breathe life and hope wherever I go. In Jesus' name, Amen.",
    daily_intention: "My tongue will be a tree of life today, bringing healing, encouragement, and hope to weary souls.",
    practical_action: "Deliver a sincere, unexpected compliment or verbal blessing to someone who is quietly working hard today.",
    evening_reflection_prompt: "Did speaking healing words lift the spirit of someone around you and bring peace to your own heart?"
  },
  {
    day_number: 139,
    month_number: 5,
    day_of_month: 19,
    weekly_subtheme: "Gentleness as Holy Strength",
    title: "Restoring with Gentleness",
    scripture_primary_reference: "Galatians 6:1",
    scripture_primary_text: "Brothers, even if a man is caught in some fault, you who are spiritual must restore such a one in a spirit of gentleness; looking to yourself so that you also aren’t tempted.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "When someone in our community stumbles into sin, makes a grave mistake, or exercises poor judgment, human nature has two instinctive reactions: judgmental gossip or self-righteous condemnation. We secretly elevate ourselves by comparing our record with another person's public failure. But the Apostle Paul commands a profoundly different response for those who walk in the Spirit: 'restore such a one in a spirit of gentleness; looking to yourself so that you also aren’t tempted.' The Greek word for 'restore' (katartizo) was used for setting a dislocated joint or repairing broken nets. When a skilled physician resets a dislocated shoulder, she does not strike the injury with violence; she works with extreme gentleness, precision, and compassion, seeking to realign the joint so that true healing can take place. That is how the Holy Spirit calls us to handle broken people. When someone fails or stumbles morally, do not crush them with contempt. Remember that you too are made of dust, entirely dependent on sustaining grace. Restore with gentle, holy hands.",
    reflection_questions: [
      "When someone close to you fails or exercises poor judgment, is your first instinct condemnation or gentle prayer?",
      "How does remembering your own vulnerability to temptation keep you humble when others stumble?",
      "How can you practice the ministry of gentle restoration in your community without compromising biblical truth?"
    ],
    guided_prayer: "Gracious Father, how tenderly You have restored my soul whenever I have wandered into foolishness and sin. Forgive me for every trace of self-righteousness, superiority, or judgmental pride toward others who stumble. Give me a spirit of gentleness and the careful hands of a physician to help restore broken brothers and sisters. Keep me humble, ever mindful of my own dependence on Your sustaining grace. Amen.",
    daily_intention: "I will approach the faults of others with profound humility, seeking gentle restoration rather than condemnation.",
    practical_action: "If you are aware of someone who has stumbled or made a poor choice, pray privately for their healing and restoration today.",
    evening_reflection_prompt: "Did maintaining a humble, gentle posture toward someone's mistake bring peace and protect unity today?"
  },
  {
    day_number: 140,
    month_number: 5,
    day_of_month: 20,
    weekly_subtheme: "Gentleness as Holy Strength",
    title: "The Gentleness of Wisdom",
    scripture_primary_reference: "James 3:17",
    scripture_primary_text: "But the wisdom that is from above is first pure, then peaceful, gentle, reasonable, full of mercy and good fruits, without partiality, and without hypocrisy.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "James provides us with an unmistakable diagnostic test to determine whether the wisdom guiding our lives comes from heaven or from the fallen world. Worldly wisdom is aggressive, cutthroat, self-promoting, and arrogant; it prides itself on winning arguments, dominating rooms, and climbing over others to achieve success. But look at the divine portrait of heavenly wisdom: it is 'first pure, then peaceful, gentle, reasonable, full of mercy and good fruits, without partiality, and without hypocrisy.' Notice where gentleness sits in this holy constellation of virtues. Heavenly wisdom does not need to shout down opponents or force its opinions upon others. The Greek word for 'reasonable' (eupeithes) denotes approachable, open to reason, and willing to listen. A woman who walks in divine wisdom is not stubborn or contentious; she can listen calmly to differing perspectives without feeling threatened, because her security is rooted in God. She does not play favorites, nor does she wear a pious mask. Her life produces the sweet fruit of peace. Ask God to pour this celestial wisdom into your mind today.",
    reflection_questions: [
      "Does the way you handle disagreements resemble worldly aggression or the gentle, reasonable wisdom of heaven?",
      "What does it mean for your life that true wisdom is 'approachable and willing to listen'?",
      "In what decision or relationship do you need to trade worldly cleverness for the gentle, pure wisdom from above?"
    ],
    guided_prayer: "Father of Lights, from whom comes every good and perfect gift, grant me the wisdom that is from above. Purify my motives from ambition, pride, and the need to always be right. Make me gentle, peaceful, approachable, and full of mercy. Deliver me from hypocrisy and double-mindedness. May the wisdom of Christ govern my decisions, guide my counsel, and bear sweet fruit in my daily interactions. Amen.",
    daily_intention: "I seek the gentle, peaceable wisdom of heaven today, choosing humility over the need to win arguments.",
    practical_action: "In your next conversation or meeting, practice being 'quick to listen'—let the other person finish completely before speaking.",
    evening_reflection_prompt: "How did choosing gentle, approachable wisdom bring clarity and harmony to a situation you faced today?"
  },
  {
    day_number: 141,
    month_number: 5,
    day_of_month: 21,
    weekly_subtheme: "Gentleness as Holy Strength",
    title: "Led by the Gentle Shepherd",
    scripture_primary_reference: "Isaiah 40:11",
    scripture_primary_text: "He will feed his flock like a shepherd. He will gather the lambs in his arm, and carry them in his bosom. He will gently lead those who have their young.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "Isaiah 40 opens with the thunderous declaration of God's cosmic majesty—He measures the oceans in the hollow of His hand, weighs the mountains on scales, and numbers the stars by name. Yet in verse 11, the prophet paints a scene of breathtaking, tender intimacy: 'He will feed his flock like a shepherd. He will gather the lambs in his arm, and carry them in his bosom. He will gently lead those who have their young.' Consider the tender precision of our Shepherd's care. When a lamb is too exhausted, injured, or young to keep up with the flock, the Shepherd does not drive it with a whip or abandon it in the wilderness. He bends down, scoops the trembling creature into His strong arms, and presses it against His chest, right next to His heartbeat. God understands every season of life when your energy is depleted, your responsibilities are heavy, and your physical reserves are low. Whether you are caring for others, navigating demanding responsibilities, or carrying emotional fatigue, He does not overdrive His flock. When you feel overwhelmed, stop striving. Rest your head against the Shepherd's chest. He is carrying you.",
    reflection_questions: [
      "Are you currently in a season of life where you feel like an exhausted lamb needing to be carried?",
      "How does the image of Jesus carrying you in His bosom quiet your fears about keeping up with expectations?",
      "What does it mean to let the Shepherd lead you 'gently' rather than feeling hurried by life?"
    ],
    guided_prayer: "Loving Shepherd of My Soul, thank You that You know my human limitations and never overdrive Your sheep. When my legs are tired and my heart feels overwhelmed by the care I carry for others, scoop me up in Your strong, tender arms. Hold me close to Your chest and quiet my racing pulse with the sound of Your heartbeat. Teach me to follow Your gentle pace today. In Jesus' name, Amen.",
    daily_intention: "I will let the Gentle Shepherd carry my weary heart today, refusing to run ahead in anxious striving.",
    practical_action: "Take a slow ten-minute walk or sit quietly outdoors today, visualizing yourself resting safely in the Shepherd's arms.",
    evening_reflection_prompt: "Did you sense the gentle pace and comforting presence of the Shepherd sustaining your soul today?"
  },
  {
    day_number: 142,
    month_number: 5,
    day_of_month: 22,
    weekly_subtheme: "Self-Control & Emotional Guardrails",
    title: "A City Without Walls",
    scripture_primary_reference: "Proverbs 25:28",
    scripture_primary_text: "Like a city that is broken down and without walls is a man whose spirit is without restraint.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "In the ancient Near East, the walls of a city were its primary defense. A city without thick, well-guarded walls was completely vulnerable to raiders and destruction. Anyone could walk in, plunder its treasures, and leave its homes in ruins. King Solomon draws an unforgettable comparison: 'Like a city that is broken down and without walls is a man whose spirit is without restraint.' Self-control is the protective wall of the human soul. Crucially, biblical self-control does not mean suppressing honest human emotions or denying natural sorrow, fear, or anger. Rather, it provides the healthy spiritual guardrails that guide our choices, words, and reactions. When a person lacks self-control—allowing sudden impulses, compulsive behaviors, or unchecked bitterness to dictate their actions—their spiritual walls are breached, leaving them exhausted in the rubble. Self-control is not joyless deprivation; it is the divine guardian of your peace. Through the power of the Holy Spirit, you can repair any compromised boundary in your life today. You are not a helpless victim of raw impulses; you are indwelt by the Spirit of wisdom, love, and sound discipline.",
    reflection_questions: [
      "Where in your daily life are your defensive walls most vulnerable—spending, screen time, or reactive speech?",
      "How does viewing self-control as a 'protective wall' rather than a restrictive cage change your mindset?",
      "What healthy boundary in your emotional or spiritual life needs to be strengthened with the Spirit's help today?"
    ],
    guided_prayer: "Mighty God, You are my fortress and strong tower. Forgive me for the times I have allowed undisciplined impulses, rash words, or unchecked reactions to break down the walls of my heart. I invite the Holy Spirit to strengthen my self-control today. Guard my eyes, my thoughts, my speech, and my choices. Rebuild the protective guardrails of my soul so that Christ's peace may dwell securely within me. In His holy name, Amen.",
    daily_intention: "I will maintain healthy spiritual guardrails today, guarding the peace of my heart through self-control.",
    practical_action: "Identify one area where you frequently lose restraint (e.g., mindless scrolling or reactive venting) and set an intentional boundary today.",
    evening_reflection_prompt: "Did upholding healthy boundaries protect your mental clarity and spiritual peace throughout the day?"
  },
  {
    day_number: 143,
    month_number: 5,
    day_of_month: 23,
    weekly_subtheme: "Self-Control & Emotional Guardrails",
    title: "Adding Self-Control to Knowledge",
    scripture_primary_reference: "2 Peter 1:5-6",
    scripture_primary_text: "Yes, and for this very cause adding on your part all diligence, in your faith supply moral excellence; and in moral excellence, knowledge; and in knowledge, self-control; and in self-control, perseverance; and in perseverance, godliness;",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "The Apostle Peter outlines a magnificent golden chain of spiritual virtues, beginning with simple saving faith and culminating in sacrificial Christian love. Notice the critical link that bridges our intellectual understanding with long-term endurance: 'and in knowledge, self-control; and in self-control, perseverance.' We live in an information-saturated age. We have Bible apps, podcasts, commentaries, and theological sermons available at the touch of a screen. But biblical knowledge without self-control is spiritually powerless; it produces proud individuals who can quote verses fluently while living chaotic, undisciplined lives. Self-control is the practical bridge that translates what we know into how we actually live. It is the ability to know God's will and, by the Holy Spirit's power, say 'no' to selfish impulses so that we can say a joyful 'yes' to righteousness. Self-control allows you to step away from gossip, hold your tongue when irritated, and make time to seek God when distractions beckon. Peter reminds us that this requires 'all diligence.' It is an active partnership with grace that produces an enduring, fruitful life.",
    reflection_questions: [
      "Where has your biblical knowledge outpaced your practical obedience or daily self-discipline?",
      "How does the Holy Spirit empower you to translate spiritual truth into daily self-control?",
      "What is one specific distraction you need to say 'no' to today in order to say 'yes' to God?"
    ],
    guided_prayer: "Lord of Wisdom, thank You for the richness of Your Word and the knowledge You have revealed to my heart. Forgive me for where my knowledge has outpaced my obedience. Help me supply active self-control to my knowledge today. Grant me the discipline to say 'no' to selfish desires and distractions so that I may say a resounding 'yes' to Your holy calling. Strengthen my endurance for Your glory. Amen.",
    daily_intention: "I will put my biblical knowledge into practice today through steady, Spirit-empowered self-control.",
    practical_action: "Take one concrete piece of spiritual wisdom you learned recently and apply it actively in a decision today.",
    evening_reflection_prompt: "Did translating what you know into practical self-control bring greater peace to your actions today?"
  },
  {
    day_number: 144,
    month_number: 5,
    day_of_month: 24,
    weekly_subtheme: "Self-Control & Emotional Guardrails",
    title: "Taming the Restless Tongue",
    scripture_primary_reference: "James 3:7-8",
    scripture_primary_text: "For every kind of animal, bird, reptile, and sea creature is tamed, and has been tamed by mankind. But nobody can tame the tongue. It is a restless evil, full of deadly poison.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "James pulls no punches when discussing the ferocious power of human speech. Humanity has learned to train powerful lions, teach ocean creatures to respond on command, and harness horses with a bit, but 'nobody can tame the tongue. It is a restless evil, full of deadly poison.' Notice the frank diagnosis: no human being has the willpower to tame the tongue through unassisted human grit. Left to our natural strength, our speech will inevitably drift toward gossip, exaggeration, complaint, and criticism. The tongue is like a tiny spark dropped into dry timber, capable of setting relationships ablaze with regret. If human effort alone cannot tame it, where is our hope? Our hope is yielding our speech completely to the Holy Spirit. At Pentecost, the Spirit arrived as fire on believers, signifying that God alone can sanctify the human mouth. When you feel the spark of irritation, gossip, or defensive anger rising to your lips today, do not rely on natural willpower. Instantly hand the reins over to the Holy Spirit. Let His grace extinguish the spark before it causes damage.",
    reflection_questions: [
      "Why is human willpower alone insufficient to tame the impulses of the tongue?",
      "What specific conversational environments tempt you to gossip, complain, or speak carelessly?",
      "How can you consciously invite the Holy Spirit to govern your words before entering a conversation today?"
    ],
    guided_prayer: "Holy Spirit, divine Sanctifier of my soul, I confess that my natural willpower is completely incapable of taming my tongue. I surrender my mouth to Your control today. Extinguish every spark of irritation, gossip, complaint, and defense before it leaves my lips. Fill my mouth with words of life, wisdom, and grace. Set a guard over my mouth, O Lord; keep watch over the door of my lips. In Jesus' name, Amen.",
    daily_intention: "I surrender my tongue to the Holy Spirit today, asking Him to govern every word I speak.",
    practical_action: "Before participating in any casual conversation today, silently pray: 'Holy Spirit, guard my lips.'",
    evening_reflection_prompt: "Did pausing before speaking help you withhold a hasty or critical word today?"
  },
  {
    day_number: 145,
    month_number: 5,
    day_of_month: 25,
    weekly_subtheme: "Self-Control & Emotional Guardrails",
    title: "The Sound Mind of Self-Control",
    scripture_primary_reference: "2 Timothy 1:7",
    scripture_primary_text: "For God didn’t give us a spirit of fear, but of power, of love, and of self-control.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "Fear can feel like an overwhelming taskmaster. When anxiety grips our thoughts, it clouds our perspective and triggers sudden emotional reactions that leave us feeling fractured and helpless. Experiencing situational fear or worry is a normal human response to stress; it does not mean you are a spiritual failure. But Paul reminds Timothy—and every believer facing intense pressure—of an anchoring truth: 'God didn’t give us a spirit of fear, but of power, of love, and of self-control.' The Greek word translated 'self-control' or 'sound mind' (sophronismos) describes a mind that is properly calibrated, disciplined, and restored to clarity by divine truth. When catastrophic thoughts attempt to flood your imagination, remember that panic does not define your spiritual inheritance. God equips you with divine power to endure trials, self-giving love to quiet insecurity, and the calm clarity of a sound mind to evaluate reality through the lens of Scripture. You are not forced to follow every anxious impulse. Through Christ, you can examine troubling thoughts, bring them to God in prayer, and step into the peace of a sound mind.",
    reflection_questions: [
      "What specific fear or catastrophic thought has been threatening to hijack your emotional peace lately?",
      "How does the triad of 'power, love, and self-control' provide an anchor when you feel anxious?",
      "How can you practice bringing troubling thoughts to God rather than letting them spiral today?"
    ],
    guided_prayer: "Father of Truth, thank You that fear is not my heritage or my destiny. You have not given me a spirit of panic or dread. I receive Your gift of divine power, holy love, and a sound, self-disciplined mind. When anxious thoughts attempt to flood my imagination today, anchor my mind in Your promises. Grant me the clarity to reject lies and rest in Your peace. In Jesus' mighty name, Amen.",
    daily_intention: "I step into God's gift of power, love, and a disciplined, sound mind today, refusing to be governed by panic.",
    practical_action: "When an anxious 'what-if' thought strikes today, pause and deliberately counter it with 2 Timothy 1:7.",
    evening_reflection_prompt: "Did standing on God's gift of a sound mind restore your emotional equilibrium during a stressful moment today?"
  },
  {
    day_number: 146,
    month_number: 5,
    day_of_month: 26,
    weekly_subtheme: "Self-Control & Emotional Guardrails",
    title: "Ruling Your Spirit",
    scripture_primary_reference: "Proverbs 16:32",
    scripture_primary_text: "One who is slow to anger is better than the mighty; one who rules his spirit, than he who takes a city.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "Human history celebrates conquering generals, powerful leaders, and triumphant figures who dominate external battlefields. We applaud those who build vast empires, achieve public acclaim, and command large followings. Yet King Solomon turns human values upside down with a startling verdict: 'One who is slow to anger is better than the mighty; one who rules his spirit, than he who takes a city.' In God's sight, conquering your own internal impulses requires greater heroism and spiritual valor than capturing a fortified metropolis. It is far easier to conquer an external opponent than to master our own jealousy, temper, greed, or defensive pride. When you choose not to strike back with an insult, when you quietly walk away from gossip, when you practice restraint under relational strain, heaven recognizes true strength. You are exercising royal authority in the realm that matters most: the governance of your heart. True power is not dominating other people; true power is reigning over your own reactions through the indwelling grace of Jesus Christ.",
    reflection_questions: [
      "Why does God view ruling your own spirit as greater than conquering a fortified city?",
      "In what situation are you most tempted to lose your composure or retaliate defensively?",
      "What does 'ruling your spirit' look like in a practical interaction you will face today?"
    ],
    guided_prayer: "Sovereign King, forgive me for the times I have measured strength by worldly dominance while allowing my own temper and impulses to run wild. Teach me the quiet heroism of ruling my spirit through the Holy Spirit's power. Make me slow to anger, patient under provocation, and dignified in restraint. Let the rule of Christ govern every thought and reaction of my heart. In Jesus' name, Amen.",
    daily_intention: "I will exercise true strength today by ruling my spirit with patience, humility, and grace.",
    practical_action: "When you feel your temper flaring today, pause and silently recite: 'One who rules his spirit is better than he who takes a city.'",
    evening_reflection_prompt: "Did exercising restraint over your reactions bring a deeper sense of peace and dignity to your day?"
  },
  {
    day_number: 147,
    month_number: 5,
    day_of_month: 27,
    weekly_subtheme: "Self-Control & Emotional Guardrails",
    title: "Guarding Your Heart Above All",
    scripture_primary_reference: "Proverbs 4:23",
    scripture_primary_text: "Keep your heart with all diligence, for out of it is the wellspring of life.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "An ancient fortress city guarded its water spring with the utmost vigilance. If an invading army poisoned or cut off the city's spring, the entire populace would perish in a matter of days. Solomon draws upon this life-or-death reality when he charges us: 'Keep your heart with all diligence, for out of it is the wellspring of life.' Notice the phrase: 'with all diligence.' Your heart is not a public thoroughfare through which any stray thought, toxic philosophy, cynical opinion, or bitter grievance should be allowed to wander unchecked. Your heart is the sanctuary of the King of Kings. Everything in your life—your friendships, your work, your community, your personal boundaries, your prayers, your joy, and your emotional health—flows directly out of the reservoir of your inner heart. If you allow bitterness, envy, or media noise to pollute the wellspring, every stream flowing into your life will become contaminated. Guarding your heart requires vigilance. It means filtering what you consume, who you confide in, and what thoughts you entertain. Post the Holy Spirit at the doorway of your heart today.",
    reflection_questions: [
      "What toxic influences (news, entertainment, or cynical conversations) have been polluting your spiritual reservoir?",
      "How does the metaphor of the heart as a 'wellspring' help you understand where your attitudes come from?",
      "What practical step of 'diligence' will you take today to protect the purity and peace of your heart?"
    ],
    guided_prayer: "Guardian of My Soul, I bring my heart before You today, acknowledging that it is the wellspring of my life. Forgive me for being careless with what I allow through the gates of my mind and affections. Cleanse my heart of all pollution, envy, cynicism, and bitterness. Help me guard this sacred wellspring with holy diligence today, keeping it pure, peaceful, and saturated with Your living water. Amen.",
    daily_intention: "I will guard my heart with all diligence today, protecting the purity and peace of its wellspring.",
    practical_action: "Audit the media, podcasts, or social accounts you consume today; unfollow or silence anything that pollutes your peace.",
    evening_reflection_prompt: "Did actively guarding your mental gates preserve your inner tranquility throughout the day?"
  },
  {
    day_number: 148,
    month_number: 5,
    day_of_month: 28,
    weekly_subtheme: "Self-Control & Emotional Guardrails",
    title: "Sober-Minded and Alert",
    scripture_primary_reference: "1 Peter 5:8-9",
    scripture_primary_text: "Be sober and self-controlled. Be watchful. Your adversary, the devil, walks around like a roaring lion, seeking whom he may devour. Withstand him steadfast in your faith, knowing that your brothers who are in the world are undergoing the same sufferings.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "Peter does not mince words regarding the spiritual reality of the world we inhabit. We are not living on an untroubled playground; we walk through a world of spiritual opposition and subtle temptation. Peter warns: 'Be sober and self-controlled. Be watchful. Your adversary, the devil, walks around like a roaring lion, seeking whom he may devour.' Being sober-minded and watchful does not mean living in anxiety, fear, or paranoia; it means keeping your spiritual discernment clear. It means recognizing subtle temptations toward cynicism, isolation, or despair, without confusing natural physical fatigue or low moods with spiritual failure. Physical exhaustion and emotional fatigue are normal human experiences where God's comfort meets us. But we must remain alert so that weariness does not become an open door for bitterness or compromise. You do not cower before spiritual opposition; you 'withstand him steadfast in your faith.' Armed with the truth of Scripture, supported by community, and covered by the blood of Christ, you can stand your ground with calm, unshakeable confidence today.",
    reflection_questions: [
      "In what areas of your life (exhaustion, isolation, or stress) do you tend to let your spiritual guard down?",
      "How does Peter's command to be 'sober and watchful' sharpen your discernment without creating anxiety?",
      "What specific biblical truth can you rely on today to withstand feelings of discouragement or defeat?"
    ],
    guided_prayer: "Lord of Hosts, open my spiritual eyes to stay alert and sober-minded in this fallen world. Deliver me from spiritual complacency, distraction, and numbness. When discouragement whispers lies of condemnation or isolation, grant me the courage to withstand them steadfast in faith. I rest firmly under the protective love of Jesus, confident that He who is in me is greater than he who is in the world. Amen.",
    daily_intention: "I will remain sober-minded and spiritually alert today, standing firm in Christ's victory.",
    practical_action: "When a wave of discouragement strikes today, pause and verbally declare: 'Jesus is Lord over my life and my peace.'",
    evening_reflection_prompt: "Did staying spiritually alert help you maintain your peace and focus on Christ today?"
  },
  {
    day_number: 149,
    month_number: 5,
    day_of_month: 29,
    weekly_subtheme: "An Abundant Harvest of Peace",
    title: "The Seed of Righteousness Sown in Peace",
    scripture_primary_reference: "James 3:18",
    scripture_primary_text: "Now the fruit of righteousness is sown in peace by those who make peace.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "As we enter the final week of May, our journey through the garden of the Spirit turns toward its crowning harvest: peace. James declares: 'Now the fruit of righteousness is sown in peace by those who make peace.' Notice the agricultural metaphor: righteousness is not an aggressive weapon forced upon others through shouting, coercion, or intimidation. It is a tender seed that can only germinate, take root, and flourish in an atmosphere of peace. When someone tries to force their opinions or demand moral compliance through harsh anger, they scatter rocky soil, not fertile ground. Crucially, peacemaking is not peace at any price, nor does it mean appeasing destructive behavior or avoiding honest truth. Biblical peace is first pure, upright, and rooted in righteousness. It means refusing to sow discord, rejecting inflammatory gossip, and seeking constructive reconciliation wherever possible. You are not responsible for controlling how other people react, but you are responsible for the seeds you plant. Sow seeds of patience, gentleness, and grace today, and trust God to bring forth an abundant harvest.",
    reflection_questions: [
      "What kinds of relational seeds (peace, irritation, argument, or grace) have you been planting lately?",
      "How does understanding that righteousness must be 'sown in peace' change how you handle conflict?",
      "Where can you plant a seed of peace today in a relationship that has felt strained or cool?"
    ],
    guided_prayer: "God of Peace, forgive me for the times I have tried to defend righteousness through unrighteous anger or harsh words. Teach me to be a faithful sower of peace. Help me speak truth with gentleness, reject contention, and cultivate an atmosphere where Your righteousness can flourish. May the harvest of my life bring glory to Your holy name and healing to those around me. In Jesus' name, Amen.",
    daily_intention: "I will sow seeds of peace today, trusting God to produce a sweet harvest of righteousness.",
    practical_action: "In a moment of potential tension today, consciously choose a peaceful response that de-escalates the atmosphere.",
    evening_reflection_prompt: "Did sowing seeds of peace bring calm and fruitfulness to your relationships today?"
  },
  {
    day_number: 150,
    month_number: 5,
    day_of_month: 30,
    weekly_subtheme: "An Abundant Harvest of Peace",
    title: "Pursuing the Things That Make for Peace",
    scripture_primary_reference: "Romans 14:19",
    scripture_primary_text: "So then, let’s follow after things which make for peace, and things by which we may build one another up.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "Peace does not happen by accident. In a fallen world governed by human selfishness, misunderstandings, and conflicting agendas, the natural drift of unmonitored relationships is toward tension and erosion. That is why the Apostle Paul uses an intense, purposeful verb in Romans 14: 'let’s follow after things which make for peace, and things by which we may build one another up.' The phrase 'follow after' (dioko) literally means to pursue, run after, and chase with eager determination. To cultivate peace in your friendships, your workplace, your community, and your church, you must actively pursue it. Pursuing peace does not mean pretending problems do not exist or tolerating abuse; it means being willing to release the petty desire to have the last word in minor arguments. It means choosing not to dredge up past grievances that have already been resolved. It means intentionally seeking ways to build another person up when it would be easier to walk away in cold indifference. Make peace your holy aim today, building others up with Christ-like grace.",
    reflection_questions: [
      "What petty disagreement or desire to 'win' do you need to release today for the sake of peace?",
      "What does actively 'pursuing peace' look like in a concrete relationship you care about?",
      "How can you intentionally build up someone around you today who is feeling weary or discouraged?"
    ],
    guided_prayer: "Prince of Peace, forgive me for passivity and for allowing small grievances to fester into relational distance. Ignite in my heart a sincere desire to pursue the things that make for peace. Give me the humility to lay down my pride, surrender the need to always be right, and actively encourage others. Use my life today to construct, strengthen, and build up those around me in love. Amen.",
    daily_intention: "I will actively pursue peace today, choosing reconciliation and encouragement over pride.",
    practical_action: "In your next conversation or disagreement today, pause before reacting and seek constructive understanding where safe and appropriate.",
    evening_reflection_prompt: "Did pursuing peace over being right bring deeper calm and connection to your relationships today?"
  },
  {
    day_number: 151,
    month_number: 5,
    day_of_month: 31,
    weekly_subtheme: "An Abundant Harvest of Peace",
    title: "The Blessing of the Peacemaker",
    scripture_primary_reference: "Matthew 5:9",
    scripture_primary_text: "Blessed are the peacemakers, for they shall be called children of God.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: "As May draws to a close, Jesus crowns our journey through the garden of the Spirit with one of the most sublime beatitudes of the Sermon on the Mount: 'Blessed are the peacemakers, for they shall be called children of God.' Notice the family resemblance: when you act as a peacemaker, the watching world recognizes your lineage. They observe your calm poise in the middle of chaos, your refusal to participate in slander, and your desire for reconciliation, and they recognize God's character. God is the ultimate Peacemaker, who bridged the chasm of human rebellion through the cross of Christ. Crucially, being a peacemaker does not mean you are responsible for keeping every environment calm or preventing other people's conflicts. You cannot control others. Rather, it means that you bring Christ's calm, grounded presence, speaking truth in love, honoring wise boundaries, and refusing to multiply hostility. As you conclude this month of cultivating spiritual fruit, celebrate the growth God has nurtured within your soul. You are His beloved child, bringing His quiet peace into a weary world.",
    reflection_questions: [
      "How does knowing that peacemaking reflects your true identity as a child of God inspire you today?",
      "Looking back over May, which fruit of the Spirit has God cultivated most deeply in your heart?",
      "How can you carry the fragrance of Christ's peace into the new month that begins tomorrow?"
    ],
    guided_prayer: "Abba Father, what a breathtaking honor it is to be called Your child! Thank You for the life-giving work of Your Holy Spirit in the garden of my heart throughout this month. Deepen every root of patience, kindness, gentleness, self-control, and peace that You have planted. Make me an ambassador of Your reconciliation, reflecting the beauty and character of my Heavenly Father. In Jesus' precious name, Amen.",
    daily_intention: "I am a child of God, called to reflect His peacemaking character with wisdom, dignity, and grace.",
    practical_action: "Take ten quiet minutes today to review your spiritual growth during May, thanking God for the fruit He is producing in you.",
    evening_reflection_prompt: "How has cultivating the fruit of the Spirit throughout May brought deeper serenity to your walk with God?"
  }
];

// Validate all May entries in-memory before applying to file
for (const e of MAY_ENTRIES) {
  const rW = e.reflection_body.split(/\s+/).filter(Boolean).length;
  const pW = e.guided_prayer.split(/\s+/).filter(Boolean).length;
  if (rW < 150 || rW > 250) {
    throw new Error(`Day ${e.day_number} reflection word count out of bounds: ${rW}`);
  }
  if (pW < 50 || pW > 100) {
    throw new Error(`Day ${e.day_number} prayer word count out of bounds: ${pW}`);
  }
  if (e.reflection_questions.length !== 3) {
    throw new Error(`Day ${e.day_number} question count is ${e.reflection_questions.length}, expected 3`);
  }
  if (!e.reflection_questions.every(q => q.trim().endsWith("?"))) {
    throw new Error(`Day ${e.day_number} questions must all end with '?'`);
  }
  if (!e.evening_reflection_prompt.trim().endsWith("?")) {
    throw new Error(`Day ${e.day_number} evening prompt must end with '?'`);
  }
}

console.log("All 31 May entries in-memory passed strict schema and word-count validation!");

// Read existing devotionals.ts
const code = fs.readFileSync(devotionalsPath, "utf-8");

// Locate Day 121 start and Day 152 start in file
const d121Idx = code.indexOf("  {\n    day_number: 121,");
const d152Idx = code.indexOf("  {\n    day_number: 152,");

if (d121Idx === -1 || d152Idx === -1) {
  throw new Error(`Could not find boundary markers for Day 121 (${d121Idx}) or Day 152 (${d152Idx})`);
}

// Format MAY_ENTRIES as TypeScript code
const formattedMay = MAY_ENTRIES.map(e => {
  return `  {
    day_number: ${e.day_number},
    month_number: ${e.month_number},
    day_of_month: ${e.day_of_month},
    weekly_subtheme: "${e.weekly_subtheme}",
    title: "${e.title.replace(/"/g, '\\"')}",
    scripture_primary_reference: "${e.scripture_primary_reference}",
    scripture_primary_text: "${e.scripture_primary_text.replace(/"/g, '\\"')}",
    scripture_translation: "${e.scripture_translation}",
    reflection_body: "${e.reflection_body.replace(/"/g, '\\"')}",
    reflection_questions: [
${e.reflection_questions.map(q => `      "${q.replace(/"/g, '\\"')}"`).join(",\n")}
    ],
    guided_prayer: "${e.guided_prayer.replace(/"/g, '\\"')}",
    daily_intention: "${e.daily_intention.replace(/"/g, '\\"')}",
    practical_action: "${e.practical_action.replace(/"/g, '\\"')}",
    evening_reflection_prompt: "${e.evening_reflection_prompt.replace(/"/g, '\\"')}"
  }`;
}).join(",\n") + ",\n";

const newCode = code.substring(0, d121Idx) + formattedMay + code.substring(d152Idx);
fs.writeFileSync(devotionalsPath, newCode, "utf-8");
console.log("Successfully updated src/lib/content/devotionals.ts with all 31 refined May entries!");
