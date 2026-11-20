import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(path.join(__dirname, ".."));
const devotionalsPath = path.join(projectRoot, "src/lib/content/devotionals.ts");

const revisions = {
  91: {
    reflection_body: "As April begins, our reflections turn toward the cross of Christ, where the deepest work of divine reconciliation was accomplished. In our daily routines, we can be tempted to move quickly past the solemnity of Calvary, eager to celebrate Easter morning. Yet the joy of the resurrection is rooted in the reality of what Jesus bore on our behalf. Seven centuries before the crucifixion, the prophet Isaiah wrote of the suffering Servant who was pierced for our transgressions and crushed for our iniquities. The penalty that established our peace with God fell upon Christ. Through His willing sacrifice, we receive forgiveness, reconciliation, and the gift of God's peace. Scripture does not promise that believers are instantly spared from physical infirmity, emotional grief, or bodily distress in this present life. We still live in a fallen world marked by sorrow and weakness. But Isaiah points us to a deeper, enduring reality: our fundamental separation from God has been bridged, and our ultimate healing is secured in Christ. In moments of weariness or heartache, we can look to the Savior whose wounds testify to a love that never abandons us.",
    guided_prayer: "Gracious Savior, I pause in humble reverence before Your cross. Thank You for bearing the penalty for my sins and making peace between God and my soul. In seasons when my body feels frail or my heart carries sorrow, remind me that Your love is near and steadfast. Help me to rest in the eternal reconciliation You purchased, trusting Your grace to sustain me through every earthly trial. In Your holy name, Amen.",
    reflection_questions: [
      "How does knowing Christ bore your sins to bring you peace with God comfort you in present trials?",
      "Why is it important to distinguish between eternal reconciliation and freedom from earthly suffering?",
      "Where can you invite Christ's sustaining grace into an area of weakness or sorrow today?"
    ],
    daily_intention: "I will rest in the peace and reconciliation secured for me through Christ's sacrifice.",
    practical_action: "Take a quiet moment today to thank Jesus for bearing your sins and giving you peace with God.",
    evening_reflection_prompt: "How did remembering Christ's sacrificial love bring quiet assurance to your heart today?"
  },
  97: {
    reflection_body: "Holy Saturday stands between the anguish of Good Friday and the triumph of the resurrection. On this quiet day, Jesus lay silent in the stone tomb of Joseph of Arimathea. The disciples were bewildered by grief, and the faithful women who had followed Jesus prepared burial spices before resting on the Sabbath according to the commandment. Consider the gravity of that Saturday: their beloved Lord was dead, their expectations seemed crushed, and heaven offered no immediate explanation. Yet even in the midst of sorrow, these women chose obedience, quietly observing the holy rest commanded in God's law. We often experience seasons that feel like Saturday: a difficult circumstance remains unresolved, prayers seem to echo in silence, and we cannot perceive how God will bring resolution. The temptation in such quiet seasons is to give way to panic or attempt to control outcomes by self-effort. While scripture does not claim that God is always working in identical ways during every silence, Holy Saturday demonstrates that God's redemptive plan was not undone by the grave. We can entrust our unresolved situations to the God whose faithfulness remains steady even when our eyes cannot see the dawn.",
    guided_prayer: "Faithful God, when my circumstances seem unresolved and my prayers are met with silence, grant me a quiet heart. Help me not to panic or lean upon my own understanding. Teach me to walk in patient obedience, trusting that Your sovereign care never wavers. I place my unresolved concerns into Your gentle hands, resting in Your holy presence today. Amen.",
    reflection_questions: [
      "What situation in your life currently feels unresolved or quiet as you wait upon God?",
      "How does the example of the women resting in obedience encourage you when answers seem delayed?",
      "What helps you release anxious striving and entrust your future to God's care?"
    ],
    daily_intention: "I will practice quiet trust in God today, releasing the need to control unresolved outcomes.",
    practical_action: "Identify one unresolved matter causing you anxiety and consciously place it in God's keeping in prayer.",
    evening_reflection_prompt: "Did choosing quiet trust in God bring a sense of rest to your mind today?"
  },
  99: {
    reflection_body: "Mary Magdalene stood outside the garden tomb weeping, overcome by deep sorrow. Her grief was so overwhelming that when the risen Jesus appeared, she did not recognize Him, assuming He was the caretaker of the grounds. It is a deeply human picture: in seasons of acute loss or heartbreak, our sorrow can obscure our perception of God's nearness. Yet notice the tenderness with which Christ responded. He did not dismiss Mary's tears or reprove her confusion. Instead, He met her directly within her sorrow and spoke her name: 'Mary.' In that personal utterance, she recognized her Lord and answered in reverence, 'Rabboni!' The risen Savior does not demand that we hide our grief or pretend our pain does not exist. He meets Mary at the site of her deepest sadness, revealing that death has been conquered and that He knows His followers personally. When tears or burdens weigh heavily upon you, remember that Jesus sees your sorrow and calls you by name. He walks alongside you in every valley, offering His comforting presence and grounding your heart in the certainty of His resurrection life.",
    guided_prayer: "Risen Lord, thank You for meeting me with gentleness when sorrow or confusion clouds my vision. Thank You that You know my name and do not turn away from my tears. Help me to hear Your comforting voice in the quiet moments of this day. May the reality of Your resurrection give me quiet strength and hope as I walk with You. Amen.",
    reflection_questions: [
      "How does knowing that Jesus met Mary in her grief encourage you when facing sorrow?",
      "In what practical ways can you listen for the reassuring voice of Scripture when overwhelmed?",
      "What personal burden can you bring honestly before the risen Savior today?"
    ],
    daily_intention: "I will seek the presence of the risen Christ, knowing He meets me with gentleness in every sorrow.",
    practical_action: "In a moment of quiet today, bring your genuine thoughts and tears to Jesus, thanking Him for His nearness.",
    evening_reflection_prompt: "How did recognizing Christ's presence bring comfort to your spirit throughout the day?"
  },
  106: {
    reflection_body: "In the prophetic ministry of Isaiah, ashes were a visible sign of profound grief, humiliation, and loss. When sorrow struck an ancient community, mourners sat in dust, signifying complete destitution. Yet in Isaiah 61, the prophet announces God's covenant promise to the afflicted: the Lord provides a garland of beauty instead of ashes, the oil of joy for mourning, and a garment of praise for a heavy spirit. This passage does not promise that every earthly loss will be erased or that grief can be quickly dismissed with forced cheerfulness. Grief is a real and honorable response to loss in a broken world. Rather, the prophet directs our hope to God's enduring mercy and His power to bring spiritual life out of desolation. God honors those who mourn and grants them grace to stand as 'trees of righteousness, the planting of Yahweh.' Even when circumstances leave us feeling depleted, God's redeeming work is quietly active, cultivating steadfast character and deep dependence on Him. Our sorrow is not meaningless in His sight, and His comfort remains a reliable refuge for every wounded heart.",
    guided_prayer: "Compassionate God, You see the brokenness and sorrow that touch our earthly lives. Thank You that You do not despise our grief, but offer Your holy comfort and peace. When my spirit feels heavy, clothe me in Your grace and grant me patient endurance. Plant my roots deep in Your righteousness, that my life may quietly honor and glorify You. In Jesus' name, Amen.",
    reflection_questions: [
      "How does Isaiah's promise of comfort help you navigate seasons of heaviness without forced cheer?",
      "What does it mean for your life to be rooted as a 'tree of righteousness' through difficult times?",
      "Where can you look for God's quiet comfort and grace in a current area of difficulty?"
    ],
    daily_intention: "I will look to God for comfort, allowing His grace to sustain my spirit in seasons of heaviness.",
    practical_action: "Offer an honest prayer of praise to God today, not ignoring your burdens, but honoring His unchanging faithfulness.",
    evening_reflection_prompt: "In what ways did God provide a quiet sense of comfort or endurance during your day?"
  },
  107: {
    reflection_body: "In Psalm 30, David reflects on God's deliverance from sickness and distress, contrasting the brief nature of affliction with the enduring reality of divine favor. Using poetic imagery, the psalmist writes that weeping may lodge as a traveler for the night, but joy comes with the morning. In human experience, the 'night' of sorrow often lasts far longer than a few hours; it can encompass seasons of grief, chronic illness, loneliness, or difficult family circumstances. Scripture does not present this verse as a facile promise that every hardship will vanish overnight or that tears will be instantly replaced by earthly happiness. Rather, the psalmist anchors our souls in the character of God: His covenant faithfulness and favor endure for a lifetime. Pain and sorrow are real, but they do not possess the final word in the life of a believer. The resurrection of Jesus Christ stands as God's ultimate pledge that light overcomes darkness and that life will swallow up death. As you navigate seasons of waiting or sorrow, hold fast to the assurance that God's steadfast love is your constant anchor.",
    guided_prayer: "Faithful Father, thank You that Your covenant love and favor endure through every season of life. When the nights of sorrow or uncertainty seem long, give me the patience and faith to wait on You. Keep my heart grounded in Your promises, knowing that grief will not have the final word. Sustain my spirit with Your peace today. In Christ's name, Amen.",
    reflection_questions: [
      "How does knowing that God's favor is lifelong encourage you during prolonged seasons of difficulty?",
      "Why is it helpful to remember that sorrow does not have the final word for a believer?",
      "How can you hold onto hope while honoring the reality of present grief or weariness?"
    ],
    daily_intention: "I will trust in God's enduring favor, knowing that His steadfast love outlasts every season of sorrow.",
    practical_action: "When feeling weary today, pause and recite Psalm 30:5, anchoring your heart in God's eternal faithfulness.",
    evening_reflection_prompt: "What reminder of God's enduring presence and favor sustained your heart today?"
  },
  110: {
    reflection_body: "The prophet Joel addressed a people devastated by a catastrophic locust invasion that stripped their agricultural land and left their economy ruined. In Joel 2, following a call to national repentance, God gave a covenant promise to restore what the locusts had consumed. It is easy for believers today to read this passage as an individual prosperity guarantee, imagining that God promises to literally reverse chronological time or compensate every missed personal opportunity. Yet biblical restoration is far richer and deeper than a worldly contract. While we cannot retrieve lost years or undo past decisions and hardships, God in His mercy meets us in the present. He takes the broken pieces of our lives and works redemptively within them, cultivating humility, compassion, and spiritual maturity that might never have grown otherwise. God does not promise a life untouched by regret or loss, but He promises that His grace is sufficient for today. Even after difficult or wasted seasons, the Lord can bring forth genuine spiritual fruit, renewed devotion, and a life that honors Him.",
    guided_prayer: "Lord God of Grace, I bring before You the seasons of my life that feel marked by regret, sorrow, or lost time. Thank You that Your mercy is new every morning and that my past cannot thwart Your redemptive work. Help me not to live in bitter regret over what cannot be undone, but to serve You faithfully today. Bear good fruit in my life for Your glory. Amen.",
    reflection_questions: [
      "How does understanding the covenant context of Joel 2 protect us from treating God's promises like a prosperity formula?",
      "In what ways can God produce spiritual fruit and maturity out of painful or difficult past seasons?",
      "What past regret do you need to release into God's forgiving and redeeming hands today?"
    ],
    daily_intention: "I will focus on serving God faithfully today, trusting His redeeming grace with my past.",
    practical_action: "Release one lingering regret to the Lord in prayer, asking Him to give you wisdom and purpose in this present season.",
    evening_reflection_prompt: "Did you experience freedom from past regrets as you trusted God with your life today?"
  },
  111: {
    reflection_body: "Romans 8:28 is among the most cherished verses in the New Testament, yet it is often misunderstood and applied unhelpfully to people in the midst of deep grief. The apostle Paul does not claim that every event in this fallen world is good in itself. Evil, tragedy, betrayal, disease, and death are real evils, not hidden goods, and God does not require evil to accomplish His purposes. What Paul affirms is something far more profound: in all things—even in the midst of suffering and hardship—God works sovereignly and redemptively for the good of those who love Him. The 'good' Paul has in mind is defined in the subsequent verse: being conformed to the image of His Son (Romans 8:29). God does not promise that earthly life will be comfortable, prosperous, or free from pain. Rather, He assures us that no suffering, loss, or affliction has the power to separate us from His love or defeat His ultimate purpose for our redemption. When trials press upon your heart, rest in the knowledge that God's redemptive power is greater than any tragedy you face.",
    guided_prayer: "Sovereign Lord, thank You that no hardship, sorrow, or trial is outside Your redeeming reach. Forgive me when I struggle to trust You in painful moments. Help me remember that while suffering is not good in itself, Your grace is able to work redemptively through all things to conform me to the likeness of Jesus. Anchor my heart in Your unfailing love today. Amen.",
    reflection_questions: [
      "Why is it comforting to know that God does not call evil or tragedy good, yet works redemptively through suffering?",
      "How does defining 'good' as being conformed to Christ reshape your perspective on personal trials?",
      "What difficult situation in your life can you entrust to God's sovereign care today?"
    ],
    daily_intention: "I will trust that God's redemptive grace is greater than any hardship I face today.",
    practical_action: "Pray for someone walking through a trial, asking God to give them comfort and strength without offering clichéd answers.",
    evening_reflection_prompt: "How did focusing on God's redemptive purpose help you navigate the challenges of your day?"
  },
  112: {
    reflection_body: "In Ephesians 1, Paul offers a pastoral prayer that the eyes of believers' hearts would be enlightened to grasp the spiritual riches given to them in Christ. He highlights 'the exceeding greatness of his power toward us who believe.' Paul defines this power by its greatest cosmic demonstration: the mighty working of God's strength that raised Jesus Christ from the dead and exalted Him above all earthly and spiritual rulers. It is crucial to understand resurrection power in its authentic biblical context. It is not an abstract energy source, a spiritual battery we tap into for personal productivity, or a technique for self-actualization. Rather, it is God's sovereign power at work in the church and within believers to preserve our faith, transform our hearts, and sustain us in holiness. When you face moral trials, spiritual warfare, or the weariness of daily obedience, remember that the God who overcame the grave is the one who keeps you. His power is demonstrated not in self-sufficient triumph, but in sustaining grace that upholds us in human weakness.",
    guided_prayer: "Almighty Father, open the eyes of my heart to understand the surpassing greatness of Your power toward those who believe. Forgive me when I reduce Your power to a tool for my own plans. Thank You that the same power that raised Jesus from the dead is actively preserving my faith and guiding my life. Uphold me today by Your mighty grace. In Jesus' name, Amen.",
    reflection_questions: [
      "How does Paul's description of resurrection power differ from worldly concepts of personal energy or strength?",
      "In what areas of your spiritual life do you need God's sustaining power rather than your own self-reliance?",
      "How does knowing Christ is exalted above all rulers give you peace regarding worldly uncertainties?"
    ],
    daily_intention: "I will rely on God's sovereign power to sustain my faith and guide my obedience today.",
    practical_action: "Pause before tackling a demanding task today and pray for God's sustaining grace and wisdom.",
    evening_reflection_prompt: "In what moments today did you rely on God's strength rather than your own limited capacity?"
  },
  113: {
    reflection_body: "In Romans 8:11, the apostle Paul articulates the great Christian hope concerning the physical body. If the Holy Spirit who raised Jesus from the dead dwells in you, God will also give life to your mortal bodies at the final resurrection through that same indwelling Spirit. This passage provides profound theological comfort, pointing directly to the future bodily resurrection of all believers. Paul is not offering a formula for immediate physical stamina, instant healing, or the reversal of bodily fatigue in our present earthly life. Believers continue to experience physical illness, the toll of aging, and the inevitable weakness of mortal frames. Yet we are not left in despair. The Holy Spirit dwelling within us is the pledge and guarantee that our present physical decay is not the final chapter of our existence. Just as Christ was bodily raised from the dead, so too will our mortal bodies be raised imperishable and glorious at His return. This eternal hope gives us patience and courage to endure physical limitations today, knowing our future is secure in God.",
    guided_prayer: "Everliving God, I thank You for the indwelling presence of Your Holy Spirit, who raised Jesus Christ from the dead. When my physical body feels weak, tired, or burdened by illness, anchor my soul in the promise of the future resurrection. Help me to steward my body well, while fixing my hope on the day when Christ will make all things new. In His precious name, Amen.",
    reflection_questions: [
      "How does the biblical promise of a future bodily resurrection provide comfort when facing physical weakness or illness?",
      "Why is it important to distinguish between future bodily resurrection and present earthly vitality?",
      "How can the assurance of eternity help you endure physical or emotional weariness today?"
    ],
    daily_intention: "I will anchor my hope in the future resurrection of the body, trusting God through physical weakness.",
    practical_action: "Take a quiet walk or rest today, thanking God for the gift of life and the eternal hope of bodily resurrection.",
    evening_reflection_prompt: "Did reflecting on the promise of future resurrection bring peace to your mind amidst physical fatigue today?"
  },
  114: {
    reflection_body: "Writing from imprisonment, the apostle Paul expressed the supreme desire of his life: to know Christ intimately, to experience the power of His resurrection, and to share in the fellowship of His sufferings, being conformed to His death. Paul is not romanticizing suffering or suggesting that hardships are inherently desirable. Nor does he claim that God deliberately inflicts suffering as a mandatory doorway to spiritual intimacy. Rather, Paul recognizes that following Jesus in a fallen world entails real opposition, sacrifice, and adversity. In Paul's theology, resurrection power and the fellowship of Christ's sufferings are held in sacred balance. When we face trials, persecution, or grief for Christ's sake, we discover that we are not isolated; we are sharing in the fellowship of our Savior, who walked the road of sorrow before us. Christ's resurrection power does not exempt us from difficulty, but empowers us to remain faithful, loving, and steadfast through it. As you navigate the demands and trials of discipleship, seek to know Christ deeply, trusting that His resurrection life will sustain you through every hardship.",
    guided_prayer: "Lord Jesus, my heart's deepest prayer is to know You more truly and walk closely with You each day. When discipleship brings hardship, misunderstanding, or sacrifice, comfort me with the fellowship of Your presence. Let the power of Your resurrection sustain my faith, that I may remain steadfast and reflect Your love in all circumstances. In Your holy name, Amen.",
    reflection_questions: [
      "How does Paul's desire to know Christ challenge superficial ideas of the Christian life?",
      "What does it mean to experience the fellowship of Christ's presence in seasons of hardship?",
      "How does resurrection power enable you to remain faithful when following Jesus requires sacrifice?"
    ],
    daily_intention: "I will seek to know Christ intimately today, drawing upon His resurrection life for steadfast obedience.",
    practical_action: "Read Philippians 3:7–11 slowly today, making Paul's prayer of knowing Christ your personal petition.",
    evening_reflection_prompt: "In what moments today did you sense the comfort and strength of Christ walking with you?"
  },
  116: {
    reflection_body: "In 2 Corinthians 5:17, Paul declares the heart of gospel transformation: anyone who is in Christ is a new creation (kainē ktisis). The old order of spiritual death, condemnation, and alienation from God has passed away, and reconciliation has begun. This verse proclaims the believer's complete forgiveness and new spiritual standing before God. However, biblical new creation does not mean that every earthly consequence of past decisions magically vanishes. A believer who has been forgiven may still need to repair fractured relationships, repay financial debts, or manage ongoing physical consequences with wisdom and integrity. Grace does not rewrite human history, but it redeems the person living in the present. You are no longer defined by your former sins, failures, or the labels of the world; you are defined by your union with Christ. While walking in the freedom of your new identity, God gives you the humility and grace to navigate life's practical responsibilities with a clean conscience. Stand firm today in the truth of who you are in Christ: forgiven, reconciled, and continually renewed by His grace.",
    guided_prayer: "Heavenly Father, thank You for the wondrous truth that in Christ I am a new creation. Thank You that my past sins and failures no longer define my standing before You. Grant me wisdom, humility, and courage to walk in integrity, repairing what is broken and honoring You in all my daily responsibilities. May my life reflect the beauty of Your redeeming grace. Amen.",
    reflection_questions: [
      "What does it mean for your daily life that you are a new creation in Christ?",
      "How do you distinguish between spiritual forgiveness and navigating practical earthly consequences?",
      "In what relationship or responsibility do you need God's wisdom to walk as a new creation today?"
    ],
    daily_intention: "I will walk in the freedom of my new creation in Christ while acting with humility and integrity.",
    practical_action: "If there is an unresolved earthly matter or relationship from your past, take one wise, prayerful step toward reconciliation.",
    evening_reflection_prompt: "How did resting in your identity as a new creation in Christ guide your actions and thoughts today?"
  },
  117: {
    reflection_body: "Galatians 2:20 captures the core of Paul's understanding of Christian discipleship. The Christian life is not a strenuous attempt to copy Jesus by sheer human willpower, nor is it an ongoing exercise of self-reliant moralism. Rather, Paul explains that his old, self-justifying self was crucified with Christ, and that the risen Christ now lives within him through the Holy Spirit. Notice the careful distinction Paul maintains: 'the life which I now live in the flesh, I live by faith in the Son of God, who loved me and gave himself up for me.' Paul does not confuse believers with Christ, nor does he suggest that human personality is erased. Christ's historical Incarnation was unique, once-for-all, and unrepeatable. In believers, Christ dwells spiritually through faith, guiding our minds, shaping our affections, and empowering our obedience. When you face difficult decisions, demanding relationships, or feelings of personal inadequacy, you are not left to your own frail resources. Turn to Christ in prayer, trusting that His indwelling grace and wisdom are sufficient to guide every step of your journey.",
    guided_prayer: "Lord Jesus, thank You that my life is hidden with You in God. Forgive me when I rely on my own willpower to live the Christian life. Teach me to walk by faith in You each day, yielding my thoughts, words, and actions to Your gentle guidance. May Your love and truth shine through my ordinary life today. In Your holy name, Amen.",
    reflection_questions: [
      "How does living by faith in the Son of God differ from exhausting self-effort?",
      "Why is it important to distinguish between Christ's unique Incarnation and His spiritual presence in believers?",
      "What specific interaction today calls for relying on Christ's wisdom rather than self-reliance?"
    ],
    daily_intention: "I will live today by faith in the Son of God, depending on His indwelling grace and wisdom.",
    practical_action: "When tempted toward frustration or anxiety today, pause and whisper a prayer trusting Christ's wisdom to guide you.",
    evening_reflection_prompt: "In what moments today did you experience the quiet strength of relying on Christ by faith?"
  },
  118: {
    reflection_body: "Paul concludes his magnificent prayer in Ephesians 3 with a doxology of boundless praise. Describing God's sovereign capacity, Paul writes that God is able to do 'exceedingly abundantly above all that we ask or think, according to the power that works in us.' It is vital to read this passage within its biblical context. Paul is not offering a blank check or guaranteeing that God will fulfill every personal dream, ambition, or private request according to our earthly expectations. Rather, Paul has been praying that the church would be strengthened with power through the Spirit, rooted in divine love, and filled with all the fullness of God. The exceeding greatness of God's power is displayed primarily in the spiritual transformation of His people and the eternal glory of Christ in the church. God's wisdom far surpasses human comprehension; often His answers look different than we anticipated, leading us deeper into holiness, love, and perseverance. Bring your prayers to God with reverence and trust, knowing that His sovereign ability to accomplish His redemptive purposes far exceeds anything we can imagine.",
    guided_prayer: "Almighty God, I praise You for Your infinite power and wisdom that surpass all human understanding. Forgive me when I seek to fit Your purposes into my own limited expectations. Thank You for the work of Your Holy Spirit within the church and within my heart. Accomplish Your holy will in my life, and let Christ be glorified through all generations. In His name, Amen.",
    reflection_questions: [
      "How does the context of Ephesians 3 focus God's power on spiritual maturity and love rather than personal wish-fulfillment?",
      "Why is it reassuring that God's wisdom in answering prayer is greater than our limited human imagination?",
      "What request can you bring to God today with trust in His perfect will and sovereign ability?"
    ],
    daily_intention: "I will pray with confidence in God's power, trusting His wisdom to answer according to His holy purpose.",
    practical_action: "Pray for your local church or community today, asking God to display His glory and love in and through them.",
    evening_reflection_prompt: "How did remembering God's surpassing wisdom bring peace to your prayer life today?"
  },
  119: {
    reflection_body: "When Paul speaks of 'our light affliction, which is for the moment,' he does not dismiss human suffering as trivial. Paul himself endured severe beatings, shipwrecks, imprisonment, hunger, and relentless peril. By any human standard, his trials were agonizing and heavy. Yet when Paul placed his suffering beside the vast horizon of eternity, he recognized that present afflictions are temporal, whereas the glory God is preparing is eternal and immeasurable. Scripture does not teach that suffering is mechanically converted into heavenly reward, nor does it ask us to minimize real sorrow. Rather, Paul offers pastoral perspective: our present trials, however painful, do not have the final say. They belong to a visible, passing world, while God's eternal promises—redemption, resurrection, and communion with Christ—remain steadfast forever. We are called to look beyond the visible, fleeting troubles of this life and fix the eyes of faith upon the unseen realities of God's kingdom. Let this eternal perspective guard your heart against despair, giving you endurance and hope as you walk through present trials.",
    guided_prayer: "Eternal Lord, when present trials and weariness press heavily upon my spirit, lift my eyes to Your eternal promises. Help me not to lose heart amidst temporal struggles, but to remember that my current sorrow is passing, while Your glory is everlasting. Teach me to walk by faith, fixing my gaze on the unseen realities of Your kingdom. In Jesus' precious name, Amen.",
    reflection_questions: [
      "How does Paul's contrast between temporal affliction and eternal glory help you navigate current hardships?",
      "What does it look like in practical terms to fix your gaze on unseen, eternal realities?",
      "How can keeping an eternal perspective protect your heart from despair during difficult seasons?"
    ],
    daily_intention: "I will look beyond present afflictions and fix the eyes of my heart on God's eternal promises.",
    practical_action: "When encountering a trial or frustration today, pause and remind yourself of the enduring, eternal kingdom of God.",
    evening_reflection_prompt: "How did keeping an eternal perspective provide comfort and balance to your thoughts today?"
  }
};

