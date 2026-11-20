import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(path.join(__dirname, ".."));
const devotionalsPath = path.join(projectRoot, "src/lib/content/devotionals.ts");

const revisions = {
  95: {
    reflection_body: "From the cross, Jesus spoke a profound word of divine accomplishment: Tetelestai—'It is finished.' This was not a cry of defeat, but a declaration that the Father's redemptive work was complete. In the Greek text, the verb teleō conveys bringing a task to its intended goal, completing an assigned mission, or fully discharging an obligation. When Jesus bowed His head, the sacrificial work of atonement was accomplished, the prophetic scriptures were fulfilled, and the way of reconciliation with God was opened forever. Yet many believers live as though Christ's sacrifice were only a down payment, feeling an anxious pressure to complete their standing before God through self-imposed guilt, endless penance, or religious striving. Hear the finality of the Savior's declaration: His work on our behalf is complete. We cannot add to what Christ has fulfilled, nor can our human efforts improve upon His perfect sacrifice. While discipleship calls us to daily obedience and love, our acceptance before God rests entirely upon what Jesus accomplished at Calvary. Rest your heart today in the finished redemption of Christ, trusting that His grace is sufficient for your salvation and peace.",
    guided_prayer: "Victorious Savior, I thank You for Your completed work upon the cross. Thank You that through Your willing sacrifice, the work of redemption is accomplished and my reconciliation with God is secure. Deliver me from the anxiety of trying to earn what You have freely given. Teach me to rest in Your finished righteousness, walking in joyful obedience and peace today. In Your holy name, Amen.",
    reflection_questions: [
      "How does knowing that Christ's redemptive work is complete bring relief from religious striving?",
      "What burden of guilt or self-condemnation can you entrust to the grace of the cross today?",
      "How does resting in Christ's finished work inspire grateful obedience rather than passive complacency?"
    ],
    daily_intention: "I will rest in the completed redemptive work of Christ, trusting His grace for my standing with God.",
    practical_action: "Whenever feelings of self-condemnation arise today, pause and thank Jesus that His work on your behalf is finished.",
    evening_reflection_prompt: "What quiet peace entered your spirit today as you rested in the finished work of Christ?"
  },
  98: {
    reflection_body: "Easter morning reveals the historical victory of Jesus Christ over the grave. The stone was rolled away from the tomb, and as the disciples observed, the linen cloths were lying there, with the face cloth that had been on Jesus' head rolled up in a place by itself. Peter, who had denied Jesus in shame on the night of His betrayal, writes with awe from the reality of the resurrection: God has caused us to be born again to a 'living hope.' Biblical hope is not fragile wishful thinking or optimism based on favorable circumstances. Rather, it is a living, enduring hope grounded in historical reality: Jesus Christ was bodily raised from the dead. While Scripture does not promise that every earthly sorrow, illness, or broken circumstance will be resolved or reversed during our lifetime, the resurrection guarantees that suffering does not possess the final word. In Christ, our future is secure, and God's redemptive grace sustains us through every present valley. When grief or fatigue presses upon your soul, anchor your heart in the living Lord who conquered death and whose mercy endures forever.",
    guided_prayer: "Living Lord Jesus, I praise You for Your bodily resurrection from the dead! Thank You for giving me a living hope that is not shaken by earthly uncertainties, aging, or sorrow. In seasons when circumstances are difficult, anchor my heart in the truth of Your empty tomb. Let the reality of Your victory over death give me quiet endurance and steadfast faith today. In Your holy name, Amen.",
    reflection_questions: [
      "How does Peter's testimony of a 'living hope' differ from fragile, worldly wishful thinking?",
      "Why is it reassuring that Christian hope is grounded in the historical fact of Christ's resurrection?",
      "How can the living hope of the resurrection give you endurance in an unresolved earthly trial?"
    ],
    daily_intention: "I will anchor my thoughts in the living hope of Christ's resurrection today.",
    practical_action: "Take a quiet walk or pause today to thank God for the historical reality of Jesus' resurrection from the dead.",
    evening_reflection_prompt: "How did meditating on a living hope bring quiet steadiness to your heart during the day?"
  },
  102: {
    reflection_body: "In Romans 6:4, the apostle Paul reveals that Christ's resurrection is not only a future promise, but the pattern for our present walk of faith. Through union with Christ, our old self was crucified and buried with Him, so that just as Christ was raised by the glory of the Father, we too might 'walk in newness of life.' The word 'newness' (kainotēs) points to a fresh quality of existence governed by grace rather than the dominion of sin. Walking in newness of life does not mean believers will never feel difficult emotions such as sorrow, anxiety, or anger. Emotions are part of our God-given human experience in a fallen world. Rather, Paul is speaking of our liberation from the tyrannical rule of sin. We are no longer compelled to let bitterness dictate our actions, let deceit govern our relationships, or live trapped in destructive behaviors. In Christ, we have been reconciled to God and given the Holy Spirit to guide our steps. When challenging feelings or temptations arise, we can turn to the Lord with honesty, choosing to walk in truth, humility, and grace as people made alive in Christ.",
    guided_prayer: "Father of Glory, thank You that through union with Jesus Christ, I am freed from the dominion of sin and invited to walk in newness of life. When I experience difficult emotions or stress, teach me not to give way to destructive reactions, but to bring my honest heart to You. Guide my steps in integrity, kindness, and truth today. Through Jesus Christ our Lord, Amen.",
    reflection_questions: [
      "How does distinguishing between human emotions and destructive behaviors bring clarity to your spiritual walk?",
      "What does it mean for your daily decisions that you are no longer under the dominion of sin?",
      "Where can you choose a response of grace, truth, or patience in a challenging situation today?"
    ],
    daily_intention: "I will walk in the newness of life in Christ, choosing responses guided by grace and truth.",
    practical_action: "When a stressful emotion arises today, pause, acknowledge the feeling before God, and choose a constructive, grace-filled response.",
    evening_reflection_prompt: "How did remembering your new life in Christ help you respond with patience and wisdom today?"
  },
  107: {
    reflection_body: "Psalm 30 is a song of thanksgiving in which David remembers God's deliverance from distress and danger. With poetic sensitivity, the psalmist contrasts the transient nature of human affliction with the enduring reality of divine favor: 'Weeping may stay for the night, but joy comes in the morning.' In human experience, the 'night' of sorrow often lasts far longer than a few calendar hours; it can encompass extended seasons of bereavement, chronic illness, loneliness, or relational heartache. Scripture does not present this verse as a formula predicting that sorrow will end on a neat earthly timetable, nor does it dismiss the deep ache of prolonged trials. Rather, the psalmist anchors our hope in the unshakeable character of God: His covenant love and favor endure for a lifetime. Tears and lament are real and honored by God, but they do not possess the final word in a believer's story. The resurrection of Jesus Christ stands as God's eternal pledge that light overcomes darkness. As you navigate seasons of hardship, hold fast to the assurance that God's steadfast love remains your steady refuge through every dark valley.",
    guided_prayer: "Faithful Father, thank You that Your covenant love and favor endure through every season of life. When seasons of sorrow or uncertainty feel prolonged, give me the patience and faith to wait upon You. Keep my heart anchored in Your steadfast promises, knowing that grief will not have the final say. Sustain my spirit with Your comfort and peace today. In Christ's name, Amen.",
    reflection_questions: [
      "How does knowing that God's favor is lifelong encourage you during extended seasons of sorrow?",
      "Why is it helpful to recognize that Psalm 30 does not promise a quick, predictable timeline for ending grief?",
      "What reminder of God's steadfast love can you hold onto as a refuge today?"
    ],
    daily_intention: "I will trust in God's enduring favor, knowing His steadfast love outlasts every season of sorrow.",
    practical_action: "When feeling weary today, pause and recite Psalm 30:5, anchoring your heart in God's eternal faithfulness.",
    evening_reflection_prompt: "What reminder of God's enduring presence and favor sustained your heart today?"
  },
  115: {
    reflection_body: "In Colossians 3:1–2, the apostle Paul presents both a foundational spiritual reality and an active daily calling. Because believers have been raised with Christ, Paul commands: 'Seek the things that are above, where Christ is, seated on the right hand of God. Set your mind on the things that are above, not on the things that are on the earth.' Notice the precise focus of the passage: Christ Himself is seated in glory at the right hand of God, having completed His earthly work. (In Ephesians 2:6, Paul similarly notes that God has raised us up and seated us with Christ in the heavenly realms.) Setting our minds on things above is a conscious orientation of the heart toward Christ's kingdom, truth, and love. It does not mean withdrawing from daily life or neglecting practical earthly responsibilities. Rather, it means fulfilling our work, relationships, and duties with a heavenly perspective. When daily pressures, deadlines, and temporal frustrations threaten to overwhelm your peace, choose to reset your focus on Christ who reigns supreme. Earthly troubles are temporary, but Christ's kingdom and His promises endure forever.",
    guided_prayer: "Ascended Lord Jesus, You are seated in majesty at the right hand of God the Father. When my mind becomes consumed with temporal frustrations, daily pressures, or worldly anxieties, lift my gaze to You. Help me to set my mind on things above—on Your eternal truth, Your righteousness, and Your kingdom. May Your heavenly peace govern my thoughts and actions today. Amen.",
    reflection_questions: [
      "How does Colossians 3:1–2 direct our attention to Christ seated at God's right hand?",
      "What does it look like in practice to set your mind on heavenly realities while fulfilling everyday responsibilities?",
      "Where can you deliberately reset your focus on Christ's eternal kingdom during stressful moments today?"
    ],
    daily_intention: "I will set my mind on things above, looking to Christ who is seated at God's right hand.",
    practical_action: "When feeling distracted or pressured by daily tasks today, pause for thirty seconds and meditate on Christ reigning in majesty.",
    evening_reflection_prompt: "How did keeping a heavenly perspective bring peace and focus to your thoughts today?"
  },
  116: {
    reflection_body: "In 2 Corinthians 5:17, Paul declares the heart of gospel transformation: anyone who is in Christ is a new creation (kainē ktisis). The old order of spiritual condemnation and alienation has passed away, and reconciliation with God has begun. This verse proclaims the believer's complete forgiveness and new standing in Christ. However, being a new creation does not mean that all earthly consequences of past actions instantly disappear. A forgiven believer may still need to manage practical responsibilities, financial debts, or life changes with wisdom and humility. Where relationships have experienced strain, reconciliation is a worthy pursuit only when it is truly safe, mutual, and wise. Scripture never commands believers to expose themselves to abuse, threat, or manipulation; personal forgiveness and godly boundaries walk hand in hand. Grace does not rewrite history, but it redeems the person living today. You are no longer defined by past failures, old guilt, or the labels of the world; you are defined by your union with Christ. Walk forward in the freedom of your new identity, honoring God with integrity, wisdom, and a clean conscience.",
    guided_prayer: "Heavenly Father, thank You for the truth that in Christ I am a new creation. Thank You that my past sins and failures no longer define my standing before You. Grant me wisdom, humility, and courage to walk in integrity, honoring You in my daily responsibilities while maintaining wise and healthy boundaries where needed. May my life reflect the beauty of Your redeeming grace. Amen.",
    reflection_questions: [
      "What does it mean for your daily walk that you are a new creation in Christ?",
      "Why is it vital to understand that forgiveness can coexist with wise, protective boundaries when reconciliation is unsafe?",
      "Where can you walk in the freedom of your new identity with integrity and wisdom today?"
    ],
    daily_intention: "I will walk in the freedom of my new creation in Christ with wisdom, humility, and healthy boundaries.",
    practical_action: "If you have an unresolved earthly matter, take one prayerful, wise step toward repair where safe and appropriate, or entrust an unsafe situation to God while keeping protective boundaries.",
    evening_reflection_prompt: "How did resting in your identity as a new creation in Christ guide your actions and choices today?"
  },
  117: {
    reflection_body: "Galatians 2:20 captures the core of Paul's understanding of Christian discipleship. The Christian life is not a strenuous attempt to copy Jesus by sheer human willpower, nor is it an ongoing exercise of self-reliant moralism. Rather, Paul explains that his old, self-justifying self was crucified with Christ, and that the risen Christ now lives within him through the Holy Spirit. Notice the careful distinction Paul maintains: 'the life which I now live in the flesh, I live by faith in the Son of God, who loved me and gave himself up for me.' Paul does not confuse believers with Christ, nor does he suggest that human personality is erased. Christ's historical Incarnation was unique, once-for-all, and unrepeatable. In believers, Christ dwells spiritually through faith, guiding our minds, shaping our affections, and empowering our obedience. When you face difficult decisions, demanding relationships, or feelings of personal inadequacy, you are not left to your own frail resources. Turn to Christ in prayer, trusting that His indwelling grace and wisdom are sufficient to guide every step of your journey.",
    guided_prayer: "Lord Jesus, thank You that I have been crucified with You, and that You now live within me. Thank You for loving me and giving Yourself up for me on the cross. Forgive me when I rely on my own frail strength to live the Christian life. Teach me to walk by faith in You each day, depending on Your grace and following Your gentle guidance. May Your selfless love shine through my ordinary life today. In Your holy name, Amen.",
    reflection_questions: [
      "How does living by faith in the Son of God differ from exhausting self-effort?",
      "Why is it important to distinguish between Christ's unique Incarnation and His spiritual presence in believers?",
      "What specific interaction today calls for relying on Christ's wisdom rather than self-reliance?"
    ],
    daily_intention: "I will live today by faith in the Son of God, depending on His indwelling grace and wisdom.",
    practical_action: "When tempted toward frustration or anxiety today, pause and whisper a prayer trusting Christ's wisdom to guide you.",
    evening_reflection_prompt: "In what moments today did you experience the quiet strength of relying on Christ by faith?"
  },
  120: {
    reflection_body: "As April concludes, Scripture points us to the glorious horizon of Christian hope: God's promised new creation. In Revelation 21, the apostle John envisions the day when God will dwell with His people and personally wipe away every tear from their eyes. Death, mourning, crying, and pain will be no more, for the former order of things will have passed away. From the throne comes the sovereign declaration: 'Behold, I make all things new.' It is vital to understand this passage as the ultimate cosmic and eternal redemption promised by God at the consummation of history. Revelation 21 is not a guarantee that every earthly heartache, chronic illness, broken relationship, or disappointment will be resolved during this present life. Believers continue to navigate real losses and unfulfilled longings in a fallen world. Yet the resurrection of Jesus Christ assures us that our present suffering is not the final chapter. The day is coming when God will bring full, everlasting restoration, banishing death and sorrow forever. Let this eternal promise anchor your soul with courage, giving you quiet perseverance and steadfast hope as you walk with Christ each day.",
    guided_prayer: "Sovereign Lord, I praise You for the blessed hope of the new creation. Thank You that death, sorrow, crying, and pain will not endure forever. When my earthly journey is marked by unresolved grief, physical weakness, or disappointment, anchor my heart in the certainty of Your eternal promises. Strengthen my faith to walk faithfully today, looking forward to the day when You make all things new. In Jesus' name, Amen.",
    reflection_questions: [
      "How does the promise of God's future new creation provide comfort during unresolved earthly heartaches?",
      "Why is it important to distinguish between God's ultimate eternal restoration and our present earthly experience?",
      "How can the assurance that God will wipe away every tear give you endurance for today's responsibilities?"
    ],
    daily_intention: "I will walk in steadfast hope, anchored in God's promise of the eternal new creation.",
    practical_action: "Take a quiet moment today to read Revelation 21:1–5, allowing its eternal perspective to bring peace to your spirit.",
    evening_reflection_prompt: "How has meditating on the promise of the new creation brought courage and perspective to your heart?"
  }
};

