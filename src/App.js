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

// 2. 결과 유형 및 내용 업데이트: 새로운 기획안 반영
const results = {
  newton: {
    title: "헬스계의 아이작 뉴턴",
    type: "순수 에겐남",
    emoji: "🔬",
    description:
      "당신의 헬스는 과학입니다. 모든 움직임은 역학적으로 계산되고, 모든 식단은 화학적으로 분석됩니다. 헬스장에 들어서는 순간, 당신의 눈은 뇌와 연결된 스캐너가 되어 모든 기구의 각도와 균형을 파악합니다. '점진적 과부하'는 당신의 종교이며, 운동 일지는 당신의 성경입니다. 하지만 가끔은 계산기를 내려놓고 심장이 시키는 운동을 해보는 건 어떨까요? 중력의 법칙을 거스르는 짜릿함이 기다릴지 모릅니다.",
    hashtags: "#헬스공학자 #인간엑셀 #기회의창맹신론자",
  },
  hightech: {
    title: "하이테크 헬창",
    type: "에겐 성향",
    emoji: "🚀",
    description:
      "당신은 스마트한 헬창입니다. 본능적인 운동의 즐거움을 알지만, 최신 기능성 의류와 스마트 워치 없이는 허전함을 느낍니다. 정확한 자세와 계획의 중요성을 알기에 유튜브 강의를 즐겨보지만, 가끔은 '야생의 심장'이 깨어나 계획에 없던 무게에 도전하기도 합니다. 당신은 이성과 야성의 경계에서 가장 효율적인 근성장을 이뤄내는 하이브리드 인재입니다.",
    hashtags: "#얼리어답터 #스마트헬창 #이론과현실사이",
  },
  hybrid: {
    title: "밸런스형 헬창",
    type: "하이브리드",
    emoji: "☯️",
    description:
      "당신은 헬스계의 '아수라 백작'입니다. 때로는 누구보다 냉철하게 자세를 분석하고 루틴을 계획하지만, 또 어떤 날은 모든 것을 내려놓고 오직 중량과 싸우는 야수로 변합니다. 당신의 몸 안에는 '에겐남'과 '테토남'이 멱살을 잡고 공존하고 있습니다. 이 균형이야말로 정체기를 돌파하고 꾸준히 성장하는 당신만의 비결일지도 모릅니다.",
    hashtags: "#헬스계의중도파 #상황적응의달인 #낮이밤이",
  },
  trainer: {
    title: "야생마 트레이너",
    type: "테토 성향",
    emoji: "🔥",
    description:
      '당신의 몸이 곧 당신의 연구소입니다. 복잡한 이론보다는 "일단 들어!"를 외치며 몸으로 부딪혀 답을 찾습니다. 근육의 미세한 떨림과 펌핑감으로 다음 세트의 무게를 결정하며, 당신의 포효는 헬스장 전체의 아드레날린을 솟구치게 합니다. 하지만 가끔은 부상 방지를 위해 폼롤러와 친구가 되어보는 것도 좋습니다. 더 멀리, 더 오래 들기 위한 전략이 될 수 있습니다.',
    hashtags: "#근육과의대화 #본능적헬창 #고통은성장의증거",
  },
  viking: {
    title: "헬스계의 바이킹",
    type: "순수 테토남",
    emoji: "🪓",
    description:
      "당신에게 헬스는 사냥이고 전쟁입니다. 바벨은 당신의 무기이며, 원판은 당신이 쟁취한 전리품입니다. '근손실'이라는 단어는 당신의 사전에 없으며, 오직 '중량 부족'만이 당신을 두렵게 합니다. 당신의 운동은 계산이 아닌 감각으로, 계획이 아닌 본능으로 이루어집니다. 당신이 헬스장에 들어서는 순간, 공기부터 무거워집니다. 당신이 바로 이 구역의 알파(α)입니다.",
    hashtags: "#인간불도저 #중량만이살길 #3대500은시작일뿐",
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

  // 3. 점수 체계 변경: 스펙트럼 점수 방식으로 수정
  const calculateResult = () => {
    let score = 0;
    answers.forEach((answer) => {
      if (answer === "A") {
        score += 2; // 에겐남 성향
      } else if (answer === "B") {
        score -= 2; // 테토남 성향
      }
    });

    if (score >= 30) {
      setResult(results.newton);
    } else if (score >= 11) {
      setResult(results.hightech);
    } else if (score >= -10) {
      setResult(results.hybrid);
    } else if (score >= -29) {
      setResult(results.trainer);
    } else {
      setResult(results.viking);
    }
  };

  const handleAnswer = (answer) => {
    setIsAnimating(true);
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // 버튼 스타일 리셋을 위한 강제 리렌더링
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  // 5. 공유 기능 메시지 최적화 - 모바일 최적화
  const shareResult = async () => {
    const text = `나의 헬스 DNA는... [${result.title}]! 💪\n${result.hashtags}\n\n나도 헬창 성향 테스트 해보기 👇`;

    try {
      // 모바일에서 Web Share API 사용
      if (navigator.share) {
        await navigator.share({
          title: "헬창 성향 테스트",
          text: text,
          url: window.location.href,
        });
      } else {
        // 데스크톱에서는 클립보드 복사
        await navigator.clipboard.writeText(text + "\n" + window.location.href);
        alert("결과가 복사되었습니다!");
      }
    } catch (error) {
      console.error("공유 실패:", error);
      // 폴백: 클립보드 복사
      try {
        await navigator.clipboard.writeText(text + "\n" + window.location.href);
        alert("결과가 클립보드에 복사되었습니다!");
      } catch (clipboardError) {
        alert("공유에 실패했습니다. 수동으로 복사해주세요.");
      }
    }
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            💪 헬창 성향 테스트
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            당신의 진짜 헬스 DNA를 찾아보세요
          </p>
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
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center min-h-[6rem] md:h-24 flex items-center justify-center">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            <button
              key={`A-${currentQuestion}`}
              onClick={() => handleAnswer("A")}
              className="w-full p-4 md:p-5 bg-gray-700 rounded-xl text-left hover:bg-blue-800/50 transition-all transform hover:scale-[1.03] touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:scale-95"
            >
              <p className="text-base md:text-lg">
                {questions[currentQuestion].optionA}
              </p>
            </button>

            <button
              key={`B-${currentQuestion}`}
              onClick={() => handleAnswer("B")}
              className="w-full p-4 md:p-5 bg-gray-700 rounded-xl text-left hover:bg-purple-800/50 transition-all transform hover:scale-[1.03] touch-manipulation focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 active:scale-95"
            >
              <p className="text-base md:text-lg">
                {questions[currentQuestion].optionB}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
