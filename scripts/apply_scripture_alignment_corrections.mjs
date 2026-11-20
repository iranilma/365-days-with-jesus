/**
 * 365 Days With Jesus — Script to Apply Consolidated Scripture Alignment Corrections (Days 244–365)
 */

import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(path.join(__dirname, ".."));

const devotionalsPath = path.join(projectRoot, "src/lib/content/devotionals.ts");
const rawCode = fs.readFileSync(devotionalsPath, "utf-8");

// Parse current DEVOTIONAL_ENTRIES
const jsCode = rawCode
  .replace(/^import\s+.*?;/gm, "")
  .replace(/export const /g, "const ")
  .replace(/export function /g, "function ")
  .replace(/:\s*DevotionalEntry\s*\|\s*undefined/g, "")
  .replace(/:\s*DevotionalEntry\[\]/g, "")
  .replace(/:\s*DevotionalEntry/g, "")
  .replace(/:\s*number/g, "")
  .replace(/:\s*\{[^}]+\}/g, "");

const context = vm.createContext({});
vm.runInContext(jsCode + "; Object.assign(globalThis, { DEVOTIONAL_ENTRIES });", context);
const entries = context.DEVOTIONAL_ENTRIES;

console.log(`Loaded ${entries.length} entries from devotionals.ts`);

