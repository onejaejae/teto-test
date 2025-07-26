import React, { useState, useEffect } from "react";
import { ChevronLeft, RotateCcw, Home, Info, Share2 } from "lucide-react";

// 원본 질문 데이터
const questions = [
  {
    id: 1,
    question: "헬스장 들어설 때 당신의 복장은?",
    optionA:
      "기능성 소재 상/하의 세트, 운동 목적에 맞는 최신 운동화까지 완벽 구비.",
    optionB:
      "어제 입었던 티셔츠, 편하면 그만. 신발은 슬리퍼 신고 와서 갈아 신는다.",
  },
  {
    id: 2,
    question: "오늘 운동, 어떻게 시작할까?",
    optionA:
      "운동 어플을 켜고 오늘의 루틴(5분할 중 '가슴')과 목표 볼륨량을 확인한다.",
    optionB: "일단 벤치프레스에 사람 없으면 바로 앉는다. 가슴이 끌린다.",
  },
  {
    id: 3,
    question: "운동 전 워밍업은?",
    optionA: "폼롤러, 동적 스트레칭, 저강도 유산소까지 15분 이상 투자한다.",
    optionB: "벤치프레스 빈 바로 1세트. 그걸로 몸 다 풀렸다.",
  },
  {
    id: 4,
    question: "프로틴 셰이커를 챙기는 당신.",
    optionA:
      "운동 후 30분 '기회의 창'을 위해 BCAA, 크레아틴까지 정확히 계량해서 챙겨왔다.",
    optionB:
      "가방 안에서 뭔가 굴러다니던 셰이커에 대충 프로틴 한 스쿱 털어 넣는다.",
  },
  {
    id: 5,
    question: "벤치프레스 세팅할 때.",
    optionA:
      "바벨의 센터, 벤치 각도, 안전바 높이까지 수평계로 재듯 꼼꼼히 맞춘다.",
    optionB: "원판 대충 끼우고 앉아서 몸으로 중심 맞추면 그게 센터다.",
  },
  {
    id: 6,
    question: "스쿼트 중 자세가 살짝 흔들렸을 때.",
    optionA:
      '"No Count!" 즉시 중단하고 다음 세트에서는 무게를 낮춰 자세부터 다시 잡는다.',
    optionB:
      '"하나 더!" 어떻게든 올라왔으니 성공. 다음 세트는 무게를 더 올린다.',
  },
  {
    id: 7,
    question: "당신이 거울을 보는 진짜 이유는?",
    optionA: "타겟 근육의 수축/이완, 좌우 밸런스를 해부학적으로 체크하기 위해.",
    optionB: "거울 속 녀석의 나약한 표정을 이겨내고 승리하기 위해.",
  },
  {
    id: 8,
    question: "세트 사이 휴식 시간에 당신은?",
    optionA: "다음 세트 전략을 구상하며 심박수를 체크하고 정확히 90초를 잰다.",
    optionB: "멍하니 바닥에 드러눕거나, 다른 사람 몇 치나 드는지 쳐다본다.",
  },
  {
    id: 9,
    question: "헬스장 신입이 기구 사용법을 물어본다면?",
    optionA:
      '"이 운동은 이 근육을 타겟하고, 호흡은 이렇게, 주의사항은..." 10분 특강 시작.',
    optionB: '"이렇게요." (한번 보여주고 쿨하게 내 운동하러 감)',
  },
  {
    id: 10,
    question: '"자세가 좀 이상한데?" 라는 지적을 들었을 때.',
    optionA:
      '"잠시만요, 영상 좀 찍어주시겠어요?" 즉시 촬영 후 객관적으로 분석한다.',
    optionB: '"아, 이건 저만의 자극점이 있어서요." 일단 내 스타일을 고수한다.',
  },
  {
    id: 11,
    question: "마지막 1개, 실패지점에서 나오는 소리는?",
    optionA: '(파르르 떨며) "흐읍... 후우..." 조용히 복압을 잡으며 버틴다.',
    optionB: '"으아아아아악!!!" 온 헬스장이 떠나갈 듯 포효한다.',
  },
  {
    id: 12,
    question: "사용한 덤벨을 내려놓을 때.",
    optionA:
      "양손으로 조심스럽게 바닥에 내려놓고, 다음 사람을 위해 가지런히 정리한다.",
    optionB: '세트 끝났다는 해방감과 함께 "쿵!" 소리가 나게 바닥에 던져버린다.',
  },
  {
    id: 13,
    question: "오늘 운동, 만족스러운가?",
    optionA: "계획했던 볼륨(무게x횟수x세트)을 100% 채웠을 때.",
    optionB: "샤워할 때 팔이 안 올라갈 정도의 근육통이 느껴질 때.",
  },
  {
    id: 14,
    question: "운동 후 단백질 섭취는?",
    optionA: "닭가슴살 150g과 클린 탄수화물을 저울에 정확히 계량해서 먹는다.",
    optionB: '"단백질 부족해!" 삼겹살 3인분에 소주 한잔. 단백질은 단백질이다.',
  },
  {
    id: 15,
    question: "SNS에 운동 인증샷을 올린다면?",
    optionA:
      "조명과 각도를 이용해 근육의 갈라짐(데피니션)이 가장 잘 보이는 사진.",
    optionB: "오늘 들어 올린 원판의 무게 숫자가 가장 잘 보이는 사진.",
  },
  {
    id: 16,
    question: "운동 기록은 어떻게 관리하는가?",
    optionA:
      "엑셀이나 어플에 날짜별 운동 부위, 무게, 횟수, 세트를 완벽하게 기록한다.",
    optionB: "기록은 무슨. 저번 주에 몇 쳤는지는 몸이 기억한다.",
  },
  {
    id: 17,
    question: "보충제를 고르는 기준은?",
    optionA: "함량, 성분표, 각종 인증 마크까지 꼼꼼히 비교 분석하고 구매한다.",
    optionB:
      "'몬스터', '슈퍼 펌프' 처럼 이름만 들어도 심장이 뛰는 제품을 고른다.",
  },
  {
    id: 18,
    question: '"근성장이란 무엇인가?" 라는 질문에 대한 당신의 답.',
    optionA:
      "점진적 과부하 원칙에 입각한 체계적인 근섬유 상처와 회복의 과학적 과정.",
    optionB: "어제보다 무거운 무게를 들었을 때 느끼는 고통과 희열의 증거.",
  },
  {
    id: 19,
    question: "당신에게 '근손실'은 어떤 의미인가?",
    optionA:
      "유산소 운동 30분 이상, 공복 4시간 이상 등 과학적으로 증명된 재앙.",
    optionB: "오늘 벤치프레스 무게가 2.5kg 줄어든 것. 그게 바로 근손실이다.",
  },
  {
    id: 20,
    question: "당신이 꿈꾸는 궁극의 몸은?",
    optionA:
      "체지방률 8% 이하, 완벽한 좌우대칭과 균형미를 갖춘 클래식 피지크 모델.",
    optionB: "누가 봐도 압도적인 사이즈와 중량감. 3대 500은 기본인 파워리프터.",
  },
];

