  import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, Search, Layers, Activity, 
  Bookmark, Trash2, X, Star, 
  Zap, Edit3, Tag, Download, Copy, Check,
  BookOpen, Compass, Grid, Sliders, ArrowUpRight,
  HelpCircle, Sparkles, CheckCircle2, ChevronRight, Hash,
  Mic, MicOff, Clipboard, RefreshCw, Send
} from 'lucide-react';

// --- DATA: Thai Consonants ---
const THAI_CONSONANTS = [
  // Mid Class
  { thai: "ก", name: "ก ไก่ (Kor Kai)", class: "Mid", classZh: "中輔音", initial: "k", final: "k", roman: "k", meaningZh: "雞", meaningEn: "Chicken" },
  { thai: "จ", name: "จ จาน (Jor Jan)", class: "Mid", classZh: "中輔音", initial: "j", final: "t", roman: "j", meaningZh: "盤子", meaningEn: "Plate" },
  { thai: "ด", name: "ด เด็ก (Dor Dek)", class: "Mid", classZh: "中輔音", initial: "d", final: "t", roman: "d", meaningZh: "小孩", meaningEn: "Child" },
  { thai: "ต", name: "ต เต่า (Tor Tao)", class: "Mid", classZh: "中輔音", initial: "t", final: "t", roman: "t", meaningZh: "烏龜", meaningEn: "Turtle" },
  { thai: "บ", name: "บ ใบไม้ (Bor Bai-mai)", class: "Mid", classZh: "中輔音", initial: "b", final: "p", roman: "b", meaningZh: "樹葉", meaningEn: "Leaf" },
  { thai: "ป", name: "ป ปลา (Por Pla)", class: "Mid", classZh: "中輔音", initial: "p", final: "p", roman: "p", meaningZh: "魚", meaningEn: "Fish" },
  { thai: "อ", name: "อ อ่าง (Or Ang)", class: "Mid", classZh: "中輔音", initial: "silent / glottal", final: "-", roman: "o", meaningZh: "水盆", meaningEn: "Basin" },
  
  // High Class
  { thai: "ข", name: "ข ไข่ (Khor Khai)", class: "High", classZh: "高輔音", initial: "kh", final: "k", roman: "kh", meaningZh: "蛋", meaningEn: "Egg" },
  { thai: "ฉ", name: "ฉ ฉิ่ง (Chor Ching)", class: "High", classZh: "高輔音", initial: "ch", final: "-", roman: "ch", meaningZh: "鈸", meaningEn: "Cymbals" },
  { thai: "ถ", name: "ถ ถุง (Thor Thung)", class: "High", classZh: "高輔音", initial: "th", final: "t", roman: "th", meaningZh: "袋子", meaningEn: "Bag" },
  { thai: "ผ", name: "ผ ผึ้ง (Phor Phung)", class: "High", classZh: "高輔音", initial: "ph", final: "-", roman: "ph", meaningZh: "蜜蜂", meaningEn: "Bee" },
  { thai: "ฝ", name: "ฝ ฝา (For Fa)", class: "High", classZh: "高輔音", initial: "f", final: "-", roman: "f", meaningZh: "蓋子", meaningEn: "Lid" },
  { thai: "ส", name: "ส เสือ (Sor Suea)", class: "High", classZh: "高輔音", initial: "s", final: "t", roman: "s", meaningZh: "老虎", meaningEn: "Tiger" },
  { thai: "ห", name: "ห หีบ (Hor Heep)", class: "High", classZh: "高輔音", initial: "h", final: "-", roman: "h", meaningZh: "箱子", meaningEn: "Chest/Box" },

  // Low Class
  { thai: "ค", name: "ค 队列 (Khor Khwai)", class: "Low", classZh: "低輔音", initial: "kh", final: "k", roman: "kh", meaningZh: "水牛", meaningEn: "Buffalo" },
  { thai: "ง", name: "ง งู (Ngor Ngu)", class: "Low", classZh: "低輔音", initial: "ng", final: "ng", roman: "ng", meaningZh: "蛇", meaningEn: "Snake" },
  { thai: "ช", name: "ช ช้าง (Chor Chang)", class: "Low", classZh: "低輔音", initial: "ch", final: "t", roman: "ch", meaningZh: "大象", meaningEn: "Elephant" },
  { thai: "ซ", name: "ซ โซ่ (Sor So)", class: "Low", classZh: "低輔音", initial: "s", final: "t", roman: "s", meaningZh: "鐵鏈", meaningEn: "Chain" },
  { thai: "ท", name: "ท ทหาร (Thor Thahan)", class: "Low", classZh: "低輔音", initial: "th", final: "t", roman: "th", meaningZh: "軍人", meaningEn: "Soldier" },
  { thai: "น", name: "น หนู (Nor Nu)", class: "Low", classZh: "低輔音", initial: "n", final: "n", roman: "n", meaningZh: "老鼠", meaningEn: "Mouse" },
  { thai: "พ", name: "พ พาน (Phor Phan)", class: "Low", classZh: "低輔音", initial: "ph", final: "p", roman: "ph", meaningZh: "高腳盤", meaningEn: "Tray" },
  { thai: "ฟ", name: "ฟ ฟัน (For Fan)", class: "Low", classZh: "低輔音", initial: "f", final: "p", roman: "f", meaningZh: "牙齒", meaningEn: "Tooth" },
  { thai: "ม", name: "ม ม้า (Mor Ma)", class: "Low", classZh: "低輔音", initial: "m", final: "m", roman: "m", meaningZh: "馬", meaningEn: "Horse" },
  { thai: "ย", name: "ย ยักษ์ (Yor Yak)", class: "Low", classZh: "低輔音", initial: "y", final: "-", roman: "y", meaningZh: "夜叉/夜巨人", meaningEn: "Giant" },
  { thai: "ร", name: "ร เรือ (Ror Ruea)", class: "Low", classZh: "低輔音", initial: "r", final: "n", roman: "r", meaningZh: "船", meaningEn: "Boat" },
  { thai: "ล", name: "ล ลิง (Lor Ling)", class: "Low", classZh: "低輔音", initial: "l", final: "n", roman: "l", meaningZh: "猴子", meaningEn: "Monkey" },
  { thai: "ว", name: "ว แหวน (Wor Waen)", class: "Low", classZh: "低輔音", initial: "w", final: "-", roman: "w", meaningZh: "戒指", meaningEn: "Ring" },
  { thai: "ฮ", name: "ฮ นกฮูก (Hor Nok-huk)", class: "Low", classZh: "低輔音", initial: "h", final: "-", roman: "h", meaningZh: "貓頭鷹", meaningEn: "Owl" }
];

