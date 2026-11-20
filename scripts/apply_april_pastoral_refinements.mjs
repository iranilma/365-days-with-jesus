import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(path.join(__dirname, ".."));
const devotionalsPath = path.join(projectRoot, "src/lib/content/devotionals.ts");

const revisions = {
  92: {
    reflection_body: "In the dark olive grove of Gethsemane, Jesus wrestled with the impending weight of the cross. The sweat falling from His brow like great drops of blood reveals the genuine anguish of His humanity. Yet in the apex of His distress, Jesus uttered the words that anchor Christian discipleship: 'Nevertheless, not my will, but yours, be done.' Gethsemane is the sacred place where honest prayer meets humble surrender. Many believers face cups they would never have chosen: prolonged physical illness, deep relational heartache, sudden bereavement, or difficult life transitions. It is not a sign of weak faith to honestly ask God if a cup of suffering might be removed; Jesus Himself offered that heartfelt petition. Holy maturity is found in the 'nevertheless' that follows. It is the quiet willingness to entrust our lives to the Father who raised Jesus from the dead. While Scripture does not promise that every difficult earthly circumstance will be reversed during this life, Christ's resurrection assures us that suffering does not have the final word. In eternal life, God will wipe away every tear, and in the present, His steadfast love is sufficient to sustain us.",
    guided_prayer: "Lord Jesus, thank You for Your faithful obedience in the garden of Gethsemane. When my heart shrinks back from difficult seasons, teach me to bring my honest longings to God. When circumstances cannot be changed, grant me the grace to pray: not my will, but Yours be done. Anchor my soul in the promise of eternal life, and sustain me with Your peace today. Amen.",
    reflection_questions: [
      "What difficult situation in your life are you currently bringing to God in honest prayer?",
      "How does Jesus' prayer in Gethsemane encourage you to be completely honest with God about your pain?",
      "How does the promise of eternal life give you perspective when earthly hardships remain unresolved?"
    ],
    daily_intention: "I will entrust my unresolved circumstances and honest prayers to the faithful care of my Heavenly Father.",
    practical_action: "Take a quiet moment today to pray honestly about a heavy burden, concluding with a prayer of humble trust in God.",
    evening_reflection_prompt: "Where did you sense God's sustaining peace after entrusting a difficult situation to Him today?"
  },
  93: {
    reflection_body: "The Apostle Paul urges us to share the same mindset that was in Christ Jesus, who though existing in the form of God, did not view equality with God as something to be grasped for selfish advantage. Instead, He emptied Himself by taking the form of a servant. In Roman antiquity, crucifixion was designed to inflict extreme public humiliation and strip the victim of earthly standing. Yet the Lord of glory willingly entered into that degradation out of holy, self-giving love. In a culture that frequently equates worth with status, recognition, and self-promotion, the cross calls believers to an entirely different standard: Christlike humility. Biblical humility does not mean self-contempt, neglecting legitimate personal needs, denying our God-given dignity, or tolerating abuse and mistreatment. Rather, as Philippians 2 demonstrates, true humility is freedom from selfish ambition and empty conceit. It is a secure, loving posture that chooses to value others and serve with quiet integrity. When we act with kindness and care without seeking human praise, we reflect the gentle heart of the Servant King who gave Himself for us.",
    guided_prayer: "Lord Jesus, I stand in awe of Your self-giving love and willingness to humble Yourself for our redemption. Cleanse my heart from selfish ambition, pride, and the craving for human approval. Teach me to walk with genuine humility, valuing others and serving with quiet faithfulness, while resting securely in the dignity and love You have given me. In Your holy name, Amen.",
    reflection_questions: [
      "How does Christ's example of self-giving love redefine true humility for your daily life?",
      "Why is it important to distinguish biblical humility from accepting mistreatment or neglecting legitimate needs?",
      "What is one simple way you can serve or encourage someone today with quiet, genuine kindness?"
    ],
    daily_intention: "I will reflect Christ's gentle humility today, serving others with kindness and without seeking human praise.",
    practical_action: "Choose an act of quiet, unheralded kindness today—such as offering a sincere word of encouragement or yielding gracefully in a conversation.",
    evening_reflection_prompt: "How did practicing Christlike humility and patience bring a sense of peace to your interactions today?"
  },
  94: {
    reflection_body: "While hanging upon the cross, enduring cruel mockery and excruciating physical agony, Jesus opened His mouth in prayer: 'Father, forgive them, for they don’t know what they are doing.' The first word from the cross was a plea for divine mercy upon His executioners. Forgiveness at Calvary was not a sentimental dismissal of wrongdoing, nor did it minimize the horror of sin. It was the supreme demonstration of divine love absorbing human evil. In our lives, many of us carry deep wounds from people who were thoughtless, cruel, or unrepentant. Forgiveness is rarely an instant emotional event; it is often a gradual, prayerful process that takes time. Biblical forgiveness does not require forgetting what occurred, pretending harm was trivial, automatically restoring broken trust, or pursuing reconciliation where safety is compromised. Nor does it require remaining in contact with someone who has caused harm. Rather, forgiveness is the intentional surrender of personal vengeance into the hands of a just and holy God. In releasing the desire for retaliation, we entrust justice to the Lord and allow His grace to guard our hearts in peace.",
    guided_prayer: "Merciful Lord, thank You for the boundless grace demonstrated at the cross when You prayed for Your persecutors. When I wrestle with deep wounds or the pain of mistreatment, grant me patience with the process of forgiveness. Help me to surrender all desire for revenge into Your just hands. Protect my heart from bitterness while giving me the wisdom to maintain healthy, safe boundaries. In Jesus' name, Amen.",
    reflection_questions: [
      "How does viewing forgiveness as a gradual surrender of vengeance to God bring relief when emotions take time to heal?",
      "Why is it vital to understand that forgiveness does not require reconciliation, automatic trust, or staying in unsafe situations?",
      "What step of prayerful release can you take today regarding an offense or hurt from your past?"
    ],
    daily_intention: "I will entrust all judgment and vengeance to God, seeking His peace as I walk through the process of forgiveness.",
    practical_action: "In a quiet prayer, surrender any desire for retaliation to the Lord, asking Him for wisdom to maintain wise and safe boundaries.",
    evening_reflection_prompt: "Did entrusting justice to God help bring a measure of calm and relief to your mind today?"
  },
  100: {
    reflection_body: "On the first Easter morning, the faithful women arrived at the tomb carrying burial spices to care for the body of Jesus. Their actions were born of profound love, loyalty, and deep sorrow. When the angels asked, 'Why do you seek the living among the dead? He isn't here, but is risen,' they were not rebuking the women’s grief. Bereavement, sorrow over lost hopes, and the pain of difficult endings are genuine, holy aspects of the human experience. The angelic announcement did not demand an immediate end to tears, but proclaimed an astonishing historical reality: physical death did not hold Jesus Christ. In the Christian life, deep sorrow and enduring hope can walk together. We mourn real losses—the death of loved ones, the end of cherished seasons, and the ache of broken dreams—yet we do not grieve as those who have no hope. The resurrection does not ask us to pretend that painful endings do not hurt. Instead, it assures our hearts that Christ is alive today, walking with us in our grief, and that death and heartbreak will not have the ultimate word.",
    guided_prayer: "Living Lord, I thank You that death could not hold You and that You are alive forevermore. When grief, loss, or the pain of difficult endings weighs upon my heart, remind me that You understand my sorrow. Help me to hold fast to the living hope of Your resurrection, trusting that Your presence walks with me through every valley of tears. In Your holy name, Amen.",
    reflection_questions: [
      "How does knowing that the angels did not rebuke the women's grief validate your own seasons of sorrow?",
      "In what ways can living Christian hope and genuine human grief coexist in a believer's heart?",
      "What loss or difficult ending can you entrust to the living Savior today, knowing He walks with you?"
    ],
    daily_intention: "I will hold onto the living hope of the resurrection, allowing God's presence to comfort me in every sorrow.",
    practical_action: "When feelings of grief or loss surface today, offer them gently to Christ, resting in the assurance that He is alive and near.",
    evening_reflection_prompt: "How did the living presence of Christ bring quiet reassurance to your heart during moments of sadness today?"
  },
  103: {
    reflection_body: "In 1 Corinthians 15, the apostle Paul proclaims the ultimate triumph of the gospel over mortality. Quoting the prophetic scriptures, he rejoices that death has been swallowed up in victory through our Lord Jesus Christ. Scripture does not minimize death; Paul candidly calls death 'the last enemy that will be destroyed' (1 Corinthians 15:26). In this present world, we still feel the heavy sting of bereavement, the frailty of our physical bodies, and the sorrow of separation when loved ones pass away. Christ’s resurrection does not mean that earthly trials, illnesses, or losses cease to be painful, nor does it guarantee earthly immunity from suffering. Rather, Paul’s triumphant declaration gives us unshakeable eternal hope: through Christ's victory over the grave, physical death is no longer the final word for those who belong to Him. Death has lost its ultimate power to sever us from God's love. We can face the uncertainties and losses of earthly life with quiet courage, knowing that our Savior has conquered the grave and that our eternal future is securely anchored in His resurrection life.",
    guided_prayer: "Lord God, thank You for the glorious victory You have given us through our Lord Jesus Christ. When the fear of death, illness, or loss troubles my heart, anchor my soul in the reality of the empty tomb. Grant me courage to face earthly uncertainties with quiet faith, resting in the blessed hope that death has been swallowed up in eternal victory. Through Christ our Lord, Amen.",
    reflection_questions: [
      "Why is it comforting that Scripture acknowledges death as a real enemy, yet one that Christ has defeated?",
      "How does the promise of Christ's victory over the grave give you strength when facing earthly losses?",
      "In what area of your life does the hope of eternal life bring courage to your heart today?"
    ],
    daily_intention: "I will face the day with quiet courage, anchored in Christ's eternal victory over death.",
    practical_action: "Take a moment today to thank God for the gift of eternal life through Jesus Christ, letting it quiet your fears.",
    evening_reflection_prompt: "How did meditating on Christ's victory bring peace to your mind when facing temporal concerns today?"
  },
  104: {
    reflection_body: "When the apostle John was exiled on the rugged island of Patmos, he was granted a vision of the glorified Christ. Overwhelmed by His majesty, John collapsed in reverent awe. Yet notice the compassionate posture of the Savior: He laid His right hand upon John and spoke reassuring words: 'Don’t be afraid... I am the Living One. I was dead, and behold, I am alive forevermore.' Jesus then declared that He holds the keys of Death and of Hades. In biblical imagery, holding keys denotes supreme authority over life, death, and eternity. This does not mean that God directly authors or causes every painful rejection, closed door, disappointment, or illness we experience in a broken world. Rather, it means that no earthly power, circumstance, or trial can overthrow Christ’s ultimate authority or separate believers from His redemptive care. If you find yourself in a season of isolation, fatigue, or uncertainty, remember that the living Savior draws near to comfort you. He who conquered death holds your eternal destiny securely in His hands, inviting you to rest in His unfailing grace today.",
    guided_prayer: "Glorified Lord Jesus, You are the First and the Last, the Living Savior who reigns forever. When isolation, fatigue, or closed doors in life leave me feeling anxious, lay Your comforting hand upon my heart and whisper: 'Don’t be afraid.' Thank You that my eternal future is held securely in Your gracious hands. Teach me to trust You through every circumstance today. Amen.",
    reflection_questions: [
      "How does Jesus laying His hand on John demonstrate His personal compassion toward those who are overwhelmed?",
      "Why is it reassuring that Christ holds authority over eternity, even when earthly circumstances are difficult?",
      "What fear or uncertainty can you release to the Living Savior today as you hear Him say, 'Don’t be afraid'?"
    ],
    daily_intention: "I will rest in the comforting presence of Christ, trusting that my life and future are in His hands.",
    practical_action: "When feeling overwhelmed today, pause and remember Christ's reassuring words: 'Don’t be afraid; I am the Living One.'",
    evening_reflection_prompt: "Did remembering Christ's sovereign care and nearness bring comfort to your spirit today?"
  },
  105: {
    reflection_body: "In the synagogue at Nazareth, Jesus read this very passage from Isaiah, announcing that this prophetic promise was fulfilled in His coming (Luke 4:18–21). The Messiah’s mission is marked by deep compassion for the humble, the captive, and the brokenhearted. The Hebrew word for 'bind up' (chabash) describes the tender act of wrapping and bandaging a wound. Jesus does not turn away from human suffering; He draws near to those who carry the ache of sorrow, disappointment, and fractured relationships. It is essential to recognize what this passage reveals. Christ’s anointing brings spiritual redemption, genuine comfort, and the enduring hope of the gospel. It is not a contractual guarantee of immediate emotional relief or instantaneous physical healing in this life. Continued grief, chronic illness, or ongoing emotional struggle is never a sign of deficient faith. Rather, Scripture assures us that in our deepest weakness, Christ meets us with His sustaining presence. You do not need to hide your wounds or pretend to be self-sufficient; the Savior invites you to bring your broken heart to Him, receiving His tender mercy for each day.",
    guided_prayer: "Lord Jesus, thank You for Your tender heart toward the broken and weary. When my spirit carries hidden grief, disappointment, or physical distress, remind me that You are near. Deliver me from the false belief that ongoing struggle reflects a lack of faith. Wrap my heart in Your comforting grace, and grant me the endurance and peace I need to walk faithfully today. In Your name, Amen.",
    reflection_questions: [
      "How does knowing that Jesus draws near to bind up broken hearts bring comfort in times of sorrow?",
      "Why is it important to remember that ongoing physical or emotional struggle is not a sign of weak faith?",
      "What genuine hurt or weariness can you bring to the Savior today, resting in His compassionate care?"
    ],
    daily_intention: "I will bring my authentic sorrow and weakness to Christ, trusting in His gentle and sustaining grace.",
    practical_action: "Spend a few moments in honest prayer today, sharing your genuine heart with Jesus without feeling the need to hide your pain.",
    evening_reflection_prompt: "How did resting in Christ's compassion bring quiet comfort to your soul today?"
  },
  108: {
    reflection_body: "In ancient Israel, sackcloth was a coarse garment worn as an outward expression of raw mourning and lamentation. David sings with profound gratitude that God intervened in his season of distress, removing his sackcloth and clothing him with gladness so that his soul might offer praise. It is important to read this testimony with pastoral care. Grief is not a spiritual defect, and sorrow cannot be forced to adhere to an artificial timetable. God does not demand that you immediately cast aside your grief or force a cheerful countenance before your heart is ready. Rather, David’s psalm offers a gentle promise: sorrow does not hold a permanent claim over the life of a believer. In God’s patient timing and grace, healing and joy can quietly accompany and eventually outlast the deepest seasons of lament. Even when grief is still present, the seed of worship can remain alive in a believer’s heart. Allow God to meet you exactly where you are today, trusting that in His faithful care, morning light will gently break upon your soul.",
    guided_prayer: "Gracious God, thank You for David's testimony that You are able to turn mourning into gladness. When my heart is grieving or heavy with sorrow, give me patience with myself and trust in Your timing. Thank You that You do not demand superficial happiness, but gently sustain me with Your love. In Your time, restore joy to my spirit, and keep my heart anchored in praise. Amen.",
    reflection_questions: [
      "How does David's psalm encourage you to trust that sorrow will not have the final say in your life?",
      "Why is it freeing to know that God does not demand you rush your grief or force superficial cheerfulness?",
      "What small evidence of God's kindness can you give thanks for today, even amidst lingering sorrow?"
    ],
    daily_intention: "I will trust God with my grief and my healing, knowing His gentle grace sustains me in every season.",
    practical_action: "If your heart is heavy today, offer a quiet prayer of thanksgiving for one simple reminder of God's steadfast love.",
    evening_reflection_prompt: "Did allowing yourself to be honest about your feelings bring a sense of God's gentle presence to your day?"
  },
  109: {
    reflection_body: "Paul opens 2 Corinthians by praising 'the Father of mercies and God of all comfort.' The Greek word for comfort (paraklesis) describes God drawing alongside His people to provide strength, solace, and compassionate support. Paul notes that as we receive God's comfort in our afflictions, we often develop a deeper capacity to comfort others who face trials. It is vital to understand this passage without placing an unhealthy burden upon those who suffer. God does not inflict pain as a qualification for service, nor is every wounded person obligated to turn their suffering into a public ministry or platform. Healing is not contingent upon sharing your story, and no one is required to revisit past trauma to prove spiritual maturity. First and foremost, God comforts you because He loves you and cares for your hurting heart. If and when empathy for others flows naturally from your experienced grace, it is a fruit of God's love, not a burdensome duty. Rest in the tender comfort of the Father today, knowing that His mercy is given freely for your own healing and peace.",
    guided_prayer: "Father of mercies and God of all comfort, thank You for drawing close to me in my times of trial and weakness. Thank You that Your comfort is a gift of Your love, not a demand for performance. When my heart is weary, let me rest quietly in Your tender care. Help me to receive Your mercy today, and fill my soul with Your gentle peace. In Jesus' name, Amen.",
    reflection_questions: [
      "How does knowing that God comforts you simply because He loves you bring rest to your spirit?",
      "Why is it important to remember that healing and sharing your story are not mandatory obligations?",
      "In what area of your life do you need to receive the gentle comfort of the Father today?"
    ],
    daily_intention: "I will rest in the comfort and mercy of the Father today, receiving His grace without feeling pressure to perform.",
    practical_action: "Take a quiet rest today, thanking God that His love is unconditional and His comfort is freely given to you.",
    evening_reflection_prompt: "How did resting in God's mercy and comfort bring peace to your heart throughout the day?"
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
console.log("Successfully wrote all 9 pastoral refinements to devotionals.ts!");