// Map of corrected entries
const CORRECTIONS = {
  // =========================================================================
  // SEPTEMBER (Month 9: Clothed in Compassion)
  // =========================================================================

  // Day 250 (Week 1: Clothed in the Garments of Grace) -> Colossians 3:17
  250: {
    title: "Doing All in the Name of the Lord Jesus",
    scripture_primary_reference: "Colossians 3:17",
    scripture_primary_text: "Whatever you do, in word or in deed, do all in the name of the Lord Jesus, giving thanks to God the Father, through him.",
    reflection_body: "Paul concludes his portrait of the clothed believer by anchoring every human action in the exalted name of Jesus. When you put on compassion, kindness, and humility, these graces are not designed for public display or personal moral achievement. They are worn for Christ. To do all things in His name means that your ordinary kitchen conversations, your emails at work, your private prayers, and your quiet acts of forbearance carry His signature. Every word spoken in patience becomes an offering to the Father. When you feel unappreciated, overlooked, or tempted to harbor quiet irritation over repetitive duties, Paul’s instruction reframes your daily sphere. You are not serving difficult people or cold systems in your own strength; you are acting as an ambassador of the Savior. Doing all in His name also frees you from anxious perfectionism. You do not have to perform to secure God’s favor; you are already beloved in Christ. In word and deed, thanksgiving becomes the natural atmosphere of your heart, transforming ordinary routines into holy ground.",
    reflection_questions: [
      "What routine task or difficult conversation today can you consciously dedicate to the name of Jesus?",
      "How does knowing you represent Christ change the way you respond when your efforts go unnoticed by others?",
      "In what practical way can you cultivate an atmosphere of thanksgiving in your home or workplace this afternoon?"
    ],
    guided_prayer: "Lord Jesus, I surrender my words, my thoughts, and my daily duties into Your holy hands. When frustration tempts me to speak hastily or self-righteously, clothe me afresh in Your gentle humility. May everything I touch today reflect Your tender compassion and truth. Free me from seeking human applause, and teach me to find complete satisfaction in honoring Your name. Thank You for Your steadfast grace. Amen.",
    daily_intention: "Today I will do every ordinary duty and speak every word in the sacred name of Jesus.",
    practical_action: "Before answering your next message or entering a demanding room, pause for ten seconds and whisper, 'For Your name alone, Lord Jesus.'",
    evening_reflection_prompt: "Where did you sense Christ's gentle presence guiding your words or actions during the quiet demands of this day?"
  },

  // Day 255 (Week 2: The Freedom of Forgiveness) -> Genesis 50:19
  255: {
    title: "Am I in the Place of God?",
    scripture_primary_reference: "Genesis 50:19",
    scripture_primary_text: "Joseph said to them, 'Don’t be afraid, for am I in the place of God?'",
    reflection_body: "When his brothers trembled before him after their father Jacob died, expecting long-delayed retaliation, Joseph responded with profound theological clarity: 'Am I in the place of God?' Joseph understood that withholding forgiveness and executing vengeance is an attempt to usurp the judgment seat of the Almighty. Forgiveness is not pretending that betrayal never happened, nor does it require reckless trust or subjecting oneself to continued emotional or physical harm. True forgiveness is a deliberate, holy transfer of the debt from your fragile hands into the sovereign hands of God. When someone has wronged you, lied about you, or broken sacred confidences, the natural instinct of the wounded soul is to demand repayment. Yet holding the courtroom gavel exhausts your spirit and traps you in bitterness. Joseph freed himself from decades of potential resentment by acknowledging that God alone is the righteous Judge. By releasing the right to retaliate, you step out of the judgment seat and into the open freedom of grace. God will deal justly; you are free to live unburdened.",
    reflection_questions: [
      "Is there a past offense or broken trust you have been trying to avenge in your thoughts or emotions?",
      "How does realizing that God alone occupies the judgment seat bring relief to your weary soul?",
      "What healthy boundaries do you need to maintain while still releasing bitter resentment to the Lord?"
    ],
    guided_prayer: "Sovereign Father, I confess how easily I cling to hurt and secretly nurse grievances against those who wounded me. Today I step down from the judgment seat. I lay every past offense, every broken promise, and every bitter memory into Your righteous hands. Grant me the grace to release the debt completely. Guard my heart from bitterness, and teach me to rest securely in Your justice and love. Amen.",
    daily_intention: "I refuse to occupy God's judgment seat today; I release all vengeance and entrust justice to Him.",
    practical_action: "Write down the initials of someone whose past harm you have rehearsed mentally, pray a blessing over their repentance, and tear the paper as a sign of release.",
    evening_reflection_prompt: "Did you feel lighter today as you chose to leave justice and vindication in the hands of God?"
  },

  // Day 260 (Week 3: Holy Empathy and Listening Hearts) -> James 1:19
  260: {
    title: "Swift to Hear, Slow to Speak",
    scripture_primary_reference: "James 1:19",
    scripture_primary_text: "So, then, my beloved brothers, let every man be swift to hear, slow to speak, and slow to anger;",
    reflection_body: "James offers a masterclass in holy empathy with three brief imperatives: be swift to hear, slow to speak, and slow to anger. In a loud culture characterized by instant reactions, defensive posturing, and hurried assumptions, listening has become a rare and sacred virtue. Most people do not listen to understand; they listen merely to prepare their rebuttal. For Christian women navigating complicated relationships, caring for aging relatives, or walking alongside hurting friends, listening is often the greatest ministry of love. When someone opens their heart in vulnerability, jumping in with immediate advice, theological corrections, or easy platitudes often silences their grief rather than comforting their soul. Jesus never rushed past human sorrow; He asked tender questions and heard the cry behind the words. Being slow to speak requires deep humility and self-control. It trusts that the Holy Spirit is already at work in the other person's heart. Today, resist the urge to formulate your response while another person is speaking. Offer the quiet gift of an unhurried, attentive presence.",
    reflection_questions: [
      "Who in your circle currently needs you to listen attentively without offering immediate advice or correction?",
      "In what situations do you feel the strongest temptation to react quickly or defensively in conversation?",
      "How can practicing stillness before answering reflect the gentle listening heart of Jesus to someone today?"
    ],
    guided_prayer: "Gentle Lord, quiet the noise and hurry in my heart. Forgive me for the times I have spoken foolishly or cut off someone who simply needed to be heard. Grant me the fruit of self-control today. Make me swift to listen, slow to offer hasty solutions, and slow to become irritated. May my ears be tuned to the Holy Spirit and my speech seasoned with Your grace and truth. Amen.",
    daily_intention: "Today I will listen with patience, humility, and full attention before offering any reply.",
    practical_action: "In your next conversation today, deliberately pause for three full seconds after the other person finishes speaking before you respond.",
    evening_reflection_prompt: "Did you give someone the gift of unhurried listening today, and what did you learn by staying quiet?"
  },

  // Day 261 (Week 3: Holy Empathy and Listening Hearts) -> Romans 12:16
  261: {
    title: "Associating with the Humble",
    scripture_primary_reference: "Romans 12:16",
    scripture_primary_text: "Be of the same mind one toward another. Don’t set your mind on high things, but associate with the humble. Don’t be wise in your own conceits.",
    reflection_body: "Holy empathy cannot survive where spiritual pride or social comparison quietly rules. Paul commands believers to cultivate mutual harmony by deliberately turning away from worldly status-seeking and associating with the humble. Society constantly tempts us to cultivate relationships that elevate our reputation, flatter our pride, or offer social advantage. In contrast, Jesus consistently moved toward the marginalized, the unglamorous, and those whom society dismissed. To have a listening heart, you must lay down the illusion that you are superior in discernment, wisdom, or spiritual maturity. When you sit with someone who is struggling, grieving, or socially awkward, holy empathy refuses to look down upon their trial. True Christian fellowship is lived at foot-washing level. Walking in harmony means recognizing that every believer is a recipient of identical mercy. You do not minister from a high tower of self-righteousness; you sit beside fellow sinners redeemed by the same precious blood. By choosing humility, you dismantle barriers and build a welcoming sanctuary where authentic healing and mutual care can flourish.",
    reflection_questions: [
      "Are there people in your church or neighborhood you have quietly avoided because of subtle social or spiritual pride?",
      "How does remembering your own absolute dependence on Christ's mercy soften your posture toward struggling individuals?",
      "What is one practical step you can take this week to welcome and encourage someone who feels overlooked?"
    ],
    guided_prayer: "Lord Jesus, strip away every trace of pride, self-importance, and subtle superiority from my heart. Remind me that everything I have has been received purely by grace. Give me eyes to see people as You see them, valuing the humble and extending warmth to the lonely. Help me walk beside others in genuine harmony, clothed in Your tender mercy and love. Amen.",
    daily_intention: "I will reject pride and social comparison, choosing instead to honor and listen to the humble.",
    practical_action: "Reach out to someone who is often overlooked in your community—send an encouraging text, make a phone call, or offer a sincere compliment.",
    evening_reflection_prompt: "Where did God give you an opportunity to practice humility and genuine connection with someone today?"
  },

  // Day 262 (Week 3: Holy Empathy and Listening Hearts) -> Luke 7:37-38
  262: {
    title: "An Alabaster Jar of Tears",
    scripture_primary_reference: "Luke 7:37-38",
    scripture_primary_text: "Behold, a woman in the city who was a sinner, when she knew that he was reclining in the Pharisee’s house, brought an alabaster jar of ointment. Standing behind at his feet weeping, she began to wet his feet with her tears, and she wiped them with the hair of her head, kissed his feet, and anointed them with the ointment.",
    reflection_body: "In the home of Simon the Pharisee, an unnamed woman crashed the religious gathering, carrying an alabaster flask of fragrant ointment. Knowing her reputation, Simon looked on with cold judgment, calculating her unworthiness. But Jesus saw something entirely different: a broken heart pouring out genuine repentance, reverence, and unreserved love. While Simon withheld even common hospitality—providing no water for foot washing—this woman bathed the Savior's dusty feet with her tears and dried them with her hair. Jesus did not pull His feet away in disgust, nor did He rebuke her emotional vulnerability. He received her tears as holy worship. This sacred encounter exposes the profound contrast between religious self-righteousness and the tender heart of God. When people around you are weeping or wrestling under the weight of brokenness, they do not need self-righteous scolding. They need the safe, compassionate presence of Christ. Like Jesus, you are called to welcome broken people with tenderness, recognizing that tears shed in repentance and grief are precious in the eyes of God.",
    reflection_questions: [
      "How does Jesus' gentle reception of this weeping woman comfort you in your own seasons of sorrow or regret?",
      "Are you more likely to respond to messy, hurting people with religious wariness or Christlike compassion?",
      "What alabaster offering of love, surrender, or time can you pour out at Jesus' feet today?"
    ],
    guided_prayer: "Merciful Savior, thank You that You never turn away the brokenhearted or despise the tears of those who seek You. Forgive me when I have looked upon struggling people with critical eyes instead of Your tender empathy. Soften my heart to receive and comfort others with the same lavish compassion You have shown to me. May my life be an offering of fragrant devotion to You. Amen.",
    daily_intention: "I will honor brokenhearted vulnerability and extend Christ's tender compassion without judgment.",
    practical_action: "Spend ten quiet minutes in prayer without speaking any demands, simply offering your heart and thanksgiving at Jesus' feet.",
    evening_reflection_prompt: "Did you encounter someone today who needed grace rather than judgment, and how did you respond?"
  },

  // Day 263 (Week 3: Holy Empathy and Listening Hearts) -> Luke 7:44
  263: {
    title: "Do You See This Woman?",
    scripture_primary_reference: "Luke 7:44",
    scripture_primary_text: "Turning to the woman, he said to Simon, 'Do you see this woman? I entered into your house, and you gave me no water for my feet, but she has wet my feet with her tears, and wiped them with the hair of her head.'",
    reflection_body: "Jesus turned toward the weeping woman, but He addressed Simon with an arresting question: 'Do you see this woman?' Simon saw only a scandalous sinner, a category to be avoided, a disruption to his respectable dinner. But Jesus saw a precious daughter of God responding to redeeming grace. To truly love someone with holy empathy, you must first learn to see them. It is terribly easy to reduce people to their annoying habits, their political opinions, their past mistakes, or their social status. We look at them, but we do not see them. We do not see their silent heartache, their sleepless nights, their hidden regrets, or their hunger for mercy. Jesus looked beneath the surface of social expectation and beheld her genuine faith. When you ask the Lord for eyes of compassion, He begins to show you people as they truly are—fragile souls in desperate need of His transforming love. Today, ask God to give you spiritual sight. Before you judge or dismiss anyone, ask yourself: 'Do I really see this person through the eyes of Jesus?'",
    reflection_questions: [
      "Is there someone in your life whom you have reduced to a label, a grievance, or a personality conflict?",
      "What would it look like to ask God to help you see that person with His compassionate eyes today?",
      "How has Jesus looked past your own failures and seen you with unconditional, redeeming love?"
    ],
    guided_prayer: "Lord Jesus, open the eyes of my heart. Deliver me from superficial judgments, harsh labels, and selfish indifference. When I am tempted to dismiss or criticize someone, stop me and whisper, 'Do you see this person?' Teach me to look beneath external appearances and perceive the ache, the worth, and the need for grace in those around me. Let Your love flow freely through me. Amen.",
    daily_intention: "Today I will ask God to help me truly see people through the eyes of Christ's tender compassion.",
    practical_action: "Choose one difficult person in your family or circle and pray for God to bless their spiritual well-being and reveal His love to them.",
    evening_reflection_prompt: "Whom did you truly see today, beyond their outward manner or flaws, through the eyes of Jesus?"
  },

  // Day 264 (Week 3: Holy Empathy and Listening Hearts) -> Luke 7:47
  264: {
    title: "Loved Much, Forgiven Much",
    scripture_primary_reference: "Luke 7:47",
    scripture_primary_text: "Therefore I tell you, her sins, which are many, are forgiven, for she loved much. But one to whom little is forgiven, loves little.",
    reflection_body: "Jesus reveals the divine secret of lavish love: those who realize how deeply they have been forgiven are the ones who love the most extravagantly. Simon felt very little need for mercy, and consequently, his heart was cold, cautious, and calculating. He offered Jesus the bare minimum of courtesy. The weeping woman, on the other hand, was acutely aware of her immense debt of sin. Receiving the staggering reality of Christ's pardon caused her love to overflow in unrestrained worship and tenderness. When your own heart feels cold, irritable, or impatient toward others, the remedy is not trying harder to generate emotional warmth. The remedy is returning to the foot of the cross and contemplating the staggering breadth of your own forgiveness. You were redeemed not because you were righteous, but because Jesus took your debt upon Himself. When you live in constant awe of Calvary, extending empathy, patience, and forgiveness to others ceases to be an exhausting chore. It becomes the natural, joyous reflex of a soul that has been forgiven much and loves deeply.",
    reflection_questions: [
      "When was the last time you sat in quiet awe of how completely Jesus has forgiven your sins?",
      "How does meditating on the lavish mercy you received change your capacity to bear with frustrating people?",
      "In what practical way can your gratitude for forgiveness overflow into generous love toward someone today?"
    ],
    guided_prayer: "Precious Savior, how great is the debt You have canceled for me! When I consider my past failures, my pride, and my wandering thoughts, I am overwhelmed by the riches of Your mercy. Keep me forever at the foot of Your cross. Forgive me when my love grows cold or stingy. Let the knowledge of how much I have been forgiven ignite in me a tender, resilient love for others. Amen.",
    daily_intention: "Because I have been forgiven so much by Jesus, I will love generously and without hesitation today.",
    practical_action: "Speak a word of sincere gratitude to someone who has shown you patience or kindness during a difficult season.",
    evening_reflection_prompt: "Did the memory of Christ's immense forgiveness soften your responses and warm your heart today?"
  },

  // Day 270 (Week 4: The Ministry of the Kitchen Table) -> Hebrews 13:1
  270: {
    title: "Let Brotherly Love Continue",
    scripture_primary_reference: "Hebrews 13:1",
    scripture_primary_text: "Let brotherly love continue.",
    reflection_body: "The author of Hebrews opens his closing practical exhortations with a simple, decisive command: 'Let brotherly love continue.' Notice the word 'continue.' Love is easy to initiate during seasons of novelty, emotional warmth, or shared enthusiasm. But genuine Christian love must endure through the long haul—through misunderstandings, schedule fatigue, cultural tension, and personal disagreements. In the context of hospitality and community life, love is not merely a warm feeling; it is a persevering commitment to keep the door of your heart unlocked. It means continuing to check on the lonely widow after the funeral flowers have withered. It means continuing to pray for an estranged relative with quiet hope. It means continuing to show up with warm soup, gentle words, and faithful presence when relationships require patience. In an individualistic world where people quickly cut ties and isolate themselves at the first hint of friction, Christ calls His daughters to steadfast, durable affection. Rooted in His unchanging covenant love, you can allow brotherly kindness to outlast every obstacle.",
    reflection_questions: [
      "In which relationship is God calling you to let love continue, even when it feels demanding or unreciprocated?",
      "What habits help you maintain long-term faithfulness in caring for friends and family without burning out?",
      "How does Christ's unending, steadfast love for you empower you to keep loving when feelings fade?"
    ],
    guided_prayer: "Faithful God, Your love toward me has never wavered for a single second. Forgive me for the times my love has been conditional, impatient, or quick to retreat. Pour Your Holy Spirit afresh into my heart today, so that brotherly love may continue in all my relationships. Give me endurance to serve, patience to bear, and grace to keep caring, even when love requires sacrifice. In Jesus' name, Amen.",
    daily_intention: "I will practice persevering, durable love today, refusing to let weariness or offense close my heart.",
    practical_action: "Send an encouraging note or text to a friend or sister in Christ whom you have not contacted in several weeks.",
    evening_reflection_prompt: "Where did God help you persevere in patience and brotherly love during the day's interactions?"
  },

  // Day 272 (Week 5: Bearing One Another's Burdens) -> Galatians 6:2
  272: {
    title: "Fulfilling the Law of Christ",
    scripture_primary_reference: "Galatians 6:2",
    scripture_primary_text: "Bear one another’s burdens, and so fulfill the law of Christ.",
    reflection_body: "Paul reveals that the law of Christ—the royal commandment of love—is practically fulfilled when believers shoulder one another's heavy weights. Life in a broken world carries many exhausting burdens: the quiet agony of chronic illness, the weight of grief, financial anxieties, relational stress, and spiritual exhaustion. God never designed human beings to carry these loads in solitary isolation. When you step beside a weary sister to listen to her heartache, prepare a nourishing meal, pray over her tears, or simply sit in compassionate silence, you are literally carrying her burden. You cannot remove every trial, but you can prevent her from collapsing under the crushing weight. Bearing burdens is messy and sacrificial; it requires you to adjust your schedule and expend emotional energy. Yet this is the very heart of the gospel. Jesus took our crushing load of sin and sorrow upon Himself at Calvary. As you bear the burdens of others today, you embody the gentle, shoulder-to-shoulder love of Christ in a hurting world.",
    reflection_questions: [
      "Whose burden has God placed within your reach, and what practical help can you offer them this week?",
      "Are you willing to let others help carry your own burdens, or does self-sufficient pride keep you silent?",
      "How does remembering that Jesus carried your ultimate burden inspire you to support others joyfully?"
    ],
    guided_prayer: "Lord Jesus, You carried the intolerable weight of my sin and sorrow upon the cross so that I might walk in freedom. Teach me to share that same sacrificial love. Show me who is staggering under a heavy load today, and give me the willingness, time, and humility to help carry it. Deliver me from self-centered hurry, and let Your compassion flow through my hands and words. Amen.",
    daily_intention: "I will actively look for opportunities today to help lift the heavy burdens of someone in need.",
    practical_action: "Offer a specific, tangible act of service to someone under stress—drop off groceries, run an errand, or watch a child.",
    evening_reflection_prompt: "How did God use you today to lighten another person's load, and how did He sustain your own spirit?"
  },

  // Day 273 (Week 5: Bearing One Another's Burdens) -> Ecclesiastes 4:9-10
  273: {
    title: "Two Are Better Than One",
    scripture_primary_reference: "Ecclesiastes 4:9-10",
    scripture_primary_text: "Two are better than one, because they have a good reward for their labor. For if they fall, the one will lift up his fellow; but woe to him who is alone when he falls, and doesn’t have another to lift him up.",
    reflection_body: "Solomon articulates a timeless principle of divine wisdom: human beings were created for companionship and mutual support. 'Two are better than one... For if they fall, the one will lift up his fellow.' In an era of digital hyper-connectivity, genuine spiritual intimacy is increasingly rare. Many women live deeply isolated lives, projecting an image of calm competence while quietly stumbling under private exhaustion. Solomon warns with holy honesty: 'Woe to him who is alone when he falls.' Walking in community requires the vulnerability to admit that you need help, as well as the readiness to extend a lifting hand when your companion stumbles. When a friend experiences a collapse of confidence, a health crisis, or spiritual doubt, the enemy wants to isolate them in shame. But a true brother or sister in Christ rushes in with grace, reaches down into the dust, and helps them stand back up on the promises of God. Do not walk your spiritual pilgrimage alone. Cultivate deep, trusted companionships rooted in Christ, where falling is met with restorative grace.",
    reflection_questions: [
      "Do you have trusted spiritual companions who have permission to speak truth and lift you when you stumble?",
      "Is there someone you know who has fallen into discouragement and needs a gentle, lifting hand today?",
      "What holds you back from being vulnerable with other believers about your own weaknesses and struggles?"
    ],
    guided_prayer: "Heavenly Father, thank You for the sacred gift of Christian community. Deliver me from the lie of self-sufficiency and the isolation of pride. Give me faithful companions who point me to Jesus when I grow weak, and give me the tender strength to lift others when they fall. May our mutual love and support bring glory to Your name and reflect Your covenant faithfulness. In Jesus' name, Amen.",
    daily_intention: "I will cultivate genuine Christian companionship today, lifting others with grace and walking in community.",
    practical_action: "Reach out to a close Christian friend, thank them for their companionship in your walk of faith, and ask how you can pray for them.",
    evening_reflection_prompt: "Did you walk in the safety of holy fellowship today, and whom were you able to encourage?"
  },

  // =========================================================================
  // OCTOBER (Month 10: Courage in the Calling)
  // =========================================================================

  // Day 280 (Week 1: Commanded to Be Brave) -> Deuteronomy 31:6
  280: {
    title: "He Will Not Fail You Nor Forsake You",
    scripture_primary_reference: "Deuteronomy 31:6",
    scripture_primary_text: "Be strong and courageous. Don’t be afraid, nor be scared of them; for Yahweh your God, he it is who does go with you. He will not fail you nor forsake you.",
    reflection_body: "As Moses prepared to hand over leadership to Joshua on the plains of Moab, he delivered this ringing promise to all Israel: 'Be strong and courageous... for Yahweh your God, he it is who does go with you. He will not fail you nor forsake you.' Biblical bravery is never an exercise in self-manufactured willpower or positive thinking. It is an act of simple, grounded trust in a God who never abandons His people. When facing daunting tasks, unfamiliar life transitions, or frightening medical diagnoses, fear often whispers that you are completely alone. But Moses dismantled that lie by pointing to the sovereign Companion who marches at your side. Notice the double assurance: He will not fail you (He will never prove inadequate or drop the ball), and He will not forsake you (He will never walk away in frustration). Because the Lord goes before you and surrounds your steps, you can look intimidating obstacles in the eye without panic. You do not need to know the future; you only need to know that your faithful God is already there.",
    reflection_questions: [
      "What current circumstance or looming decision is tempting you to feel frightened or abandoned?",
      "How does the truth that God will never fail or forsake you give you the courage to take the next step?",
      "What difference does it make to know that God walks ahead of you into every unknown tomorrow?"
    ],
    guided_prayer: "Almighty God, You are my fortress and my faithful guide. When fear whispers that I am alone or that my situation is hopeless, anchor my soul in Your eternal promise. Thank You that You will never fail me, never abandon me, and never leave my side. Fill me with holy courage today, not in my own wisdom, but in Your abiding presence and mighty strength. In Jesus' name, Amen.",
    daily_intention: "Because the Lord goes with me and will never forsake me, I will be strong and courageous today.",
    practical_action: "Whenever anxiety surfaces today, immediately recite Deuteronomy 31:6 aloud: 'Yahweh my God goes with me; He will not fail me nor forsake me.'",
    evening_reflection_prompt: "Where did you experience God's steadying presence overcoming your fears during the course of this day?"
  },

  // Day 286 (Week 2: The Courage of Quiet Obedience) -> Hebrews 11:24-25
  286: {
    title: "Choosing Faithfulness Over Worldly Pleasure",
    scripture_primary_reference: "Hebrews 11:24-25",
    scripture_primary_text: "By faith, Moses, when he had grown up, refused to be called the son of Pharaoh’s daughter, choosing rather to share ill treatment with God’s people than to enjoy the pleasures of sin for a time;",
    reflection_body: "Moses faced a monumental fork in the road: remain in the royal palaces of Egypt with its unparalleled luxury, prestige, and worldly security, or identify with the despised, enslaved people of God. The writer of Hebrews records that 'by faith, Moses... refused to be called the son of Pharaoh’s daughter, choosing rather to share ill treatment with God’s people than to enjoy the pleasures of sin for a time.' True courage often looks like quiet, costly renunciation. It takes boldness to say 'no' to cultural promotion, ungodly compromises, and comfortable compromises when they violate the call of God. Moses recognized that the pleasures of sin are real, but they are fleeting and hollow. Faith gave him spiritual x-ray vision to see past the golden glitter of Egypt to the eternal weight of glory. For Christian women today, quiet obedience often means turning down lucrative compromises, walking away from gossip, or standing for righteousness when everyone else conforms. When you choose faithfulness over fleeting pleasure, God honors your courage with His lasting peace.",
    reflection_questions: [
      "In what area of your life is God asking you to refuse worldly compromise and choose faithful obedience?",
      "Why are the temporary pleasures of comfort or cultural approval so tempting, and how does faith expose their vanity?",
      "How does Moses' decision encourage you to hold fast to Christ, even when obedience involves sacrifice?"
    ],
    guided_prayer: "Lord God, give me the discerning faith of Moses. Deliver me from the seductive glitter of worldly compromise and the fear of human disapproval. Grant me holy boldness to refuse whatever dishonors You, and give me joy in choosing the path of faithful obedience. Remind me that the rewards of Christ far outweigh every treasure this world can offer. In Your precious name, Amen.",
    daily_intention: "I will choose quiet, courageous faithfulness to God over fleeting comfort and worldly approval.",
    practical_action: "Identify one subtle area where you have been tempted to compromise your standards, and make a clear decision today to honor Christ.",
    evening_reflection_prompt: "Did you stand firm in quiet obedience today, and how did God confirm His peace in your heart?"
  },

  // Day 287 (Week 2: The Courage of Quiet Obedience) -> Hebrews 11:26-27
  287: {
    title: "Seeing Him Who Is Invisible",
    scripture_primary_reference: "Hebrews 11:26-27",
    scripture_primary_text: "accounting the reproach of Christ greater riches than the treasures of Egypt; for he looked for the reward. By faith, he left Egypt, not fearing the wrath of the king; for he endured, as seeing him who is invisible.",
    reflection_body: "What was the secret of Moses’ unshakeable endurance? Hebrews tells us: 'he endured, as seeing him who is invisible.' Moses walked away from the fury of the most powerful monarch on earth, not because he was naturally fearless, but because the invisible God was more real to him than the visible Pharaoh. When you fix your eyes on unseen, eternal realities, the threats and pressures of this visible world lose their paralyzing power. Moses accounted the reproach of Christ—sharing in the suffering and rejection of God's redemptive plan—greater riches than all the stored gold of Egypt. He had his eyes fixed on the eternal reward. When you face intimidating circumstances, hostile workplace cultures, or complicated family opposition, your heart will falter if you only look at visible obstacles. But when you gaze upon the invisible King through the eyes of faith and Scripture, fear shrinks to its proper size. The One who stands with you is infinitely greater than any earthly power. Keep looking to Him, and you will endure.",
    reflection_questions: [
      "What visible pressure or earthly opposition is currently tempting you to lose heart?",
      "How can you actively cultivate spiritual vision to see 'Him who is invisible' amidst daily routines?",
      "Why is suffering for Christ's sake considered 'greater riches' than all the treasures this world can provide?"
    ],
    guided_prayer: "O King of kings, You are the invisible, eternal God, reigning supreme over all the powers of heaven and earth. Forgive me for being so easily intimidated by the visible pressures and loud opinions of this world. Fix my spiritual gaze upon You. Teach me to count reproach for Your sake as sacred honor, and grant me steadfast endurance as I walk by faith, seeing Your unseen hand. Amen.",
    daily_intention: "I will look beyond visible obstacles today and fix my spiritual eyes upon my invisible, sovereign God.",
    practical_action: "Step outside or look out a window for five minutes, turn your thoughts completely away from earthly problems, and meditate on God's invisible majesty.",
    evening_reflection_prompt: "When visible pressures arose today, did you remember that the unseen Lord was standing with you?"
  },

  // Day 294 (Week 3: Standing Firm in Spiritual Armor) -> 1 Corinthians 16:13-14
  294: {
    title: "Stand Firm and Let All Be Done in Love",
    scripture_primary_reference: "1 Corinthians 16:13-14",
    scripture_primary_text: "Watch! Stand firm in the faith! Be courageous! Be strong! Let all that you do be done in love.",
    reflection_body: "Paul delivers four rapid-fire military charges, followed immediately by an essential Christian safeguard: 'Watch! Stand firm in the faith! Be courageous! Be strong! Let all that you do be done in love.' Spiritual warfare requires alertness and unwavering conviction. You cannot afford to sleep spiritually when the enemy prowls like a roaring lion. Standing firm in the faith means refusing to let culture dilute your biblical convictions. But notice the vital harmony Paul establishes: holy courage must never degenerate into harshness, arrogance, or aggressive combativeness. 'Let all that you do be done in love.' The strength of a Christian is seen not in how loudly she argues, but in how deeply she loves while holding fast to truth. Spiritual armor is not worn to crush people; it is worn to stand firm against spiritual deception while ministering the gentle, redemptive love of Christ. When strength is seasoned with Christlike charity, it becomes an unshakeable testimony of gospel power. Stand firm in truth today, and let every word and deed be wrapped in love.",
    reflection_questions: [
      "In what area of your life do you need to be more alert and watchful against spiritual deception?",
      "How do you maintain a firm stand on biblical truth without becoming harsh, combative, or defensive?",
      "What would it look like for your strongest convictions to be communicated with genuine, Christlike love today?"
    ],
    guided_prayer: "Lord Jesus, make me spiritually vigilant and steadfast in faith. When cultural currents push me to compromise, anchor my feet upon Your holy Word. Deliver me, Lord, from the twin traps of cowardly silence and self-righteous harshness. Clothe my courage in deep, selfless love, so that everything I do may honor Your truth and draw others to Your grace. In Your mighty name, Amen.",
    daily_intention: "I will be vigilant, courageous, and unshakeable in faith today, ensuring that all I do is done in love.",
    practical_action: "Identify an area where you have felt defensive, and pray for God to replace your irritation with firm, loving clarity.",
    evening_reflection_prompt: "Did you stand firm in biblical truth today while maintaining a gentle, loving spirit toward others?"
  },

  // Day 297 (Week 4: Courage to Speak Truth in Love) -> Acts 4:31
  297: {
    title: "Filled with the Spirit to Speak Boldly",
    scripture_primary_reference: "Acts 4:31",
    scripture_primary_text: "When they had prayed, the place was shaken where they were gathered together. They were all filled with the Holy Spirit, and they spoke the word of God with boldness.",
    reflection_body: "When the early church was threatened with arrest and commanded to stop speaking in the name of Jesus, they did not organize a political protest, nor did they retreat in terror. They fell to their knees in corporate prayer, crying out for holy boldness. God answered immediately: the place was shaken, they were filled with the Holy Spirit, and they spoke the word of God with courage. Biblical boldness is not a personality trait. It is not natural extroversion, loud confidence, or argumentative skill. Genuine spiritual boldness is a supernatural fruit of the Holy Spirit's presence. When you feel inadequate, timid, or tongue-tied in sharing your faith or defending biblical truth, you do not need to muster human willpower. You need to pray for the empowering presence of the Spirit. The same Spirit who gave trembling disciples courage to proclaim the resurrected Christ to hostile rulers lives inside of you. When you ask God for boldness to speak truth in love, He grants the right words, the right timing, and the quiet authority of heaven.",
    reflection_questions: [
      "In what conversation or setting have you felt hesitant to speak up for Christ or biblical truth?",
      "How does knowing that boldness is a gift of the Holy Spirit free you from relying on your own personality?",
      "What specific request for holy boldness can you bring to God in prayer right now?"
    ],
    guided_prayer: "Holy Spirit, I confess my natural timidity and fear of human opinion. Fill me afresh today with Your heavenly presence and power. When You open a door for me to share Christ, encourage a struggling friend, or speak biblical truth, remove my anxiety and give me holy boldness. Let my words be clear, gracious, and saturated with Your love. In Jesus' name, Amen.",
    daily_intention: "I will rely upon the Holy Spirit today for the courage to speak God's truth with love and boldness.",
    practical_action: "Pray specifically for one friend or family member who does not know Christ, asking God for an open door to share His hope.",
    evening_reflection_prompt: "Did you sense the Holy Spirit giving you courage to speak up or share grace during your day?"
  },

  // Day 298 (Week 4: Courage to Speak Truth in Love) -> Proverbs 31:9
  298: {
    title: "Defending the Rights of the Needy",
    scripture_primary_reference: "Proverbs 31:9",
    scripture_primary_text: "Open your mouth, judge righteously, and defend the rights of the poor and needy.",
    reflection_body: "King Lemuel’s mother gave him timeless royal counsel: 'Open your mouth, judge righteously, and defend the rights of the poor and needy.' Holy courage is never selfish; its highest calling is to stand up and advocate for those who cannot defend themselves. In every society, the vulnerable, the elderly, the unborn, the impoverished, and the broken are frequently ignored or exploited. Silence in the face of injustice is often a form of cowardice. As women of God, we are summoned to open our mouths with righteous clarity and gentle courage. Speaking up for the vulnerable may cause social discomfort or invite criticism from those who prefer convenient quiet. But Jesus was always the defender of the friendless and the champion of the overlooked. When you use your voice, your influence, your votes, and your resources to shelter those who are suffering, you reflect the righteous heart of the King. Ask God today to show you where your voice can bring protection, dignity, and truth to someone in need.",
    reflection_questions: [
      "Who around you lacks a voice or is suffering quietly without someone to advocate for their needs?",
      "What fears hold you back from speaking up on behalf of the vulnerable in your community or circle?",
      "How does Jesus' advocacy for you as your Great High Priest inspire you to defend others with love?"
    ],
    guided_prayer: "Righteous Lord, You are the defender of the fatherless, the protector of the widow, and the shelter of the poor. Give me courage to open my mouth and advocate for those who have no voice. Forgive me when I have remained silent to protect my own comfort or reputation. Fill my speech with Your wisdom and justice, and let my life reflect Your compassionate heart for the needy. In Jesus' name, Amen.",
    daily_intention: "I will use my voice and influence today to protect, encourage, and advocate for the vulnerable.",
    practical_action: "Support a ministry, pregnancy resource center, or local shelter that actively serves and defends the poor and needy.",
    evening_reflection_prompt: "Where did God give you an opportunity to speak up for truth or stand beside someone in need today?"
  },

  // Day 299 (Week 4: Courage to Speak Truth in Love) -> Ephesians 4:15
  299: {
    title: "Speaking the Truth in Love",
    scripture_primary_reference: "Ephesians 4:15",
    scripture_primary_text: "but speaking truth in love, we may grow up in all things into him, who is the head, Christ,",
    reflection_body: "Paul articulates the supreme balance of Christian maturity: 'speaking truth in love.' Truth without love is brutal, destructive, and Pharisaical; it bludgeons people and drives them away from the cross. Love without truth is sentimental, cowardly, and deceitful; it leaves people trapped in bondage and eternal danger. The gospel demands both in inseparable union. Speaking the truth in love requires immense courage and deep humility. It means loving someone enough to have that difficult, honest conversation about sin, compromise, or dangerous habits, but doing so with tears, gentleness, and complete self-examination. Your goal is never to win an argument or prove yourself superior; your goal is redemption, healing, and spiritual growth. As you speak truth wrapped in sincere love, the body of Christ matures and reflects its glorious Head. Before you address a hard topic with family, friends, or coworkers, inspect your heart. If your motivation is not Christ's love, remain silent until the Holy Spirit purifies your purpose. When truth is ministered in love, it heals.",
    reflection_questions: [
      "Is there a hard truth you need to communicate to someone in your life with gentle, Christlike love?",
      "Do you tend to lean more toward harsh truth-telling or cowardly conflict avoidance, and how can grace balance you?",
      "How has someone speaking the truth to you in genuine love helped you mature and draw closer to Jesus?"
    ],
    guided_prayer: "Loving Father, You spoke the supreme truth of the gospel to me when I was still lost in sin, and You wrapped it in lavish grace. Teach me to speak truth in love. Deliver me from passive silence that compromises truth, and from harsh speech that wounds without healing. May my words always build up, bring light, and reflect the beautiful heart of my Savior Jesus Christ. Amen.",
    daily_intention: "I will unite uncompromised truth with tender love in every conversation and interaction today.",
    practical_action: "Before having a challenging conversation today, write down three affirming, loving truths about the other person to set your tone.",
    evening_reflection_prompt: "Did you communicate truth with gentleness and love today, reflecting the character of Christ?"
  },

  // Day 300 (Week 4: Courage to Speak Truth in Love) -> Ephesians 4:14
  300: {
    title: "Grounded Against Deceitful Winds",
    scripture_primary_reference: "Ephesians 4:14",
    scripture_primary_text: "that we may no longer be children, tossed back and forth and carried about with every wind of doctrine, by the trickery of men, in craftiness, after the wiles of error;",
    reflection_body: "Paul warns the Ephesian church against spiritual infantilism: being like rudderless boats tossed about by every changing wave and gust of cultural doctrine. The modern world is saturated with craftiness, subtle deceptions, and persuasive philosophies that dress up worldly indulgence as spiritual enlightenment. Without deep biblical roots, believers easily drift with cultural fads, moral confusion, and emotional compromise. Spiritual courage requires you to anchor your anchor deep into the immutable truth of God's Word. When spiritual winds blow fiercely, a mature Christian woman does not panic or sway with the crowd; she tests every message, book, podcast, and trend against the unchanging Scriptures. Being grounded in truth allows you to discern error before it poisons your soul or disrupts your home. Do not be satisfied with spiritual shallowness. Dig into the Word, sit under sound biblical teaching, and let the truth of God make you unshakeable amidst the deceptive breezes of our day.",
    reflection_questions: [
      "What cultural ideas or modern trends have you found yourself uncritically accepting without checking Scripture?",
      "How does consistent, daily immersion in God's Word protect your mind from being tossed about by deceit?",
      "What spiritual disciplines help you maintain strong doctrinal roots when popular opinions pressure you to conform?"
    ],
    guided_prayer: "Lord God of Truth, thank You for the solid rock of Your Word. In a world of shifting values and subtle deception, anchor my heart in Your eternal truth. Give me spiritual discernment to recognize error, and grant me the courage to stand firm upon Scripture. Guard my thoughts, my home, and my church from being led astray by false teaching, and keep me mature in Christ. Amen.",
    daily_intention: "I will anchor my mind in the unshakeable truth of God's Word, refusing to drift with cultural trends.",
    practical_action: "Identify one cultural assumption that contradicts Scripture, and write down two biblical verses that refute it with truth.",
    evening_reflection_prompt: "Did you stand grounded in biblical conviction today when faced with worldly opinions or doubts?"
  },

  // Day 301 (Week 4: Courage to Speak Truth in Love) -> Ephesians 4:16
  301: {
    title: "Knit Together to Build Up in Love",
    scripture_primary_reference: "Ephesians 4:16",
    scripture_primary_text: "from whom all the body, being fitted and knit together through that which every joint supplies, according to the working in due measure of each individual part, makes the body increase to the building up of itself in love.",
    reflection_body: "Paul paints an exquisite portrait of the church as an organic body, connected directly to Christ the Head and knit together through every supporting joint. Notice the phrase: 'according to the working in due measure of each individual part.' In the Kingdom of God, there are no useless members, no redundant sisters, and no spectator seats. You have been assigned a vital, unique role in the body of Christ. When you timidly hide your gifts, withdraw from fellowship, or assume that your contribution does not matter, the whole body suffers a lack. It takes courage to step into your God-given calling, to use your spiritual gifts, and to supply what God has entrusted to you. As each part works in its appointed measure—praying, serving, teaching, encouraging, giving—the entire church increases and builds itself up in love. Your quiet faithfulness, your hospitable home, your intercessory prayers, and your spoken words of grace are essential ligaments in God's eternal building. Step forward in faith and supply what Christ has placed within you.",
    reflection_questions: [
      "What specific gift, ability, or role has God entrusted to you to build up your local church or community?",
      "Have you been holding back from serving out of fear, comparison, or a feeling of insignificance?",
      "How does knowing that the whole body needs your unique contribution encourage you to step forward in faith?"
    ],
    guided_prayer: "Lord Jesus, You are the Head of the church, and You have sovereignly placed each member in the body as it pleased You. Thank You for giving me a place, a purpose, and a calling in Your Kingdom. Forgive me when I compare myself to others or hold back out of fear. Empower me to supply what You have given me with joyful diligence, so that Your church may be strengthened and built up in love. Amen.",
    daily_intention: "I will courageously use my gifts today to encourage, build up, and strengthen the body of Christ.",
    practical_action: "Encourage a leader, volunteer, or fellow member in your local church by letting them know how their service has blessed you.",
    evening_reflection_prompt: "Where did you use your gifts or words today to strengthen and encourage someone in the body of Christ?"
  },

  // Day 302 (Week 5: Leaving a Legacy of Faithfulness) -> 2 Timothy 4:7
  302: {
    title: "I Have Kept the Faith",
    scripture_primary_reference: "2 Timothy 4:7",
    scripture_primary_text: "I have fought the good fight. I have finished the course. I have kept the faith.",
    reflection_body: "Facing imminent martyrdom in a cold Roman dungeon, the apostle Paul looked back over his life with triumphant serenity: 'I have fought the good fight. I have finished the course. I have kept the faith.' Notice that Paul did not say he won every earthly dispute or achieved worldly acclaim. His triumph was that he stayed in the fight, ran his appointed lane without quitting, and guarded the precious treasure of the gospel uncompromised. The Christian life is a marathon of perseverance, not a short sprint. There will be seasons of exhaustion, times of heartbreak, and moments when continuing feels almost impossible. But true spiritual legacy is built by staying faithful one day at a time. Keeping the faith means holding fast to Jesus through suffering, trusting His promises in the dark, and refusing to abandon your post. When you reach the finish line of your life, the only accolade that will matter is hearing your Master say, 'Well done, good and faithful servant.' Keep running with your eyes on Christ.",
    reflection_questions: [
      "What current struggle feels like a prolonged battle, and how does Paul's perseverance encourage you to stay faithful?",
      "What does 'keeping the faith' look like practically in your current season of life and duties?",
      "How does the promise of finishing your race in Christ's arms give you strength to run today's lap with joy?"
    ],
    guided_prayer: "Faithful Lord, You are the author and finisher of my faith. When the course feels long and my strength grows weak, remind me of the eternal prize that awaits me in Your presence. Give me grace to fight the good fight against doubt and sin, to run with steady perseverance, and to keep the faith uncompromised until my very last breath. Thank You that Your grace is sufficient for every step. Amen.",
    daily_intention: "I will run my race today with patient endurance, guarding the faith and looking to Jesus.",
    practical_action: "Identify the one spiritual habit that most strengthens your endurance (Scripture reading, prayer, Sabbath rest) and protect it today.",
    evening_reflection_prompt: "Did you run your race today with quiet endurance, keeping faith in Christ through every demand?"
  },

  // Day 303 (Week 5: Leaving a Legacy of Faithfulness) -> 2 Timothy 4:8
  303: {
    title: "The Stored-Up Crown of Righteousness",
    scripture_primary_reference: "2 Timothy 4:8",
    scripture_primary_text: "From now on, there is stored up for me the crown of righteousness, which the Lord, the righteous judge, will give to me on that day; and not to me only, but also to all those who have loved his appearing.",
    reflection_body: "Paul lifts his eyes beyond the executioner’s sword to the coronation that awaits him in glory: 'there is stored up for me the crown of righteousness, which the Lord, the righteous judge, will give to me on that day.' Then he adds words of profound comfort for every ordinary believer: 'and not to me only, but also to all those who have loved his appearing.' The crown of righteousness is not reserved exclusively for apostles, great martyrs, or famous missionaries. It is promised to every faithful woman who loves Jesus, longingly anticipates His return, and lives in joyful obedience to His Word. When your daily sacrifices seem unseen, when you quietly serve difficult family members, or when you endure trials without public recognition, remember that your reward is securely stored up in heaven. Earthly judges are often biased and unfair, but Christ is the righteous Judge who sees every secret prayer and every tear. Live today with eternity in view, knowing that your labor in the Lord is never in vain.",
    reflection_questions: [
      "How does knowing that an eternal crown of righteousness is stored up for you change your perspective on daily hardships?",
      "What does it mean for your soul to truly 'love His appearing' in the midst of daily responsibilities?",
      "Are you looking to earthly recognition for your worth, or resting in the righteous judgment of Christ?"
    ],
    guided_prayer: "Righteous Judge and Loving Savior, thank You that my eternal destiny is secure in Your hands. When I am tempted to seek human praise or grow weary of unseen service, turn my eyes toward heaven. Fill my heart with longing for Your glorious return. Keep me faithful in the ordinary duties of today, rejoicing in the crown of righteousness You have promised to all who love You. Amen.",
    daily_intention: "I will live today in the light of eternity, knowing my eternal reward is safely kept by Christ.",
    practical_action: "Do one quiet act of love or service today that no one else will ever see, doing it solely for the eyes of Jesus.",
    evening_reflection_prompt: "Did the reality of heaven and Christ's promised reward bring peace and joy to your soul today?"
  },

  // Day 304 (Week 5: Leaving a Legacy of Faithfulness) -> Hebrews 12:1-2
  304: {
    title: "Running the Race Looking to Jesus",
    scripture_primary_reference: "Hebrews 12:1-2",
    scripture_primary_text: "Therefore let’s also, seeing we are surrounded by so great a cloud of witnesses, lay aside every weight and the sin which so easily entangles us, and let’s run with perseverance the race that is set before us, looking to Jesus, the author and finisher of our faith,",
    reflection_body: "The author of Hebrews invites us into the grand amphitheater of redemptive history. Surrounded by the great cloud of witnesses—the saints of old who proved God’s faithfulness through trials—we are commanded to run our own appointed course with perseverance. But notice the crucial instruction: we must first 'lay aside every weight and the sin which so easily entangles us.' A runner cannot compete wearing heavy overcoats or tangled cords. Weights are not always outright sins; they are often good things, unnecessary obligations, chronic worries, or bitter resentments that drain your spiritual vitality. Lay them down at the starting line. And how do we run without collapsing? By 'looking to Jesus, the author and finisher of our faith.' Do not look at your own weak feet; do not look sideways in comparison with other runners; look to the Savior who endured the cross for the joy set before Him. He began the good work in you, and He will carry it across the finish line.",
    reflection_questions: [
      "What unnecessary weight, worry, or entangling sin is currently hindering your spiritual race?",
      "How does fixing your eyes on Jesus keep you from the discouragement of comparing your journey to others?",
      "What joy set before you in Christ gives you strength to persevere through today's difficult stretches?"
    ],
    guided_prayer: "Lord Jesus, You are the pioneer and perfecter of my faith. Today I choose to lay down the heavy weights of worry, past regrets, and entangling sins that slow me down. Help me fix my gaze steadfastly upon You. When my strength falters, remind me of the joy set before me in Your presence. Thank You for running with me and carrying me across the finish line. In Your glorious name, Amen.",
    daily_intention: "I will lay aside every unnecessary weight today and run my race with perseverance, eyes fixed on Jesus.",
    practical_action: "Identify one mental worry or resentment you have been carrying, consciously hand it to Jesus in prayer, and refuse to pick it back up.",
    evening_reflection_prompt: "Did you keep your eyes fixed on Jesus today, and what unnecessary weight did He help you lay down?"
  },

  // =========================================================================
  // NOVEMBER (Month 11: An Altar of Thanksgiving)
  // =========================================================================

  // Day 305 (Week 1: An Altar in the Ordinary) -> Psalm 103:1-2
  305: {
    title: "Bless Yahweh and Forget Not His Benefits",
    scripture_primary_reference: "Psalm 103:1-2",
    scripture_primary_text: "Praise Yahweh, my soul! All that is within me, praise his holy name! Praise Yahweh, my soul, and don’t forget all his benefits;",
    reflection_body: "David begins his greatest hymn of thanksgiving not by addressing other people, but by commanding his own soul: 'Praise Yahweh, my soul! All that is within me, praise his holy name! Praise Yahweh, my soul, and don’t forget all his benefits.' Human nature suffers from chronic spiritual amnesia. When circumstances are smooth, we take God's blessings for granted; when trials strike, we quickly forget His past deliverances. Thanksgiving is an intentional spiritual discipline that refuses to let the soul forget. David calls upon 'all that is within me'—his intellect, his emotions, his memory, his will—to join in sacred praise. Building an altar in the ordinary begins with deliberately rehearsing the countless benefits God pours into your life every single day: breath in your lungs, clothes on your back, bread on your table, and above all, the eternal redemption purchased by Christ. When you summon your soul to remember God's goodness, gratitude rises like holy incense, clearing away the fog of discontent and filling your home with joy.",
    reflection_questions: [
      "What specific blessings or answered prayers have you taken for granted over the past few weeks?",
      "How can you actively preach to your own soul to remember God's benefits when you wake up feeling discouraged?",
      "What ordinary provision in your home right now can become an altar of thanksgiving to the Lord?"
    ],
    guided_prayer: "Praise Yahweh, my soul! Lord, with everything that is within me, I bless Your holy name. Forgive my wandering heart for so quickly forgetting Your immense benefits. Today I remember Your faithfulness, Your daily provisions, and Your lavish grace. Tune my thoughts to gratitude, and let my words overflow with sincere praise for all You have done for me. Through Jesus Christ, Amen.",
    daily_intention: "I will command my soul to praise the Lord today and refuse to forget His countless benefits.",
    practical_action: "Take a blank sheet of paper and write down ten specific blessings from the past 24 hours that you did not earn or deserve.",
    evening_reflection_prompt: "When you commanded your soul to remember God's goodness today, how did your attitude shift?"
  },

  // Day 306 (Week 1: An Altar in the Ordinary) -> Psalm 103:3-4
  306: {
    title: "Crowned with Tender Mercies",
    scripture_primary_reference: "Psalm 103:3-4",
    scripture_primary_text: "who forgives all your sins; who heals all your diseases; who redeems your life from destruction; who crowns you with loving kindness and tender mercies;",
    reflection_body: "David lists the supreme foundation of all thanksgiving: God is the One who forgives all your sins, heals your infirmities, redeems your life from the pit, and crowns your head with loving kindness and tender mercies. Notice the order: forgiveness comes first. The greatest blessing you will ever possess is not physical wealth or smooth circumstances; it is the total, irreversible pardon of your sins through the blood of Christ. God does not stop with forgiveness; He stoops down to rescue your life from destruction, pulling you out of the pit of hopelessness and crowning you as His beloved daughter. You do not wear a crown of human achievement or anxious perfectionism; you wear a royal crown forged of His *chesed* (covenant loving kindness) and *rachamim* (tender, maternal mercies). When you look in the mirror, do not see an exhausted woman struggling to keep up with impossible demands. See a daughter of the King, crowned with tender mercy. Let that sacred reality awaken spontaneous, joyful gratitude in your spirit today.",
    reflection_questions: [
      "How does meditating on the full forgiveness of your sins bring unshakeable peace to your heart today?",
      "From what pit of despair, worry, or destruction has God graciously redeemed you in the past?",
      "What does it mean to walk through your day knowing you are crowned with God's tender mercies?"
    ],
    guided_prayer: "Precious Father, I stand in awe of Your lavish grace. You have forgiven all my sins, pulled my life from the pit of destruction, and crowned me with Your unfailing love. When feelings of inadequacy or guilt try to steal my peace, remind me of the royal crown of mercy You have placed upon my head. Let my life be an offering of joyous thanksgiving to You today. Amen.",
    daily_intention: "I will walk with joy and dignity today, remembering that God has crowned me with His tender mercies.",
    practical_action: "Whenever you feel stressed today, touch your forehead and whisper, 'Crowned with loving kindness and tender mercy.'",
    evening_reflection_prompt: "Where did you see God's tender mercy and redemption at work in the details of your day?"
  },

  // Day 307 (Week 1: An Altar in the Ordinary) -> Psalm 103:5
  307: {
    title: "Youth Renewed Like the Eagle",
    scripture_primary_reference: "Psalm 103:5",
    scripture_primary_text: "who satisfies your desire with good things, so that your youth is renewed like the eagle’s.",
    reflection_body: "David declares that Yahweh 'satisfies your desire with good things, so that your youth is renewed like the eagle’s.' The world offers endless counterfeits that promise satisfaction—consumption, entertainment, status, human approval—yet leaves the soul parched and restless. Only God can truly satisfy the deep cravings of the human spirit. When you build an altar of thanksgiving in the ordinary, you begin to perceive the truly good things God provides: a cup of warm tea, the laughter of a child, the fellowship of a friend, the quiet stillness of prayer, and the sustaining promises of His Word. As your soul drinks deeply from God's sufficiency, supernatural renewal takes place. The eagle is famous for its soaring strength, rising high above mountain storms on invisible thermal currents. When you are bone-weary from daily responsibilities, thanksgiving lifts you above the tempest of worry and renews your strength. God does not promise that life will be effortless, but He promises that those who feast on His goodness will soar above exhaustion.",
    reflection_questions: [
      "In what ways have you sought satisfaction in worldly counterfeits rather than resting in God's goodness?",
      "What simple, good thing did God provide today that brought quiet joy to your spirit?",
      "How does thanksgiving renew your emotional and spiritual strength when you are feeling worn out?"
    ],
    guided_prayer: "Lord God, You alone satisfy my longing soul with good things. Forgive me for running to broken cisterns that cannot hold water. Teach me to feast upon Your Word, to delight in Your ordinary provisions, and to find complete contentment in Christ. Renew my strength like the eagle’s today, and lift me above the storm of anxiety into Your peaceful presence. Amen.",
    daily_intention: "I will find my satisfaction in God's good gifts today, allowing Him to renew my strength like the eagle.",
    practical_action: "Enjoy a meal, a walk, or a quiet moment today without your phone, savoring it as a direct gift from God's hand.",
    evening_reflection_prompt: "Did you feel your spiritual and emotional strength renewed today as you focused on God's good gifts?"
  },

  // Day 308 (Week 1: An Altar in the Ordinary) -> Psalm 107:1-2
  308: {
    title: "Let the Redeemed of Yahweh Say So",
    scripture_primary_reference: "Psalm 107:1-2",
    scripture_primary_text: "Give thanks to Yahweh, for he is good, for his loving kindness endures forever. Let the redeemed of Yahweh say so, whom he has redeemed from the hand of the adversary,",
    reflection_body: "Psalm 107 sounds a clarion call to all who have tasted God's saving mercy: 'Give thanks to Yahweh, for he is good, for his loving kindness endures forever. Let the redeemed of Yahweh say so!' Gratitude cannot remain a silent, private sentiment. It is designed to be voiced, proclaimed, and shared. When God rescues you from the hand of the adversary, delivers you from fear, or sustains you through a dark valley, He calls you to 'say so.' Speaking of God's goodness strengthens your own faith and brings fresh hope to those who are currently struggling in the dark. In our homes and communities, conversations easily drift into complaining about the weather, politics, physical ailments, or stressful workloads. But the redeemed are summoned to change the spiritual atmosphere. When you speak aloud of God's enduring loving kindness, you erect a beacon of hope. Do not let the adversary silence your praise. Open your mouth and tell of the goodness of the Lord.",
    reflection_questions: [
      "From what adversary or dark season has God redeemed you that you can testify about today?",
      "How does speaking your gratitude aloud change the atmosphere in your home or among your coworkers?",
      "Who needs to hear your testimony of God's enduring loving kindness this week?"
    ],
    guided_prayer: "Lord Yahweh, You are good, and Your loving kindness endures forever! Thank You for redeeming my life from the hand of the enemy and setting my feet upon the Rock. Forgive me when I keep silent about Your wonders. Give me holy boldness today to 'say so'—to speak of Your faithfulness, to praise Your name, and to encourage someone with the story of Your grace. In Jesus' name, Amen.",
    daily_intention: "I will speak of God's goodness aloud today; as the redeemed of the Lord, I will say so.",
    practical_action: "Tell at least one person today a specific story or instance of how God answered a prayer or showed His goodness in your life.",
    evening_reflection_prompt: "Did you speak aloud of God's faithfulness today, and how did it encourage your own spirit?"
  },

  // Day 309 (Week 1: An Altar in the Ordinary) -> Psalm 107:8-9
  309: {
    title: "He Satisfies the Longing Soul",
    scripture_primary_reference: "Psalm 107:8-9",
    scripture_primary_text: "Let them praise Yahweh for his loving kindness, for his wonderful deeds for the children of men! For he satisfies the longing soul. He fills the hungry soul with good.",
    reflection_body: "The psalmist repeats this sacred refrain: 'Let them praise Yahweh for his loving kindness, for his wonderful deeds for the children of men!' Then he reveals the tender reason: 'For he satisfies the longing soul. He fills the hungry soul with good.' Deep within every human heart resides an unquenchable longing, a spiritual hunger that nothing in this creation can satisfy. We try to fill that void with busyness, achievements, material comforts, or relationships, yet the thirst remains. Augustine famously recognized: 'You have made us for Yourself, O Lord, and our hearts are restless until they find rest in You.' When you bring your empty soul to Jesus, He does not give you hollow advice or empty philosophy. He fills you with Himself—the Bread of Life and the Living Water. When you realize that your deepest hunger has been eternally satisfied in Christ, an altar of thanksgiving rises naturally in the midst of ordinary life. You no longer live as a beggar grasping for earthly scraps; you live as an invited guest at the King's banquet table.",
    reflection_questions: [
      "What deepest longing of your heart have you been trying to fill with temporary, earthly things?",
      "How has Jesus satisfied your spiritual thirst and hunger in ways this world never could?",
      "What would it look like to bring your restlessness to God in quiet worship today?"
    ],
    guided_prayer: "Lord God, You alone satisfy the longing soul and fill the hungry with good things. Forgive me when I seek fulfillment in worldly pursuits that leave me empty. Thank You that in Jesus, my spiritual thirst is quenched forever. Fill me afresh with Your Holy Spirit today, and awaken in my heart a continual song of praise for Your marvelous deeds. In Jesus' precious name, Amen.",
    daily_intention: "I will bring my empty soul to Jesus today, trusting Him to satisfy my deepest hunger with His presence.",
    practical_action: "When you eat a meal today, pause beforehand to thank God not only for the physical food, but for Christ, the Bread of Life.",
    evening_reflection_prompt: "Did your soul find quiet satisfaction and rest in God's presence during the hours of this day?"
  },

  // Day 310 (Week 1: An Altar in the Ordinary) -> 1 Chronicles 16:8-9
  310: {
    title: "Singing of His Marvelous Works",
    scripture_primary_reference: "1 Chronicles 16:8-9",
    scripture_primary_text: "Oh give thanks to Yahweh. Call on his name. Make what he has done known among the peoples. Sing to him. Sing praises to him. Tell of all his marvelous works.",
    reflection_body: "When King David brought the Ark of the Covenant into Jerusalem and placed it in the tent he had prepared, he delivered this magnificent psalm of thanksgiving to Asaph: 'Oh give thanks to Yahweh. Call on his name. Make what he has done known among the peoples. Sing to him. Sing praises to him. Tell of all his marvelous works.' David understood that the presence of God demands a response of joyous, vocal celebration. Thanksgiving is an active, multifaceted liturgy: we give thanks, we call on His name, we declare His deeds, we sing praises, and we recount His wonders. When you lift your voice in song—whether softly in your morning kitchen, humming in the car, or singing with the congregation—you break the heavy atmosphere of discouragement. Worship is not an emotional performance; it is a weapon of spiritual praise that magnifies God above every earthly trouble. When you recount God's marvelous works in your family, your church, and redemptive history, fear loses its grip. Let praise be your first language today.",
    reflection_questions: [
      "What marvelous work of God in your life can you recount with thanksgiving today?",
      "How does singing praises to God, even in private, shift your emotional and spiritual perspective?",
      "In what ways can you make God's deeds known to those in your immediate circle this week?"
    ],
    guided_prayer: "Lord Yahweh, I give You thanks with my whole heart and call upon Your holy name! You have done marvelous things in my life, forgiving my sins, guiding my steps, and surrounding me with mercy. Put a new song of praise in my mouth today. May my home echo with thanksgiving, and may my words declare Your wondrous works to all who cross my path. Through Christ my Lord, Amen.",
    daily_intention: "I will praise God with singing and recount His marvelous works throughout this day.",
    practical_action: "Play or sing a worship hymn or song of praise while doing routine housework or driving, offering it as pure worship.",
    evening_reflection_prompt: "Did you lift a song of praise to the Lord today, and how did it brighten your spirit?"
  },

  // Day 311 (Week 1: An Altar in the Ordinary) -> 1 Chronicles 16:11-12
  311: {
    title: "Seek His Face Forever More",
    scripture_primary_reference: "1 Chronicles 16:11-12",
    scripture_primary_text: "Seek Yahweh and his strength. Seek his face forever more. Remember his marvelous works that he has done: his wonders, and the judgments of his mouth,",
    reflection_body: "David’s song of thanksgiving continues with two vital commands: 'Seek Yahweh and his strength. Seek his face forever more. Remember his marvelous works that he has done.' Notice the distinction: we do not merely seek God's hand (what He can give us); we seek His face (who He is in His beauty, holiness, and relational presence). Seeking God's strength is an admission of our own weakness. When you wake up feeling drained, facing demands that exceed your emotional or physical capacity, David tells you where to turn: seek Yahweh and His strength. And how do we anchor our hearts in that strength? By remembering. Memory is the fuel of thanksgiving. When you remember the Red Sea crossings of your past—the times God provided when money was tight, healed when you were sick, comforted when you were heartbroken—your faith expands for today's challenge. Thanksgiving looks back with awe so that faith can look forward with confidence. Seek His lovely face today, and let remembrance ignite unshakeable praise.",
    reflection_questions: [
      "Are you currently seeking God merely for His blessings, or are you seeking His face in intimate communion?",
      "What past 'miracle of provision or deliverance' in your life should you remember today to strengthen your faith?",
      "How does remembering God's past faithfulness give you peace for the challenges of tomorrow?"
    ],
    guided_prayer: "Almighty God, I seek Your face today. Forgive me when I seek only Your gifts while neglecting Your presence. I acknowledge my absolute weakness; supply me with Your divine strength for every duty before me. I remember Your marvelous works, Your answered prayers, and Your unchanging promises. Be glorified in my heart, and let my life be a continual altar of thanksgiving. In Jesus' name, Amen.",
    daily_intention: "I will seek the Lord's face and His strength today, remembering all His marvelous works.",
    practical_action: "Spend five quiet minutes sitting in stillness, seeking God's face in love without asking for anything.",
    evening_reflection_prompt: "Did you seek the Lord's presence and strength today, and how did He sustain you?"
  },

  // Day 315 (Week 2: Thanksgiving in the Dark Valley) -> Acts 16:25
  315: {
    title: "Midnight Songs in the Prison Cell",
    scripture_primary_reference: "Acts 16:25",
    scripture_primary_text: "But about midnight Paul and Silas were praying and singing hymns to God, and the prisoners were listening to them.",
    reflection_body: "Beaten with wooden rods, bleeding, and clamped into wooden stocks in the deepest, foulest dungeon of Philippi, Paul and Silas did not succumb to despair, bitterness, or questioning God's providence. Instead, 'about midnight Paul and Silas were praying and singing hymns to God, and the prisoners were listening to them.' Thanksgiving in the dark valley is the ultimate weapon of spiritual warfare. Anyone can sing when the sun is shining and life is comfortable. But when a believer sings praise to God at midnight—in the dungeon of grief, financial panic, medical uncertainty, or betrayal—hell trembles and heaven draws near. Praise does not depend on outward circumstances; it is rooted in the unchanging character of the Sovereign Lord. Notice that other prisoners were listening in the dark. Your response to suffering is a powerful witness. When people see you trusting and thanking God in the middle of pain, they behold the supernatural reality of the gospel. Even at midnight, your song of praise can shatter chains.",
    reflection_questions: [
      "What 'midnight season' are you currently enduring, and how can praise become your spiritual response?",
      "Why is singing hymns to God in the middle of suffering such a powerful witness to those around you?",
      "How does focusing on God's sovereignty keep you from falling into the pit of self-pity when life hurts?"
    ],
    guided_prayer: "Sovereign Lord, You are worthy of praise not only in the sunshine, but in the deepest midnight. When trials wound me and circumstances feel dark, keep my heart from bitterness. Give me the grace to sing hymns of praise in the prison cell, knowing that You are with me and that Your purposes cannot be thwarted. Let my quiet trust in You be a light to those watching in the dark. Amen.",
    daily_intention: "Even in the dark valley, I will lift my voice in prayer and praise to my faithful God.",
    practical_action: "If you are facing a trial today, turn off the lights, sit in the quiet, and sing or recite a hymn of praise to God.",
    evening_reflection_prompt: "Did you choose worship over complaint in a difficult moment today, and what freedom did it bring?"
  },

  // Day 316 (Week 2: Thanksgiving in the Dark Valley) -> Psalm 34:1-2
  316: {
    title: "I Will Bless Yahweh at All Times",
    scripture_primary_reference: "Psalm 34:1-2",
    scripture_primary_text: "I will bless Yahweh at all times. His praise will always be in my mouth. My soul shall boast in Yahweh. The humble shall hear of it, and be glad.",
    reflection_body: "David wrote this psalm when he was a hunted fugitive, pretending to be insane before the Philistine king Abimelech in order to escape death. In the middle of terror, humiliation, and exile, David made a radical spiritual declaration: 'I will bless Yahweh at all times. His praise will always be in my mouth.' Notice the sweeping scope: 'at all times.' Not only when prayers are answered quickly, not only when health is robust, not only when the bank account is full, but *at all times*. This is not toxic positivity or pretending that pain does not hurt. It is the resolute decision of a mature believer to anchor her boasting in Yahweh alone. David’s boast was not in his cleverness, his sword, or his military reputation; his boast was in the covenant-keeping God who never forsakes His servants. When the humble hear your boast in the Lord—when they see you praising God through tears—it brings them genuine joy and renewed courage. Let praise be your constant companion today.",
    reflection_questions: [
      "What does it cost you emotionally to bless the Lord 'at all times,' especially when circumstances are painful?",
      "In what earthly securities have you been tempted to boast, and how can you turn your boast back to Yahweh?",
      "How can your faithful praise encourage someone around you who is currently feeling crushed or humbled?"
    ],
    guided_prayer: "Faithful God, I declare today with David that I will bless You at all times. In moments of laughter and in seasons of tears, Your praise shall continually be in my mouth. Forgive me for boasting in my own strength or despairing when earthly crutches fail. My soul boasts in You, my Rock, my Fortress, and my Deliverer. May my praise bring courage to the humble today. In Jesus' name, Amen.",
    daily_intention: "I will bless the Lord at all times today, allowing His praise to remain constantly in my mouth.",
    practical_action: "Whenever you feel tempted to complain or worry today, immediately counter it by speaking aloud one praise to God.",
    evening_reflection_prompt: "Did you choose to praise the Lord during the stressful or challenging moments of this day?"
  },

  // Day 317 (Week 2: Thanksgiving in the Dark Valley) -> Psalm 34:4
  317: {
    title: "He Answered Me and Delivered Me",
    scripture_primary_reference: "Psalm 34:4",
    scripture_primary_text: "I sought Yahweh, and he answered me, and delivered me from all my fears.",
    reflection_body: "David shares a profound testimony of personal deliverance: 'I sought Yahweh, and he answered me, and delivered me from all my fears.' Notice the precise language: David does not say that God immediately eliminated every external problem or removed every enemy soldier. He says, 'He delivered me from all my fears.' Often, the greatest battle we face is not the external circumstance, but the crippling panic, dread, and anxiety that besiege our minds. Fear paralyzes the soul, distorts reality, and whispers that God has abandoned us. But when you seek the Lord—when you pour out your heart honestly before Him in prayer and meditate on His Word—He answers with His supernatural peace. He steps into the storm inside your chest and commands the waves of terror to be still. When internal fear is silenced by the presence of Christ, you can face the external battle with quiet, unshakeable courage. Bring your fears to the altar of prayer today; your Deliverer is waiting to answer.",
    reflection_questions: [
      "What specific fear or anxiety is currently gripping your mind and stealing your peace?",
      "How does seeking the Lord differ from merely obsessing over your problems or looking for human solutions?",
      "Can you recall a time when God delivered you from an internal fear before changing the external situation?"
    ],
    guided_prayer: "Lord Jesus, You know every secret fear, dread, and anxious thought that tries to torment my mind. Today I seek You with all my heart. I bring every worry about my health, my family, and my future to Your altar. Answer me with Your peace, and deliver me from all my fears. Anchor my soul in Your perfect love, which casts out all fear. In Your mighty name, Amen.",
    daily_intention: "I will seek the Lord in prayer today, trusting Him to deliver my heart from every paralyzing fear.",
    practical_action: "Write down your single biggest fear right now, pray over it, and write across it in bold letters: 'Delivered by Yahweh.'",
    evening_reflection_prompt: "Did you experience God's supernatural peace calming your anxious thoughts today as you sought Him?"
  },

  // Day 318 (Week 2: Thanksgiving in the Dark Valley) -> Psalm 34:8
  318: {
    title: "Taking Refuge in the Goodness of Yahweh",
    scripture_primary_reference: "Psalm 34:8",
    scripture_primary_text: "Oh taste and see that Yahweh is good. Blessed is the man who takes refuge in him.",
    reflection_body: "David concludes his hymn of deliverance with a warm, personal invitation: 'Oh taste and see that Yahweh is good. Blessed is the man who takes refuge in him.' Faith in God is not merely an intellectual agreement with theological doctrines; it is an intimate, experiential reality. You cannot know the sweetness of honey by reading about it in an encyclopedia; you must taste it for yourself. In the same way, you truly discover the goodness of God when you take refuge in Him during the dark valleys of life. When earthly shelters crumble, when human support proves fragile, and when you collapse into the arms of Jesus, you discover that His grace is sufficient, His presence is sweet, and His faithfulness never fails. Taking refuge in God means bringing your raw tears, your exhaustion, and your doubts directly to Him, refusing to run to worldly numbing agents. He will not turn you away. Taste of His mercy today, and you will see that He is infinitely good.",
    reflection_questions: [
      "In what ways have you personally 'tasted and seen' that the Lord is good during past trials?",
      "What false refuges (food, shopping, social media, withdrawal) are you tempted to run to when life hurts?",
      "How does taking refuge in Christ right now bring sweet relief to your weary soul?"
    ],
    guided_prayer: "Good and Gracious God, You are my refuge and my portion in the land of the living. Forgive me when I seek comfort in empty earthly refuges. Today I come to You with open hands, tasting afresh of Your sweetness, Your pardon, and Your steadfast love. Thank You for sheltering me in the storm. May my life be an invitation for others to taste and see Your goodness. Through Christ my Lord, Amen.",
    daily_intention: "I will take refuge in the Lord today, tasting and experiencing His goodness in every moment.",
    practical_action: "When you feel stressed or overwhelmed today, take three deep breaths and pray: 'Yahweh is good; I take refuge in Him.'",
    evening_reflection_prompt: "Where did you taste of God's goodness and comfort as you took refuge in Him today?"
  },

  // Day 323 (Week 3: The Secret of Holy Contentment) -> Psalm 16:5-6
  323: {
    title: "The Portion of My Inheritance and My Cup",
    scripture_primary_reference: "Psalm 16:5-6",
    scripture_primary_text: "Yahweh is the assigned portion of my inheritance and my cup. You maintain my lot. The lines have fallen to me in pleasant places. Yes, I have a good heritage.",
    reflection_body: "David articulates the true secret of holy contentment: 'Yahweh is the assigned portion of my inheritance and my cup. You maintain my lot. The lines have fallen to me in pleasant places.' In the ancient allocation of the Promised Land, boundaries were marked with measuring lines to determine each tribe's boundary. David looks at his own life—with all its limitations, trials, and boundaries—and makes a breathtaking confession: God Himself is his portion. Discontentment arises when we look over the fence at another woman’s measuring lines, envying her marriage, her children, her house, her income, or her career. Comparison is the thief of holy joy. But when you realize that God has sovereignly assigned your lot and that He maintains your boundary lines, peace settles over your soul. Your true inheritance is not earthly wealth; it is the Lord Himself. Because you have Christ, the lines have fallen to you in pleasant places. You have a magnificent spiritual heritage that can never perish, spoil, or fade away.",
    reflection_questions: [
      "Where has comparison been stealing your gratitude and making you feel dissatisfied with your assigned lot?",
      "How does knowing that God Himself is your portion and inheritance bring peace to your heart today?",
      "What does it look like practically to accept the boundary lines God has drawn in your current season of life?"
    ],
    guided_prayer: "Lord Yahweh, You are the portion of my inheritance and my cup! Forgive my restless heart for envying the lives, gifts, or possessions of others. I thank You today for the measuring lines You have drawn in my life. Thank You for my spiritual heritage in Christ. Teach me to be deeply satisfied in You, knowing that in possessing You, I possess everything I will ever need. In Jesus' name, Amen.",
    daily_intention: "I will reject comparison today, rejoicing that the Lord Himself is my portion and my good heritage.",
    practical_action: "Write down three specific blessings unique to your life that you will celebrate today without comparing them to anyone else.",
    evening_reflection_prompt: "Did you rest content in your God-given portion today, free from the trap of comparison?"
  },

  // Day 324 (Week 3: The Secret of Holy Contentment) -> Psalm 16:8-9
  324: {
    title: "Set Always Before Me, I Shall Not Be Moved",
    scripture_primary_reference: "Psalm 16:8-9",
    scripture_primary_text: "I have set Yahweh always before me. Because he is at my right hand, I shall not be moved. Therefore my heart is glad, and my tongue rejoices. My body shall also dwell in safety.",
    reflection_body: "Contentment is not a passive mood that happens by chance; it is the result of an intentional focus: 'I have set Yahweh always before me. Because he is at my right hand, I shall not be moved.' Notice the deliberate action: 'I have set.' David actively chose where to position his attention. If you set your problems, your financial fears, or your relational grievances always before your eyes, you will be shaken by every passing breeze. But when you set Yahweh always before you—gazing upon His sovereignty, His covenant love, and His promises—He stands as your mighty defender at your right hand. When God occupies the center of your vision, your emotional foundation becomes unshakeable. Notice the chain reaction of divine contentment: 'Therefore my heart is glad, and my tongue rejoices. My body shall also dwell in safety.' Gladness fills the inner heart, joyful praise flows from the tongue, and physical rest settles over the body. Set the Lord before you today, and stand firm in holy peace.",
    reflection_questions: [
      "What thoughts or worries have you been setting before your eyes instead of the Lord?",
      "How does having God at your right hand give you emotional and spiritual stability today?",
      "In what ways does setting the Lord before you bring rest and safety to your physical body?"
    ],
    guided_prayer: "Sovereign Father, I set You before my eyes today. Deliver me from being distracted and terrified by the noise and storms of this world. Stand at my right hand, Lord, and hold me fast so that I shall not be moved. Fill my heart with unshakeable gladness, let my tongue rejoice in Your praise, and grant my weary body peaceful rest in Your care. Through Jesus Christ my Lord, Amen.",
    daily_intention: "I will set the Lord always before my eyes today; with Him at my right hand, I shall not be moved.",
    practical_action: "Place a visible reminder (a card, a small cross, or a screen note) where you work that says: 'Yahweh is at my right hand.'",
    evening_reflection_prompt: "Did setting the Lord before you today keep you stable and calm amidst unexpected demands?"
  },

  // Day 325 (Week 3: The Secret of Holy Contentment) -> Psalm 16:11
  325: {
    title: "In Your Presence Is Fullness of Joy",
    scripture_primary_reference: "Psalm 16:11",
    scripture_primary_text: "You will show me the path of life. In your presence is fullness of joy. In your right hand there are pleasures forever more.",
    reflection_body: "David reaches the mountain peak of spiritual contentment with these immortal words: 'You will show me the path of life. In your presence is fullness of joy. In your right hand there are pleasures forever more.' Notice the word 'fullness.' The pleasures of this world are always partial, temporary, and mixed with sorrow; they leave us wanting more. But in God's presence, joy is not measured out in drops; it is full, overflowing, and eternal. Holy contentment is not the grim resignation of having fewer desires; it is finding the ultimate fountain of pure, unending delight. God does not call you to a dreary, joyless existence. He invites you to walk with Him along the path of life and feast upon the sacred pleasures of His right hand: the joy of His fellowship, the peace of His pardon, and the hope of eternal glory. When your soul is drinking from the river of His delight, the trinkets of this world lose their seductive power. Draw near to His presence today, and let His fullness of joy be your unshakeable strength.",
    reflection_questions: [
      "How does the 'fullness of joy' found in God's presence expose the emptiness of worldly entertainment?",
      "Are you walking on the path of life today, listening for His gentle guidance in your decisions?",
      "What spiritual pleasure from God's right hand can you thank Him for in this quiet moment?"
    ],
    guided_prayer: "Lord of Joy, You are the fountain of life and the source of all true delight. Forgive me when I settle for the muddy puddles of worldly pleasure when I could drink from the pure ocean of Your presence. Show me the path of life today. Fill my soul with Your fullness of joy, and anchor my heart in the eternal pleasures of Your right hand. In the precious name of Jesus, Amen.",
    daily_intention: "I will abide in God's presence today, where fullness of joy and eternal pleasures are found.",
    practical_action: "Spend ten unhurried minutes in quiet praise, thanking God simply for the joy of knowing Him as your Savior.",
    evening_reflection_prompt: "Did you experience moments of deep, quiet joy today as you rested in God's loving presence?"
  },

  // Day 330 (Week 4: An Overflow of Generous Giving) -> Luke 21:3-4
  330: {
    title: "The Widow's Generous Offering",
    scripture_primary_reference: "Luke 21:3-4",
    scripture_primary_text: "He said, 'Truly I tell you, this poor widow put in more than all of them; for all these put in of their abundance into the gifts of God, but she, out of her poverty, put in all that she had to live on.'",
    reflection_body: "Standing in the temple treasury, Jesus watched the wealthy making grand displays of large donations. Then a poor widow slipped in quietly and dropped two tiny copper coins—worth less than a penny—into the collection box. To human eyes, her gift was completely insignificant. But Jesus called His disciples together and declared that this woman had given more than all the wealthy combined. The rich gave out of their surplus, feeling no sacrifice; but she, out of her poverty, gave all she had to live on. God does not measure generosity by the monetary size of the gift, but by the size of the sacrifice and the trust of the heart. You may look at your bank account, your energy, or your limited time and feel that you have almost nothing of value to offer. But when you place your two mites—your small kindness, your simple meal, your quiet prayer, your sacrificial gift—into the hands of Jesus, He counts it as precious worship. True generosity is an act of radical trust, believing that the God who feeds the sparrows will faithfully care for you.",
    reflection_questions: [
      "Have you ever held back from giving or serving because your contribution felt too small to matter?",
      "How does Jesus' view of the widow's two mites encourage you in your current financial or life situation?",
      "What 'two mites' of time, love, or resources can you generously place into God's hands today?"
    ],
    guided_prayer: "Lord Jesus, You see not as man sees, looking past outward wealth to the devotion of the heart. Forgive me when I hold back out of scarcity or fear. Take my small resources, my two mites of time, and my simple gifts, and use them for Your Kingdom. Teach me to give generously and cheerfully, trusting that You will supply all my needs according to Your riches in glory. In Your precious name, Amen.",
    daily_intention: "I will give cheerfully and generously today, trusting that God values the sacrifice of my heart.",
    practical_action: "Give a sacrificial gift of money, time, or practical help to someone in need, giving it secretly and with joy.",
    evening_reflection_prompt: "Where did God invite you to practice cheerful, trusting generosity during the course of this day?"
  },

  // Day 334 (Week 5: Holy Remembrance & Praise Stones) -> Psalm 77:11-12
  334: {
    title: "Remembering the Wonders of Old",
    scripture_primary_reference: "Psalm 77:11-12",
    scripture_primary_text: "I will remember Yah’s deeds; for I will remember your wonders of old. I will also meditate on all your work, and consider your doings.",
    reflection_body: "In Psalm 77, Asaph was wrestling with profound anguish and sleepless nights, wondering if God had forgotten to be gracious. But right in the middle of his despair, Asaph made a decisive pivot: 'I will remember Yah’s deeds; for I will remember your wonders of old. I will also meditate on all your work, and consider your doings.' Holy remembrance is the bridge that carries the soul out of the pit of anxiety and onto the high ground of faith. When you feel overwhelmed by the uncertainties of tomorrow, do not stare at the storm. Reach back into the treasure chest of redemptive history and your own spiritual journey. Remember how God parted the waters, provided manna in the wilderness, brought resurrection out of the cross, and faithfully carried you through past heartbreaks. As you meditate on all His works and consider His doings, your perspective shifts from the magnitude of your problems to the majesty of your God. Stones of remembrance anchor your soul. He who was faithful in the past will be faithful tomorrow.",
    reflection_questions: [
      "What 'wonders of old' in your own life can you meditate upon today to conquer anxious thoughts?",
      "How does intentional, biblical meditation on God's past works silence the voice of despair?",
      "What praise stone of remembrance can you set up in your heart as you finish this month of thanksgiving?"
    ],
    guided_prayer: "Faithful God, when my heart is overwhelmed and sleepless nights threaten my peace, teach me to remember. I recall Your wonders of old, Your mighty deeds, and Your steadfast covenant love. I meditate upon the cross of Jesus, where my eternal redemption was sealed. Thank You for every answered prayer and every past deliverance. Anchor my soul in Your unchanging faithfulness, now and forever. Amen.",
    daily_intention: "I will deliberately remember God's wonders of old today, meditating on His mighty faithfulness.",
    practical_action: "Write down three major milestones where God intervened in your past, and keep them where you can review them whenever fear strikes.",
    evening_reflection_prompt: "How did meditating on God's past faithfulness bring peace and confidence to your heart today?"
  },

  // =========================================================================
  // DECEMBER (Month 12: Emmanuel — God With Us)
  // =========================================================================

  // Day 341 (Week 1: The Longing of Advent) -> Luke 1:78-79
  341: {
    title: "The Dawn from on High Visiting Us",
    scripture_primary_reference: "Luke 1:78-79",
    scripture_primary_text: "because of the tender mercy of our God, by which the dawn from on high will visit us, to shine on those who sit in darkness and the shadow of death; to guide our feet into the way of peace.",
    reflection_body: "In his prophetic Benedictus, Zechariah rejoiced over the incoming Messiah with breathtaking imagery: 'because of the tender mercy of our God, by which the dawn from on high will visit us, to shine on those who sit in darkness and the shadow of death; to guide our feet into the way of peace.' Advent is the season of holy longing. For centuries, God's people sat in the deep twilight of waiting, silence, and oppression. But into that cold darkness, God broke through not with lightning bolts of wrath, but with the gentle, rising dawn of His tender mercy (*splagchna eleous*—the deepest compassionate affections of God). Jesus is the Dayspring, the radiant sunrise from heaven. His light penetrates into the darkest corners of human sorrow, loneliness, and the fear of death, illuminating our path and guiding our restless feet into the way of true shalom. If you are sitting in the shadow of grief or feeling overwhelmed by dark circumstances this December, lift your eyes. The dawn from on high has visited you. The Light of the world has come, and the darkness can never overcome Him.",
    reflection_questions: [
      "In what area of your life or family do you most need the light of Christ to shine into darkness right now?",
      "How does Zechariah's description of God's 'tender mercy' comfort your soul during the holiday season?",
      "What does it mean for Jesus to guide your feet into the way of peace amidst December hurry?"
    ],
    guided_prayer: "Lord God of tender mercy, thank You for sending the Dayspring from on high to visit us in our darkness. Shine Your radiant light into every shadowy corner of my heart, dispelling fear, loneliness, and despair. Guide my feet into Your way of peace this Advent season. Deliver me from the hurried commercialism of this world, and fill my soul with quiet awe at the coming of my Savior Jesus Christ. Amen.",
    daily_intention: "I will walk in the light of the Dayspring today, letting Christ guide my feet into the way of peace.",
    practical_action: "Light a candle in a dark room this evening, sit quietly for five minutes, and meditate on Jesus, the Light of the world.",
    evening_reflection_prompt: "Where did the tender mercy and radiant light of Christ guide your steps during this day?"
  },

  // Day 343 (Week 2: The Miracle of the Manger) -> Philippians 2:6-7
  343: {
    title: "The God Who Emptied Himself",
    scripture_primary_reference: "Philippians 2:6-7",
    scripture_primary_text: "who, existing in the form of God, didn’t consider equality with God a thing to be grasped, but emptied himself, taking the form of a servant, being made in the likeness of men.",
    reflection_body: "Paul unveils the staggering theological mystery of the incarnation: Jesus Christ, existing in the very form of God from all eternity, 'didn’t consider equality with God a thing to be grasped, but emptied himself, taking the form of a servant, being made in the likeness of men.' In Bethlehem’s manger, the Sovereign Architect of galaxies laid aside the outward glory of heaven to wrap Himself in fragile human skin. He did not cling to celestial privileges or demand earthly luxury; He emptied Himself to become a servant. The Creator cried as an infant, was fed at a mother's breast, and slept in a feeding trough. This is the profound miracle of the manger: God drew near not in terrifying splendor, but in gentle, approachable vulnerability. In an achievement-driven culture where human beings constantly scramble for status, influence, and recognition, Jesus demonstrates the royal majesty of downward humility. When you look upon the manger, let every shred of pride dissolve. If the King of kings embraced servanthood for your salvation, you can joyfully walk in gentle humility today.",
    reflection_questions: [
      "How does meditating on the humility of the incarnation soften your heart and eliminate selfish ambition?",
      "What does it look like for you to 'take the form of a servant' in your home or community this Christmas season?",
      "Why is the gentle vulnerability of the manger such good news for sinners and the brokenhearted?"
    ],
    guided_prayer: "Lord Jesus, I bow in reverent wonder before the miracle of the manger. You laid aside the glory of heaven, emptied Yourself of celestial privilege, and took the form of a servant for my sake. Forgive my pride and my foolish desire for human applause. Clothe me in Your gentle humility today. Teach me to serve others with self-forgetful love, reflecting the sacred beauty of Your incarnation. In Your holy name, Amen.",
    daily_intention: "I will embrace gentle humility today, following the example of my Savior who emptied Himself for me.",
    practical_action: "Perform a quiet, lowly task in your home or workplace today without letting anyone know it was you who did it.",
    evening_reflection_prompt: "Did you walk in the humility of Christ today, seeking to serve rather than to be served?"
  },

  // Day 349 (Week 3: The Prince of Peace in Family Chaos) -> John 14:27
  349: {
    title: "Peace I Leave with You",
    scripture_primary_reference: "John 14:27",
    scripture_primary_text: "Peace I leave with you. My peace I give to you; not as the world gives, give I to you. Don’t let your heart be troubled, neither let it be fearful.",
    reflection_body: "On the night before His crucifixion, amidst the impending terror of Gethsemane and Calvary, Jesus bequeathed His supreme inheritance to His followers: 'Peace I leave with you. My peace I give to you; not as the world gives, give I to you.' The world defines peace as the temporary absence of conflict or external trouble—an agreeable bank balance, quiet children, or an empty inbox. But worldly peace is fragile and easily shattered. The peace Jesus gives is an internal, supernatural reality that thrives right in the middle of external storms. It is His own peace—the unshakeable calm of the Son resting in the Father's sovereign love. As family gatherings approach in December, relational friction, old grievances, hectic schedules, and unresolved tensions can easily turn holiday homes into zones of emotional chaos. But you do not have to absorb the anxiety around you. Jesus commands: 'Don’t let your heart be troubled, neither let it be fearful.' His peace is an anchor for your soul.",
    reflection_questions: [
      "In what areas of your family or home life do you most feel the threat of holiday stress and tension?",
      "How does Christ's gift of peace differ from the fragile, temporary peace that the world tries to offer?",
      "What does it look like practically to refuse to let your heart be troubled when people around you are anxious?"
    ],
    guided_prayer: "Prince of Peace, thank You for leaving me Your divine inheritance of peace. When holiday chaos, family tension, and hectic demands threaten to overwhelm my soul, anchor me in Your calm presence. I receive Your peace today. Guard my mind from fear, govern my tongue in stressful moments, and make me a conduit of Your quiet, unshakeable calm to those around me. In Jesus' mighty name, Amen.",
    daily_intention: "I will receive and rest in Christ's supernatural peace today, refusing to let my heart be troubled.",
    practical_action: "When family tension or schedule hurry strikes today, step into another room, take three slow breaths, and whisper: 'My peace I give to you.'",
    evening_reflection_prompt: "Did you stand anchored in Christ's quiet peace today amidst the hurry and noise around you?"
  },

  // Day 350 (Week 3: The Prince of Peace in Family Chaos) -> John 14:27
  350: {
    title: "Let Not Your Heart Be Troubled",
    scripture_primary_reference: "John 14:27",
    scripture_primary_text: "Don’t let your heart be troubled, neither let it be fearful.",
    reflection_body: "Jesus gives an imperative that is both a tender command and a profound promise: 'Don’t let your heart be troubled, neither let it be fearful.' Notice that Jesus places the responsibility gently upon us: 'Don't let your heart.' While we cannot control the difficult personalities, family dramas, or unexpected crises that arise during the holidays, we can control what we allow to take root in our inner sanctuary. An untroubled heart is not the result of having perfect relatives or a stress-free schedule; it is the deliberate choice to guard your soul under the shelter of Christ. When hurtful comments are spoken at the dinner table, when old resentments threaten to flare, or when financial pressures mount, the natural reflex is to join in the anxiety. But as a follower of Jesus, you are called to be an emotional and spiritual thermostat, not a thermometer. You do not reflect the ambient tension; you regulate the atmosphere with the calm authority of Christ. Keep the door of your heart closed against fear and bitterness.",
    reflection_questions: [
      "What family dynamics or holiday expectations are currently tempting you to let your heart be troubled?",
      "How can you act as a peacemaker rather than absorbing or amplifying tension in family conversations?",
      "What boundary or quiet pause can you establish to protect your soul's peace during hectic gatherings?"
    ],
    guided_prayer: "Lord Jesus, You know how easily my heart is tossed by the moods, words, and demands of others. Give me the grace today to obey Your command: let not my heart be troubled. When tension rises in my home, make me an instrument of Your stillness. Let Your love absorb harshness, let Your truth dispel confusion, and keep my spirit anchored in Your unchanging grace. In Your name, Amen.",
    daily_intention: "I will guard the door of my heart today, refusing to allow fear, anger, or offense to dwell within.",
    practical_action: "Decide in advance one gracious, defusing response you will use if a tense or argumentative topic arises with family.",
    evening_reflection_prompt: "Did you succeed in guarding your heart from anxiety and agitation during today's interactions?"
  },

  // Day 351 (Week 3: The Prince of Peace in Family Chaos) -> Isaiah 26:3
  351: {
    title: "A Mind Kept in Perfect Peace",
    scripture_primary_reference: "Isaiah 26:3",
    scripture_primary_text: "You will keep him in perfect peace, whose mind is stayed on you; because he trusts in you.",
    reflection_body: "Isaiah reveals the divine formula for unshakeable inner stability: 'You will keep him in perfect peace, whose mind is stayed on you; because he trusts in you.' In the original Hebrew, 'perfect peace' is *shalom shalom*—double peace, absolute, unbroken wholeness. Notice who performs the keeping: 'You will keep him.' You do not have to hold yourself together by sheer willpower; the Almighty God promises to keep you. But upon what does this perfect peace rest? Upon a mind that is 'stayed' on Him. The word 'stayed' conveys the picture of leaning your entire weight upon a solid, unmoving pillar. In the rush of holiday preparations, our minds are pulled in a thousand frantic directions: gift lists, meal planning, travel arrangements, and family expectations. When your thoughts are scattered upon circumstances, anxiety is inevitable. But when you consciously tether your mind to the character, faithfulness, and promises of God, His peace wraps around your thoughts like a fortress. Keep your mind stayed on Him today, and watch anxiety flee.",
    reflection_questions: [
      "What thoughts have been dominating your mind over the past few days—holiday hurry or God's promises?",
      "What does it mean practically to 'lean the full weight of your mind' upon the character of God?",
      "How can you train your thoughts to return to Jesus throughout a demanding, chaotic day?"
    ],
    guided_prayer: "Lord God, You are my unmoving Rock. Forgive me for allowing my mind to be scattered and overwhelmed by minor holiday details. Today I deliberately lean the full weight of my thoughts, my worries, and my schedule upon You. Keep me in Your *shalom shalom*—Your perfect peace. When distractions swirl around me, tether my soul to Your cross and Your eternal promises. Through Christ my Lord, Amen.",
    daily_intention: "I will keep my mind stayed upon the Lord today, resting fully in His promise of perfect peace.",
    practical_action: "Whenever your mind begins racing today, pause and repeat Isaiah 26:3 slowly three times, fixing your attention on God.",
    evening_reflection_prompt: "Did you experience God's 'perfect peace' guarding your thoughts as you stayed your mind on Him?"
  },

  // Day 352 (Week 3: The Prince of Peace in Family Chaos) -> Isaiah 26:4
  352: {
    title: "Yahweh, the Everlasting Rock",
    scripture_primary_reference: "Isaiah 26:4",
    scripture_primary_text: "Trust in Yahweh forever; for in Yah, Yahweh, is an everlasting Rock.",
    reflection_body: "Isaiah immediately follows his promise of perfect peace with an urgent exhortation: 'Trust in Yahweh forever; for in Yah, Yahweh, is an everlasting Rock.' Human securities are shifting sand. Family relationships can be fragile, financial resources fluctuate, physical health can deteriorate, and holiday plans can unravel in an instant. If your peace depends on stable earthly circumstances, you will be in constant jeopardy. But in Yahweh, we possess an 'Everlasting Rock'—in Hebrew, *Tsur Olamim*, the Rock of Ages. A rock does not tremble when waves crash against it; it does not move when winter winds howl. It stands firm, providing an unshakeable foundation for everyone who builds upon it. When family gatherings feel emotionally turbulent or unpredictable, do not anchor your expectations in human perfection. Anchor your trust in the Everlasting Rock. Let family members be imperfect human beings without allowing their flaws to shatter your peace. Your stability is anchored in God, and that Rock will never move.",
    reflection_questions: [
      "In what fragile earthly securities have you been placing your trust during this holiday season?",
      "How does viewing God as your 'Everlasting Rock' change the way you respond when family plans change or fall apart?",
      "What does it look like to give family members grace to be imperfect while resting your soul on Christ?"
    ],
    guided_prayer: "Eternal Yahweh, You are the Rock of Ages, the unmovable foundation of my life. Forgive me for placing unrealistic expectations on fragile human beings and demanding that circumstances be perfect. Today I plant my feet firmly upon You, my Everlasting Rock. When family friction or holiday stress threatens to shake me, hold me steady in Your sovereign love and grace. In Jesus' name, Amen.",
    daily_intention: "I will trust in the Lord forever today, knowing that in Yahweh is an Everlasting Rock.",
    practical_action: "Identify one holiday expectation you have been clinging to tightly, and release it into the hands of your Rock.",
    evening_reflection_prompt: "Did you stand firm upon the Everlasting Rock today when human plans or emotions shifted?"
  },

  // Day 353 (Week 3: The Prince of Peace in Family Chaos) -> Colossians 3:15
  353: {
    title: "Let the Peace of Christ Rule",
    scripture_primary_reference: "Colossians 3:15",
    scripture_primary_text: "And let the peace of Christ rule in your hearts, to which also you were called in one body; and be thankful.",
    reflection_body: "Paul gives a vital command for communal harmony: 'let the peace of Christ rule in your hearts, to which also you were called in one body; and be thankful.' The Greek word translated 'rule' (*brabeuo*) is an athletic term referring to an umpire or referee. An umpire steps in to resolve disputes, call fouls, and maintain order on the playing field. Paul instructs that whenever conflicting desires, hurtful words, or selfish impulses arise in your heart, the peace of Christ must act as the deciding umpire. If an angry response, a sarcastic retort, or a bitter grudge threatens to disrupt the peace of Christ, blow the whistle. Disqualify that reaction. Let Christ’s peace have the final, authoritative say. Notice that this peace is not solitary; we are called to it 'in one body.' In family gatherings and church communities, protecting peace requires self-control, forbearance, and above all, thanksgiving. A thankful heart rarely brawls. Let the umpire of Christ’s peace govern your thoughts, your reactions, and your words today.",
    reflection_questions: [
      "What thoughts or emotional reactions do you need to let the peace of Christ 'referee' and disqualify today?",
      "In family dynamics, are you allowing self-justification or Christ's peace to have the final word in your responses?",
      "How does cultivating an attitude of active thanksgiving help defuse relational tension?"
    ],
    guided_prayer: "Lord Jesus, I invite Your peace to be the ruling umpire in my heart today. When irritation, defensiveness, or pride tempt me to speak harshly, let Your peace blow the whistle and stop my tongue. Rule over my thoughts and emotions. Help me protect harmony in my home and among my family, and clothe my soul in continual thanksgiving. Through Christ my Lord, Amen.",
    daily_intention: "I will let the peace of Christ act as the deciding umpire in all my emotions and reactions today.",
    practical_action: "Before reacting to any frustrating family moment today, pause and ask: 'Does this reaction preserve or destroy the peace of Christ?'",
    evening_reflection_prompt: "Did the peace of Christ successfully referee your emotional reactions and words today?"
  },

  // Day 354 (Week 3: The Prince of Peace in Family Chaos) -> Colossians 3:15
  354: {
    title: "Called in One Body to Peace",
    scripture_primary_reference: "Colossians 3:15",
    scripture_primary_text: "to which also you were called in one body; and be thankful.",
    reflection_body: "Paul emphasizes our corporate calling: 'to which also you were called in one body; and be thankful.' God did not call us to live as isolated, self-protective spiritual islands. He grafted us into a body. And bodies require mutual cooperation, patience, and continual care. In family life and church community, friction is inevitable because fallen human beings are living in close proximity. Differences in personalities, political viewpoints, parenting philosophies, and life choices can easily trigger division during the holidays. But Paul reminds us of our higher calling: we are called to peace. Peace is not natural; it is a supernatural fruit cultivated through humility and gratitude. When you choose to overlook an offense, refuse to join in gossip, or offer a soft answer to a sharp comment, you are fulfilling your calling as a daughter of peace. Paul adds the indispensable key: 'and be thankful.' When your heart is full of gratitude for God's mercy toward you, you have plenty of grace left over for the quirks and flaws of others.",
    reflection_questions: [
      "How does viewing difficult family members as part of God's sanctifying classroom change your perspective?",
      "What does it mean for your daily interactions that you are 'called to peace' by the Lord?",
      "How can an active spirit of thanksgiving protect you from taking offense during holiday gatherings?"
    ],
    guided_prayer: "Heavenly Father, You have called me to peace within the body of Christ and within my family. Forgive me when I prioritize being 'right' over being loving. Give me a large, gracious heart that quickly overlooks offenses and seeks reconciliation. Fill me with deep gratitude for Your immense patience with me, so that I may extend the same gentle patience to those around me today. In Jesus' name, Amen.",
    daily_intention: "I will walk in my sacred calling as an instrument of Christ's peace in my family and circle today.",
    practical_action: "Deliberately choose to overlook one annoying habit or sharp remark today without making any comment or showing irritation.",
    evening_reflection_prompt: "Did you honor your calling to peace today by extending grace and overlooking offenses?"
  },

  // Day 355 (Week 3: The Prince of Peace in Family Chaos) -> Isaiah 26:3-4
  355: {
    title: "Guarding Christ's Quiet Calm in Family Chaos",
    scripture_primary_reference: "Isaiah 26:3-4",
    scripture_primary_text: "You will keep him in perfect peace, whose mind is stayed on you; because he trusts in you. Trust in Yahweh forever; for in Yah, Yahweh, is an everlasting Rock.",
    reflection_body: "As we bring this week of spiritual calm to a close, Isaiah’s double promise stands as our permanent fortress: God will keep the mind stayed on Him in perfect peace, because in Yahweh is an Everlasting Rock. Holiday chaos does not have to penetrate into your inner sanctuary. You can walk through crowded living rooms, noisy kitchens, and tense family conversations surrounded by the quiet canopy of Emmanuel’s presence. Jesus walked through howling storms, hostile crowds, and demanding schedules with serene, centered calm because His heart was permanently resting in the Father's love. That same calm is available to you. You do not have to fix every family dysfunction this Christmas; you do not have to orchestrate a fairytale holiday; you only need to abide in the Prince of Peace. Let the Everlasting Rock bear the weight of your family, your worries, and your celebrations. Breathe deeply of His grace, protect your quiet windows of prayer, and let Christ's gentle peace reign supreme in your home.",
    reflection_questions: [
      "What unrealistic holiday expectation do you need to surrender completely to the Everlasting Rock today?",
      "How will you practically protect a quiet window of prayer each day amidst holiday festivities?",
      "In what way can your steady, calm presence minister Christ's peace to your family this week?"
    ],
    guided_prayer: "Lord Jesus, Emmanuel, You are the Prince of Peace who entered our noisy, broken world to bring eternal shalom. I surrender my home, my family, and my holiday schedule into Your hands. Keep my mind stayed on You. When chaos threatens, be my Everlasting Rock. Make my home a sanctuary of Your quiet presence, and let Your peace radiate through my smile, my words, and my love. Amen.",
    daily_intention: "I will abide in Christ's quiet calm today, letting His perfect peace guard my home and family.",
    practical_action: "Schedule a dedicated 15-minute quiet window for tomorrow morning where you will read Scripture and rest before opening your door to holiday duties.",
    evening_reflection_prompt: "Did you sense Emmanuel's quiet calm guarding your soul through the demands of this day?"
  },

  // Day 361 (Week 4: The Light Shines in the Darkness) -> Psalm 34:18
  361: {
    title: "Near to the Brokenhearted at Christmas",
    scripture_primary_reference: "Psalm 34:18",
    scripture_primary_text: "Yahweh is near to those who have a broken heart, and saves those who have a crushed spirit.",
    reflection_body: "For many women, December is not an easy season of cheer; it is a painful reminder of empty chairs around the dinner table, recent bereavements, estranged children, broken marriages, or chronic illness. Holiday music and festive decorations can feel like salt in a tender wound. To every crushed and weary soul, David speaks this tender promise: 'Yahweh is near to those who have a broken heart, and saves those who have a crushed spirit.' In human society, people often pull away from profound grief, feeling uncomfortable or not knowing what to say. But God does the exact opposite: when your heart is broken, He draws closer. The incarnation itself is the ultimate proof of this promise. Jesus did not remain at a safe, celestial distance from human agony; He stepped into our fragile world as a 'man of sorrows, and acquainted with grief.' You do not have to paste on a fake holiday smile for God. He sees your private tears, honors your grief, and wraps His comforting arms around your crushed spirit. Emmanuel is near.",
    reflection_questions: [
      "What sorrow, loss, or disappointment is weighing on your heart during this Christmas season?",
      "How does knowing that God draws closer to the brokenhearted bring comfort to your soul today?",
      "Who in your circle is grieving this holiday, and how can you reach out with Christ's gentle presence?"
    ],
    guided_prayer: "Compassionate Lord, thank You that You never turn away from my tears or despise my broken heart. When holiday festivities highlight my losses or loneliness, draw near to me as You have promised. Be my comfort, my healer, and my peace. Give me the grace to bring my honest grief to Your altar, knowing that You are Emmanuel—God with me in the darkest valley. In Jesus' tender name, Amen.",
    daily_intention: "I will rest in the comforting presence of God today, knowing He is near to my broken heart.",
    practical_action: "Send a thoughtful card, flowers, or a comforting text to someone who is spending their first Christmas without a loved one.",
    evening_reflection_prompt: "Did you feel the gentle, comforting nearness of the Lord holding your heart today?"
  },

  // Day 362 (Week 4: The Light Shines in the Darkness) -> 2 Corinthians 4:6
  362: {
    title: "Light Shining in the Face of Christ",
    scripture_primary_reference: "2 Corinthians 4:6",
    scripture_primary_text: "seeing it is God who said, 'Light will shine out of darkness,' who has shone in our hearts to give the light of the knowledge of the glory of God in the face of Jesus Christ.",
    reflection_body: "Paul draws a breathtaking parallel between the original creation in Genesis and the miracle of personal salvation: the same sovereign God who commanded light to shine out of the primeval darkness has shone in our hearts! And where is that divine illumination concentrated? In the face of Jesus Christ. When you look into the face of Jesus revealed in the gospel, you behold the unmitigated glory of God—not a terrifying, consuming blaze of judgment, but a radiant, welcoming warmth of grace and truth. The darkness of this world can feel suffocating: war, moral decay, suffering, and personal grief often cast long shadows. But darkness has no power of its own; it is simply the absence of light. The moment a single candle is lit, darkness must flee. God has flooded your heart with the light of Christ. As you look upon the babe in Bethlehem who grew to be the Savior on the cross, your soul is filled with divine glory. Let that light shine brightly through your life, illuminating a dark world with the hope of Jesus.",
    reflection_questions: [
      "How has the light of the knowledge of God in Jesus transformed your perspective on dark circumstances?",
      "In what practical ways can the radiant light of Christ shine through your actions and words this Christmas?",
      "What darkness in your thoughts or fears needs to be exposed to the bright light of Christ's face today?"
    ],
    guided_prayer: "Creator God, You spoke light into the primeval void, and You have shone into my dark heart through the gospel of Your Son. Thank You for revealing Your glorious love, holiness, and mercy in the face of Jesus Christ. Dispel every shadow of doubt, fear, and gloom from my soul today. Let Your light shine through me so brightly that others may see Your glory and praise Your holy name. Amen.",
    daily_intention: "I will walk in the radiant light of Christ today, reflecting His glory in a dark world.",
    practical_action: "Share a verse of Scripture or a message of Christ's light with someone who is feeling overwhelmed or hopeless today.",
    evening_reflection_prompt: "Did the light of Christ shine in your heart today, bringing clarity and hope into dark moments?"
  },

  // Day 363 (Week 5: Walking Forward with Emmanuel) -> Matthew 28:20
  363: {
    title: "I Am With You Always",
    scripture_primary_reference: "Matthew 28:20",
    scripture_primary_text: "teaching them to observe all things that I commanded you. Behold, I am with you always, even to the end of the age. Amen.",
    reflection_body: "As we approach the end of our 365-day journey, Jesus seals His Great Commission with the crowning promise of the New Testament: 'Behold, I am with you always, even to the end of the age. Amen.' Matthew’s Gospel began in chapter one with the prophecy of Emmanuel—God with us. Now it closes with the resurrected King proclaiming that His presence will never depart. Notice the word 'always'—literally in the Greek, *all the days*. Jesus does not promise to be with you only on mountaintop Sundays, during joyous celebrations, or when your faith feels triumphant. He promises to be with you on ordinary Mondays, through sleepless midnight vigils, in hospital waiting rooms, in lonely transitions, and even through the valley of the shadow of death. As you stand on the threshold of a new year, you do not need to fear what tomorrow holds. You do not walk into the unknown future alone. The resurrected Lord marches beside you, goes before you, and lives within you. He is with you all the days, to the very end of the age.",
    reflection_questions: [
      "How does Jesus' promise to be with you 'all the days' comfort you as you look ahead to the new year?",
      "Looking back over this past year of daily devotionals, where did you most clearly sense Emmanuel walking with you?",
      "What unknown future circumstance can you confidently entrust to Christ's abiding presence right now?"
    ],
    guided_prayer: "Risen Lord Jesus, Emmanuel, how precious is Your promise to be with me always, even to the end of the age! As I prepare to close this year and step forward into tomorrow, I anchor my soul in Your abiding presence. Thank You for walking with me through every valley and every sunrise. Go before me, stand beside me, and guide every step I take in the days ahead. To You be all the glory. Amen.",
    daily_intention: "I will walk forward with confidence today, knowing that Jesus is with me always, even to the end of the age.",
    practical_action: "Look back through your journal or calendar from this past year and write a prayer of thanksgiving for three specific times God was with you.",
    evening_reflection_prompt: "Did you rest in the certainty of Emmanuel's unending presence with you throughout this day?"
  },

  // Day 364 (Week 5: Walking Forward with Emmanuel) -> Jude 24-25
  364: {
    title: "Able to Keep You from Stumbling",
    scripture_primary_reference: "Jude 24-25",
    scripture_primary_text: "Now to him who is able to keep them from stumbling, and to present you faultless before the presence of his glory in great joy, to God our Savior, who alone is wise, be glory and majesty, dominion and power, both now and forever. Amen.",
    reflection_body: "On the penultimate day of the year, Jude delivers one of the most magnificent doxologies in all of Holy Scripture: 'Now to him who is able to keep them from stumbling, and to present you faultless before the presence of his glory in great joy.' What an extraordinary assurance for weary pilgrims! Left to our own strength, we would stumble and fall a thousand times a day. But your preservation does not depend upon your fragile grip on God; it depends upon His almighty grip on you. He is able to keep you from falling away. And His ultimate goal is breathtaking: He will present you faultless before the blazing presence of His glory, not in terrifying dread, but in great, overflowing joy! The blood of Jesus has so thoroughly cleansed your soul that you will stand before the Holy God without a single blemish or accusation. All glory, majesty, dominion, and power belong to our wise Savior God, both now and throughout all eternity. As you finish this year, lift your hands in triumphant worship. Your salvation is secure in Christ.",
    reflection_questions: [
      "How does knowing that God is able to keep you from stumbling relieve your anxiety about the future?",
      "What does it mean to you that Jesus will present you 'faultless before His glory in great joy'?",
      "How does this magnificent doxology inspire you to live with triumphant praise as this year ends?"
    ],
    guided_prayer: "To You, O God our Savior, who alone is wise, be all glory, majesty, dominion, and power, both now and forever! Thank You for holding me fast when my strength fails. Thank You that You are able to keep me from stumbling, and that through the blood of Jesus, You will present me faultless before Your presence with great joy. I trust my life, my family, and my future completely into Your mighty hands. Amen.",
    daily_intention: "I will praise my Savior God today, resting securely in His power to keep me from stumbling.",
    practical_action: "Read Jude 24-25 aloud three times today as a personal prayer and declaration of praise to the Lord.",
    evening_reflection_prompt: "Did you experience the joy and security of knowing that God's almighty hand is holding you fast?"
  },

  // Day 365 (Week 5: Walking Forward with Emmanuel) -> Revelation 22:20-21
  365: {
    title: "Yes, Come, Lord Jesus! Amen",
    scripture_primary_reference: "Revelation 22:20-21",
    scripture_primary_text: "He who testifies these things says, 'Yes, I come quickly.' Amen! Yes, come, Lord Jesus. The grace of the Lord Jesus Christ be with all the saints. Amen.",
    reflection_body: "We have reached Day 365. Over the course of this sacred year, you have walked with Jesus through new mercies, surrender, resurrection hope, wisdom, refuge, Sabbath rest, compassion, courage, thanksgiving, and the wonder of Emmanuel. Now, Holy Scripture concludes with the final promise of the Savior and the ultimate cry of the redeemed: 'He who testifies these things says, \"Yes, I come quickly.\" Amen! Yes, come, Lord Jesus.' All of human history is rushing toward this glorious consummation: the trumpet will sound, the clouds will part, and our King will return to wipe away every tear, banish every sorrow, and make all things new. Until that triumphant day arrives, John leaves us with the supreme treasure that sustains our pilgrimage: 'The grace of the Lord Jesus Christ be with all the saints. Amen.' Grace began your journey, grace has carried you through every page of this year, and grace will safely lead you home. Step forward into the new year with holy joy, bold faith, and expectant hope. Emmanuel is with you forever. Amen!",
    reflection_questions: [
      "How has your relationship with Jesus deepened over the course of these 365 daily devotionals?",
      "Does the prayer 'Yes, come, Lord Jesus!' resonate with holy anticipation in your heart today?",
      "How will you carry the lavish grace of Jesus into the new year that lies before you?"
    ],
    guided_prayer: "Lord Jesus Christ, my Savior, my King, and my Emmanuel! Thank You for walking with me through every single day of this past year. You have been my refuge, my strength, my peace, and my joy. I fix my eyes on Your promised return and pray with all my heart: Amen! Yes, come, Lord Jesus! May Your abundant grace be with me and with all the saints as we step into tomorrow. To You alone be all honor, glory, and praise forever and ever. Amen!",
    daily_intention: "I conclude this 365-day walk with triumphant praise, stepping forward into the future with Emmanuel.",
    practical_action: "Take a quiet walk or kneel in prayer, expressing heartfelt thanksgiving to Jesus for carrying you through the entire year.",
    evening_reflection_prompt: "As you finish Day 365, how is your soul overflowing with gratitude for Emmanuel, God with you forever?"
  }
};