// --- DATA: Thai Vowels ---
const THAI_VOWELS = [
  { thai: "-ะ", type: "Short", typeZh: "短元音", roman: "a", example: "จะ (ja - 將要)", meaningZh: "短音 a" },
  { thai: "-า", type: "Long", typeZh: "長元音", roman: "aa", example: "มา (maa - 來)", meaningZh: "長音 aa" },
  { thai: "-ิ", type: "Short", typeZh: "短元音", roman: "i", example: "ชิม (chim - 品嚐)", meaningZh: "短音 i" },
  { thai: "-ี", type: "Long", typeZh: "長元音", roman: "ii", example: "ดี (dee - 好)", meaningZh: "長音 ii" },
  { thai: "-ึ", type: "Short", typeZh: "短元音", roman: "ue", example: "ตึก (tuek - 大樓)", meaningZh: "短扁音 ue" },
  { thai: "-ื", type: "Long", typeZh: "長元音", roman: "uee", example: "มือ (muee - 手)", meaningZh: "長扁音 uee" },
  { thai: "-ุ", type: "Short", typeZh: "短元音", roman: "u", example: "กุ้ง (koong - 蝦)", meaningZh: "短音 u" },
  { thai: "-ู", type: "Long", typeZh: "長元音", roman: "uu", example: "พูด (phoot - 說)", meaningZh: "長音 uu" },
  { thai: "เ-ะ", type: "Short", typeZh: "短元音", roman: "e", example: "เตะ (te - 踢)", meaningZh: "短音 e" },
  { thai: "เ-", type: "Long", typeZh: "長元音", roman: "ee", example: "เซ (say - 歪斜)", meaningZh: "長音 ee" },
  { thai: "แ-ะ", type: "Short", typeZh: "短元音", roman: "ae", example: "แกะ (gae - 羊)", meaningZh: "短張口 ae" },
  { thai: "แ-", type: "Long", typeZh: "長元音", roman: "aae", example: "แม่ (mae - 媽媽)", meaningZh: "長張口 aae" },
  { thai: "โ-", type: "Long", typeZh: "長元音", roman: "oo", example: "โต (too - 大)", meaningZh: "長音 oo" },
  { thai: "เอา", type: "Long", typeZh: "長元音", roman: "ao", example: "เอา (ao - 要)", meaningZh: "雙元音 ao" }
];

// --- DATA: Thai Numbers ---
const THAI_NUMBERS = [
  { thaiNum: "๐", arabic: "0", script: "ศูนย์", roman: "sǔun", zh: "零" },
  { thaiNum: "๑", arabic: "1", script: "หนึ่ง", roman: "nʉ̀ŋ", zh: "一" },
  { thaiNum: "๒", arabic: "2", script: "สอง", roman: "sɔ̌ɔŋ", zh: "二" },
  { thaiNum: "๓", arabic: "3", script: "สาม", roman: "sǎam", zh: "三" },
  { thaiNum: "๔", arabic: "4", script: "สี่", roman: "sìi", zh: "四" },
  { thaiNum: "๕", arabic: "5", script: "ห้า", roman: "hâa", zh: "五" },
  { thaiNum: "๖", arabic: "6", script: "หก", roman: "hòk", zh: "六" },
  { thaiNum: "๗", arabic: "7", script: "เจ็ด", roman: "jèt", zh: "七" },
  { thaiNum: "๘", arabic: "8", script: "แปด", roman: "pɛ̀ɛt", zh: "八" },
  { thaiNum: "๙", arabic: "9", script: "เก้า", roman: "kâao", zh: "九" },
  { thaiNum: "๑๐", arabic: "10", script: "สิบ", roman: "sìp", zh: "十" },
  { thaiNum: "๑๐๐", arabic: "100", script: "ร้อย", roman: "rɔ́ɔi", zh: "百" },
  { thaiNum: "๑,๐๐๐", arabic: "1,000", script: "พัน", roman: "phan", zh: "千" }
];