let content = fs.readFileSync(devotionalsPath, "utf-8");

for (const [dayStr, rev] of Object.entries(revisions)) {
  const dayNum = parseInt(dayStr, 10);
  
  const dayRegex = new RegExp(`(\\{\\s*day_number:\\s*${dayNum},\\s*[\\s\\S]*?\\n\\s*\\})`, "m");
  const match = content.match(dayRegex);
  if (!match) {
    console.error(`Could not find day ${dayNum} in devotionals.ts`);
    process.exit(1);
  }

  let dayBlock = match[1];

  dayBlock = dayBlock.replace(
    /reflection_body:\s*"([^"\\]|\\.)*"/,
    `reflection_body:\n      ${JSON.stringify(rev.reflection_body)}`
  );

  dayBlock = dayBlock.replace(
    /guided_prayer:\s*"([^"\\]|\\.)*"/,
    `guided_prayer:\n      ${JSON.stringify(rev.guided_prayer)}`
  );

  dayBlock = dayBlock.replace(
    /reflection_questions:\s*\[[\s\S]*?\]/,
    `reflection_questions: ${JSON.stringify(rev.reflection_questions, null, 2).split("\n").map((line, idx) => idx === 0 ? line : "      " + line).join("\n")}`
  );

  dayBlock = dayBlock.replace(
    /daily_intention:\s*"([^"\\]|\\.)*"/,
    `daily_intention:\n      ${JSON.stringify(rev.daily_intention)}`
  );

  dayBlock = dayBlock.replace(
    /practical_action:\s*"([^"\\]|\\.)*"/,
    `practical_action:\n      ${JSON.stringify(rev.practical_action)}`
  );

  dayBlock = dayBlock.replace(
    /evening_reflection_prompt:\s*"([^"\\]|\\.)*"/,
    `evening_reflection_prompt:\n      ${JSON.stringify(rev.evening_reflection_prompt)}`
  );

  content = content.replace(match[1], dayBlock);
  console.log(`Updated Day ${dayNum} in devotionals.ts`);
}

fs.writeFileSync(devotionalsPath, content, "utf-8");
console.log("Successfully wrote all 8 consolidated corrections to devotionals.ts!");