// 결과 유형
const results = {
  newton: {
    title: "헬스계의 아이작 뉴턴",
    type: "순수 에겐남",
    emoji: "🔬",
    description:
      "당신의 헬스는 과학입니다. 운동복부터 보충제까지 모든 것이 계획되고 계산됩니다. 헬스장에 들어서는 순간, 당신의 눈은 뇌와 연결된 스캐너가 되어 모든 기구의 각도와 균형을 파악합니다. '점진적 과부하'는 당신의 종교이며, 운동 일지는 당신의 성경입니다. 하지만 가끔은 계산기를 내려놓고 심장이 시키는 운동을 해보는 건 어떨까요?",
    hashtags: "#헬스공학자 #인간엑셀 #기회의창맹신론자",
    percentage: "전체 사용자의 15%",
  },
  systematic: {
    title: "체계적 실용주의자",
    type: "에겐 성향",
    emoji: "📋",
    description:
      "당신은 결과를 위해 체계적으로 접근하지만, 형식에 얽매이지 않는 실용주의자입니다. 운동복은 편한 걸로, 하지만 루틴과 기록만큼은 철저하게 관리합니다. '보이는 것보다 실속'을 중시하며, 남들 눈에는 대충해 보여도 나름의 철학과 원칙이 확실한 똑똑한 헬창입니다.",
    hashtags: "#실용적완벽주의 #알짜배기헬창 #보이지않는노력",
    percentage: "전체 사용자의 25%",
  },
  adaptive: {
    title: "적응형 헬창",
    type: "에겐 성향",
    emoji: "🎯",
    description:
      "당신은 기본기는 탄탄하지만 상황에 맞춰 유연하게 적응하는 헬창입니다. 계획과 준비는 철저히 하되, 그날 컨디션이나 헬스장 상황에 따라 과감하게 바꿀 줄도 압니다. 이론과 실전의 균형을 잘 맞추는 현명한 운동러로, 꾸준히 성장하는 비결을 알고 있습니다.",
    hashtags: "#현실적완벽주의 #상황판단력 #지속가능한성장",
    percentage: "전체 사용자의 20%",
  },
  hybrid: {
    title: "밸런스형 헬창",
    type: "하이브리드",
    emoji: "☯️",
    description:
      "당신은 진정한 균형의 달인입니다. 때로는 과학자처럼 냉철하게 분석하다가도, 어떤 날은 야수처럼 본능에 따라 운동합니다. 완벽한 준비를 할 때도 있고, 즉흥적으로 헬스장에 가서 땀을 흘릴 때도 있습니다. 이런 유연성이 오히려 지루하지 않게 운동을 지속하는 당신만의 비결입니다.",
    hashtags: "#다면적헬창 #상황적응력 #지루하지않는운동",
    percentage: "전체 사용자의 20%",
  },
  instinctive: {
    title: "본능적 헬창",
    type: "테토 성향",
    emoji: "🔥",
    description:
      "당신은 복잡한 이론보다 몸의 감각을 믿는 본능적인 헬창입니다. 계획은 대략적으로, 하지만 운동할 때만큼은 누구보다 집중력이 뛰어납니다. 기록보다는 그 순간의 느낌을, 자세보다는 강도를 중시합니다. 가끔 무모해 보일 수 있지만, 당신만의 야생적 감각이 만들어내는 성장이 있습니다.",
    hashtags: "#몸이기억한다 #야생의감각 #순간집중력",
    percentage: "전체 사용자의 12%",
  },
  casual: {
    title: "편안한 헬창",
    type: "테토 성향",
    emoji: "😎",
    description:
      "당신은 운동을 '라이프스타일'로 받아들인 여유로운 헬창입니다. 복장도 편하게, 계획도 느슨하게, 하지만 꾸준히 즐기면서 합니다. 남들이 보기엔 대충하는 것 같아도, 나름의 페이스로 건강하게 운동을 지속하는 지혜로운 사람입니다. 운동이 스트레스가 아닌 힐링이 되는 타입이에요.",
    hashtags: "#편안한지속 #나만의페이스 #운동은즐거움",
    percentage: "전체 사용자의 8%",
  },
  warrior: {
    title: "헬스장 전사",
    type: "순수 테토남",
    emoji: "⚔️",
    description:
      "당신에게 헬스는 전쟁터입니다. 복장이나 계획 따위는 중요하지 않고, 오직 그 순간의 승부와 중량만이 중요합니다. 바벨은 당신의 무기이며, 매일매일이 어제의 자신을 이기는 싸움입니다. 당신의 운동 철학은 단순합니다: '더 무겁게, 더 강하게!' 헬스장에서 당신의 존재감은 압도적입니다.",
    hashtags: "#인간불도저 #중량이정의 #매일이전쟁",
    percentage: "전체 사용자의 10%",
  },
};