// --- DATA: Practical Situational Phrases ---
const PRACTICAL_PHRASES = [
  {
    id: "p-1",
    category: "travel",
    categoryZh: "✈️ 旅遊/交通",
    thai: "ไปสนามบินเท่าไหร่ครับ",
    roman: "pai sa-nǎam-bin thâo-rài khráp",
    zh: "去機場要多少錢？",
    english: "How much to the airport?",
    breakdown: [
      { thai: "ไป", roman: "pai", meaningZh: "去", meaningEn: "Go", pos: "Verb", tone: "Mid" },
      { thai: "สนามบิน", roman: "sa-nǎam-bin", meaningZh: "機場", meaningEn: "Airport", pos: "Noun", tone: "Low-Rising" },
      { thai: "เท่าไหร่", roman: "thâo-rài", meaningZh: "多少錢", meaningEn: "How much", pos: "Question", tone: "Falling-Low" },
      { thai: "ครับ", roman: "khráp", meaningZh: "禮貌詞", meaningEn: "Polite particle", pos: "Particle", tone: "High" }
    ]
  },
  {
    id: "p-2",
    category: "travel",
    categoryZh: "✈️ 旅遊/交通",
    thai: "ช่วยเปิดมิเตอร์ด้วยครับ",
    roman: "chûai pə̀ət mí-tə̂ə dûai khráp",
    zh: "請幫我打表（按跳表計費），謝謝",
    english: "Please turn on the meter",
    breakdown: [
      { thai: "ช่วย", roman: "chûai", meaningZh: "請 / 幫忙", meaningEn: "Please / Help", pos: "Verb", tone: "Falling" },
      { thai: "เปิดมิเตอร์", roman: "pə̀ət mí-tə̂ə", meaningZh: "開計程表", meaningEn: "Turn on meter", pos: "Verb Phrase", tone: "Low-High-Falling" },
      { thai: "ด้วย", roman: "dûai", meaningZh: "麻煩", meaningEn: "Please", pos: "Particle", tone: "Falling" }
    ]
  },
  {
    id: "p-3",
    category: "dining",
    categoryZh: "🍽️ 餐飲/夜生活",
    thai: "ไม่ใส่ผักชีและไม่เผ็ดครับ",
    roman: "mâi sài phàk-chii láe mâi phet khráp",
    zh: "請不要加香菜，也不要加辣",
    english: "No coriander and not spicy please",
    breakdown: [
      { thai: "ไม่ใส่", roman: "mâi sài", meaningZh: "不加 / 不要放", meaningEn: "Don't add", pos: "Verb Phrase", tone: "Falling-Low" },
      { thai: "ผักชี", roman: "phàk-chii", meaningZh: "香菜", meaningEn: "Coriander", pos: "Noun", tone: "Low-Mid" },
      { thai: "และ", roman: "láe", meaningZh: "並且", meaningEn: "And", pos: "Conjunction", tone: "High" },
      { thai: "ไม่เผ็ด", roman: "mâi phet", meaningZh: "不辣", meaningEn: "Not spicy", pos: "Adjective Phrase", tone: "Falling-Low" }
    ]
  },
  {
    id: "p-4",
    category: "dining",
    categoryZh: "🍽️ 餐飲/夜生活",
    thai: "ขอเบียร์สิงห์สองขวดครับ",
    roman: "khɔ̌ɔ bia sǐng sɔ̌ɔŋ khùat khráp",
    zh: "請給我兩瓶勝獅啤酒 (Singha Beer)",
    english: "Two Singha beers please",
    breakdown: [
      { thai: "ขอ", roman: "khɔ̌ɔ", meaningZh: "請給", meaningEn: "May I have", pos: "Verb", tone: "Rising" },
      { thai: "เบียร์สิงห์", roman: "bia sǐng", meaningZh: "勝獅啤酒", meaningEn: "Singha Beer", pos: "Noun", tone: "Mid-Rising" },
      { thai: "สอง", roman: "sɔ̌ɔŋ", meaningZh: "二", meaningEn: "Two", pos: "Number", tone: "Rising" },
      { thai: "ขวด", roman: "khùat", meaningZh: "瓶 (量詞)", meaningEn: "Bottle", pos: "Classifier", tone: "Low" }
    ]
  },
  {
    id: "p-5",
    category: "shopping",
    categoryZh: "🛍️ 購物/議價",
    thai: "ลดราคาหน่อยได้ไหมครับ",
    roman: "lót raa-khaa nɔ̌i dâi mǎi khráp",
    zh: "可以算便宜一點嗎？",
    english: "Can you give me a discount?",
    breakdown: [
      { thai: "ลด", roman: "lót", meaningZh: "降低 / 打折", meaningEn: "Reduce", pos: "Verb", tone: "High" },
      { thai: "ราคา", roman: "raa-khaa", meaningZh: "價格", meaningEn: "Price", pos: "Noun", tone: "Mid-Mid" },
      { thai: "หน่อย", roman: "nɔ̌i", meaningZh: "一點點", meaningEn: "A bit", pos: "Adverb", tone: "Low" },
      { thai: "ได้ไหม", roman: "dâi mǎi", meaningZh: "可以嗎", meaningEn: "Can you", pos: "Question", tone: "Falling-Rising" }
    ]
  },
  {
    id: "p-6",
    category: "business",
    categoryZh: "💼 商務/工作",
    thai: "ยินดีที่ได้ร่วมงานกันครับ",
    roman: "yin-dee tee dâi rûam-nga an gan khráp",
    zh: "很高興能與您合作！",
    english: "Pleased to work with you",
    breakdown: [
      { thai: "ยินดี", roman: "yin-dee", meaningZh: "榮幸 / 高興", meaningEn: "Pleased", pos: "Verb", tone: "Mid-Mid" },
      { thai: "ร่วมงาน", roman: "rûam-ngaan", meaningZh: "合作 / 共事", meaningEn: "Cooperate", pos: "Verb Phrase", tone: "Falling-Mid" },
      { thai: "กัน", roman: "gan", meaningZh: "互相", meaningEn: "Together", pos: "Adverb", tone: "Mid" }
    ]
  },
  {
    id: "p-7",
    category: "social",
    categoryZh: "🤝 社交/交友",
    thai: "ขอไลน์หรือไอจีหน่อยได้ไหมครับ",
    roman: "khɔ̌ɔ line rʉ̌ʉ IG nɔ̌i dâi mǎi khráp",
    zh: "方便加個 Line 或 IG 嗎？",
    english: "May I have your Line or IG?",
    breakdown: [
      { thai: "ขอ", roman: "khɔ̌ɔ", meaningZh: "請求", meaningEn: "Ask for", pos: "Verb", tone: "Rising" },
      { thai: "หรือ", roman: "rʉ̌ʉ", meaningZh: "或者", meaningEn: "Or", pos: "Conjunction", tone: "Rising" },
      { thai: "หน่อยได้ไหม", roman: "nɔ̌i dâi mǎi", meaningZh: "可以嗎", meaningEn: "Is it okay?", pos: "Phrase", tone: "Low-Falling-Rising" }
    ]
  }
];

