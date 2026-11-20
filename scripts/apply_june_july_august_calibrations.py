import re
from pathlib import Path

PROJECT_ROOT = Path("/Users/ACER/Downloads/Antigravity/365-days-with-jesus")
DEVOTIONALS_PATH = PROJECT_ROOT / "src" / "lib" / "content" / "devotionals.ts"

content = DEVOTIONALS_PATH.read_text(encoding="utf-8")

# Dict of replacements: (target_substring, replacement_substring)
# We will target specific Day reflections and fields
calibrations = [
    # Day 157
    (
        "Divine wisdom, however, orders your soul, heals your relationships, guards your children, and leads you securely into eternal joy.",
        "Divine wisdom, however, orders your soul, brings health to your relationships, guards your household, and leads you securely in God's ways."
    ),
    # Day 167
    (
        "so we allow demanding people, endless obligations, and emotional vampires to drain our wells dry until we have nothing left for God, our families, or ourselves.",
        "so we allow endless obligations and emotionally draining demands to deplete our reserves until we have nothing left for God, our responsibilities, or ourselves."
    ),
    # Day 175
    (
        "The phrase 'hearty counsel' literally means counsel that flows from the deep soul—counsel born of earnest prayer, heartfelt love, and spiritual maturity.",
        "The phrase 'hearty counsel' conveys counsel that flows from sincere love and deep conviction—wisdom born of earnest prayer, heartfelt affection, and spiritual maturity."
    ),
    # Day 176
    (
        "If you are in your thirties, seek out a godly woman in her fifties, sixties, or seventies who has navigated storms of grief, raised children, walked through marital challenges, and emerged with her faith intact. Sit at her feet and learn from her hard-won wisdom. If you are in your forties, fifties, or beyond, do not assume you have nothing to offer; you are a vital spiritual treasure. Look for a younger woman who is drowning in the early years of marriage, career, or parenting, and offer her your listening ear and gentle encouragement.",
        "If you are in your thirties or forties, seek out a mature woman of faith who has navigated seasons of grief, transition, relationships, and work, emerging with her hope intact. Learn from her hard-won wisdom. If you are in your fifties, sixties, or beyond, do not assume you have nothing to offer; you are a vital spiritual treasure. Look for a younger woman who is navigating the early challenges of adult life, work, marriage, or family, and offer her a listening ear and gentle encouragement."
    ),
    # Day 183
    (
        "Speaking truth aloud anchors your nervous system and puts spiritual adversaries on notice.",
        "Speaking truth aloud quiets inner turmoil and anchors your heart in God's peace."
    ),
    # Day 185
    (
        "Unseen heavenly guardians stand sentry around your home and your children. You can lay your head on your pillow tonight without terror. The King has posted His guard.",
        "Unseen heavenly guardians watch over your steps and your household. While physical life carries difficulties, you can lay your head on your pillow tonight resting in His sovereign care. The King is watching over your soul."
    ),
    # Day 187
    (
        "In the original Hebrew, the phrase translated 'a very present help' (nimtsa me'od) literally means 'a help that has already been thoroughly proved and found immediately accessible.'",
        "In the Hebrew text, the phrase translated 'a very present help' (nimtsa me'od) conveys a help that has been proved and found readily accessible in times of trouble (BDB p. 592)."
    ),
    # Day 196
    (
        "In the Hebrew language, the word for 'anxieties' (sar'appim) literally refers to wild, tangled branches of a thicket that scratch and ensnare travelers.",
        "In Hebrew poetry, the word for 'anxieties' (sar'appim) evokes the image of tangled thoughts—like dividing branches of a thicket that entangle the mind (BDB p. 700)."
    ),
    # Day 202
    (
        "In the Hebrew text, the phrase is tsur 'olamim—literally, 'the Rock of Ages' or 'the Eternal Rock.'",
        "In the Hebrew text, the phrase is tsur 'olamim, describing God as the 'Rock of Ages' or an 'Everlasting Rock' (BDB p. 849)."
    ),
    # Day 204
    (
        "He will not let you take a fatal tumble. He will hold your hand and keep your steps secure.",
        "This promise does not mean believers never face unexpected trials or painful detours; rather, God preserves your spiritual footing, holding you secure through every valley."
    ),
    # Day 205
    (
        "Human beings are frail creatures who are biologically hardwired for sleep. No matter how strong, disciplined, or determined you are, if you go forty-eight hours without sleep, your brain begins to misfire, your emotions unravel, and your body forces you to collapse into unconsciousness. We sleep because we are finite; we run out of energy. In pagan mythology, ancient gods slept; in 1 Kings 18, Elijah mocked the prophets of Baal by suggesting their god was asleep and needed to be awakened with shouts. But look at the true God of Israel: 'Behold, he who keeps Israel will neither slumber nor sleep.' God does not get drowsy. He never takes an afternoon nap. His eyelids never grow heavy, nor does His attention wander for a single microsecond. While you are sleeping tonight, completely defenseless, unaware of the world around you, your Keeper is wide awake, sustaining your heartbeat, guarding your children, and running the universe. You do not need to stay awake worrying about tomorrow. There is no point in both you and God being awake at the same time. Go to sleep; your Keeper is on duty.",
        "Human beings are frail creatures who require sleep to survive. No matter how strong, disciplined, or determined you are, going without rest causes your thoughts to cloud, your emotions to unravel, and your physical strength to fail. We sleep because we are finite; our reserves run out. In ancient mythology, pagan gods were believed to sleep; in 1 Kings 18, Elijah mocked the prophets of Baal by suggesting their god was sleeping and needed to be awakened. But look at the true God of Israel: 'Behold, he who keeps Israel will neither slumber nor sleep.' God does not get drowsy. He never grows weary, nor does His attention wander from His people. While you are sleeping tonight, completely defenseless and unaware of the world around you, your Keeper is wide awake, sustaining your breath, guarding your household, and governing the universe in love. You do not need to stay awake worrying about tomorrow. There is no need for both you and God to carry the watch through the night. Rest in peace; your Keeper is on duty."
    ),
    # Day 209 reflection
    (
        "Many Christian women live in a state of chronic, quiet panic regarding their homes and families. We exhaust ourselves trying to curate the perfect home environment, manage our children's futures, orchestrate family peace, and guard against every possible danger. But King Solomon offers a profound spiritual antidote to parental anxiety: 'Unless Yahweh builds the house, they who build it labor in vain. Unless Yahweh watches over the city, the watchman guards it in vain.' Notice the two verbs: building and watching. Building is our active daily labor; watching is our protective vigilance. Solomon does not tell us to stop parenting, stop working, or neglect our homes. But he warns that without the foundational partnership of God, all our frantic striving is empty vanity. You cannot micromanage your children into faith; you cannot guarantee family harmony through sheer willpower. You are not the master architect; God is. You are simply the apprentice working on His construction site. Do your faithful part today—love, pray, guide, and teach—and then release the building into the Master's hands. He loves your family even more than you do.",
        "Many women carry a heavy, quiet burden regarding their households, relationships, and loved ones. We exhaust ourselves trying to curate peace, manage outcomes for those we care about, and guard against every possible danger. But King Solomon offers a profound spiritual antidote to this anxious striving: 'Unless Yahweh builds the house, they who build it labor in vain. Unless Yahweh watches over the city, the watchman guards it in vain.' Notice the two verbs: building and watching. Building is our active daily labor; watching is our protective vigilance. Solomon does not tell us to neglect our responsibilities, withhold love, or abandon our callings. But he warns that without the foundational partnership of God, all our frantic striving is empty vanity. You cannot control every circumstance in your household; you cannot guarantee harmony through sheer willpower or carry the spiritual weight of others alone. You are not the master architect; God is. You are an apprentice serving under His sovereign care. Do your faithful part today—love, pray, act justly, and offer grace—and then release the building into the Master's hands. He watches over your household with greater love and power than you could ever supply."
    ),
    # Day 209 questions & prayer
    (
        "      \"In what ways have you been striving in your own strength to 'build' or 'watch over' your family?\",\n      \"Why does parental anxiety often stem from forgetting that God is the true Builder and Watchman?\",\n      \"What specific family burden or concern do you need to surrender to the Master Builder today?\"\n    ],\n    guided_prayer: \"Master Builder of My Home, forgive me for the frantic anxiety that convinces me I must carry my family's future alone. I acknowledge that unless You build the house, my labor is in vain. I surrender my home, my loved ones, and my parenting into Your sovereign hands. Be the supreme Watchman of our lives. Grant me the grace to be faithful in daily duties while trusting You for the ultimate outcome. In Jesus' name, Amen.\"",
        "      \"In what ways have you been striving in your own strength to 'build' or hold together relationships in your home or community?\",\n      \"Why does anxious striving often stem from forgetting that God is the true Builder and Watchman?\",\n      \"What specific burden or household concern do you need to surrender to the Master Builder today?\"\n    ],\n    guided_prayer: \"Master Builder of My Life, forgive me for the frantic anxiety that convinces me I must carry every outcome and relationship alone. I acknowledge that unless You build the house, my labor is in vain. I surrender my home, my loved ones, and my daily duties into Your sovereign hands. Be the supreme Watchman of our lives. Grant me the grace to be faithful in everyday responsibilities while trusting You for the ultimate outcome. In Jesus' name, Amen.\""
    ),
    # Day 210 reflection
    (
        "In the original Hebrew, the verse literally reads: 'Truly toward God my soul is silence.'",
        "In the Hebrew text, the expression conveys that the soul is hushed before God in quiet stillness (BDB p. 189)."
    ),
    # Day 210 evening prompt
    (
        "evening_reflection_prompt: \"Did practicing internal silence help calm your nervous system and deepen your focus today?\"",
        "evening_reflection_prompt: \"Did practicing internal silence help calm your racing thoughts and deepen your focus on God today?\""
    ),
    # Day 215 reflection
    (
        "In Jesus' day, the religious leaders had taken God's sweet gift of Sabbath and transformed it into a suffocating prison of legalism. They invented hundreds of ridiculous microscopic regulations: you could not carry a handkerchief in your pocket, untie a knot, or heal a sick neighbor without breaking their rules. Instead of being a day of delight, the Sabbath had become a day of dread. Jesus shattered their oppressive legalism with a brilliant, revolutionary declaration: 'The Sabbath was made for man, not man for the Sabbath.' Sabbath was not created as an obstacle course to test how rigid you can be; it was custom-designed by God as a gracious hospital for human exhaustion. God invented Sabbath because He loves your fragile nervous system, your aching muscles, your emotional heart, and your spiritual capacity. He gave you rest to restore your soul, not to add another layer of religious guilt. If your spiritual disciplines feel heavy, legalistic, and joyless, you have misunderstood the heart of the Master. Sabbath is a feast of grace laid out for weary pilgrims. Step into the banquet.",
        "In Jesus' day, human traditions had added burdensome regulations to the Sabbath, turning what God intended as a blessing into a heavy religious obligation. Many had lost sight of the merciful heart of the law, creating rigid rules that brought fear rather than refreshment. Jesus addressed this legalism with a clear, liberating declaration: 'The Sabbath was made for man, not man for the Sabbath.' Sabbath was not created as an obstacle course to test how rigid you can be; it was designed by God as a gracious provision for human weariness. God appointed the Sabbath because He understands our human limitations, our tired frames, our emotional needs, and our spiritual capacity. He gave you rest to restore your soul, not to add another layer of religious guilt. If your spiritual disciplines feel heavy, legalistic, and joyless, remember the gentle heart of the Master. Sabbath is a feast of grace laid out for weary pilgrims. Step into His restorative peace today."
    ),
    # Day 218 reflection
    (
        "The Hebrew word translated 'was refreshed' (naphash) literally means 'to take a deep breath' or 'to catch one's breath.'",
        "The Hebrew verb translated 'was refreshed' (naphash) conveys the image of pausing to breathe or finding renewal (BDB p. 657)."
    ),
    # Day 223 reflection
    (
        "Elijah was not suffering from a spiritual lack of faith; he was suffering from acute, catastrophic nervous system exhaustion!",
        "Elijah was not experiencing a lack of spiritual devotion; he was suffering from profound physical, mental, and emotional exhaustion!"
    ),
    # Day 226 reflection
    (
        "In the Hebrew text, the phrase translated 'a still small voice' (qol demamah daqqah) literally means 'a sound of gentle silence' or 'the whisper of sheer stillness.'",
        "In the Hebrew text, the phrase translated 'a still small voice' (qol demamah daqqah) conveys the whisper of gentle stillness or a sound of quiet calm (BDB p. 199)."
    ),
    # Day 234 reflection & prayer
    (
        "A sheep will refuse to lie down under four specific conditions: if it is afraid of predators, if there is friction or head-butting within the flock, if it is tormented by flies and parasites, or if it is hungry. If even one of these four conditions is present, the sheep will stay on its feet, trembling, pacing, and exhausting itself to the point of collapse. Therefore, when David writes, 'He makes me lie down in green pastures,' it means that the Good Shepherd has personally eliminated all four obstacles! The Shepherd stands guard with his rod, banishing fear of predators. The Shepherd calms the flock, banishing relational friction. The Shepherd anoints the sheep's head with soothing oil, banishing parasites. And the Shepherd leads the sheep to lush, green pastures, satisfying all hunger. Only when the sheep is completely safe, contented, free from fear, and nourished will it fold its legs and lie down in the grass. That is what Jesus does for your nervous system. He eliminates the predators of fear, soothes your relational wounds, and feeds your soul with truth. Lie down in His green pastures today.",
        "Sheep are timid animals that require safety and calm to rest peacefully. By nature, a sheep will hesitate to lie down if it is agitated by fear of predators, friction within the flock, persistent pests, or hunger. A wise shepherd recognizes these vulnerabilities and attends to his sheep with gentle care. He watches over them to ward off danger, calms tensions, applies soothing care, and leads them to good pasture. Only when the sheep feels secure and nourished will it fold its legs and lie down in the grass. That is what Jesus does for your tired soul and weary mind. He guards you against overwhelming fear, soothes your wounded thoughts, and feeds your heart with truth. David knew this pastoral care intimately when he wrote: 'He makes me lie down in green pastures.' You do not have to pace in frantic worry today or carry burdens alone. Allow the Good Shepherd to lead you into His peaceful care."
    ),
    (
        "and grant my weary nervous system permission to lie down in Your peaceful presence today.",
        "and grant my weary body and mind permission to lie down in Your peaceful presence today."
    ),
    # Day 235 reflection
    (
        "Sheep have poor eyesight, but extraordinarily sensitive hearing. Because of this, sheep have an intense, instinctual terror of rushing, turbulent, roaring water. If a sheep falls into a fast-moving mountain stream, its heavy, waterlogged fleece will drag it beneath the surface within seconds, causing it to drown. A sheep will literally die of dehydration on the bank of a rushing river rather than drink from turbulent waters. A skilled, compassionate shepherd understands this. When he brings his flock to a roaring river, he does not force them to drink from the rapids; he finds a quiet cove, or he rolls heavy boulders together to dam the stream, creating a calm, glassy pool of 'still waters.' In Hebrew, the phrase is me menuchot—waters of deep rest, quiet resting places. How tenderly our Shepherd cares for our nervous systems! Life can feel like a roaring, white-water river of noise, notifications, deadlines, and crises. But Jesus takes you by the hand and leads you away from the turbulent rapids to the still waters of His presence. There, in the quiet cove of grace, you can kneel without fear and drink deeply.",
        "Sheep are naturally timid animals and instinctively wary of rushing, roaring water. Turbulent mountain streams frighten them, and their thick, absorbent fleece could easily become waterlogged and pull them under if they fall into the current. A compassionate, skilled shepherd understands this vulnerability intimately. When he leads his flock to water after a long, dusty trek, he does not force them to drink from noisy, intimidating rapids; instead, he guides them to quiet coves or gentle, protected pools of 'still waters.' In Hebrew, the phrase is mei menuchot—waters of quiet rest (BDB p. 629). How tenderly our Shepherd cares for our fragile, weary hearts! Life in a hurried world can feel like a turbulent rush of noise, endless demands, and unexpected crises. But Jesus takes you by the hand and leads you away from the chaotic rapids to the peaceful waters of His presence. There, in the sanctuary of His grace, you can kneel without fear, lay down your thirst, and drink deeply of His sustaining peace. Step away from the rushing rapids today; let Jesus lead you beside the still waters."
    ),
    # Day 237 reflection
    (
        "In the original Greek, the word for 'casting' (epiripto) is a vigorous, athletic term that means to throw, hurl, or fling something with decisive force. It was the word used in Luke 19 when the disciples took their heavy garments and threw them onto the back of the donkey for Jesus to ride. Notice the physical motion: you do not gently place your worries next to God and then keep your hand on them; you hurl them completely off your shoulders and onto His broad back! And notice the scope: 'all your worries.' Not just the big theological questions, but the broken washing machine, the teenage rebellion, the unpaid bill, the awkward conversation, the medical test result—cast all of it upon Him. Why? 'Because He cares for you.' In the Greek, it literally reads: 'because it matters to Him concerning you.' You are not a bother to God. Your small life matters intensely to the Creator. Fling your burdens onto Him today.",
        "The Apostle Peter lived through intense personal failures, violent storms on the Sea of Galilee, and fierce persecution. Yet in 1 Peter 5:7, he issues an imperative that is essential for every weary soul: 'casting all your worries on him, because he cares for you.' In the Greek text, the participle translated 'casting' (epiripsantes) denotes placing or throwing your burdens upon the Lord (BDAG p. 378). It is the same word used in Luke 19:35 when the disciples threw their garments onto the donkey for Jesus. Notice the deliberate action: you do not hold onto your worries while praying; you transfer their weight completely onto God. And notice the reason: 'because He cares for you.' The original phrase conveys that our lives and concerns matter deeply to Him (BDAG p. 627). You are not an inconvenience to God. Your smallest daily concern matters to the Creator. Release the heavy pack of worries from your shoulders today, and trust the Father who tenderly cares for you."
    )
]

applied = 0
for target, repl in calibrations:
    if target in content:
        content = content.replace(target, repl, 1)
        applied += 1
    else:
        print("MISSING TARGET:", target[:50], "...")

DEVOTIONALS_PATH.write_text(content, encoding="utf-8")
print(f"Successfully applied {applied} / {len(calibrations)} calibrations to devotionals.ts!")
