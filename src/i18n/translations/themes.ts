import { SupportedLanguage } from "../config";
import { MONTHLY_THEMES } from "@/lib/content/themes";
import { MonthlyTheme } from "@/lib/types";

export interface LocalizedTheme extends MonthlyTheme {
  theme_title_pt: string;
  spiritual_focus_pt: string;
  key_scripture_reference_pt: string;
  key_scripture_text_pt: string;
  overview_description_pt: string;
}

export const LOCALIZED_MONTHLY_THEMES: LocalizedTheme[] = [
  {
    month_number: 1,
    theme_title: "The Character of God",
    spiritual_focus: "Anchoring your soul in who God is — holy, faithful, unchanging, and merciful.",
    key_scripture_reference: "Lamentations 3:22-23",
    key_scripture_text: "The Lord's loving kindnesses indeed never cease, for His compassions never fail. They are new every morning; great is Your faithfulness.",
    overview_description: "Begin the year by contemplating the unshakable foundation of faith: the very character of God. Before we ask what God wants us to do, we must understand who He is.",
    theme_title_pt: "O Caráter de Deus",
    spiritual_focus_pt: "Firmar a alma em quem Deus é — santo, fiel, imutável e compassivo.",
    key_scripture_reference_pt: "Lamentações 3:22-23",
    key_scripture_text_pt: "As misericórdias do Senhor são a causa de não sermos consumidos, porque as suas misericórdias não têm fim; renovam-se a cada manhã; grande é a tua fidelidade.",
    overview_description_pt: "Comece o ano contemplando o alicerce inabalável da fé: o próprio caráter de Deus. Antes de pensar no que fazer, compreendemos quem Ele é.",
  },
  {
    month_number: 2,
    theme_title: "The Heart of the Savior",
    spiritual_focus: "Discovering the gentle, lowly, and deeply compassionate heart of Jesus Christ toward all who are weary.",
    key_scripture_reference: "Matthew 11:28-30",
    key_scripture_text: "Come to me, all you who labor and are heavily burdened, and I will give you rest. Take my yoke upon you, and learn from me, for I am gentle and lowly in heart; and you will find rest for your souls.",
    overview_description: "February turns our gaze directly upon Jesus — His posture toward the suffering, His welcoming of the marginalized, His patience with the weak, and His unhurried, gentle grace.",
    theme_title_pt: "O Coração do Salvador",
    spiritual_focus_pt: "Descobrir o coração manso, humilde e profundamente compassivo de Jesus Cristo para com todos os cansados.",
    key_scripture_reference_pt: "Mateus 11:28-30",
    key_scripture_text_pt: "Venham a mim, todos os que estão cansados e sobrecarregados, e eu lhes darei descanso. Tomem sobre vocês o meu jugo e aprendam de mim, pois sou manso e humilde de coração; e vocês encontrarão descanso para as suas almas.",
    overview_description_pt: "Fevereiro volta nosso olhar diretamente para Jesus — Sua compaixão pelos que sofrem, Seu acolhimento aos marginalizados, Sua paciência com os fracos e Sua graça serena.",
  },
  {
    month_number: 3,
    theme_title: "The Cross and Resurrection",
    spiritual_focus: "Meditating on Christ's sacrificial love, the gravity of the cross, and the triumphant reality of His resurrection.",
    key_scripture_reference: "Romans 5:8",
    key_scripture_text: "But God commends his own love toward us, in that while we were yet sinners, Christ died for us.",
    overview_description: "As the liturgical calendar moves toward Easter, March invites the soul into the sacred depths of the cross: Jesus' willing surrender, the complete forgiveness of our sins, and the uncontainable power of the empty tomb.",
    theme_title_pt: "A Cruz e a Ressurreição",
    spiritual_focus_pt: "Meditar no amor sacrificial de Cristo, na solenidade da cruz e na realidade triunfante de Sua ressurreição.",
    key_scripture_reference_pt: "Romanos 5:8",
    key_scripture_text_pt: "Mas Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores.",
    overview_description_pt: "À medida que caminhamos para a Páscoa, março convida nossa alma às profundezas sagradas da cruz: a entrega de Jesus, o perdão total e a vitória do sepulcro vazio.",
  },
  {
    month_number: 4,
    theme_title: "Walking in the Spirit",
    spiritual_focus: "Cultivating daily sensitivity, obedience, and communion with the Holy Spirit.",
    key_scripture_reference: "Galatians 5:22-23",
    key_scripture_text: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control.",
    overview_description: "Following the resurrection, April focuses on the abiding presence of the Counselor promised by Jesus. We learn what it means to be led, filled, and sustained by the Holy Spirit in every ordinary moment.",
    theme_title_pt: "Andando no Espírito",
    spiritual_focus_pt: "Cultivar sensibilidade diária, obediência e comunhão com o Espírito Santo.",
    key_scripture_reference_pt: "Gálatas 5:22-23",
    key_scripture_text_pt: "Mas o fruto do Espírito é: amor, alegria, paz, longanimidade, benignidade, bondade, fidelidade, mansidão, domínio próprio.",
    overview_description_pt: "Após a ressurreição, abril foca na presença consoladora prometida por Jesus. Aprendemos o que significa ser guiada, cheia e sustentada pelo Espírito Santo a cada instante.",
  },
  {
    month_number: 5,
    theme_title: "Rooted in the Word",
    spiritual_focus: "Building your life upon the timeless, living, and life-giving Scriptures.",
    key_scripture_reference: "Psalm 119:105",
    key_scripture_text: "Your word is a lamp to my feet, and a light for my path.",
    overview_description: "May deepens our love for God's revealed truth. We explore how Scripture nourishes the weary heart, protects against deceit, brings comfort in darkness, and anchors the Christian life in eternal certainty.",
    theme_title_pt: "Enraizados na Palavra",
    spiritual_focus_pt: "Edificar a vida sobre as Escrituras eternas, vivas e geradoras de vida.",
    key_scripture_reference_pt: "Salmos 119:105",
    key_scripture_text_pt: "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho.",
    overview_description_pt: "Maio aprofunda nosso amor pela verdade revelada de Deus. Exploramos como a Palavra nutre o coração cansado, ilumina os passos e firma a vida em certeza eterna.",
  },
  {
    month_number: 6,
    theme_title: "Walking in Divine Wisdom",
    spiritual_focus: "Seeking God's perspective and discernment for the decisions, relationships, and complexities of daily life.",
    key_scripture_reference: "James 1:5",
    key_scripture_text: "If any of you lacks wisdom, let him ask of God, who gives to all generously and without reproach, and it will be given to him.",
    overview_description: "June invites believers into the practical, heavenly wisdom offered through Christ. In a world full of noise, hurry, and confusion, God calls His children to walk with prudent, gentle, and peaceful hearts.",
    theme_title_pt: "Andando na Sabedoria Divina",
    spiritual_focus_pt: "Buscar a perspectiva e o discernimento de Deus para as decisões, relacionamentos e caminhos do dia a dia.",
    key_scripture_reference_pt: "Tiago 1:5",
    key_scripture_text_pt: "Se algum de vocês tem falta de sabedoria, peça-a a Deus, que a todos dá generosamente e sem reprovação, e ela lhe será dada.",
    overview_description_pt: "Junho nos conduz à sabedoria celestial em Cristo. Em um mundo de pressa e confusão, Deus nos chama a caminhar com discernimento, mansidão e paz.",
  },
  {
    month_number: 7,
    theme_title: "Refuge in the High Places",
    spiritual_focus: "Resting in the steadfast protection, security, and fortress of God amid earthly trials.",
    key_scripture_reference: "Psalm 91:1-2",
    key_scripture_text: "He who dwells in the secret place of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge and my fortress; my God, in whom I trust.'",
    overview_description: "July turns to the Psalms and promises of divine protection. We reflect on God as our strong tower, our hiding place, and our safe haven when storms rage in our lives.",
    theme_title_pt: "Refúgio nos Lugares Altos",
    spiritual_focus_pt: "Descansar na proteção infalível, na segurança e na fortaleza de Deus em meio às tempestades terrenas.",
    key_scripture_reference_pt: "Salmos 91:1-2",
    key_scripture_text_pt: "Aquele que habita no abrigo do Altíssimo e descansa à sombra do Todo-Poderoso pode dizer ao Senhor: 'Tu és o meu refúgio e a minha fortaleza, o meu Deus, em quem confio.'",
    overview_description_pt: "Julho celebra os Salmos e as promessas de abrigo divino. Meditamos em Deus como nossa torre forte, nosso esconderijo seguro quando a vida se agita.",
  },
  {
    month_number: 8,
    theme_title: "Rest for the Weary Heart",
    spiritual_focus: "Reclaiming holy Sabbath rest, releasing striving, and leaning completely upon Christ's sustaining grace.",
    key_scripture_reference: "Isaiah 40:29-31",
    key_scripture_text: "He gives power to the faint. To him who has no might he increases strength. Those who wait for the Lord will renew their strength.",
    overview_description: "In the heat of late summer, August addresses our profound need for true spiritual rest. Jesus does not offer superficial relief, but a deep Sabbath for our weary souls.",
    theme_title_pt: "Descanso para o Coração Cansado",
    spiritual_focus_pt: "Resgatar o descanso sabático sagrado, abandonar a exaustão e apoiar-se plenamente na graça de Cristo.",
    key_scripture_reference_pt: "Isaías 40:29-31",
    key_scripture_text_pt: "Ele dá força ao cansado e multiplica as forças ao que não tem nenhum vigor. Mas os que esperam no Senhor renovam as suas forças.",
    overview_description_pt: "Em agosto, abraçamos o alívio espiritual profundo. Jesus não oferece consolo superficial, mas repouso restaurador para a alma abatida.",
  },
  {
    month_number: 9,
    theme_title: "The Armor of Light",
    spiritual_focus: "Standing firm in the truth, righteousness, and spiritual strength provided through Jesus.",
    key_scripture_reference: "Ephesians 6:10-11",
    key_scripture_text: "Be strong in the Lord, and in the strength of his might. Put on the whole armor of God, that you may be able to stand against the wiles of the devil.",
    overview_description: "September prepares the believer for spiritual steadfastness. We examine each piece of the divine armor and learn to abide victorious in Christ's accomplished work.",
    theme_title_pt: "A Armadura da Luz",
    spiritual_focus_pt: "Permanecer firme na verdade, na justiça e na força espiritual supridas por Jesus.",
    key_scripture_reference_pt: "Efésios 6:10-11",
    key_scripture_text_pt: "Sejam fortes no Senhor e na força do seu poder. Vistam-se com toda a armadura de Deus, para poderem ficar firmes contra as ciladas do diabo.",
    overview_description_pt: "Setembro nos prepara para a firmeza espiritual. Compreendemos a armadura de Deus e como viver vitoriosas na obra consumada de Cristo.",
  },
  {
    month_number: 10,
    theme_title: "Faithfulness Through the Fire",
    spiritual_focus: "Enduring suffering, loss, and trials with persevering hope and trust in God's eternal purposes.",
    key_scripture_reference: "Isaiah 43:2",
    key_scripture_text: "When you pass through the waters, I will be with you; and through the rivers, they will not overflow you. When you walk through the fire, you will not be burned.",
    overview_description: "October deals honestly with hardship and suffering. Drawing from scripture, we discover how God purifies our faith, sustains us through sorrow, and never leaves us alone in the furnace.",
    theme_title_pt: "Fidelidade em Meio ao Fogo",
    spiritual_focus_pt: "Perseverar em meio a provações e dores com esperança inabalável nos propósitos eternos de Deus.",
    key_scripture_reference_pt: "Isaías 43:2",
    key_scripture_text_pt: "Quando você passar pelas águas, eu estarei com você; quando passar pelos rios, eles não o submergirão; quando passar pelo fogo, você não se queimará.",
    overview_description_pt: "Outubro acolhe com honestidade as estações difíceis. Descobrimos como Deus refina nossa fé, nos ampara na dor e caminha conosco na fornalha.",
  },
  {
    month_number: 11,
    theme_title: "A Heart of Gratitude",
    spiritual_focus: "Cultivating unceasing thanksgiving, joy in Christ, and generous worship across all seasons.",
    key_scripture_reference: "1 Thessalonians 5:16-18",
    key_scripture_text: "Rejoice always. Pray without ceasing. In everything give thanks, for this is the will of God in Christ Jesus toward you.",
    overview_description: "November centers upon gratitude as a transformative spiritual discipline. Even in difficulty, thanksgiving redirects our eyes from earthly lack to heavenly abundance.",
    theme_title_pt: "Um Coração de Gratidão",
    spiritual_focus_pt: "Cultivar ação de graças contínua, alegria em Cristo e louvor sincero em todas as circunstâncias.",
    key_scripture_reference_pt: "1 Tessalonicenses 5:16-18",
    key_scripture_text_pt: "Alegrem-se sempre. Orem sem cessar. Em tudo deem graças, porque esta é a vontade de Deus em Cristo Jesus para com vocês.",
    overview_description_pt: "Novembro consagra a gratidão como disciplina espiritual transformadora. O louvor redireciona nossos olhos da escassez terrena para a abundância do céu.",
  },
  {
    month_number: 12,
    theme_title: "Light in the Darkness",
    spiritual_focus: "Celebrating the incarnation of Jesus, the arrival of promised light, and expectant hope for His return.",
    key_scripture_reference: "John 1:5",
    key_scripture_text: "The light shines in the darkness, and the darkness hasn't overcome it.",
    overview_description: "December closes the devotional year by returning to the miraculous dawn of Bethlehem: the Word made flesh, the fulfillment of prophecy, and the everlasting light that no shadow can extinguish.",
    theme_title_pt: "Luz nas Trevas",
    spiritual_focus_pt: "Celebrar a encarnação de Jesus, o cumprimento da promessa e a bendita esperança do Seu reino.",
    key_scripture_reference_pt: "João 1:5",
    key_scripture_text_pt: "A luz brilha nas trevas, e as trevas não a derrotaram.",
    overview_description_pt: "Dezembro conclui o ano devocional contemplando o mistério bendito de Belém: o Verbo que Se fez carne, a luz que dissipa toda sombra.",
  },
];

export function getLocalizedTheme(monthNumber: number, lang: SupportedLanguage): MonthlyTheme {
  const safeMonth = Math.max(1, Math.min(12, monthNumber || 1));
  const localized = LOCALIZED_MONTHLY_THEMES.find((m) => m.month_number === safeMonth) || LOCALIZED_MONTHLY_THEMES[0];

  if (lang === "pt-BR") {
    return {
      month_number: localized.month_number,
      theme_title: localized.theme_title_pt,
      spiritual_focus: localized.spiritual_focus_pt,
      key_scripture_reference: localized.key_scripture_reference_pt,
      key_scripture_text: localized.key_scripture_text_pt,
      overview_description: localized.overview_description_pt,
    };
  }

  return {
    month_number: localized.month_number,
    theme_title: localized.theme_title,
    spiritual_focus: localized.spiritual_focus,
    key_scripture_reference: localized.key_scripture_reference,
    key_scripture_text: localized.key_scripture_text,
    overview_description: localized.overview_description,
  };
}
