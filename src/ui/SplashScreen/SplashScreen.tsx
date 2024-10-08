import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';

interface SplashScreenProps {
  onComplete: () => void;
  isAnimating: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, isAnimating }) => {
  const fullText = "Вас приветствует Польская строительная компания Etalones S&B\nВыберите подходящую вакансию или заполните анкету и мы найдём её для вас!";
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (isTypingComplete && !isClosed) {
      const timer = setTimeout(() => {
        setIsClosed(true); // Сворачиваем окно через 2 секунды
        onComplete();
      }, 2000); // Задержка на 2 секунды после завершения печати

      return () => clearTimeout(timer);
    }
  }, [isTypingComplete, isClosed, onComplete]);

  const handleClose = () => {
    setIsClosed(true);
    onComplete(); // Завершение при нажатии на кнопку
  };

  return (
    <div
      className={`z-100 fixed top-0 right-0 w-full h-full bg-myred-default text-white flex flex-col gap-3 items-center justify-center transition-transform duration-1000 ease-in-out ${isClosed ? 'transform translate-x-full translate-y-0' : ''}`}
    >
      <Image src="/logo white.png" alt="Splash screen" width={200} height={200} />
      <h1 className="text-2xl text-center whitespace-pre-wrap">
        <Typewriter
          words={[fullText]}
          loop={1}
          cursor
          cursorStyle=""
          typeSpeed={20} // Увеличиваем скорость печати

        />
      </h1>
      <button onClick={handleClose} className="mt-4 bg-white text-myred-default px-4 py-2 rounded">
        Перейти на сайт
      </button>
    </div>
  );
};

export default SplashScreen;