let content = fs.readFileSync(devotionalsPath, "utf-8");

for (const [dayStr, rev] of Object.entries(revisions)) {
  const dayNum = parseInt(dayStr, 10);
  
  // Find day object in devotionals.ts
  // Pattern: day_number: 91, ... up to next day_number or end of object
  const dayRegex = new RegExp(`(\\{\\s*day_number:\\s*${dayNum},\\s*[\\s\\S]*?\\n\\s*\\})`, "m");
  const match = content.match(dayRegex);
  if (!match) {
    console.error(`Could not find day ${dayNum} in devotionals.ts`);
    process.exit(1);
  }

  let dayBlock = match[1];

  // Update reflection_body
  dayBlock = dayBlock.replace(
    /reflection_body:\s*"([^"\\]|\\.)*"/,
    `reflection_body:\n      ${JSON.stringify(rev.reflection_body)}`
  );

  // Update guided_prayer
  dayBlock = dayBlock.replace(
    /guided_prayer:\s*"([^"\\]|\\.)*"/,
    `guided_prayer:\n      ${JSON.stringify(rev.guided_prayer)}`
  );

  // Update reflection_questions
  const questionsJson = JSON.stringify(rev.reflection_questions, null, 8)
    .replace(/^\[/m, "[\n        ")
    .replace(/\n\s*\]$/m, "\n      ]");
  dayBlock = dayBlock.replace(
    /reflection_questions:\s*\[[\s\S]*?\]/,
    `reflection_questions: ${JSON.stringify(rev.reflection_questions, null, 2).split("\n").map((line, idx) => idx === 0 ? line : "      " + line).join("\n")}`
  );

  // Update daily_intention
  dayBlock = dayBlock.replace(
    /daily_intention:\s*"([^"\\]|\\.)*"/,
    `daily_intention:\n      ${JSON.stringify(rev.daily_intention)}`
  );

  // Update practical_action
  dayBlock = dayBlock.replace(
    /practical_action:\s*"([^"\\]|\\.)*"/,
    `practical_action:\n      ${JSON.stringify(rev.practical_action)}`
  );

  // Update evening_reflection_prompt
  dayBlock = dayBlock.replace(
    /evening_reflection_prompt:\s*"([^"\\]|\\.)*"/,
    `evening_reflection_prompt:\n      ${JSON.stringify(rev.evening_reflection_prompt)}`
  );

  content = content.replace(match[1], dayBlock);
  console.log(`Updated Day ${dayNum} in devotionals.ts`);
}

fs.writeFileSync(devotionalsPath, content, "utf-8");
console.log("Successfully wrote all 14 revisions to devotionals.ts!");
