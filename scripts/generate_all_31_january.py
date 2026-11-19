import json
import sys

# Days 8 to 31 full data definitions
days_data = [
    # --- WEEK 2: Abiding as God's Daughter (Days 8–14) ---
    {
        "day_number": 8,
        "month_number": 1,
        "day_of_month": 8,
        "weekly_subtheme": "Abiding as God's Daughter",
        "title": "Behold, A New Spring in the Desert",
        "scripture_primary_reference": "Isaiah 43:18-19",
        "scripture_primary_text": "'Don't remember the former things, and don't consider the things of old. Behold, I will do a new thing. It springs out now. Don't you know it? I will even make a way in the wilderness, and rivers in the desert.'",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Human memory has a relentless, exhausting habit of dragging the past into the present. We replay old conversations that did not go well, second-guess painful decisions made years ago, and allow old failures to whisper who we are. But God speaks with tender, sovereign firmness into our memories: 'Don't consider the things of old.' He is not ignoring your history or minimizing your pain; He is redeeming it. Notice the vivid, life-giving imagery the prophet uses: God does not wait for the desert to become fertile or lush before He acts. He carves supernatural rivers directly in the middle of the dry, rocky wasteland. In whatever area of your life feels barren, parched, or completely drained of emotional reserves, God is already preparing new streams of refreshing grace. You do not have to engineer the path or force the water to flow through sheer exhaustion—you only need to turn your spiritual eyes toward the God who makes a way where there is no human way. Dwell in the stillness of His presence today and watch for the new life He is bringing forth.",
        "reflection_questions": [
            "What old narrative, failure, or painful regret from your past is currently draining your emotional energy?",
            "Where in your life or family do you feel like you are walking through a parched desert season?",
            "How can you train your spiritual eyes to notice the small, green shoots of God's 'new thing' today?"
        ],
        "guided_prayer": "Faithful Father, You are the God of supernatural new beginnings. I bring You the dry and weary places of my heart—where disappointment has hardened into quiet cynicism, or where long waiting has stolen my expectation. Forgive me for staring backward at what was lost instead of looking forward to what You are building. Open my spiritual eyes to behold the rivers You are carving in my desert. Pour Your living water into my thirsty spirit, and give me a holy expectancy for the good work You are doing in me today. In Jesus' name, Amen.",
        "daily_intention": "I will stop staring at closed doors and start looking for God's fresh streams in the desert.",
        "practical_action": "Write down one former disappointment on a scrap of paper, pray a sincere prayer of release, and shred or discard it as a physical act of surrender.",
        "evening_reflection_prompt": "Did you notice any unexpected kindness, beauty, or refreshing moment in your day? Thank God for that stream in the desert."
    },
    {
        "day_number": 9,
        "month_number": 1,
        "day_of_month": 9,
        "weekly_subtheme": "Abiding as God's Daughter",
        "title": "Crowned with Tender Compassion",
        "scripture_primary_reference": "Psalm 103:1-4",
        "scripture_primary_text": "Praise Yahweh, my soul! All that is within me, praise his holy name! Praise Yahweh, my soul, and don't forget all his benefits; who forgives all your sins; who heals all your diseases; who redeems your life from destruction; who crowns you with loving kindness and tender mercies.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "David composed Psalm 103 as a spiritual sermon delivered directly to his own inner being: 'Praise Yahweh, my soul... and don't forget all his benefits.' As women managing busy households, caregiving, demanding schedules, and complex relationships, our minds naturally gravitate toward what is lacking—the bills that remain unpaid, the laundry that piles up, and the unresolved emotional tensions. Spiritual amnesia sets in quickly when we feel physically or mentally overwhelmed. But look closely at how God treats you when you come before Him: He does not place a heavy yoke of endless demands upon your head; He crowns you with lovingkindness and tender mercies. A crown is placed only upon royalty. In Christ, your true status is not an anxious servant trying to survive another chaotic day, but a crowned daughter lavished with eternal, covenant grace. Let the weight of that golden crown silence the inner critic that tells you that you are falling behind. You are deeply loved, completely redeemed, and guarded by mercy.",
        "reflection_questions": [
            "What specific blessings or answered prayers has daily busyness caused you to forget recently?",
            "How does the truth that God has 'crowned' you with tender mercy shift how you view your identity today?",
            "When your soul feels downcast or discouraged, how can you preach God's faithfulness back to your own heart?"
        ],
        "guided_prayer": "Lord God of my salvation, my soul blesses Your holy name with all that is within me. Forgive my wandering thoughts that so easily complain about minor irritations while forgetting Your lavish goodness. Thank You for forgiving my sins, sustaining my health, and rescuing my life from the pit of despair. Thank You for crowning me with tender mercy. Today, I choose to wear that crown with humble dignity. Fill my mouth with thanksgiving, and let my home echo with praise for all You have done. In Jesus' loving name, Amen.",
        "daily_intention": "Today, I will preach gratitude to my soul instead of listening to my complaints.",
        "practical_action": "Speak Psalm 103:2 out loud: 'Praise Yahweh, my soul, and don't forget all his benefits.' Write down three specific benefits you have received this week.",
        "evening_reflection_prompt": "As you lie down tonight, recount five specific gifts from God that brought joy or relief to your day."
    },
    {
        "day_number": 10,
        "month_number": 1,
        "day_of_month": 10,
        "weekly_subtheme": "Abiding as God's Daughter",
        "title": "The Cry of the Beloved Child",
        "scripture_primary_reference": "Romans 8:14-16",
        "scripture_primary_text": "For as many as are led by the Spirit of God, these are children of God. For you didn't receive the spirit of bondservants again to fear, but you received the Spirit of adoption, by whom we cry, 'Abba! Father!' The Spirit himself testifies with our spirit that we are children of God.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Many believers spend years living spiritually as anxious orphans or hired servants. An employee works in constant fear of being reprimanded or fired if performance slips below expectations. An orphan scans the room constantly, wondering if anyone will provide food, shelter, or genuine safety. But Paul reminds us of a glorious, liberating truth: we did not receive a spirit of slavery leading back into fear. We have been legally, permanently adopted into the royal family of heaven. In Aramaic, 'Abba' is the intimate, affectionate cry of a toddler climbing into her father's lap, resting her head against his chest. You do not need to approach God with scripted, high-flown religious rhetoric or pretend that you have everything under control. When the demands of life make you feel small, weary, and completely overwhelmed, you can simply whisper, 'Abba, I need You.' He hears the whisper of His daughter with instantaneous tenderness and draws you into His safe keeping.",
        "reflection_questions": [
            "In what subtle ways do you still relate to God like an anxious employee rather than an adored daughter?",
            "What fears in your daily life would shrink if you truly believed that your Heavenly Father is completely committed to your care?",
            "How does the intimate word 'Abba' change the way you pray when you are exhausted or speechless?"
        ],
        "guided_prayer": "Abba Father, my heart melts at the wonder of Your adoption. Thank You that I am no longer a slave to fear, anxiety, or performance. The Holy Spirit inside me testifies that I belong to You forever. When the world demands that I prove my worth, remind me that my identity was sealed at the cross of Christ. Hold me in Your everlasting arms today. When my words run out, receive the quiet sighing of my spirit as a prayer of trust. I rest secure in Your fatherly embrace. In Jesus' name, Amen.",
        "daily_intention": "I live today out of my identity as an adopted, beloved daughter of the King.",
        "practical_action": "Whenever you feel hurried or anxious today, pause for 30 seconds, close your eyes, and whisper: 'Abba, Father, I am Your child.'",
        "evening_reflection_prompt": "Reflect on how your Heavenly Father watched over you today. Did you feel safe in His care?"
    },
    {
        "day_number": 11,
        "month_number": 1,
        "day_of_month": 11,
        "weekly_subtheme": "Abiding as God's Daughter",
        "title": "No Longer a Slave, But an Heiress",
        "scripture_primary_reference": "Galatians 4:6-7",
        "scripture_primary_text": "And because you are children, God sent out the Spirit of his Son into your hearts, crying, 'Abba, Father!' So you are no longer a bondservant, but a son; and if a son, then an heir of God through Christ.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "In the ancient world, a bondservant slept in the outer quarters, owned nothing, and ate scraps after the master's family had finished their meal. A bondservant had no legal claim on the family inheritance, no authority in the household, and lived in constant uncertainty regarding the master's favor. Yet so many Christian women live in spiritual poverty—straining under self-imposed guilt, feeling like spiritual second-class citizens, and surviving on spiritual crumbs. Paul declares your true legal standing in the Kingdom of God: you are an heir. Through Jesus Christ, all the unsearchable riches of God's wisdom, peace, joy, and overcoming grace belong to your spiritual inheritance right now. You are invited to sit at the banquet table of His presence every single day. Stop begging for scraps of peace when the entire storehouse of heaven has been opened for you in Christ.",
        "reflection_questions": [
            "Do you ever catch yourself feeling like you are surviving on spiritual 'crumbs' rather than feasting at the Father's table?",
            "What spiritual wealth (such as supernatural peace, patience, or discernment) is waiting for you to claim today as an heir of God?",
            "How would your demeanor change today if you walked into every room conscious of your royal inheritance in Christ?"
        ],
        "guided_prayer": "Lord Jesus, my heart overflows with gratitude for the inheritance You purchased for me with Your precious blood. Forgive me for acting like a spiritual pauper when You have made me a co-heir with Christ. Today, I step out of the shadows of fear, shame, and unworthiness. I receive Your wisdom for my decisions, Your peace for my home, and Your joy for my spirit. Let my life reflect the dignity and generosity of the royal family of God. In Your holy name, Amen.",
        "daily_intention": "I will live today as an heir of God's boundless grace, not as a slave to fear.",
        "practical_action": "Treat yourself and someone else with gracious dignity today—speak a blessing over a family member and remember who your Father is.",
        "evening_reflection_prompt": "Did you draw upon your spiritual inheritance today—such as choosing Christ's patience instead of anger?"
    },
    {
        "day_number": 12,
        "month_number": 1,
        "day_of_month": 12,
        "weekly_subtheme": "Abiding as God's Daughter",
        "title": "That Your Joy May Be Full",
        "scripture_primary_reference": "John 15:9-11",
        "scripture_primary_text": "'Even as the Father has loved me, I also have loved you. Remain in my love. If you keep my commandments, you will remain in my love; even as I have kept my Father's commandments, and remain in his love. I have spoken these things to you, that my joy may remain in you, and that your joy may be made full.'",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Pause for a moment and let the staggering measure of Christ's love wash over your mind: 'Even as the Father has loved me, I also have loved you.' The measure of Jesus' love for you is equal to the Father's eternal love for Him—infinite, unwavering, joyful, and without beginning or end. Too many women associate Christian discipleship exclusively with duty, solemn obligation, and heavy emotional responsibility. We carry the spiritual weight of our families as if joy were a frivolous luxury. But Jesus reveals His ultimate purpose in teaching us to abide: 'that my joy may remain in you, and that your joy may be made full.' True joy is not superficial cheerfulness that depends on sunny weather or easy circumstances. It is the deep, buoyant gladness of knowing you are eternally safe in the love of Jesus. When you abide in His love, that joy becomes a steady wellspring.",
        "reflection_questions": [
            "Has your faith felt more like a burdensome checklist of duties recently rather than an abiding source of joy?",
            "What steals your spiritual joy most quickly during an ordinary day at home or at work?",
            "How does knowing that Jesus desires your joy to be 'full' comfort and encourage your heart right now?"
        ],
        "guided_prayer": "Lord Jesus, thank You for loving me with the very same love the Father has for You. Forgive me for allowing the cares of this world and the deceitfulness of busyness to choke out the joy of my salvation. I do not want to settle for empty human happiness that vanishes with the first trial. I want Your supernatural joy—the joy that sings at midnight and steadies the soul in trial. Root me in Your love today, and let Your gladness shine through my eyes and smile. Amen.",
        "daily_intention": "Christ's joy is my fortress and strength today; I will abide in His boundless love.",
        "practical_action": "Play a quiet hymn or worship song while making lunch or driving, and allow yourself to smile and thank Jesus for His love.",
        "evening_reflection_prompt": "Where did you experience a flicker of Christ's joy today in the midst of routine tasks?"
    },
    {
        "day_number": 13,
        "month_number": 1,
        "day_of_month": 13,
        "weekly_subtheme": "Abiding as God's Daughter",
        "title": "The Song God Sings Over You",
        "scripture_primary_reference": "Zephaniah 3:17",
        "scripture_primary_text": "Yahweh your God is among you, a mighty one who will save. He will rejoice over you with joy. He will calm you in his love. He will rejoice over you with singing.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Many women carry a subconscious image of God as a frowning father—perpetually disappointed with their spiritual progress, irritated by their inconsistency, and tapping His foot at their failures. But Zephaniah 3:17 offers one of the most breathtaking, intimate portraits of God in all of Scripture. He is not standing far off in detached judgment; He is 'among you.' He does not tolerate you with cold reluctance; 'He will rejoice over you with joy.' And when your nervous system is trembling with anxiety and stress, 'He will calm you in his love.' Picture a mother rocking a crying infant, humming a tender melody until the baby's breathing settles into deep peace. That is what your God does over your soul. He calms you with His love and rejoices over you with singing. Let that divine song quiet the noisy criticism in your mind today.",
        "reflection_questions": [
            "What false image of God's countenance toward you do you need to replace with the truth of Zephaniah 3:17?",
            "In what area of your life does your spirit most need to be 'calmed in His love' right now?",
            "Can you pause and imagine God genuinely rejoicing over you as His beloved daughter today?"
        ],
        "guided_prayer": "Almighty God, my Heart's Quiet Rest, I am overwhelmed by the tenderness of Your heart toward me. Forgive me for projecting human impatience and coldness onto Your holy character. Thank You that You are with me in this quiet room. Quiet my racing thoughts with Your love. Silence the voice of the accuser who says I am not enough. Let me hear the echo of Your song over my life today. I rest in Your delight, confident that You are fighting for me and rejoicing over me. In Jesus' precious name, Amen.",
        "daily_intention": "I will let God's tender love quiet my anxious heart today.",
        "practical_action": "Close your eyes for two minutes, breathe slowly, and meditate on the words: 'He will calm you in His love.' Let your body physically release tension.",
        "evening_reflection_prompt": "Did you feel calmed by God's presence at any point today when worry attempted to spike your heart rate?"
    },
    {
        "day_number": 14,
        "month_number": 1,
        "day_of_month": 14,
        "weekly_subtheme": "Abiding as God's Daughter",
        "title": "Beside the Still Waters",
        "scripture_primary_reference": "Psalm 23:1-3",
        "scripture_primary_text": "Yahweh is my shepherd: I shall lack nothing. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul. He guides me in the paths of righteousness for his name's sake.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Sheep are notoriously skittish creatures. A sheep will refuse to lie down if it is hungry, frightened by predators, troubled by insects, or in friction with other sheep. For a sheep to lie down peacefully, the shepherd must provide total security, freedom from fear, and complete nourishment. When David writes, 'He makes me lie down in green pastures,' he is describing a Shepherd who knows how to make our restless, over-stimulated souls feel completely safe. Look at the glorious promise: 'He restores my soul.' The Hebrew word for 'restore' means to bring back to life, to revive from fainting. Your soul cannot be revived by more scrolling, more shopping, or more striving. Your Shepherd is leading you beside still waters today to restore your life. Allow Him to tend your soul's deepest longings.",
        "reflection_questions": [
            "What is currently making your soul restless or preventing you from lying down in peace?",
            "How does the declaration 'Yahweh is my shepherd: I shall lack nothing' address your specific financial or emotional worries?",
            "What does an unhurried, soul-restoring moment look like for you this weekend?"
        ],
        "guided_prayer": "Good Shepherd, my soul belongs to You. I confess how easily I wander away into anxious fretting, imagining that I must fend for myself. Thank You that under Your watchful care, I lack no good thing. Lead me today beside the still waters of Your presence. Deliver me from the noisy distractions that clamor for my attention. Restore my weary mind, heal my tired emotions, and guide my feet along righteous paths for Your name's sake. In Jesus' gentle name, Amen.",
        "daily_intention": "Because the Lord is my Shepherd, I have everything I need for today.",
        "practical_action": "Spend ten minutes today near a natural body of water, a quiet garden, or looking at the sky, speaking Psalm 23 over your family.",
        "evening_reflection_prompt": "As you end this second week, in what ways has the Good Shepherd restored your soul?"
    },

    # --- WEEK 3: Unclenched Hands — Laying Down the Burden (Days 15–21) ---
    {
        "day_number": 15,
        "month_number": 1,
        "day_of_month": 15,
        "weekly_subtheme": "Unclenched Hands — Laying Down the Burden",
        "title": "Casting Every Single Care",
        "scripture_primary_reference": "1 Peter 5:6-7",
        "scripture_primary_text": "Humble yourselves therefore under the mighty hand of God, that he may exalt you in due time; casting all your worries on him, because he cares for you.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Notice the deep theological connection Peter makes between humility and casting our cares upon God. We usually think of pride as outward boasting or arrogance. But pride also wears a quieter, socially acceptable disguise: chronic anxiety. When we refuse to surrender our worries, we are essentially declaring: 'God, I don't trust that You will handle this situation correctly, so I must stay awake at night and carry it myself.' Humility is admitting our human frailty and throwing our burdens upon the mighty shoulders of God. In the original Greek, 'casting' is an active, decisive verb—like throwing a heavy backpack off your back onto a sturdy rock. Why can you throw it? 'Because he cares for you.' The Creator of the galaxies cares about your doctor's appointment, your child's heartache, and your grocery budget.",
        "reflection_questions": [
            "What worry have you been carrying as if its outcome depended entirely upon your shoulders?",
            "How is chronic worry actually a form of subtle self-reliance or pride?",
            "Can you name the heaviest care you have today and verbally cast it onto God's shoulders right now?"
        ],
        "guided_prayer": "Lord God Almighty, I humble myself under Your mighty and gracious hand. Forgive me for the foolish pride that tries to manage tomorrow before it arrives. I am tired of carrying burdens that crush my spirit. Right now, by faith, I cast every anxious thought, every family concern, and every financial worry into Your care. You love me and You care for the details of my life. I take off the heavy backpack of worry and walk in the lightness of Your grace. In Jesus' name, Amen.",
        "daily_intention": "I will not carry what God has commanded me to cast upon Him.",
        "practical_action": "Write your single biggest worry on a piece of paper, place it inside your Bible at 1 Peter 5:7, and leave it there as a physical symbol of surrender.",
        "evening_reflection_prompt": "Did you pick that worry back up today, or did you leave it resting in the Father's hands?"
    },
    {
        "day_number": 16,
        "month_number": 1,
        "day_of_month": 16,
        "weekly_subtheme": "Unclenched Hands — Laying Down the Burden",
        "title": "Consider the Lilies and the Sparrows",
        "scripture_primary_reference": "Matthew 6:25-27",
        "scripture_primary_text": "'Therefore I tell you, don't be anxious for your life: what you will eat, or what you will drink; nor yet for your body, what you will wear. Isn't life more than food, and the body more than clothing? See the birds of the sky, that they don't sow, neither do they reap, nor gather into barns. Your heavenly Father feeds them. Aren't you of much more value than they? Which of you, by being anxious, can add one moment to his lifespan?'",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Jesus asks one of the most piercingly practical questions in the Sermon on the Mount: 'Which of you, by being anxious, can add one moment to his lifespan?' Anxiety has never paid a single overdue bill, healed a single physical illness, or protected a single child from danger. Worry is entirely unproductive—it drains today of its strength without solving a single problem for tomorrow. Jesus points us to the birds of the air. Sparrows do not have storehouses, 401(k) accounts, or emergency reserves. Yet every morning they sing from the branches because their Heavenly Father provides their daily food. If God faithfully clothes the wildflowers that bloom today and wither tomorrow, how much more will He take care of you, His precious daughter? Rest in His provision.",
        "reflection_questions": [
            "What has anxiety actually accomplished in your life besides stealing your sleep and peace?",
            "Why is it so hard to believe in your gut that you are of 'much more value' to God than the birds?",
            "What practical provision do you need to trust God for today instead of fretting?"
        ],
        "guided_prayer": "Lord Jesus, Your words cut straight through my complicated excuses. Forgive me for squandering my energy on anxiety that cannot change a single hour of my life. Thank You for feeding the birds and clothing the wildflowers in splendor. I confess my smallness of faith. Today, I look up at the sky and remember that You are my Father. You know what I need before I even ask. I choose to trust Your faithful provision for my family and my future. In Your peaceful name, Amen.",
        "daily_intention": "Worry adds nothing to my life; faith releases everything to my Father.",
        "practical_action": "Step outside for two minutes, look at the birds or trees, and consciously say aloud: 'My Father feeds them, and He will provide for me.'",
        "evening_reflection_prompt": "Did God provide for your needs today? Thank Him for every meal, every breath, and every comfort."
    },
    {
        "day_number": 17,
        "month_number": 1,
        "day_of_month": 17,
        "weekly_subtheme": "Unclenched Hands — Laying Down the Burden",
        "title": "One Day of Grace at a Time",
        "scripture_primary_reference": "Matthew 6:33-34",
        "scripture_primary_text": "'But seek first God's Kingdom and his righteousness; and all these things will be given to you as well. Therefore don't be anxious for tomorrow, for tomorrow will be anxious for itself. Each day's own evil is sufficient.'",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "God distributes His supernatural grace the exact same way He distributed manna in the wilderness: one day at a time. When the Israelites tried to hoard manna for tomorrow, it spoiled and bred worms. Why? Because God wanted them in continuous daily communion with the Provider. When you worry about next week, next month, or the next five years, you are trying to bear tomorrow's burdens without tomorrow's grace. You do not have the grace for next year today; you will receive that grace when next year arrives. Today, God gives you grace for the next twelve hours. Focus your energy on seeking His Kingdom today, loving the people in front of you today, and being faithful with today's responsibilities. Let tomorrow wait for its own sunrise.",
        "reflection_questions": [
            "Are you currently borrowing trouble from tomorrow or next month that God has not asked you to carry today?",
            "What does 'seeking first God's Kingdom' look like in your practical schedule today?",
            "How does living in 'day-tight compartments' bring relief to your nervous system?"
        ],
        "guided_prayer": "Heavenly Father, forgive me for trying to live into next month when You have given me the gift of today. I confess how often my mind rushes ahead, trying to solve problems that haven't even happened yet. Pull my wandering thoughts back into this present hour. I seek Your Kingdom, Your righteousness, and Your presence above all else. Thank You for today's portion of manna. I trust that when tomorrow comes, Your mercies will be waiting for me there too. In Jesus' name, Amen.",
        "daily_intention": "I will live fully in today, trusting God to supply grace for tomorrow when it arrives.",
        "practical_action": "When a worry about next week pops into your mind today, tell yourself: 'I will deal with that when the day arrives; right now I have grace for today.'",
        "evening_reflection_prompt": "Did you manage to stay grounded in today, or did your mind drift into tomorrow's worries?"
    },
    {
        "day_number": 18,
        "month_number": 1,
        "day_of_month": 18,
        "weekly_subtheme": "Unclenched Hands — Laying Down the Burden",
        "title": "Sustained by the Rock",
        "scripture_primary_reference": "Psalm 55:22",
        "scripture_primary_text": "Cast your burden on Yahweh, and he will sustain you. He will never allow the righteous to be moved.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Notice what Psalm 55:22 promises—and what it does not promise. It does not promise that the burden will always vanish in an instant, or that difficult circumstances will instantly evaporate into thin air. What it promises is something far more resilient: 'He will sustain you. He will never allow the righteous to be moved.' To sustain means to uphold from underneath, to nourish, to keep from collapsing under the weight. When you roll your burden onto the Lord, He infuses your inner spirit with supernatural stamina. The storm may rage around your house, but your foundation is anchored into eternal bedrock. You will not be uprooted because the God who holds you is unshakeable.",
        "reflection_questions": [
            "In what trial has God proven His ability to sustain you when you thought you couldn't take another step?",
            "What does it mean for your emotional stability that God will 'never allow the righteous to be moved'?",
            "What burden can you consciously hand over to His sustaining grace this morning?"
        ],
        "guided_prayer": "Lord God, my Rock and my Sustainer, my knees sometimes feel weak under the weight of life's demands. But my hope is not in my own stamina—my hope is in Your everlasting arms. I roll my burdens onto You today. Sustain my mind with truth, sustain my heart with peace, and sustain my body with health. Let me stand firm like an oak tree planted by streams of water, rooted so deeply in You that no wind can shake my faith. In Jesus' mighty name, Amen.",
        "daily_intention": "My circumstances may shake, but my soul is sustained by the unshakeable God.",
        "practical_action": "Send a brief text to a friend who is going through a hard time, sharing Psalm 55:22 to remind her that God will sustain her.",
        "evening_reflection_prompt": "Where did you feel God's sustaining grace giving you strength today when you felt depleted?"
    },
    {
        "day_number": 19,
        "month_number": 1,
        "day_of_month": 19,
        "weekly_subtheme": "Unclenched Hands — Laying Down the Burden",
        "title": "Steadfast in Perfect Peace",
        "scripture_primary_reference": "Isaiah 26:3-4",
        "scripture_primary_text": "You will keep whoever's mind is steadfast in perfect peace, because he trusts in you. Trust in Yahweh forever; for in Yah, Yahweh, is an everlasting rock.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "In the Hebrew text of Isaiah 26:3, 'perfect peace' is written as 'shalom, shalom'—peace, peace. It is the absolute highest degree of peace possible: wholeness, completeness, tranquillity, and total soundness of soul. Notice where this perfect peace is anchored: 'whoever's mind is steadfast... because he trusts in you.' Peace is not the absence of trouble; peace is the presence of a steadfast focus. When a ship's captain navigates through a dark squall, he does not stare at the towering waves crashing over the bow; he fixes his eyes on the lighthouse on the rock. If your mind is fixed on the headlines, the family conflict, or your fears, you will drown in anxiety. Fix your gaze on the Everlasting Rock.",
        "reflection_questions": [
            "Where has your attention been primarily fixed over the past 24 hours—on the storm or on the Savior?",
            "What daily habit (such as endless phone scrolling) is sabotaging your steadfastness of mind?",
            "How can you re-anchor your thoughts on Christ during busy transitions today?"
        ],
        "guided_prayer": "O God of Peace, I long for Your shalom to fill every room of my soul. Forgive me for fixing my gaze on the churning waves of life rather than on You, my Everlasting Rock. I bring my wandering, distracted mind into submission to Your Holy Spirit. Guard my thoughts today. When fear attempts to hijack my imagination, remind me to turn my eyes back to Jesus. I trust in You forever, confident that You are my eternal fortress. In Jesus' precious name, Amen.",
        "daily_intention": "I will fix my gaze on the Rock of Ages rather than on the waves around me.",
        "practical_action": "Write 'Shalom, Shalom — Isaiah 26:3' on an index card or sticky note and place it where you will see it throughout the day.",
        "evening_reflection_prompt": "Did your mind remain steadfast today? Thank God for the moments of peace He guarded in your heart."
    },
    {
        "day_number": 20,
        "month_number": 1,
        "day_of_month": 20,
        "weekly_subtheme": "Unclenched Hands — Laying Down the Burden",
        "title": "A Future Infused with Hope",
        "scripture_primary_reference": "Jeremiah 29:11-13",
        "scripture_primary_text": "'For I know the thoughts that I think toward you,' says Yahweh, 'thoughts of peace, and not of evil, to give you hope and a future. You shall call on me, and you shall go and pray to me, and I will listen to you. You shall seek me, and find me, when you search for me with all your heart.'",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "We often forget the historical backdrop of Jeremiah 29:11. God did not speak these words to a comfortable people lounging in safety; He spoke them to Jewish exiles who had lost their homes, their temple, and their country, and were living in Babylon. In the middle of displacement and confusion, God announced: 'I know the thoughts that I think toward you... thoughts of peace, and not of evil, to give you hope and a future.' Even when your external circumstances look messy, disrupted, or uncertain, God's thoughts toward you have not changed. He has not abandoned the blueprints for your life. His plans are redemptive, loving, and eternal. When you seek Him with all your heart, you will find Him waiting with open arms.",
        "reflection_questions": [
            "Have you secretly feared that your past mistakes have disqualified you from God's good future for you?",
            "How does the promise that God 'listens to you' encourage you to bring your most honest prayers to Him today?",
            "What does it mean for your daily outlook that God's thoughts toward you are 'thoughts of peace'?"
        ],
        "guided_prayer": "Sovereign Lord, my times are in Your hands. Thank You that even when my life feels disrupted or off-track, Your good plans for my life cannot be thwarted. Forgive me for doubting Your goodness and questioning Your timing. I take comfort in knowing that Your thoughts toward me are thoughts of peace and redemption. I seek You today with all my heart. Open my ears to hear Your voice and give me courage to walk obediently into the hopeful future You have prepared for me. In Jesus' name, Amen.",
        "daily_intention": "God holds my future; His thoughts toward me are peace, hope, and love.",
        "practical_action": "Speak aloud to your reflection in the mirror: 'God has plans for my good and my future; I will not fear tomorrow.'",
        "evening_reflection_prompt": "Did you find God near today when you called upon Him? Write a brief prayer of thanksgiving for His listening ear."
    },
    {
        "day_number": 21,
        "month_number": 1,
        "day_of_month": 21,
        "weekly_subtheme": "Unclenched Hands — Laying Down the Burden",
        "title": "Waiting Only in Silence",
        "scripture_primary_reference": "Psalm 62:5-8",
        "scripture_primary_text": "My soul, wait only in silence for God; for my expectation is from him. He alone is my rock and my salvation, my fortress. I will not be shaken. With God is my salvation and my honor. The rock of my strength, and my refuge, is in God. Trust in him at all times, you people. Pour out your heart before him. God is a refuge for us.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Notice the two contrasting movements in Psalm 62: 'wait only in silence for God' and 'pour out your heart before him.' Biblical waiting is not passive resignation or cold silence. First, we pour out our unfiltered grief, frustration, and fears before God like water from a pitcher. We empty our hearts completely. And then, once the anxious clutter has been laid at the altar, our soul settles into silence before Him. Why silence? Because our expectation is no longer in human politicians, financial investments, or family approval; our expectation is from God alone. When your expectation is anchored in the Creator rather than the creature, you cannot be permanently shaken.",
        "reflection_questions": [
            "Where have you placed your expectations recently (in people, bank accounts, or circumstances) only to feel let down?",
            "What does it look like to truly 'pour out your heart' to God without holding back your authentic feelings?",
            "Can you spend three minutes in holy silence right now, resting in God as your ultimate refuge?"
        ],
        "guided_prayer": "Lord God, my Refuge and Strong Rock, I pour out my heart before You today. You know my unspoken aches, my silent tears, and the expectations I have placed on fragile human shoulders. Forgive me for looking to people for what only You can provide. Today, my soul waits in silence for You alone. You are my salvation and my honor. In You I am secure; in You I am safe. Quiet my spirit, steady my heartbeat, and let me rest in the assurance of Your love. In Jesus' name, Amen.",
        "daily_intention": "My expectation is from God alone; I will not be shaken by human opinions or changing winds.",
        "practical_action": "Set a timer for 3 minutes of total silence. Do not ask for anything; simply sit in the quiet presence of your Father.",
        "evening_reflection_prompt": "As you complete three weeks of this journey, what is one burden you have successfully released into God's hands?"
    },

    # --- WEEK 4: Clothed in Strength and Holy Dignity (Days 22–28) ---
    {
        "day_number": 22,
        "month_number": 1,
        "day_of_month": 22,
        "weekly_subtheme": "Clothed in Strength and Holy Dignity",
        "title": "Putting on the Garments of Grace",
        "scripture_primary_reference": "Colossians 3:12-14",
        "scripture_primary_text": "Put on therefore, as God's chosen ones, holy and beloved, a heart of compassion, kindness, lowliness, humility, and perseverance; bearing with one another, and forgiving each other, if any man has a complaint against any; even as Christ forgave you, so you also do. Above all these things, walk in love, which is the bond of perfection.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Every morning before stepping into the kitchen or the workplace, you stand in front of your closet and choose what clothes to put on. The Apostle Paul uses this everyday metaphor to describe our spiritual wardrobe: 'Put on therefore, as God's chosen ones... a heart of compassion, kindness, lowliness, humility, and perseverance.' Spiritual beauty is intentional. You do not accidentally stumble into kindness or stumble into patience; you choose to dress your heart in them. Notice the supreme belt that holds the entire spiritual outfit together: 'Above all these things, walk in love.' When you clothe yourself in Christ's love, you become a fragrant, life-giving presence in a harsh and cynical world.",
        "reflection_questions": [
            "What negative attitude (irritability, defensiveness, or critical thoughts) do you need to take off this morning?",
            "Which garment of grace (compassion, kindness, humility, or patience) do you most need to put on today?",
            "Is there someone in your home or workplace you need to forgive, 'even as Christ forgave you'?"
        ],
        "guided_prayer": "Lord Jesus, You who washed the dirty feet of Your disciples, clothe my heart with Your humility today. Strip away every thread of pride, irritability, and bitterness. By faith, I put on compassion for the hurting, kindness for the difficult, and patience for the slow. Above all, wrap me in Your perfect love. Let my speech be seasoned with grace and my actions reflect the gentle beauty of my Savior. In Your holy name, Amen.",
        "daily_intention": "Today, I will dress my spirit in kindness, compassion, and patient love.",
        "practical_action": "Before you get dressed physically this morning, pause and pray: 'Lord, clothe my heart in Your compassion and kindness today.'",
        "evening_reflection_prompt": "Were your words and reactions today clothed in Christ's kindness, especially when you felt tired?"
    },
    {
        "day_number": 23,
        "month_number": 1,
        "day_of_month": 23,
        "weekly_subtheme": "Clothed in Strength and Holy Dignity",
        "title": "Tenderhearted Forgiveness",
        "scripture_primary_reference": "Ephesians 4:31-32",
        "scripture_primary_text": "Let all bitterness, wrath, anger, outcry, and slander be put away from you, with all malice. And be kind to one another, tender hearted, forgiving one another, even as God also in Christ forgave you.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Bitterness is often described as drinking poison and waiting for the other person to die. When someone hurts us, our natural defense mechanism is to harden our hearts, build defensive walls, and nurse our grudges. But a hardened heart is a miserable prison. Paul calls us to a supernatural alternative: 'be kind to one another, tender hearted, forgiving one another.' Notice the standard: not forgiving because the offender apologized, or because the offense was minor, but 'even as God also in Christ forgave you.' When you contemplate the enormous debt of sin that Jesus wiped clean at Calvary, the grace of forgiveness begins to flow effortlessly through your hands. Forgiveness does not excuse the wrongdoing; forgiveness releases the offender to God's justice so that your soul can walk in freedom.",
        "reflection_questions": [
            "Are you currently holding onto a grudge or rehearsing past grievances against someone in your heart?",
            "How has holding onto bitterness affected your physical health, emotional peace, and spiritual communion?",
            "Can you ask the Holy Spirit for the courage to release that person into God's hands today?"
        ],
        "guided_prayer": "Merciful Savior, You who prayed from the cross, 'Father, forgive them, for they know not what they do,' melt every cold and hardened place in my heart. I lay down every resentment, bitter memory, and desire for payback. Thank You for forgiving my mountain of sin through Christ. By Your grace, I release those who have wounded me. Bless them, heal them, and set my heart completely free from the poison of unforgiveness. Keep my spirit tender, compassionate, and sweet. In Jesus' name, Amen.",
        "daily_intention": "I choose the freedom of forgiveness; I will keep my heart tender and free from bitterness.",
        "practical_action": "Silently pray a sincere prayer of blessing for someone who has annoyed or hurt you recently.",
        "evening_reflection_prompt": "Did you feel the lightness of an uncluttered, forgiving heart today? Thank God for His liberating grace."
    },
    {
        "day_number": 24,
        "month_number": 1,
        "day_of_month": 24,
        "weekly_subtheme": "Clothed in Strength and Holy Dignity",
        "title": "Straightening the Crooked Paths",
        "scripture_primary_reference": "Proverbs 3:5-6",
        "scripture_primary_text": "Trust in Yahweh with all your heart, and don't lean on your own understanding. In all your ways acknowledge him, and he will make your paths straight.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "The Hebrew word for 'trust' in Proverbs 3:5 is 'batach'—which conveys the picture of lying facedown on the ground, completely relaxed and vulnerable, trusting that the one above you has your back. Notice the warning: 'don't lean on your own understanding.' When we lean on human intellect, logic, and limited perspective, we lean on a fragile crutch that can snap under pressure. But when we acknowledge God 'in all our ways'—in our parenting conversations, our grocery budgets, our health decisions, and our marital intimacy—He promises to make our paths straight. God does not promise that the path will be flat or paved with marble; He promises that He will remove the spiritual obstacles and lead you safely to your destination.",
        "reflection_questions": [
            "Where are you currently leaning on your own understanding rather than asking for God's clear guidance?",
            "What does 'acknowledging Him in all your ways' look like practically in your home today?",
            "Can you trust that God is straightening paths that currently look hopelessly crooked and tangled?"
        ],
        "guided_prayer": "Lord God of Wisdom, I confess how often I lean on my own fragile understanding, trying to figure everything out on my own. Forgive my pride. Today, I throw myself completely into Your trustworthy care. In my parenting, my marriage, my finances, my health, and my work, I acknowledge You as Lord. Take the wheel of my life. Untangle the crooked paths in front of my family, and lead my steps with clarity and peace. In the faithful name of Jesus, Amen.",
        "daily_intention": "I will not lean on my own limited wisdom; I will acknowledge God in every decision today.",
        "practical_action": "Before making any decision today—even a minor one—pause and whisper: 'Lord, what is Your wisdom here?'",
        "evening_reflection_prompt": "Did you notice God giving you clarity or guiding your steps through an uncertain moment today?"
    },
    {
        "day_number": 25,
        "month_number": 1,
        "day_of_month": 25,
        "weekly_subtheme": "Clothed in Strength and Holy Dignity",
        "title": "Fearfully and Wonderfully Knit Together",
        "scripture_primary_reference": "Psalm 139:13-14",
        "scripture_primary_text": "For you formed my inmost being. You knit me together in my mother's womb. I will give thanks to you, for I am fearfully and wonderfully made. Your works are wonderful. My soul knows that very well.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Women in modern society face a relentless barrage of messages telling them they are not enough: not young enough, not thin enough, not organized enough, not productive enough. The mirror becomes a place of silent criticism and self-rejection. But Psalm 139 takes you back to the sacred workshop of God. Before anyone else saw you, God formed your inmost being. He personally knit together your personality, your laugh, your voice, and your gifts with divine intentionality. When you criticize yourself, you are criticizing the Artist's masterpiece. David declared with holy confidence: 'I am fearfully and wonderfully made. Your works are wonderful. My soul knows that very well.' Does your soul know that today?",
        "reflection_questions": [
            "What unkind words or criticisms have you spoken to yourself in front of the mirror recently?",
            "How does knowing God personally 'knit you together' change your appreciation for your body, gifts, and temperament?",
            "Can you look at your life today through the eyes of the God who calls you His wonderful work?"
        ],
        "guided_prayer": "Loving Creator, thank You for the miracle of my life. Forgive me for the times I have compared myself to others and criticized the body and personality You lovingly designed. Silence the critical voices of culture and comparison. Teach my soul to know deep down that I am fearfully and wonderfully made by Your holy hands. Help me to steward my body, mind, and spirit with gratitude and dignity, honoring You as my faithful Maker. In Jesus' name, Amen.",
        "daily_intention": "I reject comparison and self-criticism; I am God's fearfully and wonderfully made daughter.",
        "practical_action": "Look in the mirror today, smile, and speak Psalm 139:14 aloud with sincere gratitude to God for making you.",
        "evening_reflection_prompt": "Did you treat yourself and your body with kindness and honor today?"
    },
    {
        "day_number": 26,
        "month_number": 1,
        "day_of_month": 26,
        "weekly_subtheme": "Clothed in Strength and Holy Dignity",
        "title": "Power Perfected in Weakness",
        "scripture_primary_reference": "2 Corinthians 12:9-10",
        "scripture_primary_text": "He has said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Most gladly therefore I will rather glory in my weaknesses, that the power of Christ may rest on me. Therefore I take pleasure in weaknesses, in injuries, in necessities, in persecutions, in distresses, for Christ's sake. For when I am weak, then am I strong.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "We live in a world that worships self-sufficiency, polished facades, and uninterrupted strength. We hide our tears, downplay our exhaustion, and feel ashamed when we cannot keep up with every demand. But the Kingdom of God operates on an upside-down principle: human weakness is the exact stage where divine power puts on its greatest display. Paul pleaded with God three times to remove his 'thorn in the flesh.' God did not remove the thorn; He gave him something infinitely better: 'My grace is sufficient for you, for my power is made perfect in weakness.' Your fatigue and human limitations are not failures; they are the holy landing strip for Christ's supernatural power. When you come to the end of yourself, you arrive at the beginning of God.",
        "reflection_questions": [
            "Where in your life do you feel most acutely weak, inadequate, or at the end of your rope?",
            "How does God's promise that 'My grace is sufficient for you' comfort your tired heart right now?",
            "Can you surrender your need to appear strong and allow Christ's power to rest on your vulnerability?"
        ],
        "guided_prayer": "Lord Jesus, I drop the heavy mask of perfection and self-sufficiency. I confess to You that I am tired, weak, and limited in my own strength. Thank You that You do not demand that I have everything figured out. Your grace is completely sufficient for me today. Let Your supernatural power rest upon my weaknesses. Where my patience runs dry, supply Your patience. Where my wisdom ends, supply Your wisdom. Let my life be a clear window through which others see the strength of Christ. In Your mighty name, Amen.",
        "daily_intention": "I do not need to be superwoman; Christ's grace is more than enough for my weaknesses.",
        "practical_action": "When you feel overwhelmed by a task today, stop and say: 'Lord, I am weak here, but You are strong. Work through me.'",
        "evening_reflection_prompt": "Where did you experience Christ's strength carrying you through a moment of personal weakness today?"
    },
    {
        "day_number": 27,
        "month_number": 1,
        "day_of_month": 27,
        "weekly_subtheme": "Clothed in Strength and Holy Dignity",
        "title": "Mounting Up on Wings Like Eagles",
        "scripture_primary_reference": "Isaiah 40:29-31",
        "scripture_primary_text": "He gives power to the faint; and to him who has no might he increases strength. Even the youths faint and get weary, and the young men utterly fall; but those who wait for Yahweh will renew their strength. They will mount up with wings like eagles. They will run, and not be weary. They will walk, and not faint.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Even the strongest human beings eventually run out of energy. Young athletes stumble, youths grow weary, and determined women hit emotional walls. Human stamina is a finite cup. But God's reservoir of power is infinite: 'He gives power to the faint; and to him who has no might he increases strength.' Look at how that power is accessed: not by frantic rushing, but by waiting. 'Those who wait for Yahweh will renew their strength.' In the Hebrew, 'renew' literally means an exchange—like trading your dirty, worn-out shoes for sturdy, celestial boots. You give God your human exhaustion, and in exchange, He gives you eagle's wings to rise above the turbulent winds of daily life.",
        "reflection_questions": [
            "In what area of your life have you felt like you are 'running on fumes' recently?",
            "What is the difference between passive waiting and actively waiting upon the Lord in faith?",
            "How can you trade your exhaustion for God's supernatural strength during your quiet time today?"
        ],
        "guided_prayer": "Almighty God, Creator of the ends of the earth, You neither slumber nor grow weary. I bring You my tired body and my faint heart. I have tried to run the race in my own energy, and I am exhausted. Today, I pause to wait upon You. By faith, I hand You my fatigue, and I receive Your supernatural strength. Give me wings like an eagle to soar above pettiness, worry, and fatigue. Grant me stamina to run my race and walk faithfully without fainting. In Jesus' name, Amen.",
        "daily_intention": "I wait upon the Lord today, exchanging my human fatigue for His eagle's wings.",
        "practical_action": "Take a 5-minute break right now: sit back, close your eyes, breathe deeply, and picture exchanging your fatigue for Christ's strength.",
        "evening_reflection_prompt": "Did you feel an extra reserve of God's strength sustaining your walk today?"
    },
    {
        "day_number": 28,
        "month_number": 1,
        "day_of_month": 28,
        "weekly_subtheme": "Clothed in Strength and Holy Dignity",
        "title": "Fullness of Joy in His Presence",
        "scripture_primary_reference": "Psalm 16:8-11",
        "scripture_primary_text": "I have set Yahweh always before me. Because he is at my right hand, I shall not be moved. Therefore my heart is glad, and my tongue rejoices. My body shall also dwell in safety... You will show me the path of life. In your presence is fullness of joy. In your right hand there are pleasures forever more.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "David discovered the golden secret of an unshakeable life: 'I have set Yahweh always before me.' It is an intentional spiritual habit of keeping God in your peripheral vision throughout the day. When God is at your right hand, you cannot be moved by gossip, criticism, unexpected bad news, or changing circumstances. Notice the glorious result: 'Therefore my heart is glad... in your presence is fullness of joy.' Notice that joy is found not in ideal circumstances, not in the praise of people, and not in the achievement of goals, but in His presence. When you spend unhurried time with God, His holy gladness becomes a fountain inside you that never runs dry.",
        "reflection_questions": [
            "What does it mean for your daily routine to 'set Yahweh always before you'?",
            "Where have you been seeking joy recently that has left you feeling empty and unsatisfied?",
            "How can you cultivate awareness of God's loving presence while washing dishes, driving, or working today?"
        ],
        "guided_prayer": "Lord God of My Life, I set You before me today. Be at my right hand so that my heart and emotions will not be moved by the storms of this world. Forgive me for chasing after shallow pleasures that leave my soul thirsty. You are my greatest delight. Show me the path of life today. Fill my home and my heart with the fullness of Your joy. Let my speech rejoice and my body dwell in the safety of Your covenant love. In the joyful name of Jesus, Amen.",
        "daily_intention": "I set the Lord always before me; in His presence I find fullness of joy.",
        "practical_action": "Place a small reminder on your phone screen or computer desktop that says: 'God is at my right hand right now.'",
        "evening_reflection_prompt": "As this fourth week closes, what is the deepest joy God has whispered into your spirit?"
    },

    # --- WEEK 5: Stepping Out in Steadfast Faith (Days 29–31) ---
    {
        "day_number": 29,
        "month_number": 1,
        "day_of_month": 29,
        "weekly_subtheme": "Stepping Out in Steadfast Faith",
        "title": "The Assurance of Things Unseen",
        "scripture_primary_reference": "Hebrews 11:1-2, 6",
        "scripture_primary_text": "Now faith is assurance of things hoped for, proof of things not seen. For by this, the elders obtained testimony... Without faith it is impossible to be well pleasing to him, for he who comes to God must believe that he exists, and that he is a rewarder of those who seek him.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Faith is not wishful thinking or blind optimism; biblical faith is a solid foundation, an anchor of the soul. Faith is believing what God has promised even when your physical senses report the exact opposite. If you could already see the answers, touch the provision, and map out the solution, you would not need faith. God invites you to step out onto the waters of trust. Look at what honors God's heart: 'he who comes to God must believe that he exists, and that he is a rewarder of those who seek him.' God is not a stingy judge waiting for you to fail; He is a generous Father who takes immense pleasure in rewarding every daughter who seeks Him in earnest faith.",
        "reflection_questions": [
            "In what area of your life is God calling you to trust Him without seeing the final outcome?",
            "How does believing that God is a 'rewarder of those who seek Him' ignite your passion for daily prayer?",
            "What is one small step of faith God is prompting you to take today?"
        ],
        "guided_prayer": "Father in Heaven, increase my faith. Forgive me for letting my physical sight and human doubts overshadow Your divine promises. I choose to believe Your Word today above every circumstance, every report, and every fear. Thank You that You are a faithful rewarder of those who seek You. I seek Your face this morning with all my heart. Anchor my soul in the assurance of things hoped for, and give me the quiet boldness to step forward in faith. In Jesus' mighty name, Amen.",
        "daily_intention": "I walk by faith and not by sight, trusting the God who rewards those who seek Him.",
        "practical_action": "Identify one task you have been putting off out of fear, pray a prayer of faith, and take the first step toward completing it today.",
        "evening_reflection_prompt": "Where did you choose faith over sight today? Thank God for honoring your step of obedience."
    },
    {
        "day_number": 30,
        "month_number": 1,
        "day_of_month": 30,
        "weekly_subtheme": "Stepping Out in Steadfast Faith",
        "title": "To Walk Humbly with Your God",
        "scripture_primary_reference": "Micah 6:8",
        "scripture_primary_text": "He has shown you, O man, what is good. What does Yahweh require of you, but to act justly, to love mercy, and to walk humbly with your God?",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Religion often complicates what God has made beautifully simple. The religious leaders of Micah's day asked if God wanted thousands of rams, rivers of olive oil, or extreme ascetic sacrifices. Micah cut through the religious fog with holy simplicity: 'He has shown you, O man, what is good. What does Yahweh require of you, but to act justly, to love mercy, and to walk humbly with your God?' Look at that threefold heartbeat: Act justly—treating every person with fairness, honesty, and dignity. Love mercy—not merely tolerating mercy, but genuinely delighting in extending forgiveness and second chances. And walk humbly with your God—not running ahead in self-reliance, not lagging behind in rebellion, but walking hand-in-hand with your Father through an ordinary day.",
        "reflection_questions": [
            "In what ways have you complicated your walk with God with unnecessary self-imposed religious rules?",
            "How can you 'love mercy' in your interactions with your family members today?",
            "What does walking 'humbly' with God look like in your practical schedule over the next 24 hours?"
        ],
        "guided_prayer": "Lord God, thank You for the pure simplicity of Your Gospel. Strip away every layer of religious striving, people-pleasing, and performance that has weighed down my soul. Teach me how to do what is good in Your eyes: to act justly in all my dealings, to delight in extending mercy to those who hurt me, and to walk humbly with You every hour of this day. Keep my hand tightly in Yours, Jesus. In Your precious name, Amen.",
        "daily_intention": "Today, I will act justly, love mercy, and walk humbly hand-in-hand with my God.",
        "practical_action": "Perform one unseen, quiet act of mercy for someone today without telling anyone about it.",
        "evening_reflection_prompt": "Did you walk hand-in-hand with God today? Thank Him for His steady companionship."
    },
    {
        "day_number": 31,
        "month_number": 1,
        "day_of_month": 31,
        "weekly_subtheme": "Stepping Out in Steadfast Faith",
        "title": "Establish the Work of Our Hands",
        "scripture_primary_reference": "Lamentations 3:25-26 & Psalm 90:17",
        "scripture_primary_text": "'Yahweh is good to those who wait for him, to the soul that seeks him. It is good that a man should hope and quietly wait for the salvation of Yahweh.' ... 'Let the favor of the Lord our God be on us; and establish the work of our hands for us; yes, establish the work of our hands.'",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Congratulations on completing Month 1 of your 365-day journey. Over these past 31 days, you have built an altar of morning quiet time, discovering that God's compassions truly are fresh every morning. You began this month in Lamentations 3:22, and we close this month returning to that same sacred well: 'Yahweh is good to those who wait for him, to the soul that seeks him.' As you prepare to cross into February, carry Moses' prayer in Psalm 90 over your family, your home, and your calling: 'Let the favor of the Lord our God be on us; and establish the work of our hands.' You do not need to strive to justify your existence. When God's favor rests upon you, He establishes the legacy of your love and faith for generations to come.",
        "reflection_questions": [
            "Looking back over the 31 days of January, what is the single greatest spiritual insight God has planted in your heart?",
            "How has your morning quiet-time rhythm changed your emotional peace and family atmosphere?",
            "As you step into Month 2, what prayer do you pray over the 'work of your hands' for the season ahead?"
        ],
        "guided_prayer": "Lord God of all Generations, my heart is full of praise as I complete this first month walking with Jesus. Thank You for meeting me each morning in the quiet. Thank You for proving every single day that Your mercies never fail. As I look toward February and the months ahead, let Your holy favor rest upon me, my marriage, my children, and my community. Establish the work of my hands for Your eternal glory. Keep me faithful, joyful, and deeply in love with You. In the mighty name of Jesus, Amen.",
        "daily_intention": "God's favor rests upon me; He establishes the work of my hands as I walk into new seasons.",
        "practical_action": "Take five quiet minutes to look back through your journal notes from January, highlighting God's faithfulness and whispering a heartfelt prayer of thanks.",
        "evening_reflection_prompt": "Celebrate tonight! You have walked 31 consecutive days with Jesus. Thank Him for the steadfast grace that carried you here."
    }
]

print("Total days defined:", len(days_data))
for d in days_data:
    words = len(d["reflection_body"].split())
    p_words = len(d["guided_prayer"].split())
    print(f"Day {d['day_number']}: Reflection={words} words, Prayer={p_words} words, Qs={len(d['reflection_questions'])}")