// Apply corrections
let correctedCount = 0;
const seenTitles = new Set();

// First check titles of Days 1–243 to avoid any title collision
for (let d = 1; d <= 243; d++) {
  const entry = entries.find(e => e.day_number === d);
  if (entry) seenTitles.add(entry.title);
}

// Now process Days 244–365
for (let d = 244; d <= 365; d++) {
  const entryIdx = entries.findIndex(e => e.day_number === d);
  if (entryIdx === -1) {
    console.error(`Day ${d} not found in DEVOTIONAL_ENTRIES!`);
    continue;
  }

  if (CORRECTIONS[d]) {
    const c = CORRECTIONS[d];
    entries[entryIdx].title = c.title;
    entries[entryIdx].scripture_primary_reference = c.scripture_primary_reference;
    entries[entryIdx].scripture_primary_text = c.scripture_primary_text;
    entries[entryIdx].reflection_body = c.reflection_body;
    entries[entryIdx].reflection_questions = c.reflection_questions;
    entries[entryIdx].guided_prayer = c.guided_prayer;
    entries[entryIdx].daily_intention = c.daily_intention;
    entries[entryIdx].practical_action = c.practical_action;
    entries[entryIdx].evening_reflection_prompt = c.evening_reflection_prompt;
    correctedCount++;
  }

  const currentTitle = entries[entryIdx].title;
  if (seenTitles.has(currentTitle)) {
    console.warn(`WARNING: Duplicate title on Day ${d}: "${currentTitle}"`);
  }
  seenTitles.add(currentTitle);

  // Validate lengths
  const refWords = entries[entryIdx].reflection_body.trim().split(/\s+/).length;
  const prayerWords = entries[entryIdx].guided_prayer.trim().split(/\s+/).length;
  if (refWords < 150 || refWords > 250) {
    console.warn(`Day ${d} reflection word count out of range: ${refWords}w`);
  }
  if (prayerWords < 50 || prayerWords > 100) {
    console.warn(`Day ${d} prayer word count out of range: ${prayerWords}w`);
  }
  if (entries[entryIdx].reflection_questions.length !== 3) {
    console.warn(`Day ${d} does not have exactly 3 reflection questions`);
  }
  for (const q of entries[entryIdx].reflection_questions) {
    if (!q.trim().endsWith("?")) console.warn(`Day ${d} question does not end with '?': ${q}`);
  }
  if (!entries[entryIdx].evening_reflection_prompt.trim().endsWith("?")) {
    console.warn(`Day ${d} evening prompt does not end with '?'`);
  }
}