// --- DATA: Tone System Details ---
const THAI_TONES = [
  {
    id: 1,
    name: "Mid Tone (中調)",
    thaiName: "เสียงสามัญ (Siang Saman)",
    pitchDiagram: "—",
    curvePath: "M 10,25 L 90,25",
    description: "平坦穩定之中音，無升無降，類似漢語拼音一聲",
    exampleThai: "มา",
    exampleRoman: "maa",
    meaningZh: "來 (Come)",
    toneMarkSymbol: "無標記 (Normal)"
  },
  {
    id: 2,
    name: "Low Tone (低調)",
    thaiName: "เสียงเอก (Siang Ek)",
    pitchDiagram: "＼",
    curvePath: "M 10,20 L 90,40",
    description: "低沉平穩，由中音稍微壓低發音，符號 (à)",
    exampleThai: "หม่า",
    exampleRoman: "màa",
    meaningZh: "浸泡 (Soak)",
    toneMarkSymbol: "ไม้เอก ( ่ )"
  },
  {
    id: 3,
    name: "Falling Tone (降調)",
    thaiName: "เสียงโท (Siang Tho)",
    pitchDiagram: "∧ / ＼",
    curvePath: "M 10,40 C 30,10 70,10 90,45",
    description: "高音迅速陡降，力道強勁，類似漢語拼音四聲，符號 (â)",
    exampleThai: "ม่า",
    exampleRoman: "mâa",
    meaningZh: "媽媽 (Ma)",
    toneMarkSymbol: "ไม้โท ( ้ )"
  },
  {
    id: 4,
    name: "High Tone (高調)",
    thaiName: "เสียงตรี (Siang Tri)",
    pitchDiagram: "／",
    curvePath: "M 10,35 L 90,10",
    description: "高亢上揚，短促有力，類似疑問語氣，符號 (á)",
    exampleThai: "ม้า",
    exampleRoman: "máa",
    meaningZh: "馬 (Horse)",
    toneMarkSymbol: "ไม้ตรี ( ๊ )"
  },
  {
    id: 5,
    name: "Rising Tone (升調)",
    thaiName: "เสียงจัตวา (Siang Chattawa)",
    pitchDiagram: "∨ / ／",
    curvePath: "M 10,30 C 40,45 60,45 90,15",
    description: "先壓低再尾音上揚，類似漢語拼音二聲，符號 (ǎ)",
    exampleThai: "หมา",
    exampleRoman: "mǎa",
    meaningZh: "狗 (Dog)",
    toneMarkSymbol: "ไม้จัตวา ( ๋ )"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('translator'); // 'translator' | 'alphabet' | 'phrases' | 'tones' | 'notes'
  
  // Translator State
  const [inputText, setInputText] = useState("ขอเช็คบิลด้วยครับ");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.75);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingText, setCurrentPlayingText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Alphabet Subtabs
  const [alphabetTab, setAlphabetTab] = useState('consonants'); // 'consonants' | 'vowels' | 'numbers'
  const [consonantFilter, setConsonantFilter] = useState('ALL'); // 'ALL' | 'Mid' | 'High' | 'Low'

  // Phrase Subtabs
  const [phraseCategory, setPhraseCategory] = useState('ALL');

  // Notes Library State
  const [librarySubTab, setLibrarySubTab] = useState('sentences');
  const [savedNotes, setSavedNotes] = useState([
    {
      id: "demo-note-1",
      thai: "ขอเช็คบิลด้วยครับ",
      roman: "khɔ̌ɔ chék bin dûai khráp",
      zh: "請買單 / 結帳，謝謝",
      english: "Check the bill please",
      userNote: "酒吧與餐廳結帳必備！ครับ代表男性禮貌用語。",
      tags: ["餐飲夜生活", "日常禮貌"],
      createdAt: "2026-10-27 18:30",
      breakdown: [
        { thai: "ขอ", roman: "khɔ̌ɔ", meaningZh: "請 / 請求", meaningEn: "May I", pos: "Verb", tone: "Rising" },
        { thai: "เช็คบิล", roman: "chék bin", meaningZh: "結帳", meaningEn: "Check bill", pos: "Verb Phrase", tone: "High-Mid" }
      ]
    }
  ]);

  const [savedVocab, setSavedVocab] = useState([
    {
      id: "demo-vocab-1",
      thai: "เช็คบิล",
      roman: "chék bin",
      meaningZh: "結帳",
      meaningEn: "Check bill",
      pos: "Verb Phrase",
      tone: "High-Mid",
      savedAt: "2026-10-27 19:10"
    }
  ]);

  // Note Modal
  const [editingNote, setEditingNote] = useState(null);
  const [noteRemark, setNoteRemark] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2200);
  };

  // TTS Setup
  const playAudio = (textToPlay) => {
    if (!textToPlay) return;
    if (!('speechSynthesis' in window)) {
      showToast("您的瀏覽器不支援語音播放");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToPlay);
    utterance.lang = 'th-TH';
    utterance.rate = speechRate;

    utterance.onstart = () => {
      setIsPlaying(true);
      setCurrentPlayingText(textToPlay);
    };
    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentPlayingText("");
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setCurrentPlayingText("");
    };

    window.speechSynthesis.speak(utterance);
  };

  // Web Speech Voice Recognition
  const toggleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast("您的瀏覽器不支援語音辨識輸入");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'th-TH';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        showToast("🎙️ 正在聆聽泰語發音中...");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          handleTranslate(transcript);
          showToast("已辨識語音內容！");
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
        showToast("語音辨識遭遇錯誤，請重新試一次");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
      showToast("無法開啟麥克風");
    }
  };

  // Clipboard Paste Helper
  const handlePasteFromClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setInputText(text);
          showToast("已從剪貼簿貼上！");
          handleTranslate(text);
        } else {
          showToast("剪貼簿無文字內容");
        }
      } else {
        showToast("瀏覽器權限不支援自動貼上，請手動貼上");
      }
    } catch (e) {
      showToast("無法讀取剪貼簿內容");
    }
  };

  // Translator Engine
  const handleTranslate = async (queryText) => {
    const textToSearch = (queryText !== undefined ? queryText : inputText).trim();
    if (!textToSearch) {
      setResult(null);
      return;
    }

    setIsLoading(true);

    // Matching local phrases
    const localMatch = PRACTICAL_PHRASES.find(p => p.thai === textToSearch || p.zh === textToSearch);
    if (localMatch) {
      setResult(localMatch);
      setIsLoading(false);
      return;
    }

    // Call Gemini API
    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const systemPrompt = `You are a specialized adult Thai analyzer. Output strict JSON:
{
  "thai": "Thai sentence",
  "roman": "Paiboon romanization with tone marks",
  "zh": "Traditional Chinese translation",
  "english": "English translation",
  "breakdown": [
    {
      "thai": "Word",
      "roman": "Romanization",
      "meaningZh": "Meaning in Traditional Chinese",
      "meaningEn": "Meaning in English",
      "pos": "Part of speech",
      "tone": "Tone name"
    }
  ]
}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Analyze and breakdown: "${textToSearch}"` }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const parsed = JSON.parse(data.candidates[0].content.parts[0].text);
        parsed.id = "gen-" + Date.now();
        setResult(parsed);
      } else {
        throw new Error("API response error");
      }
    } catch (e) {
      // Fallback
      setResult({
        id: "fallback-" + Date.now(),
        thai: textToSearch,
        roman: "Sawatdee",
        zh: textToSearch,
        english: textToSearch,
        breakdown: [
          { thai: textToSearch, roman: "Text", meaningZh: "翻譯對照", meaningEn: "Translation", pos: "Phrase", tone: "Mid" }
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Bookmarking Functions
  const toggleSaveWord = (wordItem, e) => {
    if (e) e.stopPropagation();
    const isSaved = savedVocab.some(v => v.thai === wordItem.thai);
    if (isSaved) {
      setSavedVocab(prev => prev.filter(v => v.thai !== wordItem.thai));
      showToast(`已從單字庫移除 「${wordItem.thai}」`);
    } else {
      setSavedVocab(prev => [{
        id: "vocab-" + Date.now(),
        thai: wordItem.thai,
        roman: wordItem.roman,
        meaningZh: wordItem.meaningZh,
        meaningEn: wordItem.meaningEn,
        pos: wordItem.pos,
        tone: wordItem.tone,
        savedAt: new Date().toLocaleString('zh-TW', { hour12: false })
      }, ...prev]);
      showToast(`已成功收藏單字 「${wordItem.thai}」`);
    }
  };

  const isWordSaved = (thaiWord) => savedVocab.some(v => v.thai === thaiWord);

  const openSaveModal = (item) => {
    const existing = savedNotes.find(n => n.thai === item.thai);
    if (existing) {
      setEditingNote(existing);
      setNoteRemark(existing.userNote || "");
      setSelectedTags(existing.tags || []);
    } else {
      setEditingNote(item);
      setNoteRemark("");
      setSelectedTags(["實用例句"]);
    }
  };

  const handleSaveNote = () => {
    if (!editingNote) return;
    const newNote = {
      id: editingNote.id || "note-" + Date.now(),
      thai: editingNote.thai,
      roman: editingNote.roman,
      zh: editingNote.zh,
      english: editingNote.english,
      userNote: noteRemark,
      tags: selectedTags,
      createdAt: new Date().toLocaleString('zh-TW', { hour12: false }),
      breakdown: editingNote.breakdown || []
    };

    setSavedNotes(prev => {
      const idx = prev.findIndex(n => n.thai === newNote.thai);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = newNote;
        return copy;
      }
      return [newNote, ...prev];
    });

    setEditingNote(null);
    showToast("已將句子儲存至標記筆記庫！");
  };

  const loadIntoTranslator = (phraseObj) => {
    setInputText(phraseObj.thai);
    setResult(phraseObj);
    setActiveTab('translator');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-amber-400 selection:text-slate-950">
      
      {/* Toast Notification Floating Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs shadow-2xl border border-amber-300 flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Main Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-500 to-indigo-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/20">
              泰
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight text-white flex items-center gap-2">
                <span>Thai Easy</span>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  成人泰語全能學習庫
                </span>
              </h1>
              <p className="text-xs text-slate-400">字母學習 • 實用短句 • 聲調圖解 • 即時拆解收藏</p>
            </div>
          </div>

          {/* 5 Navigation Buttons */}
          <div className="flex items-center space-x-1 bg-slate-950/90 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('translator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 whitespace-nowrap ${
                activeTab === 'translator'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>⚡ 即時翻譯</span>
            </button>

            <button
              onClick={() => setActiveTab('alphabet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 whitespace-nowrap ${
                activeTab === 'alphabet'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>🔤 字母學習</span>
            </button>

            <button
              onClick={() => setActiveTab('phrases')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 whitespace-nowrap ${
                activeTab === 'phrases'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>💬 實用短句</span>
            </button>

            <button
              onClick={() => setActiveTab('tones')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 whitespace-nowrap ${
                activeTab === 'tones'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>🎵 聲調圖解</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 whitespace-nowrap ${
                activeTab === 'notes'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>🔖 標記筆記 ({savedNotes.length + savedVocab.length})</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main App Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-6 flex-1 w-full space-y-6">

        {/* TAB 1: INSTANT TRANSLATOR */}
        {activeTab === 'translator' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
              
              {/* Header inside Input Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-bold text-amber-400 flex items-center space-x-1.5">
                  <Search className="w-4 h-4" />
                  <span>中央即時輸入框 (泰文 / 繁體中文 / 英文)</span>
                </label>

                <div className="flex items-center space-x-2 text-xs bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[11px] font-medium">發音語速:</span>
                  {[0.5, 0.75, 1.0].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSpeechRate(rate)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition ${
                        speechRate === rate 
                          ? 'bg-amber-400 text-slate-950 font-bold' 
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Area */}
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="請輸入欲翻譯的文字（例如：ขอเช็คบิลด้วยครับ 或 請買單結帳 / 請問這個多少錢）..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400/80 rounded-xl p-4 text-xl md:text-2xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition resize-none h-32 font-medium"
                />
              </div>

              {/* Action Buttons Toolbar below Textarea */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
                
                {/* Right / Left Grouped Buttons */}
                <div className="flex items-center space-x-2">
                  
                  {/* Primary Translate / Analyze Button */}
                  <button
                    onClick={() => handleTranslate(inputText)}
                    disabled={isLoading || !inputText.trim()}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition flex items-center space-x-2 shadow-lg ${
                      isLoading
                        ? 'bg-amber-400/50 text-slate-950 cursor-wait'
                        : inputText.trim()
                          ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/20'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>分析中...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>翻譯 / 分析</span>
                      </>
                    )}
                  </button>

                  {/* Mic / Voice Input Button */}
                  <button
                    onClick={toggleVoiceInput}
                    className={`px-3.5 py-2.5 rounded-xl font-bold text-xs border transition flex items-center space-x-1.5 ${
                      isListening
                        ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
                        : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300'
                    }`}
                    title="開啟泰語語音輸入"
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-amber-400" />}
                    <span>{isListening ? '聆聽中...' : '語音輸入'}</span>
                  </button>
                </div>

                {/* Secondary Clipboard & Clear Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePasteFromClipboard}
                    className="px-3.5 py-2.5 rounded-xl font-bold text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 transition flex items-center space-x-1.5"
                    title="從剪貼簿貼上"
                  >
                    <Clipboard className="w-4 h-4 text-indigo-400" />
                    <span>貼上</span>
                  </button>

                  <button
                    onClick={() => { setInputText(""); setResult(null); }}
                    disabled={!inputText}
                    className={`px-3.5 py-2.5 rounded-xl font-bold text-xs border transition flex items-center space-x-1.5 ${
                      inputText
                        ? 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-200'
                        : 'bg-slate-950/50 border-slate-900 text-slate-700 cursor-not-allowed'
                    }`}
                    title="清空輸入框"
                  >
                    <X className="w-4 h-4" />
                    <span>清除</span>
                  </button>
                </div>

              </div>

            </div>

            {/* Translation Output Card */}
            {result ? (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-800">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">{result.thai}</h2>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => playAudio(result.thai)}
                          className={`p-3 rounded-xl transition flex items-center space-x-2 shadow-lg ${
                            isPlaying && currentPlayingText === result.thai
                              ? 'bg-amber-400 text-slate-950 animate-pulse'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white font-bold'
                          }`}
                        >
                          <Volume2 className="w-5 h-5" />
                          <span className="text-xs font-bold">整句發音</span>
                        </button>

                        <button
                          onClick={() => openSaveModal(result)}
                          className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 hover:bg-slate-800 transition flex items-center space-x-1.5"
                        >
                          <Bookmark className="w-5 h-5 fill-amber-400" />
                          <span className="text-xs font-semibold">收藏句子</span>
                        </button>
                      </div>
                    </div>

                    <div className="pt-1 flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">羅馬拼音</span>
                      <p className="text-amber-400 font-mono text-lg font-bold">{result.roman}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">繁體中文</span>
                        <span className="text-base font-bold text-slate-200">{result.zh}</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">English</span>
                        <span className="text-base font-medium text-slate-400 italic">{result.english}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Word Breakdown */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-400 flex items-center space-x-2">
                      <Layers className="w-4 h-4 text-amber-400" />
                      <span>逐字拆解與聲調 (Word Breakdown)</span>
                    </h3>
                    <span className="text-[11px] text-slate-500 font-medium">💡 點擊卡片發音 • 點擊⭐收藏單字</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {result.breakdown && result.breakdown.map((item, idx) => {
                      const wordSaved = isWordSaved(item.thai);
                      return (
                        <div
                          key={idx}
                          onClick={() => playAudio(item.thai)}
                          className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-amber-400/40 cursor-pointer transition group flex flex-col justify-between space-y-3 relative"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-2xl font-bold text-white group-hover:text-amber-400 transition">
                                {item.thai}
                              </span>
                              <p className="text-amber-400 font-mono text-xs font-bold mt-0.5">{item.roman}</p>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={(e) => toggleSaveWord(item, e)}
                                className={`p-2 rounded-lg transition border ${
                                  wordSaved
                                    ? 'bg-amber-400/10 border-amber-400/40 text-amber-400'
                                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-amber-400'
                                }`}
                              >
                                <Star className={`w-4 h-4 ${wordSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                              </button>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-900 space-y-1">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-bold text-slate-200">{item.meaningZh}</span>
                              <span className="text-slate-500 text-[10px] italic">{item.meaningEn}</span>
                            </div>
                            <div className="flex items-center justify-between pt-1">
                              <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] font-mono border border-slate-800">
                                {item.pos}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 text-[10px] font-bold border border-amber-400/20">
                                {item.tone}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
                <Sparkles className="w-8 h-8 text-amber-400/40 mx-auto animate-pulse" />
                <p className="text-slate-400 text-sm font-medium">輸入任何文字並點擊「翻譯 / 分析」，或點擊「語音輸入」即可獲得三語對照與逐字拆解。</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ALPHABET & WRITING SYSTEM */}
        {activeTab === 'alphabet' && (
          <div className="space-y-6">
            
            {/* Header & Category Switch */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Grid className="w-5 h-5 text-amber-400" />
                    <span>泰文字母系統 (Thai Alphabet & Writing System)</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">基礎 44 個輔音、高低長短元音與泰文數字對照</p>
                </div>

                {/* Sub-tabs */}
                <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setAlphabetTab('consonants')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      alphabetTab === 'consonants' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    輔音 (Consonants)
                  </button>
                  <button
                    onClick={() => setAlphabetTab('vowels')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      alphabetTab === 'vowels' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    元音 (Vowels)
                  </button>
                  <button
                    onClick={() => setAlphabetTab('numbers')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      alphabetTab === 'numbers' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    數字 (Numbers)
                  </button>
                </div>
              </div>

              {/* Consonants Class Guide Banner */}
              {alphabetTab === 'consonants' && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-slate-400 font-medium">輔音類別篩選:</span>
                    {['ALL', 'Mid', 'High', 'Low'].map((cls) => (
                      <button
                        key={cls}
                        onClick={() => setConsonantFilter(cls)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                          consonantFilter === cls
                            ? 'bg-amber-400 text-slate-950 border-amber-400'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {cls === 'ALL' ? '全部 44 輔音' : cls === 'Mid' ? '中輔音 (Mid Class)' : cls === 'High' ? '高輔音 (High Class)' : '低輔音 (Low Class)'}
                      </button>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                      <span><strong>中輔音 (9個)</strong>: 聲調平穩，搭配聲調符號發音最齊全。</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
                      <span><strong>高輔音 (11個)</strong>: 本音帶有升調 (Rising tone)，發音偏高。</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <span><strong>低輔音 (24個)</strong>: 本音為中調 (Mid tone)，數量最多。</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Consonants Grid */}
            {alphabetTab === 'consonants' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {THAI_CONSONANTS
                  .filter(c => consonantFilter === 'ALL' || c.class === consonantFilter)
                  .map((c, i) => (
                    <div
                      key={i}
                      onClick={() => playAudio(c.name)}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition cursor-pointer flex flex-col justify-between space-y-3 shadow-lg group"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-4xl font-black text-white group-hover:text-amber-400 transition">
                          {c.thai}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          c.class === 'Mid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          c.class === 'High' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                          'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                        }`}>
                          {c.classZh}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-200">{c.name}</p>
                        <p className="text-[11px] text-amber-400 font-mono">初音: {c.initial} | 尾音: {c.final}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-950 flex justify-between items-center text-[10px] text-slate-500">
                        <span>{c.meaningZh} ({c.meaningEn})</span>
                        <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400" />
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* Vowels Grid */}
            {alphabetTab === 'vowels' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {THAI_VOWELS.map((v, i) => (
                  <div
                    key={i}
                    onClick={() => playAudio(v.example.split(' ')[0])}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition cursor-pointer space-y-2 shadow-lg group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-extrabold text-white group-hover:text-amber-400">{v.thai}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-950 text-indigo-400 text-[10px] font-bold border border-slate-800">
                        {v.typeZh}
                      </span>
                    </div>
                    <p className="text-amber-400 font-mono text-xs font-bold">拼音: {v.roman}</p>
                    <div className="pt-2 border-t border-slate-950 flex items-center justify-between text-xs text-slate-300">
                      <span>例字: {v.example}</span>
                      <Volume2 className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Numbers Grid */}
            {alphabetTab === 'numbers' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {THAI_NUMBERS.map((n, i) => (
                  <div
                    key={i}
                    onClick={() => playAudio(n.script)}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition cursor-pointer space-y-2 shadow-lg group text-center"
                  >
                    <div className="flex items-center justify-around">
                      <span className="text-3xl font-black text-amber-400">{n.thaiNum}</span>
                      <span className="text-2xl font-bold text-white">({n.arabic})</span>
                    </div>
                    <div className="pt-1">
                      <p className="text-sm font-bold text-slate-200">{n.script}</p>
                      <p className="text-xs text-amber-400 font-mono">{n.roman}</p>
                    </div>
                    <span className="text-xs text-slate-500 block">{n.zh}</span>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 3: PRACTICAL PHRASES */}
        {activeTab === 'phrases' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Compass className="w-5 h-5 text-amber-400" />
                  <span>成人泰語實用短句庫 (Practical Situational Phrases)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">涵蓋旅遊、餐飲夜生活、購物議價、商務與社交對話</p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {[
                  { id: 'ALL', label: '全部短句' },
                  { id: 'travel', label: '✈️ 旅遊交通' },
                  { id: 'dining', label: '🍽️ 餐飲夜生活' },
                  { id: 'shopping', label: '🛍️ 購物議價' },
                  { id: 'business', label: '💼 商務工作' },
                  { id: 'social', label: '🤝 社交交友' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setPhraseCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      phraseCategory === cat.id
                        ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/10'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Phrase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRACTICAL_PHRASES
                .filter(p => phraseCategory === 'ALL' || p.category === phraseCategory)
                .map((phrase) => (
                  <div
                    key={phrase.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/40 transition flex flex-col justify-between space-y-4 shadow-xl"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800">
                          {phrase.categoryZh}
                        </span>
                        
                        <div className="flex items-center space-x-1.5">
                          <button
                            onClick={() => playAudio(phrase.thai)}
                            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openSaveModal(phrase)}
                            className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-amber-400 hover:bg-slate-800"
                          >
                            <Bookmark className="w-4 h-4 fill-amber-400" />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white">{phrase.thai}</h3>
                      <p className="text-amber-400 font-mono text-sm font-bold">{phrase.roman}</p>
                      <p className="text-slate-200 text-sm font-medium">{phrase.zh}</p>
                      <p className="text-slate-400 text-xs italic">{phrase.english}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => loadIntoTranslator(phrase)}
                        className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
                      >
                        <span>載入翻譯器看逐字拆解</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 4: VISUAL TONES DIAGRAM */}
        {activeTab === 'tones' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Activity className="w-5 h-5 text-amber-400" />
                <span>泰語五聲調音高圖解 (5 Pitch Contour Diagrams)</span>
              </h2>
              <p className="text-xs text-slate-400">泰語為聲調語言，相同拼音在不同聲調下意思完全不同。點擊測試音高對比！</p>
            </div>

            {/* 5 Tones Contour Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {THAI_TONES.map((tone) => (
                <div
                  key={tone.id}
                  onClick={() => playAudio(tone.exampleThai)}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition cursor-pointer flex flex-col justify-between space-y-4 shadow-xl group text-center"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-amber-400 uppercase">{tone.name}</span>
                    <p className="text-[10px] text-slate-500 font-mono">{tone.thaiName}</p>
                  </div>

                  {/* SVG Pitch Curve Diagram */}
                  <div className="h-20 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center p-2">
                    <svg className="w-full h-full" viewBox="0 0 100 50">
                      <path
                        d={tone.curvePath}
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-2xl font-black text-white block group-hover:text-amber-400">{tone.exampleThai}</span>
                      <span className="text-amber-400 font-mono text-xs font-bold">{tone.exampleRoman}</span>
                    </div>

                    <p className="text-xs font-bold text-slate-200">{tone.meaningZh}</p>
                    <p className="text-[10px] text-slate-500">{tone.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-950 flex items-center justify-center space-x-1 text-xs text-indigo-400">
                    <Volume2 className="w-4 h-4" />
                    <span>收聽聲調</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Contrast Audio Matrix */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-amber-400 flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>聲調發音對比測試 (maa 音高對比)</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { thai: "มา", roman: "maa", tone: "中調 (1)", meaning: "來" },
                  { thai: "หม่า", roman: "màa", tone: "低調 (2)", meaning: "浸泡" },
                  { thai: "ม่า", roman: "mâa", tone: "降調 (3)", meaning: "媽媽" },
                  { thai: "ม้า", roman: "máa", tone: "高調 (4)", meaning: "馬" },
                  { thai: "หมา", roman: "mǎa", tone: "升調 (5)", meaning: "狗" }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => playAudio(item.thai)}
                    className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition text-center space-y-1"
                  >
                    <span className="text-xl font-bold text-white block">{item.thai}</span>
                    <span className="text-amber-400 font-mono text-xs font-bold block">{item.roman}</span>
                    <span className="text-[10px] text-slate-400 block">{item.tone}</span>
                    <span className="text-[10px] text-slate-500 block">{item.meaning}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SAVED NOTES LIBRARY */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span>我的收藏庫 (Saved Notes Library)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">管理個人標記的泰語句子與獨立單字庫</p>
              </div>

              {/* Sub-tabs */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setLibrarySubTab('sentences')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    librarySubTab === 'sentences' ? 'bg-amber-400 text-slate-950' : 'bg-slate-950 text-slate-400'
                  }`}
                >
                  句子 ({savedNotes.length})
                </button>
                <button
                  onClick={() => setLibrarySubTab('vocab')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    librarySubTab === 'vocab' ? 'bg-amber-400 text-slate-950' : 'bg-slate-950 text-slate-400'
                  }`}
                >
                  單字 ({savedVocab.length})
                </button>
              </div>
            </div>

            {/* Sentences List */}
            {librarySubTab === 'sentences' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedNotes.map((note) => (
                  <div key={note.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-bold text-white">{note.thai}</h3>
                      <button onClick={() => playAudio(note.thai)} className="p-2 rounded-lg bg-indigo-600 text-white">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-amber-400 font-mono text-sm font-bold">{note.roman}</p>
                    <p className="text-slate-200 text-sm">{note.zh}</p>
                    {note.userNote && (
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                        💡 {note.userNote}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Vocab List */}
            {librarySubTab === 'vocab' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {savedVocab.map((vocab) => (
                  <div key={vocab.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-2xl font-bold text-white">{vocab.thai}</span>
                      <button onClick={() => playAudio(vocab.thai)} className="p-1.5 rounded bg-indigo-600 text-white">
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-amber-400 font-mono text-xs font-bold">{vocab.roman}</p>
                    <p className="text-slate-200 text-xs font-bold">{vocab.meaningZh}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* SAVE NOTE MODAL */}
      {editingNote && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>標記收藏句子</span>
              </h3>
              <button onClick={() => setEditingNote(null)} className="text-slate-500 hover:text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xl font-bold text-white block">{editingNote.thai}</span>
              <span className="text-amber-400 font-mono text-xs font-bold">{editingNote.roman}</span>
              <span className="text-slate-300 text-xs block mt-1">{editingNote.zh}</span>
            </div>

            <div>
              <label className="text-xs text-slate-400 block font-bold mb-1">自訂筆記 / 使用情境:</label>
              <textarea
                value={noteRemark}
                onChange={(e) => setNoteRemark(e.target.value)}
                placeholder="例如：酒吧結帳必備..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 resize-none h-20 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={() => setEditingNote(null)} className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 text-xs">
                取消
              </button>
              <button onClick={handleSaveNote} className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs">
                儲存筆記
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-600 font-medium">
        Thai Easy — 成人泰語全能學習與即時分析引擎
      </footer>
    </div>
  );
}
