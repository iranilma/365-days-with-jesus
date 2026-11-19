import re

# We will author and format all 31 days of January with:
# - weekly_subtheme
# - reflection_body: 160-220 words
# - 3 reflection questions
# - guided_prayer: 60-90 words
# - daily_intention
# - practical_action
# - evening_reflection_prompt

january_entries = [
    # --- WEEK 1: The Fountain of Morning Compassion (Days 1–7) ---
    {
        "day_number": 1,
        "month_number": 1,
        "day_of_month": 1,
        "weekly_subtheme": "The Fountain of Morning Compassion",
        "title": "New Mercies with the Morning Dawn",
        "scripture_primary_reference": "Lamentations 3:22-24",
        "scripture_primary_text": "It is because of Yahweh's loving kindnesses that we are not consumed, because his compassion doesn't fail. They are new every morning. Great is your faithfulness. 'Yahweh is my portion,' says my soul. 'Therefore I will hope in him.'",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Welcome to Day 1 of your journey. As you begin this new chapter, pause and take a gentle, deep breath in the presence of God. The season behind you may have carried unfulfilled prayers, lingering physical fatigue, or quiet disappointments that you have kept hidden from the world. But Scripture meets you this morning not with an exhausting list of demands, but with a divine promise of supernatural renewal. God's compassions never run dry; they do not wear out with our human inconsistency or grow cold when we stumble. Like the fresh morning dew that blankets the earth before the household stirs, His tender mercy is prepared specifically for you today. You do not need to muster up enough strength for the entire year at once—that is an impossible weight you were never created to shoulder. You only need to walk hand-in-hand with Jesus through the next twelve hours. When your soul whispers, 'Yahweh is my portion,' you anchor yourself to a well that never runs empty.",
        "reflection_questions": [
            "What lingering burden or regret from the past season is the Holy Spirit inviting you to release into His hands this morning?",
            "How does knowing God's mercies are freshly supplied every single morning change your perspective on today's to-do list?",
            "In what practical area of your daily routine do you most need to experience Jesus as your true 'portion'?"
        ],
        "guided_prayer": "Heavenly Father, thank You for the gift of this new day and this quiet moment in Your holy presence. I bring You my heart just as it is—sometimes anxious, often tired, but longing to know You deeper. Forgive me for where I have strived in my own fragile strength. Today, I receive Your fresh mercy with open hands. Holy Spirit, steady my breathing and anchor my thoughts in Your unfailing love. As I step out into this day, let me walk in communion with Jesus, trusting that Your grace will meet every hour. In Jesus' precious name, Amen.",
        "daily_intention": "Today, I choose to receive God's fresh mercy rather than replay yesterday's mistakes.",
        "practical_action": "Take three quiet minutes before opening your email or messages. Look out a window or step outside, take a deep breath, and whisper: 'Your mercies are new for me today.'",
        "evening_reflection_prompt": "Before closing your eyes tonight, reflect on one moment today where you saw God's gentle hand of provision or peace."
    },
    {
        "day_number": 2,
        "month_number": 1,
        "day_of_month": 2,
        "weekly_subtheme": "The Fountain of Morning Compassion",
        "title": "Abiding in the Sacred Vine",
        "scripture_primary_reference": "John 15:4-5",
        "scripture_primary_text": "Remain in me, and I in you. As the branch can't bear fruit by itself, unless it remains in the vine, so neither can you, unless you remain in me. I am the vine. You are the branches. He who remains in me, and I in him, bears much fruit; for apart from me you can do nothing.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "In a modern culture that constantly measures our worth by visible output, relentless speed, and endless productivity, Jesus offers a completely counter-cultural invitation: abide. Notice carefully how an organic vineyard operates: a branch on a grapevine does not strain, sweat, or panic to produce clusters of sweet grapes. The branch simply stays intimately attached to the central vine. Its entire nourishment, hydration, sap, and vitality flow effortlessly from the root system through the stem. When we attempt to be patient mothers, gracious wives, diligent employees, or faithful friends apart from Jesus, our emotional reserves evaporate in a matter of hours. Spiritual fruit is never manufactured by sheer willpower; it is quietly grown through abiding. When you sit in morning prayer, meditate on a verse of Scripture, or simply rest in His unconditional love, you are connecting your soul to the True Vine that sustains your life.",
        "reflection_questions": [
            "Where in your daily life have you felt the deep exhaustion of trying to 'produce fruit' in your own self-reliance?",
            "What does 'remaining in Christ' look like practically amidst a busy day filled with family, meals, and work duties?",
            "Which specific spiritual fruit (peace, patience, gentleness, or joy) do you need Him to grow in your heart today?"
        ],
        "guided_prayer": "Lord Jesus, You are the true Vine, and I am simply a branch. Forgive me for the times I wander away into anxious self-sufficiency, attempting to navigate my schedule, relationships, and worries in my own limited stamina. I confess that apart from You, I can do nothing of lasting eternal worth. Teach my soul the sacred art of abiding. As I answer messages, care for my home, and serve those around me today, keep my heart continuously joined to Yours. May Your joy and peace flow through me into every room I enter. In Your name, Amen.",
        "daily_intention": "I will not measure today by what I accomplish, but by how closely I remain connected to Jesus.",
        "practical_action": "Set a gentle chime or alarm for mid-afternoon. When it sounds, pause for 60 seconds, place your hand over your heart, and say: 'Jesus, I abide in You.'",
        "evening_reflection_prompt": "Where did you feel depleted today, and where did you feel Christ's supernatural peace sustaining your responses?"
    },
    {
        "day_number": 3,
        "month_number": 1,
        "day_of_month": 3,
        "weekly_subtheme": "The Fountain of Morning Compassion",
        "title": "The Unshakeable Fortress",
        "scripture_primary_reference": "Psalm 46:1-3, 10",
        "scripture_primary_text": "God is our refuge and strength, a very present help in trouble. Therefore we won't be afraid, though the earth changes, though the mountains are shaken into the heart of the seas... 'Be still, and know that I am God. I will be exalted among the nations. I will be exalted in the earth.'",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "The Hebrew phrase for 'Be still' in Psalm 46:10 is 'raphah'—which literally translates to slacken, to let go, to completely drop your hands. Picture a mother clenching her fists tight, desperately gripping every worry about her children's future, her marriage, her health, or her finances. God looks tenderly at your tired, white-knuckled hands and whispers with sovereign gentleness: 'Drop them. Let go. I am God, and you are not.' God does not promise that the mountains will never shake or that life will be immune to sudden shifts and turbulent news. What He promises is that in the absolute center of the shaking, He Himself is an unshakeable fortress. You do not need to be strong enough to hold the universe together today. Your God is already holding you.",
        "reflection_questions": [
            "What specific circumstance or relationship are you currently white-knuckling and trying to micromanage?",
            "What does it mean for your emotional peace that God is not a distant bystander, but a 'very present help' right now?",
            "Can you imagine physically opening your palms in prayer today and letting that burden roll onto God?"
        ],
        "guided_prayer": "Almighty God, my Refuge and Strong Tower, I acknowledge that my human heart is easily shaken by unexpected changes and vulnerabilities. I unclench my fists before You right now. I release my family, my health, my future, and my unspoken worries into Your sovereign keeping. You alone are God. Teach my soul how to be still and rest in the knowledge that You are good and in total control. In the mighty and comforting name of Jesus, Amen.",
        "daily_intention": "When anxiety knocks today, I will run into God's presence as my safe fortress.",
        "practical_action": "Literally sit with open palms facing upward for two minutes during your prayer time, naming each worry out loud as you place it into God's hands.",
        "evening_reflection_prompt": "What worry attempted to steal your peace today, and how did God's presence steady your thoughts?"
    },
    {
        "day_number": 4,
        "month_number": 1,
        "day_of_month": 4,
        "weekly_subtheme": "The Fountain of Morning Compassion",
        "title": "Trading Anxiety for the Peace of God",
        "scripture_primary_reference": "Philippians 4:6-7",
        "scripture_primary_text": "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Notice the divine exchange Paul describes from a Roman prison cell: we bring God our raw anxieties wrapped in genuine thanksgiving, and in return, He gives us a peace that surpasses human comprehension. In the original Greek text, the word for 'guard' is 'phroureo'—a military term describing an armed garrison of soldiers stationed around a city gate to prevent an enemy invasion. When you pray with gratitude, God places a celestial garrison around your vulnerable heart and mind, preventing the lies of fear and despair from breaching your walls. Notice that gratitude is the vital hinge. When we thank God for what He has already done, our faith expands to trust Him for what is yet ahead. You are not defenseless today; God's peace stands guard over your thoughts.",
        "reflection_questions": [
            "What is the first thing that typically triggers panic or worry in your mind during a normal morning?",
            "How does pairing your personal petitions with thanksgiving transform the atmosphere of your prayers?",
            "What is one specific answered prayer from your past that proves God's faithfulness to you today?"
        ],
        "guided_prayer": "Lord God of Peace, You see the thoughts that wage war against my quietness of soul. I refuse to give anxiety a seat at my table today. With a grateful heart, I bring every petition to Your throne. Thank You for the roof over my head, the breath in my lungs, and Your constant companionship. Station Your holy peace at the doorway of my mind. Let no panic enter, and keep my gaze fixed securely on Jesus Christ. In His name, Amen.",
        "daily_intention": "I will exchange every anxious thought today for a prayer accompanied by thanksgiving.",
        "practical_action": "Write down three specific things you are deeply thankful for right now in your gratitude journal before continuing your day.",
        "evening_reflection_prompt": "Did you notice God's peace guarding your thoughts during a stressful moment today? Write down what happened."
    },
    {
        "day_number": 5,
        "month_number": 1,
        "day_of_month": 5,
        "weekly_subtheme": "The Fountain of Morning Compassion",
        "title": "Clothed in Strength and Dignity",
        "scripture_primary_reference": "Proverbs 31:25-26",
        "scripture_primary_text": "Strength and dignity are her clothing. She laughs at the time to come. She opens her mouth with wisdom. Faithful instruction is on her tongue.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "Too often, the woman of Proverbs 31 has been presented as an exhausting checklist of domestic perfection that leaves tired women feeling guilty and inadequate. But look closely at verse 25: what is she dressed in? Not exhaustion, frantic hustle, or anxious dread. She is clothed in 'strength and dignity.' And because she knows the God who holds tomorrow, she can 'laugh at the time to come.' She does not mock the future; rather, she smiles serenely at the unknown because she knows her Father has already walked into all our tomorrows. Her words are seasoned with kindness and wisdom because her soul is well-anchored in the Lord. Today, put on the garment of Christ's righteousness and dignity.",
        "reflection_questions": [
            "What negative labels or feelings of inadequacy do you need to take off before stepping into today?",
            "Why can a daughter of the King smile at the future with confidence rather than dread?",
            "How can your words today offer 'faithful instruction' and kindness to your family or colleagues?"
        ],
        "guided_prayer": "Father in Heaven, strip away every garment of shame, comparison, and fear that the enemy has tried to drape over my shoulders. By faith, I clothe myself in the strength and dignity that Christ bought for me at the cross. Give me a holy confidence that smiles at the future, knowing You are already there. Anoint my speech today with gentleness and grace. May my words build up, heal, and bring light to everyone I encounter. In Jesus' precious name, Amen.",
        "daily_intention": "I walk tall today, not in my own perfection, but in the dignity of being God's chosen daughter.",
        "practical_action": "Offer a word of genuine encouragement to another woman today—a text, a handwritten note, or a spoken blessing.",
        "evening_reflection_prompt": "Reflect on how you spoke to yourself and others today. Were your words coated in kindness and patience?"
    },
    {
        "day_number": 6,
        "month_number: 1",
        "day_of_month": 6,
        "weekly_subtheme": "The Fountain of Morning Compassion",
        "title": "Light for the Next Step",
        "scripture_primary_reference": "Psalm 119:105",
        "scripture_primary_text": "Your word is a lamp to my feet, and a light for my path.",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "We often wish God would give us a high-powered stadium floodlight that reveals the entire ten-year roadmap of our lives. We want to know how the children will turn out, how the career transition will settle, and how our retirement will look. But God gives us an oil lamp. In biblical times, a clay foot-lamp cast just enough golden glow to illuminate the single next step in front of the traveler. God designs our walk this way intentionally—because if we could see the whole path, we would trust our sight rather than His voice. Faith is about obeying the light you have for the single step in front of you today. Trust Him for the next step, and the next step will appear.",
        "reflection_questions": [
            "In what decision or situation are you impatiently asking God for a five-year plan instead of obeying today's step?",
            "How does Scripture serve as an actual daily lamp for your emotions, choices, and responses?",
            "What is the clear, small step of obedience God has already shown you to take?"
        ],
        "guided_prayer": "Lord, forgive my impatience. I confess how often I want certainty about the future rather than intimacy with You in the present. Thank You that Your Word is a lamp to my feet. Give me the humility and courage to take just the next faithful step You have illuminated. When the fog is thick and I cannot see the horizon, help me to hold tightly to Your hand, confident that You will not let my foot slip. In Jesus' name, Amen.",
        "daily_intention": "I will not fret over the next mile; I will be faithful to take the next single step with Jesus.",
        "practical_action": "Open your Bible or devotional app to memorize Psalm 119:105 today, repeating it during moments of transition.",
        "evening_reflection_prompt": "Did you take a step of faith or obedience today? Thank God tonight for guiding that step."
    },
    {
        "day_number": 7,
        "month_number: 1",
        "day_of_month": 7,
        "weekly_subtheme": "The Fountain of Morning Compassion",
        "title": "The Sacred Rhythm of Rest",
        "scripture_primary_reference": "Exodus 20:8-10 & Matthew 11:28",
        "scripture_primary_text": "'Remember the Sabbath day, to keep it holy. Six days you shall labor, and do all your work, but the seventh day is a Sabbath to Yahweh your God.' ... 'Come to me, all you who labor and are heavily burdened, and I will give you rest.'",
        "scripture_translation": "World English Bible (WEB)",
        "reflection_body": "As we complete our first week, God gently calls us to pause. In our modern world, rest is treated as a luxury or a reward only earned after exhausting every ounce of energy. But in the Kingdom of God, rest is a holy commandment and an act of worship. When you rest, you declare to the world: 'The universe does not depend on my hustle. God was running the world before I was born, and He will continue running it while I sleep.' True Sabbath rest is not just ceasing from physical labor; it is delighting in God's goodness, soaking in beauty, and letting your nervous system settle into the safe embrace of your Shepherd. Receive His rest today.",
        "reflection_questions": [
            "Do you feel guilty when you rest? Where did that unbiblical guilt originate?",
            "What restful activities genuinely nourish your soul and restore your spirit (walking in nature, reading, baking, quiet worship)?",
            "How can you protect a sacred window of rest this week for unhurried communion with God and loved ones?"
        ],
        "guided_prayer": "Gentle Shepherd, You who neither slumber nor sleep, invite me into Your holy rest. Forgive me for worshiping productivity and allowing busyness to crowd out my quietness of soul. Today, I silence the inner voice that demands I do more. I receive the restful gift of Sabbath. Restore my weary mind, heal my tired body, and revive my spirit with the joy of Your presence. I celebrate Your finished work, trusting that You are taking care of everything while I rest. In Jesus' name, Amen.",
        "daily_intention": "Rest is not wasted time; it is holy trust in my Father's care.",
        "practical_action": "Carve out at least one unhurried hour today where you put your phone in another room and engage in something that brings peaceful joy to your soul.",
        "evening_reflection_prompt": "As you look back over this first week, what is one sacred insight or peace God has given you?"
    }
]

# We will write out the full python script to build all 31 records cleanly into devotionals.ts