console.log(`Successfully applied corrections to ${correctedCount} entries!`);

// Format DEVOTIONAL_ENTRIES cleanly as TypeScript objects with unquoted keys
function formatEntry(entry) {
  const lines = ["  {"];
  lines.push(`    day_number: ${entry.day_number},`);
  lines.push(`    month_number: ${entry.month_number},`);
  lines.push(`    day_of_month: ${entry.day_of_month},`);
  lines.push(`    weekly_subtheme: ${JSON.stringify(entry.weekly_subtheme)},`);
  lines.push(`    title: ${JSON.stringify(entry.title)},`);
  lines.push(`    scripture_primary_reference: ${JSON.stringify(entry.scripture_primary_reference)},`);
  lines.push(`    scripture_primary_text: ${JSON.stringify(entry.scripture_primary_text)},`);
  lines.push(`    scripture_translation: ${JSON.stringify(entry.scripture_translation)},`);
  lines.push(`    reflection_body: ${JSON.stringify(entry.reflection_body)},`);
  lines.push(`    reflection_questions: [`);
  entry.reflection_questions.forEach((q, idx) => {
    const comma = idx < entry.reflection_questions.length - 1 ? "," : "";
    lines.push(`      ${JSON.stringify(q)}${comma}`);
  });
  lines.push(`    ],`);
  lines.push(`    guided_prayer: ${JSON.stringify(entry.guided_prayer)},`);
  lines.push(`    daily_intention: ${JSON.stringify(entry.daily_intention)},`);
  lines.push(`    practical_action: ${JSON.stringify(entry.practical_action)},`);
  lines.push(`    evening_reflection_prompt: ${JSON.stringify(entry.evening_reflection_prompt)}`);
  lines.push("  }");
  return lines.join("\n");
}

