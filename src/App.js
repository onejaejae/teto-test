import React, { useState, useEffect } from "react";
import { ChevronLeft, RotateCcw } from "lucide-react";

// 1. 문항 교체: 기획안에 맞춘 20개 문항으로 업데이트
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

// 2. 결과 유형 확장: 더 정확한 7가지 성향 분류
const results = {
  newton: {
    title: "헬스계의 아이작 뉴턴",
    type: "순수 에겐남",
    emoji: "🔬",
    description:
      "당신의 헬스는 과학입니다. 운동복부터 보충제까지 모든 것이 계획되고 계산됩니다. 헬스장에 들어서는 순간, 당신의 눈은 뇌와 연결된 스캐너가 되어 모든 기구의 각도와 균형을 파악합니다. '점진적 과부하'는 당신의 종교이며, 운동 일지는 당신의 성경입니다. 하지만 가끔은 계산기를 내려놓고 심장이 시키는 운동을 해보는 건 어떨까요?",
    hashtags: "#헬스공학자 #인간엑셀 #기회의창맹신론자",
  },
  systematic: {
    title: "체계적 실용주의자",
    type: "에겐 성향",
    emoji: "📋",
    description:
      "당신은 결과를 위해 체계적으로 접근하지만, 형식에 얽매이지 않는 실용주의자입니다. 운동복은 편한 걸로, 하지만 루틴과 기록만큼은 철저하게 관리합니다. '보이는 것보다 실속'을 중시하며, 남들 눈에는 대충해 보여도 나름의 철학과 원칙이 확실한 똑똑한 헬창입니다.",
    hashtags: "#실용적완벽주의 #알짜배기헬창 #보이지않는노력",
  },
  adaptive: {
    title: "적응형 헬창",
    type: "에겐 성향",
    emoji: "🎯",
    description:
      "당신은 기본기는 탄탄하지만 상황에 맞춰 유연하게 적응하는 헬창입니다. 계획과 준비는 철저히 하되, 그날 컨디션이나 헬스장 상황에 따라 과감하게 바꿀 줄도 압니다. 이론과 실전의 균형을 잘 맞추는 현명한 운동러로, 꾸준히 성장하는 비결을 알고 있습니다.",
    hashtags: "#현실적완벽주의 #상황판단력 #지속가능한성장",
  },
  hybrid: {
    title: "밸런스형 헬창",
    type: "하이브리드",
    emoji: "☯️",
    description:
      "당신은 진정한 균형의 달인입니다. 때로는 과학자처럼 냉철하게 분석하다가도, 어떤 날은 야수처럼 본능에 따라 운동합니다. 완벽한 준비를 할 때도 있고, 즉흥적으로 헬스장에 가서 땀을 흘릴 때도 있습니다. 이런 유연성이 오히려 지루하지 않게 운동을 지속하는 당신만의 비결입니다.",
    hashtags: "#다면적헬창 #상황적응력 #지루하지않는운동",
  },
  instinctive: {
    title: "본능적 헬창",
    type: "테토 성향",
    emoji: "🔥",
    description:
      "당신은 복잡한 이론보다 몸의 감각을 믿는 본능적인 헬창입니다. 계획은 대략적으로, 하지만 운동할 때만큼은 누구보다 집중력이 뛰어납니다. 기록보다는 그 순간의 느낌을, 자세보다는 강도를 중시합니다. 가끔 무모해 보일 수 있지만, 당신만의 야생적 감각이 만들어내는 성장이 있습니다.",
    hashtags: "#몸이기억한다 #야생의감각 #순간집중력",
  },
  casual: {
    title: "편안한 헬창",
    type: "테토 성향",
    emoji: "😎",
    description:
      "당신은 운동을 '라이프스타일'로 받아들인 여유로운 헬창입니다. 복장도 편하게, 계획도 느슨하게, 하지만 꾸준히 즐기면서 합니다. 남들이 보기엔 대충하는 것 같아도, 나름의 페이스로 건강하게 운동을 지속하는 지혜로운 사람입니다. 운동이 스트레스가 아닌 힐링이 되는 타입이에요.",
    hashtags: "#편안한지속 #나만의페이스 #운동은즐거움",
  },
  warrior: {
    title: "헬스장 전사",
    type: "순수 테토남",
    emoji: "⚔️",
    description:
      "당신에게 헬스는 전쟁터입니다. 복장이나 계획 따위는 중요하지 않고, 오직 그 순간의 승부와 중량만이 중요합니다. 바벨은 당신의 무기이며, 매일매일이 어제의 자신을 이기는 싸움입니다. 당신의 운동 철학은 단순합니다: '더 무겁게, 더 강하게!' 헬스장에서 당신의 존재감은 압도적입니다.",
    hashtags: "#인간불도저 #중량이정의 #매일이전쟁",
  },
};

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (showResult) {
      calculateResult();
    }
  }, [showResult]);

  // 3. 조건부 필터링 방식: 핵심 문항 조합으로 정확한 결과 도출
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

    // 완벽주의자 (모든 것이 체계적)
    if (
      outfit === "A" &&
      records === "A" &&
      philosophy === "A" &&
      score >= 20
    ) {
      setResult(results.newton);
      return;
    }

    // 체계적 실용주의자 (복장은 편하지만 루틴/기록은 철저)
    if (outfit === "B" && records === "A" && routine === "A" && score >= 8) {
      setResult(results.systematic);
      return;
    }

    // 적응형 헬창 (준비는 철저하지만 융통성 있음)
    if (outfit === "A" && warmup === "A" && records === "B" && score >= 4) {
      setResult(results.adaptive);
      return;
    }

    // 편안한 헬창 (대부분 느슨하지만 나름 꾸준함)
    if (
      outfit === "B" &&
      records === "B" &&
      satisfaction === "B" &&
      score >= -15
    ) {
      setResult(results.casual);
      return;
    }

    // 전사형 (모든 것이 본능적이고 강도 중심)
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

  // 기존 handleAnswer 로직에서 resetButtonStyles 호출 시점을 조정
  const handleAnswer = (answer) => {
    setIsAnimating(true);
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // 버튼 스타일 리셋 로직을 onTransitionEnd (CSS 트랜지션 완료 후)나 setTimeout으로 더 안전하게 지연
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
      setIsAnimating(false);

      // 다음 질문으로 넘어간 후 또는 결과 화면 전환 직전에만 스타일 리셋을 시도
      // 이 시점에서 DOM이 업데이트되고 이전 버튼이 화면에서 사라지거나 비활성화되어야 함
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      // 모든 버튼의 인라인 스타일을 강제로 제거하여 이전 터치/포커스 흔적 삭제
      document.querySelectorAll("button").forEach((button) => {
        button.removeAttribute("style");
        button.classList.remove("focus", "active", "hover"); // 혹시 모를 클래스도 제거
      });
    }, 300); // isAnimating 트랜지션 시간과 동일하게 맞춤
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      // 뒤로가기 시에도 이전 버튼 포커스 해제 및 스타일 초기화
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
    // 재시작 시에도 모든 버튼 스타일 초기화
    document.querySelectorAll("button").forEach((button) => {
      button.removeAttribute("style");
      button.classList.remove("focus", "active", "hover");
    });
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  // 각 버튼의 onTouchStart, onTouchEnd, onTouchCancel 핸들러는 그대로 유지
  // 다만, onTouchEnd/Cancel 내부의 setTimeout은 삭제하여 즉시 스타일 리셋이 되도록 함
  // 이는 handleAnswer의 비동기 리셋 로직과 함께 작동하도록 하기 위함
  const handleTouchStart = (e, type) => {
    e.target.style.transform = "scale(0.98)";
    e.target.style.backgroundColor = type === "A" ? "#1e40af" : "#7c3aed";
  };

  const handleTouchEnd = (e) => {
    e.target.style.transform = "";
    e.target.style.backgroundColor = "";
    e.target.blur();
    // 여기서 e.target.removeAttribute('style')은 handleAnswer에서 일괄 처리되도록 함
  };

  const handleTouchCancel = (e) => {
    e.target.style.transform = "";
    e.target.style.backgroundColor = "";
    e.target.blur();
    // 여기서 e.target.removeAttribute('style')은 handleAnswer에서 일괄 처리되도록 함
  };

  // 모바일 최적화된 UI
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 flex items-center justify-center">
      <div className="max-w-md mx-auto w-full px-4">
        {/* Title - 항상 표시하도록 수정 */}
        <div className="text-center mb-6 md:mb-8 animate-fade-in-down">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
            에겐남 vs 테토남 💥
            <br />
            당신의 헬창 성향은?
          </h1>
          {/* 서브타이틀은 첫 번째 질문에서만 표시 */}
          {currentQuestion === 0 && (
            <p className="text-sm md:text-base lg:text-lg text-gray-400 leading-relaxed px-2">
              20문항으로 알아보는 나의 운동 DNA,
              <br />
              지금 테스트 시작!
            </p>
          )}
        </div>

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
              style={{
                WebkitTapHighlightColor: "transparent",
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                userSelect: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
                outline: "none",
              }}
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
              style={{
                WebkitTapHighlightColor: "transparent",
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                userSelect: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
                outline: "none",
              }}
            >
              <p className="text-sm md:text-base lg:text-lg  leading-relaxed">
                {questions[currentQuestion].optionB}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