// 메인 테스트 컴포넌트
const PersonalityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  useEffect(() => {
    if (showResult) {
      calculateResult();
    }
  }, [showResult]);

  useEffect(() => {
    // 카카오 SDK 로드
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
    script.integrity =
      "sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4";
    script.crossOrigin = "anonymous";
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        // ⚠️ 실제 배포시 카카오 앱 키 설정이 필요합니다
        // 1. https://developers.kakao.com 에서 앱 생성
        // 2. 플랫폼 설정에서 웹 플랫폼 추가 및 도메인 등록
        // 3. 아래 주석을 해제하고 YOUR_KAKAO_APP_KEY를 실제 JavaScript 키로 교체
        window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY || ""); // 이 줄의 주석을 해제하고 키를 입력하세요
      }
    };
    document.head.appendChild(script);

    return () => {
      // cleanup: 스크립트 제거
      const existingScript = document.querySelector('script[src*="kakao"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const calculateResult = () => {
    let score = 0;
    answers.forEach((answer) => {
      score += answer === "A" ? 2 : -2;
    });

    // 핵심 문항들 추출
    const outfit = answers[0]; // 1번: 복장
    const routine = answers[1]; // 2번: 루틴 시작
    const warmup = answers[2]; // 3번: 워밍업
    const records = answers[15]; // 16번: 기록 관리
    const philosophy = answers[17]; // 18번: 근성장 철학
    const satisfaction = answers[12]; // 13번: 운동 만족도

    // 조건부 필터링으로 정확한 결과 도출
    if (
      outfit === "A" &&
      records === "A" &&
      philosophy === "A" &&
      score >= 20
    ) {
      setResult(results.newton);
      return;
    }

    if (outfit === "B" && records === "A" && routine === "A" && score >= 8) {
      setResult(results.systematic);
      return;
    }

    if (outfit === "A" && warmup === "A" && records === "B" && score >= 4) {
      setResult(results.adaptive);
      return;
    }

    if (
      outfit === "B" &&
      records === "B" &&
      satisfaction === "B" &&
      score >= -15
    ) {
      setResult(results.casual);
      return;
    }

    if (
      outfit === "B" &&
      records === "B" &&
      philosophy === "B" &&
      score <= -20
    ) {
      setResult(results.warrior);
      return;
    }

    // 나머지는 점수 구간으로 처리
    if (score >= 12) {
      setResult(results.newton);
    } else if (score >= 4) {
      setResult(results.systematic);
    } else if (score >= -3) {
      setResult(results.hybrid);
    } else if (score >= -15) {
      setResult(results.instinctive);
    } else {
      setResult(results.warrior);
    }
  };

  // 바이럴 썸네일 URL 생성
  const createViralThumbnail = (result) => {
    // public 폴더의 이미지 사용
    const baseUrl = window.location.origin; // 현재 도메인

    const thumbnailImages = {
      "순수 에겐남": `${baseUrl}/images/egen-pure.png`,
      "에겐 성향": `${baseUrl}/images/egen.png`,
      하이브리드: `${baseUrl}/images/hybrid.png`,
      "테토 성향": `${baseUrl}/images/teto.png`,
      "순수 테토남": `${baseUrl}/images/teto-pure.png`,
    };

    // 기본 이미지로 폴백
    return thumbnailImages[result.type] || `${baseUrl}/images/default.png`;
  };

  // 카카오톡 공유 기능
  const shareToKakao = () => {
    const viralTitles = [
      `🏋️‍♂️ 충격! 내 헬창 성향이 드디어 밝혀졌다`,
      `💪 헬스장에서 나는 이런 사람이었어?!`,
      `🔥 1분만에 알아보는 나의 진짜 헬창 DNA`,
      `😱 친구들아, 내가 이런 헬창이었다니!`,
      `🎯 헬스장 실화? 내 성향 테스트 결과 ㄷㄷ`,
    ];

    const viralDescriptions = [
      `${result.emoji} "${result.title}" (${result.type})

${result.hashtags}

헬스장에서 이런 사람이었구나! 🤯
너도 궁금하지 않아? 1분만 투자해봐!`,

      `나는 ${result.type}! ${result.emoji}

${result.percentage} ← 이거 진짜 희귀함 ㅋㅋ

${result.hashtags}

친구들아 나 이런 사람이었어 ㅠㅠ
너희는 뭐가 나올까? 함께 해보자!`,

      `🚨 긴급속보 🚨
${result.emoji} ${result.title} 판정!

${result.hashtags}

1분이면 끝! 당장 해봐!
우리 중에 누가 가장 특이할까? ㅋㅋㅋ`,
    ];

    const randomTitle =
      viralTitles[Math.floor(Math.random() * viralTitles.length)];
    const randomDescription =
      viralDescriptions[Math.floor(Math.random() * viralDescriptions.length)];
    const thumbnailUrl = createViralThumbnail(result);
    const url = "https://teto-test-delta.vercel.app/";

    // 카카오 SDK가 로드되어 있고 초기화되었는지 확인
    if (window.Kakao && window.Kakao.isInitialized()) {
      // 미리 만든 템플릿 사용
      window.Kakao.Share.createCustomButton({
        container: "#kakaotalk-sharing-btn",
        templateId: 122828, // 미리 만든 템플릿 ID
        templateArgs: {
          title: randomTitle,
          description: randomDescription,
          imageUrl: thumbnailUrl,
          url: url,
        },
      });
    } else {
      // 카카오 SDK가 없으면 기본 공유 사용
      const shareText = `${randomTitle}\n\n${randomDescription}\n\n${url}`;

      if (navigator.share) {
        navigator.share({
          title: randomTitle,
          text: randomDescription,
          url: url,
        });
      } else {
        navigator.clipboard.writeText(shareText).then(() => {
          alert("결과가 클립보드에 복사되었습니다!");
        });
      }
    }
  };

  const handleAnswer = (answer) => {
    setIsAnimating(true);
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
      setIsAnimating(false);

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      document.querySelectorAll("button").forEach((button) => {
        button.removeAttribute("style");
        button.classList.remove("focus", "active", "hover");
      });
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      document.querySelectorAll("button").forEach((button) => {
        button.removeAttribute("style");
        button.classList.remove("focus", "active", "hover");
      });
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
    setTestStarted(false);
    document.querySelectorAll("button").forEach((button) => {
      button.removeAttribute("style");
      button.classList.remove("focus", "active", "hover");
    });
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleTouchStart = (e, type) => {
    e.target.style.transform = "scale(0.98)";
    e.target.style.backgroundColor = type === "A" ? "#1e40af" : "#7c3aed";
  };

  const handleTouchEnd = (e) => {
    e.target.style.transform = "";
    e.target.style.backgroundColor = "";
    e.target.blur();
  };

  const handleTouchCancel = (e) => {
    e.target.style.transform = "";
    e.target.style.backgroundColor = "";
    e.target.blur();
  };

  // 랜딩 페이지
  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* 메인 타이틀 */}
            <div className="mb-12 animate-fade-in-down">
              <div className="text-6xl md:text-8xl mb-6">💪</div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                에겐남 vs 테토남
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                당신의 헬창 성향을 알아보는 재미있는 테스트
              </p>
            </div>

            {/* 설명 섹션 */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="text-2xl font-bold mb-4 text-blue-300">
                  에겐남
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  과학적이고 체계적인 접근을 선호하는 운동인. 계획과 분석을 통해
                  효율적인 운동을 추구합니다.
                </p>
              </div>

              <div className="bg-red-900/30 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20">
                <div className="text-4xl mb-4">⚔️</div>
                <h3 className="text-2xl font-bold mb-4 text-red-300">테토남</h3>
                <p className="text-gray-300 leading-relaxed">
                  본능과 열정으로 운동하는 사람. 감정과 의지력을 바탕으로 강렬한
                  운동을 즐깁니다.
                </p>
              </div>
            </div>

            {/* 테스트 정보 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6">📊 테스트 정보</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    20문항
                  </div>
                  <div className="text-gray-400">실제 헬스장 상황</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    3분
                  </div>
                  <div className="text-gray-400">예상 소요시간</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    7타입
                  </div>
                  <div className="text-gray-400">세분화된 결과</div>
                </div>
              </div>
            </div>

            {/* 시작 버튼 */}
            <div>
              <button
                onClick={() => setTestStarted(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                🚀 테스트 시작하기
              </button>
              <p className="text-gray-400 text-sm mt-4">
                * 개인정보 수집 없음 | 결과는 브라우저에만 저장
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 결과 페이지
  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 flex items-center justify-center">
        <div className="max-w-md mx-auto w-full px-4">
          <div className="bg-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl md:text-8xl mb-4 animate-bounce">
                {result.emoji}
              </div>
              <p className="text-yellow-400 font-semibold text-sm md:text-base">
                {result.type}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                {result.title}
              </h1>
              <p className="text-gray-400 text-sm mb-4">{result.percentage}</p>
            </div>

            <div className="mb-6 md:mb-8 p-4 md:p-5 bg-gray-900 rounded-lg">
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {result.description}
              </p>
            </div>

            <div className="mb-6 md:mb-8 text-center text-base md:text-lg text-purple-400 font-mono">
              {result.hashtags}
            </div>

            <div className="space-y-3">
              <button
                id="kakaotalk-sharing-btn" // 이 ID 추가
                onClick={shareToKakao}
                className="w-full bg-yellow-500 text-black py-4 md:py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all active:scale-95"
              >
                <Share2 size={20} />
                카카오톡으로 자랑하기
              </button>
              <button
                onClick={restart}
                className="w-full bg-gray-700 text-white py-4 md:py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-600 transition-all active:scale-95"
              >
                <RotateCcw size={20} />
                다시 테스트하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 테스트 진행 페이지
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 flex items-center justify-center">
      <div className="max-w-md mx-auto w-full px-4">
        {/* Progress Bar & Question Area */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className={`p-3 md:p-2 rounded-lg ${
                currentQuestion === 0 ? "opacity-0" : "hover:bg-gray-800"
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            <span className="text-sm text-gray-400 font-mono">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div
          className={`bg-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-300 ${
            isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"
          }`}
        >
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-6 md:mb-8 text-center min-h-[5rem] md:min-h-[6rem] flex items-center justify-center leading-relaxed px-2">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            <button
              key={`A-${currentQuestion}`}
              onClick={() => handleAnswer("A")}
              onTouchStart={(e) => handleTouchStart(e, "A")}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchCancel}
              className="w-full p-4 md:p-5 bg-gray-700 rounded-xl text-left hover:bg-blue-800/50 transition-all transform hover:scale-[1.03] touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                {questions[currentQuestion].optionA}
              </p>
            </button>

            <button
              key={`B-${currentQuestion}`}
              onClick={() => handleAnswer("B")}
              onTouchStart={(e) => handleTouchStart(e, "B")}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchCancel}
              className="w-full p-4 md:p-5 bg-gray-700 rounded-xl text-left hover:bg-purple-800/50 transition-all transform hover:scale-[1.03] touch-manipulation focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                {questions[currentQuestion].optionB}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// About 페이지 (애드센스용 기본 정보)
const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">🏋️‍♂️</div>
          <h1 className="text-4xl font-bold mb-4">헬창 성향 테스트</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            당신의 운동 성향을 재미있게 알아보세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">
              🎯 테스트 목적
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              헬스장에서의 다양한 상황을 통해 당신이 체계적인 에겐남인지,
              본능적인 테토남인지 알아보는 테스트입니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              20개의 실제 상황 질문으로 당신의 운동 성향을 분석하여, 더
              효과적이고 재미있는 운동 방법을 찾을 수 있도록 도와줍니다.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold mb-4 text-green-600">
              📊 분석 방법
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">•</span>
                <span>헬스장에서 실제로 겪는 상황들로 구성</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">•</span>
                <span>운동 스타일, 계획성, 강도 선호도 등 종합 분석</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">•</span>
                <span>7가지 세분화된 성향으로 정확한 결과</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">•</span>
                <span>재미있고 공감가는 결과 해석</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">
            에겐남 vs 테토남
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🔬</span>
                <h4 className="text-xl font-bold text-blue-800">
                  에겐남 (Evidence-based)
                </h4>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                과학적 근거와 체계적 접근을 중시하는 운동인. 계획적이고 분석적인
                스타일.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 세밀한 운동 계획 수립</li>
                <li>• 정확한 폼과 기법 중시</li>
                <li>• 체계적인 기록 관리</li>
                <li>• 과학적 영양 섭취</li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⚔️</span>
                <h4 className="text-xl font-bold text-red-800">
                  테토남 (Testosterone)
                </h4>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                본능과 열정을 바탕으로 운동하는 사람. 직감적이고 에너지 넘치는
                스타일.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 컨디션과 감정에 따른 운동</li>
                <li>• 고강도, 고중량 선호</li>
                <li>• 직감적이고 본능적 접근</li>
                <li>• 열정과 의지력 중시</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">📞 문의 및 피드백</h3>
          <p className="text-gray-600 mb-6">
            테스트 결과에 대한 궁금한 점이나 개선사항이 있으시면 언제든 연락해
            주세요.
          </p>
          <div className="text-gray-600">
            <strong>이메일:</strong> helchang.test@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
};

// 메인 앱 컴포넌트
const SimpleApp = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <PersonalityTest />;
      case "about":
        return <About />;
      default:
        return <PersonalityTest />;
    }
  };

  // 홈 페이지가 아닐 때만 네비게이션 표시
  if (currentPage === "home") {
    return (
      <div>
        {renderPage()}
        {/* 하단 간단한 About 버튼 */}
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setCurrentPage("about")}
            className="bg-white rounded-full shadow-lg p-3 text-gray-600 hover:text-blue-600 transition-colors"
            title="서비스 소개"
          >
            <Info size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* About 페이지에서는 상단에 홈 버튼 */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => setCurrentPage("home")}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          title="홈으로"
        >
          <Home size={20} />
        </button>
      </div>
      {renderPage()}
    </div>
  );
};

export default SimpleApp;