const fileHeader = `import { DevotionalEntry } from "../types";

export const DEVOTIONAL_ENTRIES: DevotionalEntry[] = [
`;

const entriesFormatted = entries.map(formatEntry).join(",\n");

const fileFooter = `
];

export const DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function getDayMonthMapping(dayOfYear: number): { month: number; dayOfMonth: number; monthNumber: number } {
  let remaining = dayOfYear;
  for (let m = 0; m < DAYS_PER_MONTH.length; m++) {
    if (remaining <= DAYS_PER_MONTH[m]) {
      return { month: m + 1, monthNumber: m + 1, dayOfMonth: remaining };
    }
    remaining -= DAYS_PER_MONTH[m];
  }
  return { month: 12, monthNumber: 12, dayOfMonth: 31 };
}

export function getDevotionalEntry(dayNumber: number): DevotionalEntry {
  const safeDay = Math.max(1, Math.min(365, isNaN(dayNumber) ? 1 : Math.floor(dayNumber)));
  const found = DEVOTIONAL_ENTRIES.find((d) => d.day_number === safeDay);
  if (found) return found;

  const { month, dayOfMonth } = getDayMonthMapping(safeDay);
  return {
    day_number: safeDay,
    month_number: month,
    day_of_month: dayOfMonth,
    weekly_subtheme: \`Month \${month} Reflection\`,
    title: \`Day \${safeDay}: Walking in Holy Presence\`,
    scripture_primary_reference: "Psalm 119:105",
    scripture_primary_text: "Your word is a lamp to my feet, and a light for my path.",
    scripture_translation: "World English Bible (WEB)",
    reflection_body: \`Welcome to Day \${safeDay} of your spiritual journey with Jesus. Even in seasons of quiet waiting or unwritten pages, God's steadfast love encompasses your path. Take this quiet moment to breathe deeply, release the anxieties of your heart, and rest in His enduring presence. He who began a good work in you will faithfully carry it to completion.\`,
    reflection_questions: [
      "Where have you experienced God's quiet faithfulness in your life recently?",
      "What burden can you surrender into Christ's loving hands today?",
      "How can you cultivate a deeper awareness of the Holy Spirit's presence throughout this day?"
    ],
    guided_prayer: "Lord Jesus, thank You for meeting me in this quiet sanctuary. Even when my path feels uncertain or incomplete, I trust that You hold every day of my year in Your hands. Grant me peace, wisdom, and steadfast joy as I walk with You today. Amen.",
    daily_intention: "I will walk with quiet confidence, trusting that God goes before me in all things.",
    practical_action: "Take three slow, prayerful breaths before starting your day, whispering: 'Lord, I am Yours.'",
    evening_reflection_prompt: "Where did you sense God's unexpected grace touching your heart today?"
  };
}

export const getDevotionalByDay = getDevotionalEntry;

export function getDevotionalsByMonth(monthNumber: number): DevotionalEntry[] {
  return DEVOTIONAL_ENTRIES.filter((e) => e.month_number === monthNumber);
}
`;

fs.writeFileSync(devotionalsPath, fileHeader + entriesFormatted + fileFooter, "utf-8");
console.log(`Updated ${devotionalsPath} successfully!`);
